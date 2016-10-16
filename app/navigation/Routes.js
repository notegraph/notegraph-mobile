// import { Transitions } from '../Themes/'

// I18n
// import I18n from '../I18n/I18n.js'

export default new class Routes {

  get Dashboard () {
    return {
      title: 'Notes',
      component: require('../containers/Dashboard').default,
      // leftButton: 'HAMBURGER',
    }
  }

  get OpenedNote () {
    return {
      title: 'Active Note',
      component: require('../containers/OpenedNote').default,
      leftButton: 'BACK',
      rightButton: 'DELETE_NOTE',
    }
  }

}
