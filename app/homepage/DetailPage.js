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
    ScrollView,
    Image,
    TextInput,
    Animated,
    TouchableOpacity,
    BackHandler

} from 'react-native'

import base ,{renderUserTitle}from '../base/base'
import Carousel,{Pagination} from 'react-native-snap-carousel';
import Moment from 'moment'
import {Button} from 'react-native-elements'
import Toast,{DURATION} from 'react-native-easy-toast'
import ProgressHUD from '../component/ProgressHUD'
import ShowPhotoBrowser from '../component/ShowPhotoBrowser'
import ModalDropdown from 'react-native-modal-dropdown'
import Icon from 'react-native-vector-icons/Ionicons'


const navBarHeight = base.realSize(base.isIOS?64:44)
export default class DetailPage extends Component {
    static navigationOptions={
        tabBarVisible: false,
        header: null
    }

    constructor(props){
        super(props)
        this.state = {
            date:Moment().format("YYYY-MM-DD"),
            
            offset: new Animated.Value(0),
            sliderActiveSlide: 0,
            object:[],
            headData:[{imageUri:require('../images/empty.jpg')}],
            isLoading: false,
            showPhotoBrowser: false,
            photos:[]

        }
    }

    componentWillMount(){
        // BackHandler.addEventListener('hardwareBackPress', function(){
        //     this.props.navigation.goBack()
        //     return true
        // })
        var headImages = this.props.navigation.state.params.object.images
        if (headImages.length != 0) {
            var arr = []
            headImages.map((uri,i)=>{
                var imgUri = {photo:uri}
                arr.push(imgUri)
                if (arr.length == headImages.length){
                    this.setState({photos: arr})
                }
            })
        }

        this.setState({isLoading:true})
    }

    componentDidMount(){
        // this.setState({isLoading:true})
        this.timer = setTimeout(()=>{this.setState({isLoading:false})},1000)
    }   

    componentWillUnmount(){

        this.timer && clearTimeout(this.timer);


        // BackHandler.removeEventListener('hardwareBackPress', function(){
        //     this.props.navigation.goBack()
        //     return true
        // })
    }
    //handle report
    _handleReport=(value)=>{
        if (value=='举报'){
            this.props.navigation.navigate('Report',{object:this.props.navigation.state.params.object.object,success:()=>this.refs.toast.show('举报成功,我们会尽快处理~')})
        }else{
            
        }
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
            <TouchableOpacity
                onPress={this._onPressCarouselItem}
            >
            <View style={styles.carouselItemContainer}>
                <Image source={item.imageUri} style={{...StyleSheet.absoluteFillObject,resizeMode:'cover',width:base.deviceWidth,height:base.deviceWidth*0.6}}/>
            </View>
            </TouchableOpacity>
        )
    }

    _onPressCarouselItem=()=>{
        if (this.state.photos.length==0){

        }else{
            this.setState({showPhotoBrowser:true})
        }
    }

      //press on avatar
    _onPressAvatar=(user)=>{
        this.props.navigation.navigate('Stranger',{owner:user})
    }

    //render separator
    _contentseparator=(title)=>{
        var renderSeparator = (style)=>{
            return <View style={style}/>
        }

        switch (title){   
            case'见闻':
            return renderSeparator(styles.jianwen)
            break

            case'谣言':
            return renderSeparator(styles.yaoyan)
            break

            case'记事':
            return renderSeparator(styles.jishi)
            break

            default:
            return renderSeparator(styles.jianwen)
            break
            
        }
    }

    _onPressComment=()=>{
        this.props.navigation.navigate('Comment',{object:this.props.navigation.state.params.object})
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

        var head = []
        var headImages = this.props.navigation.state.params.object.images
        if (headImages.length != 0) {

            headImages.map((item,i)=>{
                var imgUri = {imageUri:{uri:item}}
                head.push(imgUri)
            })
        }else{
            head = [{imageUri:require('../images/empty.jpg')}]
        }

        var object = this.props.navigation.state.params.object
        return (
            <View style={styles.container}>
            <ScrollView 
                style={styles.container}
                scrollEventThrottle={5}
                onScroll={Animated.event(
                    [{nativeEvent:{contentOffset:{y: this.state.offset}}}]
                )}
            >
                {this._renderCarousel(head)}
                <View style={{flexDirection:'row',marginHorizontal:5,paddingVertical:5,alignItems:'center'}}>
                    <TouchableOpacity onPress={()=>this._onPressAvatar(object.owner)}>
                        <Image source={{uri:object.owner.get('avatar')}} style={styles.avatar}/>
                    </TouchableOpacity>
                    <View style={styles.textInfoContainer}>
                        <View style = {{flexDirection:'row',alignItems:'center',marginTop:base.realSize(10)}}>
                            <Text style={styles.username}>{object.owner.getUsername()}</Text>
                            {renderUserTitle(object.owner.get('title'))}
                        </View>
                        <Text style={styles.title} numberOfLines={1}>{object.title}</Text>
                    </View>

                </View>
                {this._contentseparator(object.type)}

                <Text style={styles.body}>{object.detail}</Text>

                

            </ScrollView>

            <View style={styles.commentBar}>
                <Button
                    title='评 论'
                    buttonStyle={{backgroundColor: 'transparent', height: base.realSize(20), borderWidth: 0.5, borderColor: '#bdbdbd',width:base.deviceWidth-base.realSize(50)}}
                    textStyle={{color:base.titleColor}}
                    onPress={this._onPressComment}
                />
            </View>

            <Animated.View 
                    style={[
                        styles.navBar,
                    {
                        opacity:1,
                        transform:[
                            {translateY:showY}
                        ]
                    }]}
                >
                
            </Animated.View>

            <TouchableOpacity 
                style={[styles.icon,{left:base.realSize(0),width:40,height:30,justifyContent:'center',alignItems:'center'}]} 
                onPress={()=>{this.props.navigation.goBack(null)}}
            >
                <Icon
                    name='ios-arrow-back'
                    color='#eeeeee'
                    size={30}
                    // style={[styles.icon,{left:base.realSize(15)}]}
                    // onPress={()=>{this.props.navigation.goBack(null)}}
                />
            </TouchableOpacity>

            <ModalDropdown
                style={[styles.icon,{right:base.realSize(15)}]}
                dropdownStyle = {{height:base.realSize(73)}}
                dropdownTextStyle={{color:base.titleColor,fontSize: 15}}
                dropdownTextHighlightStyle={{color:base.titleColor}}
                options={['分享','举报']}
                onSelect={(index,value)=>{this._handleReport(value)}}
            >          
                <Icon 
                    name="ios-more"
                    color='#eeeeee'
                    size={30}
                   
                />
            </ModalDropdown> 

            <ProgressHUD
                isLoading={this.state.isLoading}
                closeModal={()=>{this.setState({isLoading:false})}}
            />

            <ShowPhotoBrowser
                isShow={this.state.showPhotoBrowser}
                closeModal={()=>{this.setState({showPhotoBrowser:false})}}
                images={this.state.photos}
                initialIndex={this.state.sliderActiveSlide}
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
    container:{
        flex: 1,
        backgroundColor: '#fff'
    },

    carouselItemContainer:{
        flex: 1,
        width: base.deviceWidth,
        height: base.width * 0.6
    },

    commentBar:{
        position: 'absolute',
        bottom: 0,
        width: base.deviceWidth,
        // height: base.realSize(40),
        justifyContent: 'center',
        padding: base.realSize(10),
        backgroundColor:'rgba(238,238,238,0.8)',
        
       
        
    },

    avatar:{
        resizeMode:'cover',
        width:base.realSize(65),
        height:base.realSize(65), 
        borderRadius:base.realSize(32.5),
        borderWidth: 0.5,
        borderColor:'#bdbdbd',
        // marginLeft:base.realSize(5),
        // marginTop:base.realSize(5)
    },

    textInfoContainer:{
        flexDirection: 'column',
        marginLeft: base.realSize(5)
    },

    username:{
        color:base.titleColor, 
        textAlign:'left',
        
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
        backgroundColor:'white',
        paddingBottom:base.realSize(40),
        lineHeight: base.realSize(22)
    },

    navBar:{
        position:'absolute',
        backgroundColor:base.themeColor,
        left:0,
        right:0,
        top:0,
        height:navBarHeight,
    },

    icon:{
        position:'absolute', 
        top:base.realSize(base.isIOS?23:3),
        backgroundColor:'transparent'
    },

    jianwen:{
        width:base.deviceWidth - base.realSize(20),
        alignSelf:'center',
        height:base.realSize(3),
        backgroundColor:'#00bcd4'
    },

    yaoyan:{
        width:base.deviceWidth - base.realSize(20),
        alignSelf:'center',
        height:base.realSize(3),
        backgroundColor:'#9c27b0'
    },

    jishi:{
        width:base.deviceWidth - base.realSize(20),
        alignSelf:'center',
        height:base.realSize(3),
        backgroundColor:'#ffca28'
    }
})