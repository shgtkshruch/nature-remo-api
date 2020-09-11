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

function getData(data, name) {
  return data.Parameters.filter(p => p.Name === name )[0].Value
}

async function getConstants() {
  if (params) return params

  data = await fetchParameters()
  return params = {
    ACCESS_TOKEN: getData(data, 'NatureRemoAPIAccessToken'),
    AIR_TEMPERATURE: getData(data, 'NatureRemoAirTemperature'),
    AIRCON_ID: getData(data, 'NatureRemoAirconID'),
    BASE_URL: "https://api.nature.global/1",
    DEVICE_ID: getData(data, 'NatureRemoDeviceID'),
    HOT: getData(data, 'NatureRemoHotTemperature'),
    COLD: getData(data, 'NatureRemoColdTemperature'),
    SLACK_WEBHOOK: getData(data, 'NatureRemoSlackWebhookURL')
  }
}

exports.loadConfig = getConstants
