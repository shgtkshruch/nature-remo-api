const AIRCON_ID = process.env.AIRCON_ID;
const DEVICE_ID = process.env.DEVICE_ID;
const HOT = parseInt(process.env.HOT, 10);
const COLD = parseInt(process.env.COLD, 10);
const AIR_TEMPERATURE = process.env.AIR_TEMPERATURE;

const { getTemperature } = require('../api/getTemperature');
const { turnOnAircon } = require('../api/turnOnAircon');
const { turnOffAircon } = require('../api/turnOffAircon');

exports.nightBedRoomAirConditioner = async (event, context) => {
  let res;
  const temperature = await getTemperature(DEVICE_ID);

  switch (true) {
    case (temperature >= HOT):
      log(`[Temperature ${temperature}℃]: Turn on air conditoner`);
      res = await turnOnAircon(AIRCON_ID, AIR_TEMPERATURE);
      break;
    case (temperature <= COLD):
      log(`[Temperature ${temperature}℃]: Turn off air conditoner`);
      res = await turnOffAircon(AIRCON_ID);
      break;
    default:
      res = `[Temperature ${temperature}℃]: It's just the right room temperature`;
      break;
  }

  log(res);
};

const log = (logObj) => (console.dir(logObj, { depth: 10 }) );
