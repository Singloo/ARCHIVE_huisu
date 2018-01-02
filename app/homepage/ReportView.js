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
    TextInput
} from 'react-native'

import base from '../base/base'
import {Button} from 'react-native-elements'
import AV from 'leancloud-storage'
export default class ReportView extends Component {
    
    static navigationOptions=({navigation})=>({
        title:'举报',
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
            reportContent:''
        }
        
    }

    componentWillMount(){
        this.props.navigation.setParams({confirmPressed:this._confirmPressed})
    }

    //headerRight
    _confirmPressed=()=>{
        var object = this.props.navigation.state.params.object
        var objc = AV.Object.extend('Report')
        var newObjc = new objc()
        newObjc.set('targetNews',object)
        newObjc.set('reportContent',this.state.reportContent)
        newObjc.save().then((result)=>{
            this.props.navigation.state.params.success()
            this.props.navigation.goBack()
        }).catch((error)=>{
            this.props.navigation.goBack()
        })
    }

    render() {
        return (
            <View style={{flex: 1,backgroundColor: "#f3f3f3",paddingHorizontal:5}}>
                <TextInput
                    style={styles.input}
                    multiline={true}
                    placeholder={'   我们会尽快处理违规内容'}
                    placeholderTextColor='#9e9e9e'
                    onChangeText={(text)=>this.setState({reportContent:text})}
                />

            </View>
        )     
        
    }
}

const styles = StyleSheet.create({
    input:{
        width:base.deviceWidth-10,
        height:base.deviceWidth*3/5,
        backgroundColor:'white',
        borderColor:base.subTitleColor,
        borderRadius:10,
        borderWidth:0.5,
        padding:5

    }
})