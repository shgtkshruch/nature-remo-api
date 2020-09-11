const { isAfter, set } = require('date-fns');

exports.isCronDone = () => {
  const cronEndTime = set(new Date(), { hours: 22, minutes: 55, seconds: 0 });
  return isAfter(new Date(), cronEndTime);
};
