import React, { Component, PropTypes } from 'react'
import {connect} from 'react-redux'
import {
  ScrollView,
  Image,
  BackAndroid,
  TouchableOpacity,
  Text,
  Share,
  View,
} from 'react-native'

import Images from '../themes/Images'
import {Fonts, Colors} from '../themes'
import {exportNotebook} from '../actions/share'
import {sendFeedbackMail} from '../actions/mail'


const styles = {
  container: {
    flex: 1,
    padding: 20
  },
  logo: {
    alignSelf: 'center',
    marginBottom: 10,
  },
  linksContainer: {
    paddingTop: 20,
  },
  menuLink: {
    marginBottom: 10,
  },
  text: {
    fontSize: Fonts.size.regular,
    color: Colors.coal
  }
}

class DrawerButton extends Component {
  render () {
    return (
      <TouchableOpacity onPress={this.props.onPress} style={styles.menuLink}>
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
        <View style={styles.linksContainer}>
          <DrawerButton text="Export Data" onPress={this.handleExportData} />
          <DrawerButton text="Send Feedback" onPress={this.handleSendFeedback} />
        </View>
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
