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
    Image,
    FlatList,
} from 'react-native'


import Moment from 'moment'
import Icon from 'react-native-vector-icons/Ionicons'
import base,{renderUserTitle} from '../base/base'
import Toast,{DURATION} from 'react-native-easy-toast'
import AV from 'leancloud-storage'

export default class RankPage extends Component {
    static navigationOptions={
        title:'上下 29813456912384933900352361 年',
        
    }


    constructor(props){
        super(props)
        this.state ={
            data:[]
        }
        
    }

    componentWillMount(){
        this.queryData()
    }

    queryData(){
        var arr=[]
        var query = new AV.Query('PostNews')
        query.addDescending('popularity')
        query.limit(10)
        query.include('owner')
        query.find().then((results)=>{
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
                    moment:mom,
                    
                }
                arr.push(dict)
                if (arr.length == results.length){
                    this.setState({data:arr})

                }
            })
        }).catch((error)=>{
            console.log(error)
        })
    }

    _renderItem=({item,index})=>{
        var coverImage= require('../images/empty.jpg')
        if (item.images.length != 0){
            coverImage = {uri:item.images[0]}
        }
        return(
            <TouchableOpacity
                onPress={()=>this._onPressItem(item)}
            >
                <View style={styles.itemWrapper}>
                    <Image source={coverImage} style={styles.image}/>
                    <View style={styles.cover}>
                        {this._renderType(item)}
                    </View>
                    
                </View>
            </TouchableOpacity>
        )
    }

    _onPressItem=(item)=>{
        this.props.navigation.navigate('RankToDetail',{object:item})
    }

    _renderType=(item)=>{
        var renderView=(style)=>{
            return (
                <View style={style}>
                    <Text style={{fontSize:15,letterSpacing:1,color:'white'}}>{item.moment}</Text>
                    <Text style={styles.title}>{item.title}</Text>
                </View>
            )
        }

        switch(item.type){
            case'见闻':
            return renderView(styles.jianwen)
            break

            case'谣言':
            return renderView(styles.yaoyan)
            break

            case'记事':
            return renderView(styles.jishi)
            break

            default:
            return renderView(styles.jianwen)
            break
        }
    }
    render() {
        return (
            <View style={{flex: 1,backgroundColor: "#f3f3f3"}}>
                <FlatList
                    style={{flex:1}}
                    data={this.state.data}
                    renderItem={this._renderItem}
                    keyExtractor={(item, index) => index}
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
    itemWrapper:{
        width:base.deviceWidth,
        height:base.deviceWidth/3
    },

    image:{
        width:base.deviceWidth,
        height:base.deviceWidth/3,
        resizeMode:'cover',
    },

    cover:{
        position:'absolute',
        top:0,
        width:base.deviceWidth,
        height:base.deviceWidth/3,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'rgba(97,97,97,0.4)'
    },

    jianwen:{
        width:base.deviceWidth * 4/5,
        height:base.deviceWidth/3 - base.realSize(40),
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'rgba(0,188,212,0.5)'
    },
    
    yaoyan:{
        width:base.deviceWidth * 4/5,
        height:base.deviceWidth/3 - base.realSize(40),
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'rgba(103,58,183,0.5)'
    },

    jishi:{
        width:base.deviceWidth * 4/5,
        height:base.deviceWidth/3 - base.realSize(40),
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'rgba(255,202,40,0.5)'
    },

    title:{
        fontSize:base.realSize(15),
        letterSpacing:0.5,
        textAlign:'center',
        color:'white',
        fontWeight:'bold',
        marginTop:base.realSize(5)
    }
})