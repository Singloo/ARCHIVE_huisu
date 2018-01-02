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
    TouchableOpacity,
    FlatList,
    Alert,
    BackHandler
} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'
import base,{renderUserTitle} from '../base/base'
import Toast,{DURATION} from 'react-native-easy-toast'
// import * as CacheManager from 'react-native-http-cache';
import AV from 'leancloud-storage'
import {Button} from 'react-native-elements'

export default class Setting extends Component {
    static navigationOptions={
        title: '设 置',
        tabBarVisible: false
      
    }

    constructor(props){
        super(props)
        this.state={

        }

        this.data =[
            {   
                labelText:'修改密码',
                onPress:this._resetPassword
            },
            {   
                labelText:'选择称号',
                onPress:this._chooseTitle
            },


        ]

    }

    componentWillMount(){
        // BackHandler.addEventListener('hardwareBackPress', function(){
        //     this.props.navigation.goBack()
        //     return true
        // })
    }

    componentWillUnmount(){
        // BackHandler.removeEventListener('hardwareBackPress', function(){
        //     this.props.navigation.goBack()
        //     return true
        // })

        this.props.navigation.state.params.refresh()
    }

    _resetPassword=()=>{
        AV.User.currentAsync().then((user)=>{
            if (user == null){
                this.refs.error.show('你有账号吗...')
            }else{
                Alert.alert('确定修改密码吗?','',[
                    {text:'点错了', onPress:()=>{},style:'cancel'},
                    {text:'是的', onPress:()=>{
                        AV.User.requestPasswordReset(user.getEmail()).then((success)=>{
                            this.refs.toast.show('一封邮件已经发往你的邮箱啦,快去看看')
                        }).catch((error)=>{
                            this.refs.error.show('你暗算我?')
                        })
                    }}
                ])
            }
        }).catch((error)=>{
            this.refs.error.show('网络.....')
        })
    }

    _chooseTitle=()=>{
        this.props.navigation.navigate('ChooseTitle')
    }

    // _clearCache=()=>{
    //     // CacheManager.clear()
    // }
    _confirmLogout=()=>{
        AV.User.logOut()
        this.props.navigation.state.params.refresh()
        this.props.navigation.goBack()
    }

    _logout=()=>{
        Alert.alert('确定退出账号吗?','',[
            {text:'点错了', onPress:()=>{},style:'cancel'},
            {text:'是的', onPress:this._confirmLogout}
        ])
    }
    _renderItem(){
        return this.data.map((item,i)=>{
           return(
                <TouchableOpacity
                    onPress={item.onPress}
                    key={i}
                >
                    <View style={styles.item}>
                        <Text style={styles.text}>{item.labelText}</Text>
                        <Icon
                            name='ios-arrow-forward'
                            size={30}
                            color={base.titleColor}
                            style={{marginRight:20}}
                        />
                    </View>
                </TouchableOpacity>
            )
        })
        
    }

    render() {
        return (
            <View style={{flex: 1,backgroundColor: "#f3f3f3",flexDirection:'column',justifyContent:'center'}}>
                <View style={{position:'absolute',top:10}}>
                    {this._renderItem()}
                </View>

                

                <TouchableOpacity 
                    onPress={this._logout}
                    style={{position:'absolute',bottom:base.realSize(10)}}
                >
                    <Text style={styles.logOutText}>{'退 出 账 号'}</Text>
                </TouchableOpacity>




                <Toast ref='toast'/>
                <Toast 
                    ref='error'
                    style={{backgroundColor:base.errorColor}}
                    position='top'
                    positionValue={200}
                    textStyle={{color:'white'}}
                    fadeInDuration={750}
                    fadeOutDuration={1000}
                />   
            </View>
        )     
        
    }
}

const styles = StyleSheet.create({
    item:{
        width:base.deviceWidth,
        height:base.realSize(40),
        alignItems:'center',
        justifyContent:'space-between',
        flexDirection:'row',
        backgroundColor:'white'
    },

    text:{
        marginLeft:base.realSize(20)
    },

    logOutText:{
        color:'white',
        backgroundColor:'#e57373',
        textAlign:'center',
        width:base.deviceWidth,
        height:base.realSize(40),
        fontSize:17,
        paddingVertical:base.realSize(8)
    }
})