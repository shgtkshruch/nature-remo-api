/**
 * A Lambda function that logs the payload received from a CloudWatch scheduled event.
 */
const AIRCON_ID = process.env.AIRCON_ID;
const DEVICE_ID = process.env.DEVICE_ID;
const HOT = parseInt(process.env.HOT, 10);
const COLD = parseInt(process.env.COLD, 10);
const AIR_TEMPERATURE = process.env.AIR_TEMPERATURE;

const { getDevices } = require('../nature-remo/getDevices');
const { turnOnAircon } = require('../nature-remo/turnOnAircon');
const { turnOffAircon } = require('../nature-remo/turnOffAircon');

exports.nightBedRoomAirConditioner = async (event, context) => {
  // All log statements are written to CloudWatch by default. For more information, see
  // https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-logging.html

  let res;

  const devices = await getDevices();
  const device = devices.filter((device) => device.id === DEVICE_ID)[0];
  const temperature = device.newest_events.te.val;

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
