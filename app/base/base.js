'use strict';
import React from 'react';
import {Dimensions,Text,StyleSheet,Alert,Platform} from 'react-native';


const deviceHeight = Dimensions.get('window').height
const deviceWidth = Dimensions.get('window').width

const basePx = 375

// export default function realSize(px) {
//     return px * deviceWidth / basePx
// }

// export default function randomItem(arr){
//     var i = Math.floor(Math.random()*arr.length)
//     return arr[i]
// }

export const renderUserTitle = (title) => {

    var renderTitle = (style) => {
        
        return <Text style={style}>{title}</Text>
    }

    switch (title) {
        case '青': 
            return renderTitle(styles.qing)
            break
        case '神': 
            return renderTitle(styles.shen)
            break
        case '侠': 
            return renderTitle(styles.xia)
            break
        case '魅': 
            return renderTitle(styles.mei)
            break
        case '萌': 
            return renderTitle(styles.meng)
            break
        case '邪': 
            return renderTitle(styles.xie)
            break
        case '魔': 
            return renderTitle(styles.mo)
            break
        case '妖': 
            return  renderTitle(styles.yao)
            break
        case '绫': 
            return renderTitle(styles.ling)
            break
        case '鱼唇': 
            return renderTitle(styles.yuChun)
            break
        default:
            return null
            break
    }
}

const base = {
    deviceHeight: Dimensions.get('window').height,
    deviceWidth: Dimensions.get('window').width,
    realSize(px) {
        return px * deviceWidth / basePx
    },
    randomItem(arr) {
        var i = Math.floor(Math.random()*arr.length)
        return arr[i]
    },
    titleColor: '#424242',
    subTitleColor: '#757575',
    themeColor: '#4fc3f7',
    errorColor: '#e57373',
    bodyColor: '#455a64',
    isIOS : Platform.OS == 'ios',
    // randomItem(arr){
    //     var i = Math.floor(Math.random()*arr.length)
    //     return arr[i]
    // },

    

}

const styles = StyleSheet.create({
    
        qing:{
            backgroundColor:'transparent',
            alignSelf: 'center',
            textAlign: 'center',
            marginLeft: base.realSize(2),
            fontSize: base.realSize(12),
            borderWidth: base.realSize(1),
            color: '#00ffff',
            borderColor: '#00ffff'
        },
    
        shen:{
            backgroundColor:'transparent',
            alignSelf: 'center',
            textAlign: 'center',
            marginLeft: base.realSize(2),
            fontSize: base.realSize(12),
            borderWidth: base.realSize(1),
            borderColor: '#ffc400',
            color: '#ffc400',
        },
    
        xia:{
            backgroundColor:'transparent',
            alignSelf: 'center',
            textAlign: 'center',
            marginLeft: base.realSize(2),
            fontSize: base.realSize(12),
            borderWidth: base.realSize(1),
            color: '#00b0ff',
            borderColor: '#00b0ff'
        },
    
        mei:{
            backgroundColor:'transparent',
            alignSelf: 'center',
            textAlign: 'center',
            marginLeft: base.realSize(2),
            fontSize: base.realSize(12),
            borderWidth: base.realSize(1),
            color: '#ec407a',
            borderColor: '#ec407a'
        },
        
        meng:{
            backgroundColor:'transparent',
            alignSelf: 'center',
            textAlign: 'center',
            marginLeft: base.realSize(2),
            fontSize: base.realSize(12),
            borderWidth: base.realSize(1),
            color: '#f484b1',
            borderColor: '#f484b1'
        },
    
        xie:{
            backgroundColor:'transparent',
            alignSelf: 'center',
            textAlign: 'center',
            marginLeft: base.realSize(2),
            fontSize: base.realSize(12),
            borderWidth: base.realSize(1),
            color: '#d500f9',
            borderColor: '#d500f9'
        },
    
        mo:{
            backgroundColor:'transparent',
            alignSelf: 'center',
            textAlign: 'center',
            marginLeft: base.realSize(2),
            fontSize: base.realSize(12),
            borderWidth: base.realSize(1),
            color: '#311b92',
            borderColor: '#311b92'
        },
    
        yao:{
            backgroundColor:'transparent',
            alignSelf: 'center',
            textAlign: 'center',
            marginLeft: base.realSize(2),
            fontSize: base.realSize(12),
            borderWidth: base.realSize(1),
            color: '#7cb342',
            borderColor: '#7cb342'
        },
    
        ling:{
            backgroundColor:'transparent',
            alignSelf: 'center',
            textAlign: 'center',
            marginLeft: base.realSize(2),
            fontSize: base.realSize(12),
            borderWidth: base.realSize(1),
            color: '#4dd0e1',
            borderColor: '#4dd0e1'
        },
    
        yuChun:{
            backgroundColor:'transparent',
            alignSelf: 'center',
            textAlign: 'center',
            marginLeft: base.realSize(2),
            fontSize: base.realSize(12),
            borderWidth: base.realSize(1),
            color: '#ff7043',
            borderColor: '#ffc400'
        }
    })
export default base