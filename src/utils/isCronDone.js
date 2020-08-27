const { isAfter, set, sub } = require('date-fns');

exports.isCronDone = () => {
  const cronEndTime = set(new Date(), { hours: 23 });
  const endTime = sub(cronEndTime, { minutes: 10 });
  return isAfter(new Date(), endTime);
};
