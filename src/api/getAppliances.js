const fetch = require("node-fetch");
const { loadConfig } = require('./constants');

exports.getAppliances = async () => {
  const constants = await loadConfig()
  const res = await fetch(`${constants.BASE_URL}/appliances`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${constants.ACCESS_TOKEN}`,
    },
  });
  return await res.json();
};
