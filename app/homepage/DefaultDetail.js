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
    ScrollView,
    Animated,
    BackHandler
} from 'react-native'


import Carousel,{Pagination} from 'react-native-snap-carousel'
import base,{renderUserTitle} from '../base/base'
import {Button} from 'react-native-elements'
import ProgressHUD from '../component/ProgressHUD'


import Icon from 'react-native-vector-icons/Ionicons'
const navBarHeight = base.realSize(base.isIOS?64:44)

export default class DefaultDetail extends Component {
    static navigationOptions={
        header:null,
        tabBarVisible: false,
        sliderActiveSlide: 0
        
    }


    constructor(props){
        super(props)
        this.state = {
            sliderActiveSlide:0,
            offset: new Animated.Value(0)
        }
        
    }

    componentWillMount(){
        // BackHandler.addEventListener('hardwareBackPress', function(){
        //     this.props.navigation.goBack()
        //     return true
        // })
    }

    componentWillUnmount(){
        // BackHandler.removeEventListener('hardwareBackPress', function(){
        //     this.props.navigation.goBack()
        //     return true
        // })
    }
    //carousel

    _renderCarousel(data) {
        
         return (
             <View style={{width:base.deviceWidth,height:base.deviceWidth*0.6}}>
                <Carousel
                    data={data}
                    renderItem={this._renderCarouselItem}
                    sliderWidth={base.deviceWidth}
                    itemWidth={base.deviceWidth}
                    activeSlideAlignment='center'
                    firstItem={1}
                    containerCustomStyle={{}}
                    loop={true}
                    loopClonesPerSide={3}
                    autoplay={true}
                    autoplayDelay={500}
                    autoplayInterval={3000}
                    onSnapToItem={(index) => this.setState({ sliderActiveSlide: index }) }
                
                />
        
                <Pagination
                    dotsLength={data.length}
                    activeDotIndex={this.state.sliderActiveSlide}
                    containerStyle={{position:'absolute', bottom: -base.realSize(15), alignSelf:'center'}}
                    dotColor={'rgba(255, 255, 255, 0.92)'}
                    dotStyle={{}}
                    inactiveDotColor='black'
                    inactiveDotOpacity={0.4}
                    inactiveDotScale={0.6}
    
                    />
             </View>
         )
     }
 
     _renderCarouselItem = ({item,index})=>{
         return(

             <View style={styles.carouselItemContainer}>
                 <Image source={{uri:item}} style={{...StyleSheet.absoluteFillObject,resizeMode:'cover',width:base.deviceWidth,height:base.deviceWidth*0.6}}/>
             </View>

         )
     }


    render() {

        var showY = this.state.offset.interpolate({
            inputRange: [0,10,base.deviceWidth*0.6-navBarHeight,base.deviceWidth*0.6],
            outputRange: [-navBarHeight,-navBarHeight,0,0]
        })
        
        var op = this.state.offset.interpolate({
            inputRange: [0,10,base.deviceWidth*0.6-navBarHeight,base.deviceWidth],
            outputRange: [0,0,1,1]
        })

        var data = this.props.navigation.state.params.object

        return (
            <View style={{flex: 1}}>
                <ScrollView
                    style={styles.container}
                    scrollEventThrottle={5}
                    onScroll={Animated.event(
                        [{nativeEvent:{contentOffset:{y: this.state.offset}}}]
                    )}
                >
                {this._renderCarousel(data.images)}

                <View style={{flexDirection:'row',marginHorizontal:5,paddingVertical:5,alignItems:'center',backgroundColor:'#eeeeee'}}>
                    <Image source={require('../images/ling.jpg')} style={styles.avatar}/>
                    <View style={styles.textInfoContainer}>
                        <Text style={styles.username}>{'Lilith'}</Text>
                        <Text style={styles.title} numberOfLines={1}>{data.title}</Text>
                    </View>

                </View>
                <View style={styles.separator}/>

                <Text style={styles.body}>{data.detail}</Text>


                </ScrollView>



                <Animated.View 
                    style={[
                        styles.navBar,
                    {
                        opacity:op,
                        transform:[
                            {translateY:showY}
                        ]
                    }]}
                >
                    
                </Animated.View>

                <Icon
                name='ios-arrow-back'
                color='#eeeeee'
                size={30}
                style={[styles.icon,{left:base.realSize(15)}]}
                onPress={()=>{this.props.navigation.goBack(null)}}
                />

            </View>
        )     
        
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },

    carouselItemContainer:{
        flex: 1,
        width: base.deviceWidth,
        height: base.width * 0.6
    },

    navBar:{
        position:'absolute',
        backgroundColor:base.themeColor,
        left:0,
        right:0,
        top:0,
        height:navBarHeight,
    },

    avatar:{
        resizeMode:'cover',
        width:base.realSize(65),
        height:base.realSize(65), 
        borderRadius:base.realSize(35),
        borderWidth: 0.5,
        borderColor:'#bdbdbd',
        // marginLeft:base.realSize(5),
        // marginTop:base.realSize(5)
    },

    textInfoContainer:{
        flexDirection: 'column',
        marginLeft: base.realSize(5),
        
    },

    username:{
        marginTop:base.realSize(10),
        color:base.titleColor, 
        textAlign:'left'
    },

    title:{
        marginTop:base.realSize(20),
        color:base.subTitleColor,
        textAlign:'left',
        fontWeight:'bold'
    },

    body:{
        flex:1,
        fontSize:base.realSize(15),
        color:base.bodyColor,
        paddingTop:base.realSize(10),
        paddingHorizontal:base.realSize(10),
        backgroundColor:'#eeeeee',
        paddingBottom:base.realSize(40),
        textAlign:'center',
        
    },

    separator:{
        width:base.deviceWidth - base.realSize(40),
        paddingHorizontal: base.realSize(20),
        alignSelf:'center',
        height:base.realSize(3),
        backgroundColor:'#00bcd4'
    },

    icon:{
        position:'absolute', 
        top:base.realSize(base.isIOS?23:3),
        backgroundColor:'transparent'
    },
})