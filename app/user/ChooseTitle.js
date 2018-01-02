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
    TouchableOpacity
} from 'react-native'

import Toast,{DURATION} from 'react-native-easy-toast'
import base,{renderUserTitle} from '../base/base'
import {Button,CheckBox} from 'react-native-elements'
import AV from 'leancloud-storage'

export default class ChooseTitle extends Component {

    static navigationOptions=({navigation})=>({
        title:'你 有 的 称 号',
        tabBarVisible:false,
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
        this.state ={
            data:'',
            seletedTitle:'',
            titles:[]
        }
        
    }

    componentWillMount(){
        this._queryData()
        this.props.navigation.setParams({confirmPressed:this._onConfirm})
    }

    _queryData(){
        console.log('begin Query')
        var query = new AV.Query('UserTitle')
        AV.User.currentAsync().then((user)=>{
            if (user != null){
                query.equalTo('owner',user)
                query.include('owner')
                query.find().then((result)=>{
                    console.log(result)
                    var dict = {
                        object:result[0],
                        owner:result[0].get('owner'),
                        qing:result[0].get('qing'),
                        shen:result[0].get('shen'),
                        xia:result[0].get('xia'),
                        mei:result[0].get('mei'),
                        meng:result[0].get('meng'),
                        xie:result[0].get('xie'),
                        mo:result[0].get('mo'),
                        yao:result[0].get('yao'),
                        ling:result[0].get('ling'),
                        yuchun:result[0].get('yuchun')
                    }
                    this.setState({data:dict})
                    this._usersTitle(dict)
                })
            }
        })
    }

    _onConfirm=()=>{
        if (this.state.seletedTitle.length == 0){
            this.refs.error.show('你没有选择任何称号哦...')
        }else{
            var owner = this.state.data.owner
            owner.set('title',this.state.seletedTitle)
            owner.save().then((result)=>{
                this.props.navigation.goBack()
            })
        
        }
    }

    _usersTitle=(dict)=>{
        var arr=[]
        if (dict.qing){
            arr.push('青')
        }
        if (dict.shen){
            arr.push('神')
        }
        if (dict.xia){
            arr.push('侠')
        }
        if (dict.mei){
            arr.push('魅')
        }
        if (dict.meng){
            arr.push('萌')
        }
        if (dict.xie){
            arr.push('邪')
        }
        if (dict.mo){
            arr.push('魔')
        }
        if (dict.yao){
            arr.push('妖')
        }
        if (dict.ling){
            arr.push('绫')
        }
        if (dict.yuchun){
            arr.push('鱼唇')
        }
        this.setState({titles:arr})
    }

    _renderCheckBox(){
      return this.state.titles.map((item,i)=>{
        return (
            <View style={{paddingLeft:10,flexDirection:'row',backgroundColor:'white'}} key={i}>
            <CheckBox
                title={item}
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                checked={this.state.seletedTitle == item}
                checkedColor={base.themeColor}
                onIconPress={()=>{this.setState({seletedTitle:item})}}
                onPress={()=>{this.setState({seletedTitle:item})}}
            />
            {renderUserTitle(item)}
        </View>
        )
        })
    }

    render() {
        return (
            <View style={{flex: 1,backgroundColor: "white"}}>
            
                {this._renderCheckBox()}



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
    
})