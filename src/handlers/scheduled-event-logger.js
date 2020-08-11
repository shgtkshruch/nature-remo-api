const AIRCON_ID = process.env.AIRCON_ID;
const DEVICE_ID = process.env.DEVICE_ID;
const HOT = parseInt(process.env.HOT, 10);
const COLD = parseInt(process.env.COLD, 10);
const AIR_TEMPERATURE = process.env.AIR_TEMPERATURE;

const { getTemperature } = require('../api/getTemperature');
const { turnOnAircon } = require('../api/turnOnAircon');
const { turnOffAircon } = require('../api/turnOffAircon');
const { slackNotify } = require('../utils/slackNotify');

exports.nightBedRoomAirConditioner = async (event, context) => {
  let res = {};
  const temperature = await getTemperature(DEVICE_ID);

  switch (true) {
    case (temperature >= HOT):
      res = await turnOnAircon(AIRCON_ID, AIR_TEMPERATURE);
      res.message = `[Temperature ${temperature}℃]: Turn on air conditoner`;
      break;
    case (temperature <= COLD):
      res = await turnOffAircon(AIRCON_ID);
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
