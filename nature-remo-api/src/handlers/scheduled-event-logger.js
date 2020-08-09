/**
 * A Lambda function that logs the payload received from a CloudWatch scheduled event.
 */

const fetch = require('node-fetch');
const accessToken = process.env.NATURE_REMO_ACCESS_TOKEN;

exports.scheduledEventLoggerHandler = async (event, context) => {
  // All log statements are written to CloudWatch by default. For more information, see
  // https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-logging.html
  const res = await fetch('https://api.nature.global/1/devices', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  console.dir(await res.json())
};
