/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
'use strict';

import React, {Component} from 'react'
import {
    Text,
    View,
    StyleSheet,
    Modal,
    TouchableHighlight,
    ActivityIndicator,
} from 'react-native'


import base from '../base/base'
import {BlurView, VibrancyView} from 'react-native-blur'

export default class ProgressHUD extends Component {
    constructor(props){
        super(props)
        
        
    }

    componentDidMount() {
        // this.timer = setTimeout(()=>{this.props.closeModal()},1000);
    }

    componentWillUnmount() {
        // this.timer && clearTimeout(this.timer);
    }

    render(){
        return(
            <Modal
            animationType='none'
            onRequestClose={()=>{}}
            transparent={true}
            visible={this.props.isLoading}
            >
                <View style={{alignItems:'center',justifyContent:'center',flex:1}}>
                    <BlurView style={styles.blur} blurType='light' blurAmount={3}/>
                    <ActivityIndicator
                        size='large'
                        style={{alignSelf:'center'}}
                    />

                
                </View>
            </Modal>
        )
    }

}


const styles = StyleSheet.create({
    blur:{
        justifyContent:'center',
        alignItems:'center',
        width:base.realSize(150),
        height:base.realSize(80),
        borderRadius:base.realSize(12)
    },
})