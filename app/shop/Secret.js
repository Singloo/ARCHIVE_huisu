/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
'use strict';
import React, {
    Component,
} from 'react'

import {
    StyleSheet,
    View,
    Text,
    Animated,
    TouchableOpacity,
    Image,
    Alert,
    Modal
} from 'react-native'

import base from '../base/base'
import Icon from 'react-native-vector-icons/Ionicons'
import {BlurView, VibrancyView} from 'react-native-blur'


export default class Secret extends Component{

    constructor(props){
        super(props)
        this.state = {
            
        }

    }


    render() {
        return(
            <Modal
                animationType='slide'
                onRequestClose={()=>{}}
                transparent={true}
                visible={this.props.secretVisible}
            >
                <View style={{flex:1}}>
                    <Image source={require('../images/lover.jpg')} style={{width:base.deviceWidth,height:base.deviceHeight,resizeMode:'cover'}}/>
                    <BlurView  style={{position:'absolute',top:0,width:base.deviceWidth,height:base.deviceHeight,alignItems:'center',justifyContent:'center'}} blurType='light' blurAmount={10}>
                        <TouchableOpacity 
                            style={{position:'absolute',left:10,top:40,width:40,height:40,alignItems:'center',justifyContent:'center'}}
                            onPress={()=>this.props.closeModal()}
                        >
                            <Icon
                                name='ios-close'
                                color='white'
                                size={40}
                
                            />
                        </TouchableOpacity>
                        <Text
                            style={{fontSize:15,letterSpacing:0.5,textAlign:'center',backgroundColor:'transparent',color:'white'}}
                        >
                            {"But if you send for me you know I'll come,\nAnd if you call for me you know I'll run\n... \n 你一直都知道的... \n 我想...这种情感也许是无关性别的吧\n 只是...想和你在一起就行"}
                        </Text>

                    </BlurView>

                </View>


            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    
})