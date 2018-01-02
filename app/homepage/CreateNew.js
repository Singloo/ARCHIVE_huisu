/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
'use strict';
import React, {
    Component,
    PropTypes,
} from 'react'

import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    Platform,
    ImageBackground,
    Alert,
    FlatList,
    Picker,
    TextInput,
    Keyboard,
    Animated,
    ActivityIndicator,
    BackHandler
} from 'react-native'

import base from '../base/base'
import Icon from 'react-native-vector-icons/Ionicons'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import {BlurView, VibrancyView} from 'react-native-blur'
import {Button} from 'react-native-elements'
import { Makiko ,Hoshi} from 'react-native-textinput-effects'
import DatePicker from 'react-native-datepicker'
import Moment from 'moment'
import ModalDropdown from 'react-native-modal-dropdown'
import ImagePicker from 'react-native-image-crop-picker'
import AV from 'leancloud-storage'
import {StackNavigator,TabNavigator} from 'react-navigation'
import Toast,{DURATION} from 'react-native-easy-toast'
import ProgressHUD from '../component/ProgressHUD'


export default class CreateNew extends Component{
    static navigationOptions=({navigation})=>({
        title:'记 录',
        tabBarVisible: false,
        headerRight:<Button
                        title='确 定'
                        buttonStyle={{backgroundColor: 'transparent'}}
                        textStyle={{color:base.titleColor}}
                        onPress={()=>{
                            navigation.state.params.confirmPressed()
                        }}
                    />,
    })

    constructor(props){
        super(props)
        this.state = {
            date:Moment().format("YYYY-MM-DD"),
            selectedType: '记事',
            title:'',
            detail:'',
            data:[],
            upLoad:[],
            isLoading: false
        }

        this.keyboardHeight = new Animated.Value(0)
    }

    keyboardWillShow = (event) => {
        Animated.timing(this.keyboardHeight,{
            duration: event.duration,
            toValue: event.endCoordinates.height,
        }).start()
       
    }

    keyboardWillHide = (event) => { 
        Animated.timing(this.keyboardHeight,{
            duration: event.duration,
            toValue: 0,
        }).start()
        
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
        this.props.navigation.setParams({confirmPressed:this._confirmPressed})
    }

    componentWillUnmount(){
        this.keyboardWillShowSub.remove()
        this.keyboardWillHideSub.remove()
        // BackHandler.removeEventListener('hardwareBackPress', function(){
        //     this.props.navigation.goBack()
        //     return true
        // })
    }

    //chooseimage
    _chooseImage(){
        var arr = []
        ImagePicker.openPicker({
            multiple: true,
          }).then(images => {
            this.setState({data:images})

            images.map((item,i)=>{
                var image = {uri:item.path, width:item.width, height:item.height}
                arr.push(image)
                if (arr.length == images.length){
                    this.setState({upLoad:arr})
                }
            })
          })
    }

    _deleteImage(index){
        let datasource = this.state.data
        datasource.splice(index,1)
        this.setState({data:datasource})

        let upload = this.state.upLoad
        upload.splice(index,1)
        this.setState({upLoad:upload})
        
    }

    //post
    _postNews=(currentUser,arr)=>{
    
        var object = AV.Object.extend('PostNews')
        var newObjc = new object()
        var date = new Date(this.state.date)
        currentUser.increment('userCoin',5)
        currentUser.save()
        newObjc.set('title', this.state.title)
        newObjc.set('type',this.state.selectedType)
        newObjc.set('detail',this.state.detail)
        newObjc.set('owner',currentUser)
        newObjc.set('images',arr)
        newObjc.set('moment',date)
        newObjc.save().then((object)=>{
            this.setState({isLoading:false})
            this.props.navigation.goBack(null)
            this.props.navigation.state.params.showSuccess()
        }).catch((error)=>{
            this.setState({isLoading:false})
            console.log(error)
            this.refs.error.show('网络出现了一点问题...3')
            
        })
    }
    
    _confirmPressed=()=>{
        this.setState({isLoading:true})
        AV.User.currentAsync().then((currentUser)=>{
            if(currentUser == null){
                this.setState({isLoading:false})
                this.refs.error.show('这个行为需要登录账号的...')
            }else{
                if (this.state.title.length != 0){
                    var arr = new Array()
                    if (this.state.upLoad.length != 0){
                        this.state.upLoad.map((item,i)=>{
                            var file = new AV.File(currentUser.getUsername()+'.jpg',{blob:item})
                            file.save().then((result)=>{
                                arr.push(result.url())
                                //upload
                                if (arr.length == this.state.upLoad.length){
                                    this._postNews(currentUser,arr)
                                }
                            }).catch((error)=>{
                                console.log(error)
                                this.setState({isLoading:false})
                                this.refs.error.show('网络出现了一点问题...1')
                            })
            
                        })
                    }else{
                        this._postNews(currentUser,arr)

                    }
                }else{
                    this.setState({isLoading:false})
                    this.refs.error.show('标题可不能为空!!!')
                }
            }
           
        }),function(error){
            console.log(error)
            this.setState({isLoading:false})
            this.refs.error.show('网络不太好..')
        }

    }
    _renderListItem= ({item,index}) => {
        return (
            <View style={{width: base.realSize(70), height: base.realSize(70), alignItems:'center',justifyContent: 'center'}}>
                <Image source={{uri:item.path}} style={{width: base.realSize(69), height:base.realSize(69)}}/>
                <Icon
                    name='ios-close'
                    size={base.realSize(20)}
                    color='black'
                    style={{position:'absolute',top:base.realSize(2),right:base.realSize(4),backgroundColor:'transparent'}}
                    onPress={()=>this._deleteImage(index)}
                />
            </View>
        )
    }

    render() {

        return(
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Hoshi
                        ref={(c)=>this.title=c}
                        style={{width: base.deviceWidth}}
                        inputStyle={{color:base.titleColor,fontSize:base.realSize(17)}}
                        label={'这里输入标题...'}
                        borderColor={base.themeColor}
                        backgroundColor={'transparent'}
                        onChangeText={(title)=>{this.setState({title: title})}}
                        maxLength={30}  
                        
                    />
                    <View style={styles.infoContainer}>
                        <Text style={{color:base.subTitleColor,textAlign:'center',marginLeft:base.realSize(10),textAlign:'center',letterSpacing:1}}>发生于</Text>
                        <DatePicker
                            style={{width: base.realSize(120)}}
                            date={this.state.date}
                            mode="date"
                            placeholder="select date"
                            format="YYYY-MM-DD"
                            showIcon={false}
                            confirmBtnText="确认"
                            cancelBtnText="取消"
                            customStyles={{
                            dateInput: {
                                borderColor: 'transparent'
                            }
                            // ... You can check the source to find the other keys.
                            }}
                            onDateChange={(date) => {this.setState({date: date})}}
                        />
                        <Text style={{color:base.subTitleColor,textAlign:'center',marginLeft:base.realSize(10),textAlign:'center',letterSpacing:1}}>事件类型:</Text>
                        <ModalDropdown
                            defaultIndex={0}
                            defaultValue={'记事'}
                            options={['记事','见闻','谣言']}
                            onSelect={(index,value)=>{this.setState({selectedType:value})}}
                            textStyle={{fontSize:15,textAlign: 'center',color:'white'}}
                            style={{width:base.realSize(50),backgroundColor:'#e57373',padding:base.realSize(5)}}
                            dropdownStyle={{width: base.realSize(50),height: base.realSize(150),backgroundColor:'transparent',borderColor:'transparent',alignSelf:'center'}}
                            dropdownTextStyle={{textAlign:'center', fontSize:16,}}
                        />
                    </View>
                </View>
                
                <View style={styles.imagePickerContainer}>
                    <View style={{borderWidth:0.5,borderColor:base.subTitleColor,marginLeft: base.realSize(2),width: base.realSize(70), height: base.realSize(70), alignItems:'center',justifyContent:'center'}}>
                        <Icon
                            name="ios-add"
                            size={base.realSize(70)}
                            color='grey'
                            style={{backgroundColor:'transparent'}}
                            onPress={()=>this._chooseImage()}
                        />
                    </View>

                    <FlatList
                        style={styles.list}
                        data={this.state.data}
                        renderItem={this._renderListItem}
                        ListEmptyComponent={()=>{return null}}
                        keyExtractor={(item, index) => index}
                        horizontal={true}
                    />
                                         
                </View>

                <Animated.View style={{flex:1,paddingBottom:this.keyboardHeight}}>
                    <TextInput
                        ref={(c)=>this.detail=c}
                        style={{width:base.deviceWidth,fontSize:base.realSize(15),flex:1,padding:base.realSize(10),color:base.subTitleColor}}
                        onChangeText={(detail)=>{this.setState({detail: detail})}}
                        placeholder={'   写点什么吧~~'}
                        placeholderTextColor='#9e9e9e'
                        multiline={true}  
                        
                            
                    />
                </Animated.View>

                <ProgressHUD
                    isLoading={this.state.isLoading}
                    closeModal={()=>{this.setState({isLoading:false})}}
                />                  
                
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
    container:{
        flex:1,
        flexDirection: 'column',
        backgroundColor:'#f5f5f5'
    },

    titleContainer:{
        flexDirection: 'column'
    },

    infoContainer:{
        alignItems:'center',
        flexDirection: 'row'
    },

    imagePickerContainer:{
        flexDirection:'row',
        alignItems:'center'
    },

    list:{
        marginLeft: base.realSize(2),
        height: base.realSize(70),
        width: base.deviceWidth -base.realSize(76)
    }
})