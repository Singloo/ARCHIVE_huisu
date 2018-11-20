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
    FlatList
} from 'react-native'

import base,{renderUserTitle} from '../base/base'
import Icon from 'react-native-vector-icons/Ionicons'
import {BlurView, VibrancyView} from 'react-native-blur'
import Moment from 'moment'
import AV from 'leancloud-storage'
import LinearGradient from 'react-native-linear-gradient'

export default class StrangerPage extends Component{
    static navigationOptions={
        tabBarVisible: false,
    }

    constructor(props){
        super(props)
        this.state = {
            data: {},

        }
    }

    componentWillMount(){
        this._queryData(true)
    }

    _queryData(isHead){
        var query = new AV.Query('PostNews')
        var arr = isHead?[]:this.state.data
        var owner = this.props.navigation.state.params.owner

        query.equalTo('owner',owner)
        query.addDescending('createdAt')
        query.include('owner')
        query.skip(arr.length)
        query.limit(20)
        query.find().then((results)=>{
                var newArr=[]
            results.map((item,i)=>{
            
                if (results.length == 0){
                    if (isHead){
                        this.setState({data:arr})
                    }
                }else{
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
                        this.setState({data:arr}) 
                    }
                }
            })
        })
    }

    _footerRefresh(){
        console.log('strangerFooter')
        this._queryData(false)
    }
    //renderComponent
    _renderHeader=()=>{
        var owner = this.props.navigation.state.params.owner
        return(
            <View style={{width:base.deviceWidth,height:base.realSize(150)}}>
                <Image source={{uri:owner.get('avatar')}} style={{width:base.deviceWidth,height:base.realSize(150)}}/>
                <BlurView style={styles.blurView} blurType='dark'/>
                    <Image source={{uri:owner.get('avatar')}} style={{width:base.realSize(50),height:base.realSize(50),borderRadius:base.realSize(25)}}/>

                    <View style={{justifyContent:'center',alignItems:'center',flexDirection:'row',marginTop:20}}>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Text style={{backgroundColor:'transparent',color:'white',textAlign:'left'}}>{owner.getUsername()}</Text>
                            {renderUserTitle(owner.get('title'))}
                        </View>
                        <Text style={{backgroundColor:'transparent',color:'white',textAlign:'left',marginLeft:base.realSize(20)}}>{owner.get('userCoin')}</Text>
                    </View>
                {/* </BlurView> */}
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
        var ll = Moment(item.moment).format('ll')
        var dd = Moment(item.moment).format('dddd')
        return(
            <TouchableOpacity
                onPress={()=>this._onPressItem(item,index)}
            >
                <View style={styles.sectionItemWrapper}>
                    <View style={styles.dateContainer}>
                        <Text style={styles.ll}>{ll}</Text>
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

    _onPressItem=(item,index) => {
        this.props.navigation.navigate('Detail',{object:item})
    }

    _renderEmpty=()=>{
        return (
            <View style={{flex: 1,alignItems: 'center',justifyContent:'center'}}>

                <Image source={require('../images/empty.jpg')} style={{width:base.deviceWidth,height:base.deviceWidth}}/>
            </View>
        )
    }
    render() {

        return(
            <View style={{flex:1,backgroundColor:'white'}}>
                <FlatList
                    style = {{flex: 1}}
                    ListHeaderComponent={this._renderHeader}
                    ListEmptyComponent={this._renderEmpty}
                    ItemSeparatorComponent={this._renderSeparartor}
                    data={this.state.data}
                    renderItem={this._renderItem}
                    
                    onEndReached={()=>this._footerRefresh()}
                    onEndReachedThreshold={0.1}
                    // stickySectionHeadersEnabled={true}
                    keyExtractor={(item,index)=>index} 
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    blurView:{
        position:'absolute',
        top:0,
        width:base.deviceWidth,
        height:base.realSize(150),
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'column'
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

    ll:{
        fontSize: base.realSize(15), 
        fontWeight: 'bold', 
        letterSpacing: 1,
        backgroundColor: 'transparent',
    },

    dd:{
        fontSize: base.realSize(23),
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