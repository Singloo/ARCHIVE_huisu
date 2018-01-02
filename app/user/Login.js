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
    Animated,
    Easing,
    KeyboardAvoidingView,
    Dimensions,
    Keyboard,
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



let {width,height} = Dimensions.get('window')
let IMAGE_HEIGHT = width/2
let IMAGE_HEIGHT_SMALL = width/5
export default class Login extends Component {

    static navigationOptions = {
        tabBarVisible: false
    }
    constructor(props){
        super(props)
        this.state = {
            username:'',
            password:'',
            rotateValue: new Animated.Value(0),
        }
        this.rotateV = this.state.rotateValue.interpolate({
            inputRange: [0,1],
            outputRange: ['0deg', '360deg']
        })
        this.keyboardHeight = new Animated.Value(base.realSize(100))
        this.imageHeight = new Animated.Value(IMAGE_HEIGHT)
    }
   

    componentWillMount(){
        this.keyboardWillShowSub = Keyboard.addListener('keyboardWillShow',this.keyboardWillShow)
        this.keyboardWillHideSub = Keyboard.addListener('keyboardWillHide',this.keyboardWillHide)

        // BackHandler.addEventListener('hardwareBackPress', function(){
        //     this.props.navigation.goBack()
        //     return true
        // })
    }

    
    componentDidMount(){
        this._logoAnimation()
    }

    componentWillUnmount(){
        this.keyboardWillShowSub.remove()
        this.keyboardWillHideSub.remove()

        // BackHandler.removeEventListener('hardwareBackPress', function(){
        //     this.props.navigation.goBack()
        //     return true
        // })
    }

    _logoAnimation(){
        Animated.timing(this.state.rotateValue,{
            toValue: 1,
            duration: 15000,
            easing: Easing.linear
        }).start(() => this._logoAnimation())
    } 

    keyboardWillShow = (event) => {
        Animated.parallel([
            Animated.timing(this.keyboardHeight,{
                duration: event.duration,
                toValue: event.endCoordinates.height,
            }),
            Animated.timing(this.imageHeight,{
                duration: event.duration,
                toValue: IMAGE_HEIGHT_SMALL
            })
        ]).start()
    }

    keyboardWillHide = (event) => {
        Animated.parallel([
            Animated.timing(this.keyboardHeight,{
                duration: event.duration,
                toValue: base.realSize(100),
            }),
            Animated.timing(this.imageHeight,{
                duration: event.duration,
                toValue: IMAGE_HEIGHT
            })
        ]).start()
    }

    _login(username,password){
        AV.User.logIn(username,password).then((user)=>{
            if(user != null){
                this.props.navigation.state.params.refresh()
                this.props.navigation.goBack()
            }else{
                this.refs.error.show('网络不是太好...请稍后尝试')
            }

        }).catch((error)=>{
            switch (error.code){
                case 210:
                return this.refs.error.show('用户名和密码不匹配。')
                case 211:
                return this.refs.error.show('找不到用户。')
                case 216:
                return this.refs.error.show('未验证的邮箱地址。')
                case 219:
                return this.refs.error.show('登录失败次数超过限制，请稍候再试，或者通过忘记密码重设密码')
                default:
                return this.refs.error.show('你登录失败了,解决不了告诉我这个数字'+`${error.code}`)
            }
        })
    }   

    render() {
        
        return (
           

            <View style={styles.wrap}>


                <LinearGradient
                    style={styles.gradient}
                    colors={['#E9CBCA','#94A6C3']}
                    start={{x:1, y:0}}
                    end={{x:0, y:1}}
                >
                    <Icon 
                    name="ios-arrow-back"
                    color='#ffffff'
                    size={30}
                    style={{position:'absolute', top:base.realSize(30), left:base.realSize(15), backgroundColor:'rgba(0, 0, 0, 0)'}}
                    onPress={()=>{this.props.navigation.goBack(null)}}
                    />

                    <Animated.View
                    style={[styles.container,{paddingBottom: this.keyboardHeight}]}
                    >
                        <Animated.Image 
                        source={require('../images/logo.png')}
                        style={[styles.logo,{transform: [{rotateZ: this.rotateV}],height: this.imageHeight, width: this.imageHeight, borderRadius: this.imageHeight/2}]}
                        />


                         <Sae
                        label={'用户名'}
                        iconClass={FontAwesomeIcon}
                        iconName={'pencil'}
                        iconColor={'white'}
                        style={styles.input}
                        labelStyle={{color: '#ffffff'}}
                        // TextInput props
                        autoCapitalize={'none'}
                        autoCorrect={false}
                        keyboardType={'email-address'}
                        onChangeText={(text)=>{this.setState({username:text})}}
                        />    
                        
                        <Sae
                        label={'密码'}
                        iconClass={FontAwesomeIcon}
                        iconName={'pencil'}
                        iconColor={'white'}
                        style={styles.input}
                        labelStyle={{color: '#ffffff'}}
                        // TextInput props
                        autoCapitalize={'none'}
                        autoCorrect={false}
                        secureTextEntry={true}
                        onChangeText={(text)=>{this.setState({password:text})}}
                        /> 

                        <Button
                        title={'登 录'}
                        buttonStyle={[styles.button,{backgroundColor: '#4db6ac'}]}
                        onPress={()=>{this._login(this.state.username,this.state.password)}}
                        
                        />

                        <Button
                        title='没 有 账 号? 这 怎 么 行'
                        buttonStyle={[styles.button,{backgroundColor: '#ef5350'}]}
                        onPress={()=>{this.props.navigation.navigate('Regist',{success:(username,password)=>this._login(username,password)})}}
                        />
                    </Animated.View>


                </LinearGradient>

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
    wrap:{
        flex: 1,
    },

    gradient:{
        ...StyleSheet.absoluteFillObject
    },

    logo:{
        height: IMAGE_HEIGHT,
        width: IMAGE_HEIGHT,
        borderRadius: IMAGE_HEIGHT/2,
        marginBottom: base.realSize(30)
    },
    
    container:{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: width,
        marginTop: base.realSize(60),
        


    },

    input:{
        height: base.realSize(40),
        width: width - base.realSize(30),
        marginBottom: base.realSize(20)
    },

    button:{
        height: base.realSize(40),
        width: width - base.realSize(30),
        marginBottom: base.realSize(20)
    }
})