/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
'use strict';

import React, {Component} from 'react';
import{
    View,
    Platform,
    StatusBar
}from 'react-native';


import TabView from './component/TabView'

export default class Navigation extends Component {
    constructor(props){
        super(props)
    }

    render(){
        return Platform.OS == 'ios'?(
          <TabView/>
        ):(
          <View style={{flex: 1}}>
            <StatusBar
             backgroundColor="#0398ff"
             barStyle="light-content"
           />
            
            <TabView/>
          </View>
        )

        
    }
}