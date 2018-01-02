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
    FlatList,
    Animated,
    Image,
    TextInput,
    Keyboard,
    TouchableOpacity,
    BackHandler
} from 'react-native'


import base,{renderUserTitle} from '../base/base'
import {BlurView, VibrancyView} from 'react-native-blur'
import {Button} from 'react-native-elements'
import Toast,{DURATION} from 'react-native-easy-toast'
import AV from 'leancloud-storage'
import Moment from 'moment'



export default class CommentPage extends Component {
    static navigationOptions={
        title:'评 论',
        tabBarVisible: false,
    }

    constructor(props){
        super(props)
        this.state={
            commentData:[],
            inputText:'',
            passedObject:''
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

        var objc = this.props.navigation.state.params.object
        this.setState({passedObject:objc})
        this._queryData(true)

        // BackHandler.addEventListener('hardwareBackPress', function(){
        //     this.props.navigation.goBack()
        //     return true
        // })
    }

    componentDidMount() {
        
    }

    componentWillUnmount() {
        this.keyboardWillShowSub.remove()
        this.keyboardWillHideSub.remove()

        // BackHandler.removeEventListener('hardwareBackPress', function(){
        //     this.props.navigation.goBack()
        //     return true
        // })
    }

    // query data
    _queryData=(isHead)=>{
        var objc = this.props.navigation.state.params.object.object

        var arr = isHead?[]:this.state.commentData

        var query = new AV.Query('Comments')
        query.equalTo('news',objc)
        query.include('owner')
        query.limit(20)
        query.skip(arr.length)
        query.addAscending('createdAt')
        query.find().then((results)=>{
            var newArr = []
            if (results.length!=0){
                results.map((item,i)=>{
                    var createdAt = Moment(item.get('createdAt')).format('MMMM Do YYYY, h:mm:ss')
                    var user = item.get('owner')
                    var username = user.getUsername()
                    var avatar = user.get('avatar')
                    var dict = {
                        user:user,
                        content:item.get('content'),
                        time:createdAt,
                        username:username,
                        avatar:avatar
                    }
                    newArr.push(dict)
                    if (newArr.length == results.length){
                        arr = arr.concat(newArr)
                        this.setState({commentData:arr})
                    }
                })
            }
        }).catch((error)=>{
            this.refs.error.show('啊,网络不好....')
        })
    }

    //render component
    _renderItem=({item,index})=>{
        return(
            <View style={{padding:base.realSize(5),backgroundColor:'white'}}>
                <View style={{flexDirection:'row',padding:base.realSize(5),width:base.deviceWidth,alignItems:'center',justifyContent:'space-between'}}>
                    <View style={{alignItems:'center',flexDirection:'row'}}>
                        <TouchableOpacity onPress={()=>this._onPressAvatar(item.user)}>
                            <Image source={{uri:item.avatar}} style={styles.avatar}/>
                        </TouchableOpacity>
                        <View style={{flexDirection:'column',marginLeft:base.realSize(10)}}>
                            <View style={{flexDirection:'row',alignContent:'space-between'}}>
                                <Text style={styles.username}>{item.username}</Text>
                                {renderUserTitle()}
                            </View>
                            <Text style={{fontSize:base.realSize(10)}}>{item.time}</Text>
                        </View>
                    </View>
                    <Text style={{fontSize: base.realSize(13),letterSpacing:0.5, color:base.subTitleColor,marginRight:base.realSize(5)}}>{`${index+1}楼`}</Text>
                </View>
                <Text style={styles.comment}>{item.content}</Text>
            </View>
        )
    }

    _renderEmpty=({item,index})=>{
        return(
            <View style={{justifyContent:'center',alignItems:'center'}}>
                <Text style={{letterSpacing:1,color:base.titleColor,textAlign:'center'}}>{'快来做沙发~~~(拍拍)'}</Text>
            </View>
        )
    }

    _renderSeparator=()=>{
        return(
            <View style={{backgroundColor: base.subTitleColor, width:base.deviceWidth-30,height:1,paddingHorizontal:base.realSize(15),alignSelf:'center'}}/>
        )
    }

    //press on avatar
    _onPressAvatar=(user)=>{
        this.props.navigation.navigate('Stranger',{owner:user})
    }
    
    //upload comment
    _pushComment=()=>{
        var news = this.props.navigation.state.params.object.object
        AV.User.currentAsync().then((user)=>{
            if (user == null){
                this.refs.error.show('zhe这个行为需要登录账号的!!!')
            }else{
                if (this.state.inputText.length == 0){
                    this.refs.error.show('评论不能为空...')
                }else{
                    var object = AV.Object.extend('Comments')
                    var newObjc = new object()
                    newObjc.set('news',news)
                    newObjc.set('owner',user)
                    newObjc.set('content',this.state.inputText)
                    newObjc.save().then((result)=>{
                        var data = this.state.commentData
                        var dict = {
                            user:user,
                            content:this.state.inputText,
                            time:Moment().format('MMMM Do YYYY, h:mm:ss'),
                            username:user.getUsername(),
                            avatar:user.get('avatar')
                        }
                        data.push(dict)
                        this.setState({commentData:data})
                        this.inputBar.clear()
                        Keyboard.dismiss()
                        this.refs.toast.show('评论成功~')
                        
                    }).catch((error)=>{
                        this.refs.error.show('网络不太好....')
                    })
                }
            }
        }).catch((error)=>{
            this.refs.error.show('网络不太好')
        })
    
    }

    _footerRefresh(){
        this._queryData(false)
    }

    render(){
        return(
            <View style={{flex:1}}>
                <FlatList
                    style={{flex:1}}
                    renderItem={this._renderItem}
                    ListEmptyComponent={this._renderEmpty}
                    // ItemSeparatorComponent={this._renderSeparator}
                    data={this.state.commentData}
                    keyExtractor={(item, index) => index}
                    onEndReached={()=>this._footerRefresh()}
                    onEndReachedThreshold={0.1}
                />

                <Animated.View style={[styles.commentBar,{paddingBottom:this.keyboardHeight}]}>
                    <TextInput
                        ref={(r)=>this.inputBar = r}
                        style={styles.input}
                        onChangeText={(content)=>{this.setState({inputText: content})}}
                        multiline={true}  
                        placeholder={'不留下点什么吗?'}
                        placeholderTextColor='#9e9e9e'
                        underlineColorAndroid="transparent"
                        maxLength={256}
                        
                    />
                    <TouchableOpacity
                        onPress={this._pushComment}
                        style={{backgroundColor:'transparent',width:base.realSize(50),height:base.realSize(30),marginTop:base.realSize(6)}}
                    >
                        <Text style={{color:base.themeColor,fontSize:base.realSize(16),textAlign:'center'}}>{'评 论'}</Text>
                    </TouchableOpacity>
                </Animated.View>

                <Toast ref='toast' position='center'/>
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
    avatar:{
        width:base.realSize(40),
        height:base.realSize(40),
        borderRadius:base.realSize(20)
    },

    username:{
        
        fontSize:base.realSize(13),

    },

    comment:{
        fontSize:base.realSize(15),
        paddingLeft: base.realSize(50)
    },

    commentBar:{
        alignItems:'flex-start',
        padding:base.realSize(8),
        width:base.deviceWidth,
        flexDirection:'row',
        backgroundColor:'#eeeeee'
    },

    input:{
        width:base.deviceWidth - base.realSize(56),
        padding:base.realSize(5),
        borderRadius:base.realSize(6),
        borderWidth: 0.5,
        borderColor:'#bdbdbd',
        marginBottom:base.realSize(8),
        textAlignVertical:'top',
        backgroundColor:'white'
        
    }
    
})