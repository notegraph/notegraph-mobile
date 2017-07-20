import React, {PropTypes, PureComponent} from 'react'
import {StyleSheet, Text} from 'react-native'
import {Colors, Fonts} from '../themes'

import Markdown from 'react-native-simple-markdown'


class MarkdownViewer extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      error: false,
    }
  }

  // eslint-disable-next-line
  unstable_handleError (e) {
    console.warn('markdown canot be rendered, too complicated', e)
    this.setState({error: true})
  }
  render () {
    const { text } = this.props
    if (this.state.error) {
      return <Text style={textStyles.text}>{text}</Text>
    }
    return (<Markdown styles={styles} >{text}</Markdown>)
  }
}


const fontSizeX = (m) => parseInt(Fonts.size.regular * m, 10)

const textProps = {
  color: Colors.noteText,
  // fontSize: Fonts.size.regular,
  fontFamily: Fonts.type.base,
}

const headingProps = {
  // color: Colors.noteTitle,
  fontFamily: Fonts.type.bold,
  fontSize: 40,
}

const styles = {
  text: {
    ...textProps,
  },
  inlineCode: {
    fontSize: Fonts.size.regular,
    color: Colors.noteText,
    backgroundColor: '#eee',
    paddingLeft: 20,
    paddingRight: 2,
  },
  heading: {
    ...headingProps,
    //fontSize: fontSizeX(1.6),
  },
  heading1: {
    fontSize: fontSizeX(1.6),
  },
  heading2: {
    fontSize: fontSizeX(1.3),
  },
  heading3: {
    fontSize: fontSizeX(1.1),
  },
  heading4: {
    fontSize: fontSizeX(1.05),
  },
  heading5: {
    fontSize: fontSizeX(1),
  },
  paragraph: {
    paddingTop: 3,
    paddingBottom: 3,
    fontSize: Fonts.size.regular
  },

  listItem: {
    flexDirection: 'row',
    paddingBottom: 3,
    paddingTop: 7,
    // paddingBottom: 10,
  },
  listItemBullet: {
    fontWeight: 'bold',
    color: 'black',
  },
  strong: {
    fontWeight: 'bold',
  },
  blockQuoteText: {
    backgroundColor: '#ccc',
  }
}

;[
  'link', 'mailTo', 'listItemBullet', 'strong', 'listItemNumber', 'listItemText',
  'plainText', 'tableHeaderCell', 'url',
].forEach(key => {
  styles[key] = {
    ...(styles[key] || {}),
    fontSize: Fonts.size.regular
  }
})


const textStyles = StyleSheet.create({
  text: {
    ...textProps
  },
})


MarkdownViewer.propTypes = {
  text: PropTypes.string,
}

export default MarkdownViewer
