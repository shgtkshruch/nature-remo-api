const fetch = require("node-fetch");
const { loadConfig } = require("../api/constants");

exports.slackNotify = async (message) => {
  const constants = await loadConfig()
  const body = { text: message };
  await fetch(constants.SLACK_WEBHOOK, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return true
};
