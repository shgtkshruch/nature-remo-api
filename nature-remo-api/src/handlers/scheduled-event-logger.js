/**
 * A Lambda function that logs the payload received from a CloudWatch scheduled event.
 */

const fetch = require("node-fetch");
const accessToken = process.env.NATURE_REMO_ACCESS_TOKEN;
const BASE_URL = 'https://api.nature.global/1'
const PC_ROOM_AIRCON_ID = '***'

exports.scheduledEventLoggerHandler = async (event, context) => {
  // All log statements are written to CloudWatch by default. For more information, see
  // https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-logging.html

  const res = await trunOnAircon(PC_ROOM_AIRCON_ID)
  // const res = await turnOffAircon(PC_ROOM_AIRCON_ID)
  console.dir(res, { depth: 10 })
};

const getDevices = async () => {
  const res = await fetch(`${BASE_URL}/devices`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return await res.json()
};

const getAppliances = async () => {
  const res = await fetch(`${BASE_URL}/appliances`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return await res.json()
}

const getSignales = async (applianceId) => {
  const res = await fetch(`${BASE_URL}/appliances/${applianceId}/signals`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return await res.json()
}

const trunOnAircon = async (applianceId) => {
  const endpoint = `${BASE_URL}/appliances/${applianceId}/aircon_settings`
  const params = new URLSearchParams();
  params.append('appliance', applianceId)
  params.append('temperature', '26')
  params.append('operation_mode', 'dry')
  params.append('button', '')

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: params,
  });
  return await res.json()
}

const turnOffAircon = async (applianceId) => {
  const endpoint = `${BASE_URL}/appliances/${applianceId}/aircon_settings`
  const params = new URLSearchParams();
  params.append('appliance', applianceId)
  params.append('button', 'power-off')

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: params,
  });
  return await res.json()
}
