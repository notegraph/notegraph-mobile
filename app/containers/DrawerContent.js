import React, { Component, PropTypes } from 'react'
import { ScrollView, Image, BackAndroid, TouchableOpacity, Text } from 'react-native'
// import { Images } from '../Themes'

import { Actions as NavigationActions } from 'react-native-router-flux'

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
  }


  render () {
    return (
      <ScrollView style={styles.container}>
        <Image source={Images.logo} style={styles.logo} />
        <DrawerButton text="Export Data" onPress={this.handleExportData} />
      </ScrollView>
    )
  }

}

DrawerContent.contextTypes = {
  drawer: React.PropTypes.object
}

export default DrawerContent
