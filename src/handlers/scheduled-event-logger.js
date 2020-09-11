const { loadConfig } = require('../api/constants');
const { getTemperature } = require('../api/getTemperature');
const { turnOnAircon } = require('../api/turnOnAircon');
const { turnOffAircon } = require('../api/turnOffAircon');
const { slackNotify } = require('../utils/slackNotify');
const { isCronDone } = require('../utils/isCronDone');

exports.nightBedRoomAirConditioner = async (event, context) => {
  const constants = await loadConfig()
  let res = {};
  const temperature = await getTemperature(constants.DEVICE_ID);

  switch (true) {
    case (isCronDone()):
      res = await turnOffAircon(constants.AIRCON_ID);
      res.message = `[Temperature ${temperature}℃]: Cron job is done`;
      break;
    case (temperature >= constants.HOT):
      res = await turnOnAircon(constants.AIRCON_ID, constants.AIR_TEMPERATURE);
      res.message = `[Temperature ${temperature}℃]: Turn on air conditoner`;
      break;
    case (temperature <= constants.COLD):
      res = await turnOffAircon(constants.AIRCON_ID);
      res.message = `[Temperature ${temperature}℃]: Turn off air conditoner`;
      break;
    default:
      res.message = `[Temperature ${temperature}℃]: It's just the right room temperature`;
      break;
  }

  log(res);
  await slackNotify(res.message);
};

const log = (logObj) => ( console.dir(logObj, { depth: 10 }) );
