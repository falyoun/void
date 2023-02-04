export const toISOString = (paths: string[]) => {
  const res: any = {};

  paths.forEach(path => {
    res[path] = { $dateToString: { format: '%Y-%m-%dT%H:%M:%S.%LZ', date: '$' + path } };
  });

  return {
    $addFields: res,
  };
};
