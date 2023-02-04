export type GenericFunction<T = unknown> = (...args: any) => Promise<T>;
export class CallQueue {
  private _queue: GenericFunction[] = [];
  private _running = false;
  push(func: GenericFunction) {
    const callback: GenericFunction = async () =>
      func().finally(() => {
        this.next();
      });
    this._queue.push(callback);
    if (!this._running) {
      // if nothing is running, then start the engines!
      this.next();
    }
  }
  next() {
    this._running = false;
    //get the first element off the queue
    const shift = this._queue.shift();
    if (shift) {
      this._running = true;
      shift().then();
    }
  }
}

// test
// (() => {
//   const cq = new CallQueue();
//   let x = 2;
//   cq.push(async () => {
//     await new Promise((resolve, reject) => {
//       setTimeout(() => {
//         resolve(x);
//       }, 5000);
//     });
//     console.log({ x });
//     x = 4;
//   });
//   cq.push(async () => {
//     await new Promise((resolve, reject) => {
//       setTimeout(() => {
//         resolve(x);
//       }, 2000);
//     });
//     console.log({ x });
//     x = 5;
//   });
//
//   cq.push(async () => {
//     await new Promise((resolve, reject) => {
//       setTimeout(() => {
//         resolve(x);
//       }, 0);
//     });
//     console.log({ x });
//     console.log('Done');
//   });
// })();
