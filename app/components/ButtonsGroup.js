import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
} from 'react-native'

import { MKButton } from 'react-native-material-kit'
import ActionButton from './ActionButton'

import { Colors, Metrics } from '../themes'


class ButtonsGroup extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isPressed: false,
    }
  }

  handleButtonPress = () => {
    this.setState({
      isPressed: !this.state.isPressed,
    })
  }

  renderButtonOptions () {
    const { buttons } = this.props
    const buttonElems = buttons.map((b, i) => {
      const handlePress = () => {
        this.setState({ isPressed: false })
        b.onPress()
      }

      return (
        <View style={styles.inlineButtonCont} key={`button-${i}`}>
          <MKButton onPress={handlePress} >
            <Text style={styles.inlineButton}>{b.title}</Text>
          </MKButton>
        </View>
      )
    })

    return (
      <View style={styles.options} >
        {buttonElems}
      </View>
    )
  }

  render () {
    const { isPressed } = this.state
    const contStyles = [
      styles.container,
      isPressed ? styles.contOverlay : styles.contNormal
    ]

    return (
      <View style={contStyles}>
        <View style={styles.buttonsFooter}>
          {isPressed && this.renderButtonOptions()}
          <ActionButton onPress={this.handleButtonPress} />
        </View>
      </View>
    )
  }
}

const ButtonProp = PropTypes.shape({
  title: PropTypes.string,
  onPress: PropTypes.func.isRequired,
})

ButtonsGroup.propTypes = {
  buttons: PropTypes.arrayOf(ButtonProp).isRequired,
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'flex-end',
  },
  contNormal: {
    height: 200,
  },
  contOverlay: {
    top: 0,
    // opacity: 0.8,
    backgroundColor: 'white',
  },

  buttonsFooter: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    flexDirection: 'column',
    alignItems: 'flex-end',
  },

  button: {
    color: Colors.blue,
  },
  options: {
    marginBottom: 20,
  },

  inlineButtonCont: {
    padding: 10,
    backgroundColor: 'white',
  },
  inlineButton: {
    fontSize: 18,
    color: Colors.noteText,
    textAlign: 'right',
  }

})


export default ButtonsGroup
