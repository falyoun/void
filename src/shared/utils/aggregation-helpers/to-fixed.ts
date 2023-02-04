export const toFixed = (paths: string[], options = { round: 3 }) => {
  const res: any = {};

  paths.forEach(path => {
    res[path] = { $round: ['$' + path, options.round] };
  });

  return {
    $addFields: res,
  };
};
