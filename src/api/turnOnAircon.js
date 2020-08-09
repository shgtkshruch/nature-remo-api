const fetch = require("node-fetch");
const { constants } = require('./constants');

exports.turnOnAircon = async (applianceId, temperature) => {
  const endpoint = `${constants.BASE_URL}/appliances/${applianceId}/aircon_settings`;
  const params = new URLSearchParams();
  params.append("appliance", applianceId);
  params.append("temperature", temperature);
  params.append("operation_mode", "dry");
  params.append("button", "");

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${constants.ACCESS_TOKEN}`,
    },
    body: params,
  });
  return await res.json();
};
