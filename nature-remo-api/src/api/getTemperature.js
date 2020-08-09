const { getDevices } = require('./getDevices');

exports.getTemperature = async (deviceId) => {
  const devices = await getDevices();
  const device = devices.filter((device) => device.id === deviceId)[0];
  return device.newest_events.te.val;
}
