import React, { Component, PropTypes } from 'react'
import {connect} from 'react-redux'
import {
  ScrollView,
  Image,
  BackAndroid,
  TouchableOpacity,
  Text,
  Share,
} from 'react-native'
// import { Images } from '../Themes'

import { Actions as NavigationActions } from 'react-native-router-flux'
import {exportNotebook} from '../actions/share'
import {sendFeedbackMail} from '../actions/mail'

const Images = {}

const styles = {
  container: {
    flex: 1,
    padding: 20
  },
  logo: {
    alignSelf: 'center'
  }
}

class DrawerButton extends Component {
  render () {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <Text style={styles.text}>{this.props.text}</Text>
      </TouchableOpacity>
    )
  }
}

DrawerButton.propTypes = {
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
}


class DrawerContent extends Component {

  componentDidMount () {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      if (this.context.drawer.props.open) {
        this.toggleDrawer()
        return true
      }
      return false
    })
  }

  toggleDrawer () {
    this.context.drawer.toggle()
  }

  handleExportData = () => {
    this.toggleDrawer()
    // NavigationActions.componentExamples()
    this.props.export((msg) => {
      this._shareMessage(msg)
    })
  }

  handleSendFeedback = () => {
    this.toggleDrawer()
    sendFeedbackMail()
  }

  _shareMessage (msg) {
    Share.share({
      message: msg
    })
    .then(this._showResult)
    .catch((error) => this.setState({result: 'error: ' + error.message}))
  }


  render () {
    return (
      <ScrollView style={styles.container}>
        <Image source={Images.logo} style={styles.logo} />
        <DrawerButton text="Export Data" onPress={this.handleExportData} />
        <DrawerButton text="Send Feedback" onPress={this.handleSendFeedback} />
      </ScrollView>
    )
  }

}

DrawerContent.propTypes = {
  export: React.PropTypes.func.isRequired,
}

DrawerContent.contextTypes = {
  drawer: React.PropTypes.object,
}

function mapStateToProps (state) {
  return {}
}

function mapDispatchToProps (dispatch) {
  return {
    export: (cb) => dispatch(exportNotebook(cb))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent)
