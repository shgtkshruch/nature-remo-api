const fetch = require("node-fetch");
const { loadConfig } = require('./constants');

exports.getSignales = async (applianceId) => {
  const constants = await loadConfig()
  const res = await fetch(`${constants.BASE_URL}/appliances/${applianceId}/signals`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${constants.ACCESS_TOKEN}`,
    },
  });
  return await res.json();
};
