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
    Image,
    ScrollView,
    Dimensions,
    Platform,
    AlertIOS,
    TouchableOpacity,
    TouchableHighlight,
    RefreshControl,
    SectionList,
    ImageBackground,
    Animated,
    FlatList,
    LayoutAnimation,
    NativeModules,
    Alert
} from 'react-native'
import base,{renderUserTitle} from '../base/base'

import Icon from 'react-native-vector-icons/Ionicons'
import {StackNavigator,TabNavigator} from 'react-navigation'
import {BlurView} from 'react-native-blur'
import AV from 'leancloud-storage'
import {Button} from 'react-native-elements'

import Toast,{DURATION} from 'react-native-easy-toast'
import Moment from 'moment'
import LinearGradient from 'react-native-linear-gradient'
import ImagePicker from 'react-native-image-crop-picker'


const navBarHeight = base.realSize(base.isIOS?64:44)

const imgDefaultY = base.deviceWidth * 3/5 - base.realSize(100)
const imgDefaultX = base.realSize(5)
const imgFinalX = base.deviceWidth/2 - base.realSize(20)
const imgFinalY = base.realSize(base.isIOS ? 27: 7)

let offsetTo = base.deviceWidth * 3/5 - base.realSize(base.isIOS ? 35+64 : 35+44)

const {UIManager} = NativeModules
UIManager.setLayoutAnimationEnabledExperimental && 
UIManager.setLayoutAnimationEnabledExperimental(true)
export default class UserPage extends Component {
    static navigationOptions={
        title: 'user',
        header: null,
      
    }
    
    constructor(props){
        super(props)
        this.state = {
            isRefreshing: false,
            data: [],
            offset: new Animated.Value(0),
            isLogedin: false,
            userInfo:'',
            arrLength:0
            
            
        }

    }
    

    componentWillMount(){
        this.headRefresh()

    }

    componentDidMount(){
    
        
    }

    queryData(currentUser,isHead){
        // console.log('queryData')
        // AV.User.currentAsync().then((currentUser)=>{
        //     if (currentUser != null){
    
        
        this.setState({isRefreshing: isHead})

        var arr = isHead?[]:this.state.data
        var query = new AV.Query('PostNews')
        query.addDescending('moment')
        // console.log(this.state.arrLength)
        // query.limit(20)
        // query.skip(isHead?0:this.state.arrLength)
        query.include('owner')
        query.equalTo('owner',currentUser)
        query.find().then((results)=>{
            var newArr = []
            if(isHead){
                this.setState({isRefreshing: false})
            }
            if (results.length==0){
                if(isHead){
                    this.setState({data:arr})
                }
            }else{
                results.map((item,i)=>{
                    var mom = Moment(item.get('moment')).format('YYYY-MM-DD')
                    var dict={
                        object:item,
                        title:item.get('title'),
                        detail:item.get('detail'),
                        images:item.get('images'),
                        type:item.get('type'),
                        owner:item.get('owner'),
                        loveNum:item.get('loveNumber'),
                        dissNum:item.get('dissNumber'),
                        moment:mom
                        
                    }
                    newArr.push(dict)
                    if (newArr.length == results.length){
                        arr = arr.concat(newArr)
                        // this.setState({arrLength:arr.length})
                        this._classifyData(arr)
                        
                    }
                })
            }
        }).catch((error)=>{
            console.error(error)
            this.refs.error.show('网络似乎出现了一点问题....')
            this.setState({isRefreshing: false})
        })
    }

    _classifyData=(data)=>{
        var outPut = []
        var flag = 0
        
        for (var i=0; i<data.length; i++){
            var year = Moment(data[i].moment).format('YYYY')
            var value = {
                object:data[i].object,
                title:data[i].title,
                detail:data[i].detail,
                images:data[i].images,
                type:data[i].type,
                owner:data[i].owner,
                loveNum:data[i].loveNum,
                dissNum:data[i].dissNum,
                moment:data[i].moment
            }
            var index = ''
            for(var j=0; j<outPut.length; j++){
                if(outPut[j].year == year){
                    flag = 1
                    index = j
                    break
                }
            }

            if (flag == 1){
                
                outPut[index].data.push(value)
                flag = 0
            }else if (flag == 0){
                var item = {
                    year: '',
                    data: []
                }

                item.year = year
                item.data.push(value)
                outPut.push(item)
            }
        }
        this.setState({data:outPut})
    }
    
    //refresh

    headRefresh(){
        // this.setState({isRefresh:true})
        AV.User.currentAsync().then((user)=>{
           if (user == null){
                var userInfo = {
                    username:'登录开启更多功能哦~~',
                    avatar:require('../images/avatar.jpg'),
                    title:null,
                    coin:11111
                }
                this.setState({userInfo:userInfo,data:[]})
           }else{
                var query = new AV.Query('_User')
                query.get(user.getObjectId()).then((result)=>{
                    var userInfo = {
                        username:result.get('username'),
                        avatar:{uri:result.get('avatar')},
                        title:result.get('title'),
                        coin:result.get('userCoin')
                    }
                    this.setState({userInfo:userInfo})
                })
                this.queryData(user,true)
            }
        }),function(error){
            var userInfo = {
                username:'登录开启更多功能哦~~',
                avatar:require('../images/avatar.jpg'),
                title:null,
                coin:11111
            }
            this.setState({userInfo:userInfo,data:[]})
            // this.setState({isRefresh:false})
            console.log(error)

        }
        
    }

    _footerRefresh(){
        // console.log('footer')
        // this.queryData(false)

        // AV.User.currentAsync().then((user)=>{
        //     if (user != null){
        //         console.log('footer')
        //         this.queryData(user,false)
        //     }
        // })
    }


    //render component

    _renderSectionHeader=(info)=>{
        return(
            <View style={{alignItems:'center',justifyContent:'center',height:60,backgroundColor:'#fafafa'}}>
            <Text style={styles.sectionText}>{info.section.year}</Text>
            </View>
        )
    }

    _renderSeparartor=()=>{
        return(
            <LinearGradient
            style={{width:base.deviceWidth -20,alignSelf:'center',height:3}}
            colors={['#00bcd4','#ef9a9a']}
            start={{x:0, y:1}}
            end={{x:1, y:1}}
            />
        )
    }


    _renderItem=({item,index})=>{
        var mm = Moment(item.moment).format('MMM')
        var dd = Moment(item.moment).format('Do')
        return(
            <TouchableOpacity
                onPress={()=>this._onPressItem(item,index)}
            >
                <View style={styles.sectionItemWrapper}>
                    <View style={styles.dateContainer}>
                        <Text style={styles.mm}>{mm}</Text>
                        <Text style={styles.dd}>{dd}</Text>
                    </View>


                    <View style={styles.titleAndDetailContainer}>
                        <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
                        <Text style={styles.detail} numberOfLines={2}>{item.detail}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }


    _renderHeader=()=>{
        
        return(
            <View style={{width: base.deviceWidth, height:base.deviceWidth*3/5-navBarHeight,flex:1}}>
                <View style={styles.imageBK}>
                    <Image source={this.state.userInfo.avatar} style={[styles.imageBK,{resizeMode:'cover'}]}/>
                    <BlurView style={[styles.imageBK]} blurType='light' blurAmount={2}/>
                </View>
                    

                <View style={styles.userInfoContainer}>
                    <TouchableOpacity
                        onPress={this._onPressAvatar}
                    >
                        <Image 
                            source={this.state.userInfo.avatar} 
                            style={[styles.avatar]}
                        />
                    </TouchableOpacity>
                    <View style={styles.userTextContainer}>
                        <Text style={styles.coin}>{this.state.userInfo.coin}</Text>
                    </View>
                </View>

            </View>
        )
    }

    _renderEmpty=()=>{
        return (
            <View style={{flex: 1,alignItems: 'center',justifyContent:'center'}}>

                <Image source={require('../images/empty.jpg')} style={{width:base.deviceWidth,height:base.deviceWidth}}/>
            </View>
        )
    }

    _onPressItem=(item,index) => {
        this.props.navigation.navigate('UserToDetail',{object:item})
    }


    _onPressAvatar=()=>{
        AV.User.currentAsync().then((user)=>{
            if (user==null){
                this.props.navigation.navigate('Login',{refresh:()=>
                    {this.headRefresh()
                    this.refs.toast.show('登录成功!!')}
                })
            }else{
                Alert.alert('修改头像?','我们将打开你的相册',[
                    {text:'点错了', onPress:()=>{},style:'cancel'},
                    {text:'是的', onPress:()=>this._chooseAvatar(user)}
                ])
            }
        })
    }

    _chooseAvatar=(user)=>{
        ImagePicker.openPicker({
            width: 400,
            height: 400,
            cropping: true
          }).then(image => {
            var newAvatar = {uri:image.path, width:image.width, height:image.height}
            var file = new AV.File(user.getUsername()+'.jpg',{blob:newAvatar})
            file.save().then((result)=>{
                user.set('avatar',result.url())
                user.save().then((user)=>{
                    var userInfo = this.state.userInfo
                    userInfo.avatar = {uri:user.get('avatar')}
                    this.setState({userInfo:userInfo})
                    this.refs.toast.show('上传成功')
                }).catch((error)=>{
                    console.log(error)
                this.refs.error.show('网络不太好...上传失败')
                })
            }).catch((error)=>{
                console.log(error)
                this.refs.error.show('网络不太好...上传失败')
            })

          })
    }

    render() {
        var transY = this.state.offset.interpolate({
            inputRange:[0,base.deviceWidth*3/5-base.realSize(99), base.deviceWidth],
            outputRange:[base.deviceWidth*3/5 - base.realSize(99), base.realSize(base.isIOS?23:3), base.realSize(base.isIOS?23:3)]
        })

        var transX = this.state.offset.interpolate({
            inputRange:[-100,0,base.deviceWidth*3/5-base.realSize(99), base.deviceWidth],
            outputRange:[base.realSize(80),base.realSize(80), base.deviceWidth/3, base.deviceWidth/3]
        })

        var op = this.state.offset.interpolate({
            inputRange:[-100,0,base.deviceWidth*3/5-base.realSize(99), base.deviceWidth],
            outputRange:[0,0, 1, 1]
        })

        var littleOp = this.state.offset.interpolate({
            inputRange:[-100,0,base.deviceWidth*3/5-base.realSize(99), base.deviceWidth*3/5-navBarHeight,base.deviceWidth],
            outputRange:[0,0, 0, 1,1]
        })

        return (
            <View style={{flex: 1,backgroundColor: "white"}}>



                <SectionList
                    style = {{flex: 1,paddingTop: navBarHeight}}
                   
                    ListHeaderComponent={this._renderHeader}
                    ListEmptyComponent={this._renderEmpty}
                    ItemSeparatorComponent={this._renderSeparartor}
                    sections={this.state.data}
                    renderSectionHeader={this._renderSectionHeader}
                    renderItem={this._renderItem}
                    onRefresh={()=>this.headRefresh()}
                    refreshing={this.state.isRefreshing}
                    scrollEventThrottle={16}
                    onEndReached={()=>this._footerRefresh()}
                    onEndReachedThreshold={0.1}
                    stickySectionHeadersEnabled={true}
                    keyExtractor={(item,index)=>index}
                    onScroll={Animated.event(
                        [{nativeEvent:{contentOffset:{y: this.state.offset}}}]
                    )}
                    
                />
                
                <Animated.View 
                    style={[
                        styles.navBar,
                    {
                        opacity:op,
                        
                    }]}
                >

                </Animated.View>

                <Animated.View style={{flexDirection:'row',alignItems:'center',position:'absolute',
                                transform:[
                                    {translateY:transY},
                                    {translateX:transX}
                                ]
                }}>
                    <Animated.Image source={this.state.userInfo.avatar}
                        style={{width: base.realSize(30),height: base.realSize(30),borderRadius:base.realSize(15),marginRight: base.realSize(5),opacity:littleOp}}
                    />
                    <Text style={styles.name}>{this.state.userInfo.username}</Text>
                    {renderUserTitle(this.state.userInfo.title)}
                </Animated.View>
           
                <Icon 
                    name="ios-cog"
                    color='#eeeeee'
                    size={30}
                    style={{position:'absolute', top:base.realSize(base.isIOS?23:3), right:base.realSize(15), backgroundColor:'transparent'}}
                    onPress={()=>{this.props.navigation.navigate('Setting',{refresh:()=>{this.headRefresh()}})}}
                />

                <Toast 
                    ref='toast'
                    position='center'
                />
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

    navBar:{
        position:'absolute',
        backgroundColor:base.themeColor,
        left:0,
        right:0,
        top:0,
        height:navBarHeight,
    },

    avatar:{
        
        width:base.realSize(100),
        height:base.realSize(100),
    },

    imageBK:{
        position: 'absolute',
        top: -navBarHeight/2,
        
        width:base.deviceWidth, 
        height: base.deviceWidth*3/5 - base.realSize(35), 
    },

    userInfoContainer:{
        position:'absolute',
        bottom: 0,
        left: base.realSize(5),
        flexDirection: 'row'
    },

    userTextContainer:{
        
        height: base.realSize(100), 
        alignItems:'flex-end',
        marginLeft: base.realSize(10),
        paddingBottom: base.realSize(10)
    },

    name:{
        color:base.titleColor, 
        fontSize:base.realSize(17),
        backgroundColor:'transparent',
        letterSpacing:base.realSize(0.2),
        
    },

    coin:{
        color: '#e57373',
        fontSize: base.realSize(15),
        backgroundColor:'transparent',
        marginTop: base.realSize(70)
    },

    sectionText:{
        color: base.themeColor,
        letterSpacing: 1,
        textAlign:'center',
        fontStyle: 'italic', 
        width: base.deviceWidth,
        fontSize:20
    },

    sectionItemWrapper:{
        flexDirection:'row',
        marginLeft:base.realSize(10),
        width:base.deviceWidth,
        height:base.realSize(100)
    },

    dateContainer:{
        flexDirection:'column',
        paddingTop:base.realSize(10)
    },

    mm:{
        fontSize: base.realSize(23), 
        fontWeight: 'bold', 
        letterSpacing: 1,
        backgroundColor: 'transparent',
    },

    dd:{
        fontSize: base.realSize(17),
        backgroundColor:'transparent',
        color:base.titleColor,
        letterSpacing:0.5
    },

    titleAndDetailContainer:{
        marginLeft:base.realSize(10),
        flexDirection:'column',
        paddingVertical:base.realSize(25)
    },

    title:{
        fontSize: base.realSize(13), 
        fontWeight: 'bold', 
        letterSpacing: 0.5,
        backgroundColor: 'transparent',
        color: base.titleColor
        
    },

    detail:{
        marginTop: base.realSize(8), 
        fontSize: base.realSize(12), 
        fontStyle: 'italic',
        backgroundColor: 'transparent',
        color: base.subTitleColor
    },
    
})