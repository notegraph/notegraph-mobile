var Raven = require('raven-js')
require('raven-js/plugins/react-native')(Raven)
import {version} from './package.json'


const ignoreErrors = [
  /^TransformError/,
]
Raven
  .config('https://1177ff5238174173afa7adb86d54f09c@sentry.io/144855', { release: version, ignoreErrors })
  .install()

export default Raven
