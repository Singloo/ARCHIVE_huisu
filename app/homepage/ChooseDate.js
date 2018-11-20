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
} from 'react-native'

import DatePicker from 'react-native-datepicker'
import { Calendar, CalendarList, Agenda } from 'react-native-calendars'
import Moment from 'moment'
import {Button} from 'react-native-elements'
import base from '../base/base'
import {BlurView, VibrancyView} from 'react-native-blur'

export default class ChooseDateModal extends Component {
    constructor(props){
        super(props)
        this.state ={
            date:Moment().format("YYYY-MM-DD")
        }
        
    }

    render() {
        return (
           <Modal
            animationType='slide'
            onRequestClose={()=>{}}
            transparent={true}
            visible={this.props.chooseDateVisible}
           >
           <TouchableHighlight style={{flex: 1}} onPress={()=>{this.props.closeModal()}}>
           <BlurView style={styles.blur} blurType='xlight' blurAmount={10}/>
            <View style={styles.container}>
                <DatePicker
                    style={{width: base.deviceWidth,alignSelf:'center'}}
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
                
                <Calendar
                    current={this.state.date}
                    style={{backgroundColor:'transparent', borderWidth: 1,borderColor: 'gray',height: 350,width:base.deviceWidth-20}}
                    onDayPress={(day) => {this.setState({date:day.dateString})}}
                    monthFormat={'yyyy MM'}
                    onMonthChange={(month) => {this.setState({date:month.dateString})}}
                    hideArrows={false}
                    hideExtraDays={false}
                    disableMonthChange={false}
                    firstDay={1}
                    hideDayNames={false}
                />
                <View style={styles.buttonContainer}>
                <Button
                title={'取 消'}
                buttonStyle={[styles.button,{}]}
                textStyle={{color:base.titleColor}}
                onPress={()=>{this.props.closeModal()}}
                
                />

                <Button
                title='确 定'
                buttonStyle={[styles.button,{}]}
                textStyle={{color:base.titleColor}}
                onPress={()=>{
                    this.props.onConfirm(this.state.date)
                    this.props.closeModal()
                }}
                />
                </View>
            </View>
           {/* </BlurView> */}
           </TouchableHighlight>

           </Modal>
        )     
        
    }
}

const styles = StyleSheet.create({
    blur:{
        flex: 1,
        alignContent: 'center'
    },
    container:{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'transparent',
        height: base.deviceWidth * 1.1,
        marginTop: base.deviceWidth * 0.2
    },

    buttonContainer:{
        justifyContent: 'space-between',
        marginTop: base.realSize(30),
        flexDirection: 'row'
    },
    button:{
        backgroundColor:'transparent',

        width: base.deviceWidth/2 -30,
    }

})