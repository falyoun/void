import util from 'util';

export const getRegExpFlags = (re) => {
  let flags = '';
  re.global && (flags += 'g');
  re.ignoreCase && (flags += 'i');
  re.multiline && (flags += 'm');
  return flags;
};
export const isPromise = (obj) =>
  Object.prototype.toString.call(obj) === '[object Promise]';

export const cloneDeep = (
  parent: any,
  depth: number,
  circular?: boolean,
  prototype?: any,
) => {
  // maintain two arrays for circular references, where corresponding parents
  // and children have the same index
  const allParents = [];
  const allChildren = [];

  const useBuffer = typeof Buffer != 'undefined';

  if (typeof circular === 'undefined') circular = true;

  if (typeof depth === 'undefined') depth = 20;

  // recurse this function so we don't reset allParents and allChildren
  function _clone(parent, depth) {
    // cloning null always returns null
    if (parent === null) return null;

    if (depth === 0) return parent;

    let child;
    if (typeof parent != 'object') {
      return parent;
    }

    if (util.isArray(parent)) {
      child = [];
    } else if (util.isRegExp(parent)) {
      child = new RegExp(parent.source, getRegExpFlags(parent));
      if (parent.lastIndex) child.lastIndex = parent.lastIndex;
    } else if (util.isDate(parent)) {
      child = new Date(parent.getTime());
    } else if (useBuffer && Buffer.isBuffer(parent)) {
      child = Buffer.alloc(parent.length);
      parent.copy(child);
      return child;
    } else {
      if (typeof prototype === 'undefined')
        child = Object.create(Object.getPrototypeOf(parent));
      else child = Object.create(prototype);
    }

    if (circular) {
      const index = allParents.indexOf(parent);

      if (index != -1) {
        return allChildren[index];
      }
      allParents.push(parent);
      allChildren.push(child);
    }

    for (const i in parent) {
      const propDescriptor = Object.getOwnPropertyDescriptor(parent, i);
      const hasGetter =
        propDescriptor !== undefined && propDescriptor.get !== undefined;

      if (hasGetter) {
        Object.defineProperty(child, i, propDescriptor);
      } else if (isPromise(parent[i])) {
        child[i] = parent[i];
      } else {
        child[i] = _clone(parent[i], depth - 1);
      }
    }

    return child;
  }

  return _clone(parent, depth);
};

/**
 * Extend an object, and any object it contains.
 *
 * This does not replace deep objects, but dives into them
 * replacing individual elements instead.
 *
 * @protected
 * @method extendDeep
 * @param mergeInto {object} The object to merge into
 * @param mergeFrom... {object...} - Any number of objects to merge from
 * @param depth {integer} An optional depth to prevent recursion.  Default: 20.
 * @return {object} The altered mergeInto object is returned
 */
export const extendDeep = (mergeInto: any, mergeFrom: any, depth = 20) => {
  // Recursion detection
  if (depth < 0) {
    return mergeInto;
  }

  // Cycle through each object to extend
  // Cycle through each element of the object to merge from
  for (const prop in mergeFrom) {
    // Extend recursively if both elements are objects and target is not really a deferred function
    if (mergeFrom[prop] instanceof Date) {
      mergeInto[prop] = mergeFrom[prop];
    }
    if (mergeFrom[prop] instanceof RegExp) {
      mergeInto[prop] = mergeFrom[prop];
    } else if (
      util.isObject(mergeInto[prop]) &&
      util.isObject(mergeFrom[prop])
    ) {
      extendDeep(mergeInto[prop], mergeFrom[prop], depth - 1);
    } else if (isPromise(mergeFrom[prop])) {
      mergeInto[prop] = mergeFrom[prop];
    }
    // Copy recursively if the mergeFrom element is an object (or array or fn)
    else if (mergeFrom[prop] && typeof mergeFrom[prop] === 'object') {
      mergeInto[prop] = cloneDeep(mergeFrom[prop], depth - 1);
    }

    // Copy property descriptor otherwise, preserving accessors
    else if (Object.getOwnPropertyDescriptor(Object(mergeFrom), prop)) {
      Object.defineProperty(
        mergeInto,
        prop,
        Object.getOwnPropertyDescriptor(Object(mergeFrom), prop),
      );
    } else {
      mergeInto[prop] = mergeFrom[prop];
    }
  }
  // Chain
  return mergeInto;
};
