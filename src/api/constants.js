const SSM = require('aws-sdk/clients/ssm');
let paramsCache = null

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
  const data = await ssm.getParameters(params).promise()
  return generateParamsObject(data)
}

function generateParamsObject(data) {
  return data.Parameters.reduce((res, p) => {
    res[p.Name] = p.Value
    return res
  }, {})
}

async function loadConfig() {
  if (paramsCache) return paramsCache

  const params = await fetchParameters()
  return paramsCache = {
    ACCESS_TOKEN: params['NatureRemoAPIAccessToken'],
    AIR_TEMPERATURE: params['NatureRemoAirTemperature'],
    AIRCON_ID: params['NatureRemoAirconID'],
    BASE_URL: "https://api.nature.global/1",
    DEVICE_ID: params['NatureRemoDeviceID'],
    HOT: params['NatureRemoHotTemperature'],
    COLD: params['NatureRemoColdTemperature'],
    SLACK_WEBHOOK: params['NatureRemoSlackWebhookURL']
  }
}

exports.loadConfig = loadConfig
