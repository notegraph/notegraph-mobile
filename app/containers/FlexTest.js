'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View
} from 'react-native';
  
class ReactLayouts extends Component{
    render() {
        return (
            <View style={styles.mainContainer}>
               <View style={styles.toolbar}>
                    <Text style={styles.toolbarButton}>Add</Text>
                    <Text style={styles.toolbarTitle}>This is the title</Text>
                    <Text style={styles.toolbarButton}>Like</Text>
                </View>
                <View style={styles.content}>
  
                    {/* START NEW CODE */}
 
                    <View style={styles.messageBox}>
                        <View>
                            <Text style={styles.messageBoxTitleText}>A simple mesage</Text>
                        </View>
                        <View>
                            <Text style={styles.messageBoxBodyText}>This is just a dummy sample it will help us to see the alignment in action.</Text>
                        </View>
                    </View>
 

              {/* END NEW CODE */}
  
                </View>
            </View>
        );
    }
}
  
var styles = StyleSheet.create({
    toolbar:{
        backgroundColor:'#81c04d',
        paddingTop:30,
        paddingBottom:10,
        flexDirection:'row'    //Step 1
    },
    toolbarButton:{
        width: 50,            //Step 2
        color:'#fff',
        textAlign:'center'
    },
    toolbarTitle:{
        color:'#fff',
        textAlign:'center',
        fontWeight:'bold',
        flex:1                //Step 3
    }, 
    mainContainer:{
        flex:1                  //Step 1
    },
    content:{
        backgroundColor:'#ebeef0',
        flex:1, 
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
    }, 

    messageBox:{
        backgroundColor:'#ef553a',
        width:300,
        paddingTop:10,
        paddingBottom:20,
        paddingLeft:20,
        paddingRight:20, 
        borderRadius:10
    },
    messageBoxTitleText:{
        fontWeight:'bold',
        color:'#fff',
        textAlign:'center',
        fontSize:20,
        marginBottom:10
    },
    messageBoxBodyText:{
        color:'#fff',
        fontSize:16
    }    
});
    
export default ReactLayouts;