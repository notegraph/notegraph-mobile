import {Alert} from 'react-native'
const Mailer = require('NativeModules').RNMail
import DeviceInfo from 'react-native-device-info'


const HARDWARE_DATA = [
  // {title: 'Device Manufacturer', info: DeviceInfo.getManufacturer()},
  // {title: 'Device Name', info: DeviceInfo.getDeviceName()},
  {title: 'Device Model', info: DeviceInfo.getModel()},
  // {title: 'Device Unique ID', info: DeviceInfo.getUniqueID()},
  {title: 'Device Locale', info: DeviceInfo.getDeviceLocale()},
  // {title: 'Device Country', info: DeviceInfo.getDeviceCountry()},
  // {title: 'User Agent', info: DeviceInfo.getUserAgent()},
  // {title: 'Screen Width', info: Metrics.screenWidth},
  // {title: 'Screen Height', info: Metrics.screenHeight}
]

const OS_DATA = [
  // {title: 'OS System Name', info: DeviceInfo.getSystemName()},
  // {title: 'Device ID', info: DeviceInfo.getDeviceId()},
  {title: 'OS Version', info: DeviceInfo.getSystemVersion()}
]

const APP_DATA = [
  {title: 'Bundle Id', info: DeviceInfo.getBundleId()},
  {title: 'Build Number', info: DeviceInfo.getBuildNumber()},
  {title: 'App Version', info: DeviceInfo.getVersion()},
  // {title: 'App Version (Readable)', info: DeviceInfo.getReadableVersion()}
]


function addGroup (items, group) {
  for (const metric of group) {
    items.push(`${metric.title}: ${metric.info}`)
  }
}

function getEnvInfo () {
  const items = ['', '', '--------']
  addGroup(items, HARDWARE_DATA)
  addGroup(items, OS_DATA)
  addGroup(items, APP_DATA)
  return items.join('\n')
}


export function sendFeedbackMail () {
  // Alert.alert('test', getEnvInfo())
  // return
  Mailer.mail({
    subject: 'notegraph feedback',
    recipients: ['support@notegraph.com'],
    // ccRecipients: ['supportCC@example.com'],
    // bccRecipients: ['supportBCC@example.com'],
    body: getEnvInfo(),
    isHTML: false, // iOS only, exclude if false
    // attachment: {
    //   path: '',  // The absolute path of the file from which to read data.
    //   type: '',   // Mime Type: jpg, png, doc, ppt, html, pdf
    //   name: '',   // Optional: Custom filename for attachment
    // }
  }, (error, event) => {
    if (error) {
      Alert.alert('Error', 'Could not send mail. Please send a mail to support@example.com')
    }
  })
}
