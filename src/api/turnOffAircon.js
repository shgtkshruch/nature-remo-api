const fetch = require("node-fetch");
const { loadConfig } = require('./constants');

exports.turnOffAircon = async (applianceId) => {
  const constants = await loadConfig()
  const endpoint = `${constants.BASE_URL}/appliances/${applianceId}/aircon_settings`;
  const params = new URLSearchParams();
  params.append("appliance", applianceId);
  params.append("button", "power-off");

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${constants.ACCESS_TOKEN}`,
    },
    body: params,
  });
  return await res.json();
};
