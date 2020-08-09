const fetch = require("node-fetch");
const { constants } = require('./constants');

exports.getDevices = async () => {
  const res = await fetch(`${constants.BASE_URL}/devices`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${constants.ACCESS_TOKEN}`,
    },
  });
  return await res.json();
};
