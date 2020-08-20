const { isAfter, set } = require('date-fns');

exports.isCronDone = () => {
  const endTime = set(new Date(), { hours: 23 });
  return isAfter(new Date(), endTime);
};
