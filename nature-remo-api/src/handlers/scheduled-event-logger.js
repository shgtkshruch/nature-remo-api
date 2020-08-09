/**
 * A Lambda function that logs the payload received from a CloudWatch scheduled event.
 */

const fetch = require("node-fetch");
const accessToken = process.env.NATURE_REMO_ACCESS_TOKEN;
const AIRCON_ID = process.env.AIRCON_ID;
const DEVICE_ID = process.env.DEVICE_ID;
const HOT = parseInt(process.env.HOT, 10);
const COLD = parseInt(process.env.COLD, 10);
const AIR_TEMPERATURE = process.env.AIR_TEMPERATURE;
const BASE_URL = "https://api.nature.global/1";

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

const getDevices = async () => {
  const res = await fetch(`${BASE_URL}/devices`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return await res.json();
};

const turnOnAircon = async (applianceId, temperature) => {
  const endpoint = `${BASE_URL}/appliances/${applianceId}/aircon_settings`;
  const params = new URLSearchParams();
  params.append("appliance", applianceId);
  params.append("temperature", temperature);
  params.append("operation_mode", "dry");
  params.append("button", "");

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: params,
  });
  return await res.json();
};

const turnOffAircon = async (applianceId) => {
  const endpoint = `${BASE_URL}/appliances/${applianceId}/aircon_settings`;
  const params = new URLSearchParams();
  params.append("appliance", applianceId);
  params.append("button", "power-off");

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: params,
  });
  return await res.json();
};

const getAppliances = async () => {
  const res = await fetch(`${BASE_URL}/appliances`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return await res.json();
};

const getSignales = async (applianceId) => {
  const res = await fetch(`${BASE_URL}/appliances/${applianceId}/signals`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return await res.json();
};
