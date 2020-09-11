const SSM = require('aws-sdk/clients/ssm');
let params = null

async function fetchParameters() {
  const ssm = new SSM()
  const params = {
    Names: [
      'NatureRemoAPIAccessToken',
      'NatureRemoAirTemperature',
      'NatureRemoAirconID',
      'NatureRemoColdTemperature',
      'NatureRemoDeviceID',
      'NatureRemoHotTemperature',
      'NatureRemoSlackWebhookURL'
    ],
    WithDecryption: true
  }
  console.log('call AWS SSM API')
  return await ssm.getParameters(params).promise()
}

function getData(params, name) {
  return params.Parameters.filter(p => p.Name === name )[0].Value
}

async function getConstants() {
  params = params || await fetchParameters()
  return {
    ACCESS_TOKEN: getData(params, 'NatureRemoAPIAccessToken'),
    AIR_TEMPERATURE: getData(params, 'NatureRemoAirTemperature'),
    AIRCON_ID: getData(params, 'NatureRemoAirconID'),
    BASE_URL: "https://api.nature.global/1",
    DEVICE_ID: getData(params, 'NatureRemoDeviceID'),
    HOT: getData(params, 'NatureRemoHotTemperature'),
    COLD: getData(params, 'NatureRemoColdTemperature'),
    SLACK_WEBHOOK: getData(params, 'NatureRemoSlackWebhookURL')
  }
}

exports.loadConfig = getConstants
