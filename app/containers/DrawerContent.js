import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {connect} from 'react-redux'
import {
  ScrollView,
  Image,
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
    padding: 20,
  },
  logo: {
    // FIXME: align to the left
    // alignSelf: 'flex-start',
    transform: [{ scale: 0.8 }]
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
  handleExportData = () => {
    // NavigationActions.componentExamples()
    this.props.export((msg) => {
      this._shareMessage(msg)
    })
  }

  handleSendFeedback = () => {
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
      <ScrollView contentContainerStyle={styles.container}>
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
  export: PropTypes.func.isRequired,
}

DrawerContent.contextTypes = {
  drawer: PropTypes.object,
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
