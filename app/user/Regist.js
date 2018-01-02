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
    Dimensions,
    Keyboard,
    KeyboardAvoidingView,
    Animated,
    Modal,
    BackHandler
} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'
import AV from 'leancloud-storage'
import base from '../base/base'
import LinearGradient from 'react-native-linear-gradient'
import {Sae} from 'react-native-textinput-effects'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import {Button} from 'react-native-elements'
import {StackNavigator,TabNavigator} from 'react-navigation'
import Toast,{DURATION} from 'react-native-easy-toast'


let{width,height} = Dimensions.get('window')

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export default class Regist extends Component {

    static navigationOptions = {
        tabBarVisible: false
    }
    constructor(props){
        super(props)

        this.state={
            userName:'',
            userEmail:'',
            userPassword1:'',
            userPassword2:''
        }
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
    }

    _testEmail(text){
        if (EMAIL_REGEX.test(text)){
            
        }
    }


    _regist(){
        var username = this.state.userName
        var userEmail = this.state.userEmail
        var userPassword1 = this.state.userPassword1
        var userPassword2 = this.state.userPassword2
        if (EMAIL_REGEX.test(userEmail)){
            if(username.length >= 2 && username.length <= 12){
                if(userPassword2.length != 0 && userPassword1 === userPassword2){
                    var user = new AV.User()
                    user.setUsername(this.state.userName)
                    user.setPassword(this.state.userPassword2)
                    user.setEmail(this.state.userEmail)
                    user.signUp().then((loginedUser)=>{
                        var object = AV.Object.extend('UserTitle')
                        var newObject = new object()
                        newObject.set('owner',loginedUser)
                        newObject.save().then((result)=>{
                            console.log('registed')
                            this.props.navigation.state.params.success()
                            this.props.navigation.goBack()
                            
                        }).catch((error)=>{
                            this.refs.error.show('网络不好....')
                        })
                        
                    }, (error)=>{
                        switch (error.code){
                            case 125:
                            return this.refs.error.show('电子邮箱地址无效!!')
                            case 125:
                            return this.refs.error.show('无效的用户 Id，可能用户不存在无效')
                            case 139:
                            return this.refs.error.show('角色名称非法，角色名称只能以英文字母、数字或下划线组成。')
                            case 200:
                            return this.refs.error.show('没有提供用户名，或者用户名为空。')
                            case 201:
                            return this.refs.error.show('没有提供密码，或者密码为空。')
                            case 202:
                            return this.refs.error.show('用户名已经被占用。')
                            case 203:
                            return this.refs.error.show('电子邮箱地址已经被占用。')
                            case 204:
                            return this.refs.error.show('没有提供电子邮箱地址。')
                            case 205:
                            return this.refs.error.show('找不到电子邮箱地址对应的用户。')

                            default:
                            return this.refs.error.show('要不再试试?顺便告诉我这个数字'+`${error.code}`)

                        }
                    })
                }else{
                    this.refs.error.show('两次输入的密码不相等!!')
                }
            }else{
                this.refs.error.show('用户名2-12位')
            }
        }else{
            this.refs.error.show('邮箱不符合格式!!')
        }
        
    }

    render() {
        const {navigate} = this.props.navigation
        return (
            <View style={styles.wrap}>
                 <LinearGradient
                    style={{...StyleSheet.absoluteFillObject}}
                    colors={['#94A6C3','#E9CBCA']}
                    start={{x:1, y:0}}
                    end={{x:0, y:1}}
                >
                    <Icon 
                    name="ios-arrow-back"
                    color='#ffffff'
                    size={30}
                    style={{position:'absolute', top:base.realSize(30), left:base.realSize(15), backgroundColor:'rgba(0, 0, 0, 0)'}}
                    onPress={()=>{this.props.navigation.goBack()}}
                    />

                    <KeyboardAvoidingView
                    style={styles.container}
                    behavior='padding'
                    >

                        <Sae
                        ref={(t)=>{this._userName = t}}
                        label={'你的名字(2-12位)'}
                        iconClass={FontAwesomeIcon}
                        iconName={'pencil'}
                        iconColor={'white'}
                        style={styles.input}
                        labelStyle={{color: '#ffffff'}}
                        // TextInput props
                        autoCapitalize={'none'}
                        autoCorrect={false}
                        keyboardType={'email-address'}
                        onChangeText={(text)=>{this.setState({userName:text})}}
                        />   

                        <Sae
                        ref={(t)=>{this._userEmail = t}}
                        label={'你的邮箱'}
                        iconClass={FontAwesomeIcon}
                        iconName={'pencil'}
                        iconColor={'white'}
                        style={styles.input}
                        labelStyle={{color: '#ffffff'}}
                        // TextInput props
                        autoCapitalize={'none'}
                        autoCorrect={false}
                        keyboardType={'email-address'}
                        onChangeText={(text)=>{this.setState({userEmail:text})}}
                        />   

                        <Sae
                        label={'你的密码'}
                        iconClass={FontAwesomeIcon}
                        iconName={'pencil'}
                        iconColor={'white'}
                        style={styles.input}
                        labelStyle={{color: '#ffffff'}}
                        // TextInput props
                        autoCapitalize={'none'}
                        autoCorrect={false}
                        secureTextEntry={true}
                        onChangeText={(text)=>{this.setState({userPassword1:text})}}
                        /> 

                        <Sae
                        ref={(t)=>{this._userPassword = t}}
                        label={'再输一次'}
                        iconClass={FontAwesomeIcon}
                        iconName={'pencil'}
                        iconColor={'white'}
                        style={styles.input}
                        labelStyle={{color: '#ffffff'}}
                        // TextInput props
                        autoCapitalize={'none'}
                        autoCorrect={false}
                        secureTextEntry={true}
                        onChangeText={(text)=>{this.setState({userPassword2:text})}}
                        /> 

                        <Button
                        title={'点 我'}
                        buttonStyle={[styles.button,{backgroundColor: '#4db6ac'}]}
                        onPress={()=>{this._regist()}}
                        
                        />

                    </KeyboardAvoidingView>

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

                </LinearGradient>

            </View>
        )     
        
    }
}

const styles = StyleSheet.create({
    wrap: {
        flex: 1,
    },

    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: 'transparent',
        width: width,
        marginTop: base.realSize(60)
    },

    input: {
        height: base.realSize(40),
        width: width - base.realSize(30),
        marginBottom: base.realSize(15)
    },

    button: {
        height: base.realSize(40),
        width: width - base.realSize(30),
    }
})