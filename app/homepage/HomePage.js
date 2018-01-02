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
    Dimensions,
    Image,
    Alert,
    TouchableOpacity,
    FlatList,
    Animated,
    BackHandler,
    
} from 'react-native'

import AV from 'leancloud-storage'

import Carousel,{ParallaxImage,Pagination} from 'react-native-snap-carousel';
import ActionButton from 'react-native-action-button'
import Icon from 'react-native-vector-icons/Ionicons'
import base,{renderUserTitle} from '../base/base'
import Toast,{DURATION} from 'react-native-easy-toast'
import Moment from 'moment'
import ModalDropdown from 'react-native-modal-dropdown'
import LinearGradient from 'react-native-linear-gradient'
import CardView from 'react-native-cardview'
import SplashScreen from 'react-native-splash-screen'



import ChooseDateModal from './ChooseDate'
import CreateNew from './CreateNew'

import {StackNavigator,TabNavigator} from 'react-navigation'





const headDefaultData = [
    {
       title: 'Its a beautiful day',
       detail: 'Un bel giorno\n Un bel giorno per morire,\n Un bel di, vedremo\n Le varsi un fil di fumo\n Sulle stremo con fin del mare\n E poi la nave appare\n With every new day\n Your promises fade away\n Its a fine day to see\n though the last day for me\n Its a beautiful day\n repeat ',
       images:["http://ac-uygandza.clouddn.com/06b08255a6361bb74ee6.JPG","http://ac-uygandza.clouddn.com/0487dd98003509cd7045.JPG","http://ac-uygandza.clouddn.com/7ff5a381f10592f8a8b1.JPG","http://ac-uygandza.clouddn.com/c84cdc0a8de1ee08ff1f.JPG","http://ac-uygandza.clouddn.com/02eccb21a01f50e8edb4.JPG"]
    },
    {
       title: 'Beloved',
       detail: 'To who do you compare me\n Recreate to mold me\n And frozen in ambition\n You scram me up\n The world is soft and wooly\n They strip me up to fail me\n I used to feel protection from ur touch\n And if I am your beloved\n Then why I dont feel it?\n Oh, if Im ur beloved\n Why dont I feel it?\n We lie together but I feel so alone\n And I give everything I have to U\n Why isnt ever enough?\n For me there was nobody\n You were the one and only\n But now Im uninvited\n Inside ur love\n And if I am ur beloved\n Then why dont I feel it?\n We lie together but I feel so alone\n And I give everything I have to u\n Why isnt ever enough?\n Take,take,twist shape\n Tell me what u want from me\n Cold shots from ur embrace\n Love is a facade for hate\n Dont speak, skin creep\n If only its what see in me\n No sweet words to say\n Tell me if I am ur beloved\n repeat\n \nI love it, makes me feel dizzy, music loud~',
       images:["http://ac-uygandza.clouddn.com/5a9a9a68dc75121c13ea.JPG","http://ac-uygandza.clouddn.com/618be8d35c1dea0f31c8.JPG","http://ac-uygandza.clouddn.com/7e0a47aef23a00f2ca6d.JPG","http://ac-uygandza.clouddn.com/416cd35bc271e2f0fc6b.JPG","http://ac-uygandza.clouddn.com/4876fbd9128a88ad7ce7.JPG"]
    },
    {
       title: 'Get free',
       detail: 'Finally, Im crossing the threshold\n From the ordinary world\n To the reveal of my heart\n Undoubtedly, that will for certain\n Take the dead out of the sea\n And the darkness from the arts\n This is my commitment(ah~~)\n My modern manifesto\n Im doing it for all of us(i know that)\n Who never got the chance\n For all the**\n And all my birds of paradise\n Who never got to fly at night\n Cause they were caught up in the dens(aha)\n Sometimes it feels like Ive got a war in my mind\n I want to get off but I keep riding the ride\n I never really notice that I had to decide\n To play someones game or live my own life(...)\n And now I do\n I want to move\n Out of the black\n Into the blue\n Finally, gone is the burden\n Of the crowding way of being\n That comes form energies combined\n Like my part was I\n Was not discerning\n And u, as we found out\n Were not in your right mind\n Theres no more chasing rainbows\n And hoping for an end to them\n Their arches are illusions\n Solid at first glance\n But then u try to touch them\n Theres nothing to hold on to\n The colors used to lure u in\n And put u in a trance\n repeat \n\n vintage,psilocybe,don juan,lana del rey',
       images:["http://ac-uygandza.clouddn.com/fec7bb00743d1683faf6.JPG","http://ac-uygandza.clouddn.com/c126ac1318040ff850f5.JPG","http://ac-uygandza.clouddn.com/187f1428389c5ff57f77.JPG","http://ac-uygandza.clouddn.com/944934f7922aecd265fd.JPG","http://ac-uygandza.clouddn.com/a7e22b22c480fc78182d.PNG"]
    },
    {
       title: 'S.O.S',
       detail: "C'est un S.O.S., je suis touchée, je suis à terre\n Entends-tu ma détresse, y a-t-il quelqu'un\n Je sens que je me perds...\n J'ai tout quitté, mais ne m'en veux pas\n Fallait que je m'en aille, je n'étais plus moi\n Je suis tombée tellement bas\n Que plus personne ne me voit\n J'ai sombré dans l'anonymat\n Combattu le vide et le froid, le froid\n J'aimerais revenir, j'n'y arrive pas\n J'aimerais revenir\n Je suis rien, je suis personne\n J'ai toute ma peine comme royaume\n Une seule arme m'emprisonne\n Voir la lumière entre les barreaux\n Et regarder comme le ciel est beau\n Entends-tu ma voix qui résonne (qui résonne) ?\n C'est un S.O.S., je suis touchée, je suis à terre !\n Entends-tu ma détresse, y a-t-il quelqu'un ?\n Je sens que je me perds...\n Le silence tue la souffrance en moi\n L'entends-tu ? Est-ce que tu me vois ?\n Il te promet, fait de toi\n Un objet sans éclat\n Alors, j'ai crié, j'ai pensé à toi,\n J'ai noyé le ciel dans les vagues, les vagues\n Tous mes regrets, toute mon histoire\n Je la reflète\n repeat",
       images:["http://ac-uygandza.clouddn.com/bf8cf0852ec87d8b8037.jpeg","http://ac-uygandza.clouddn.com/4cebea802eeaa4e05773.JPG","http://ac-uygandza.clouddn.com/a1235263928c5516658d.jpg","http://ac-uygandza.clouddn.com/692e307f67a608fb2bc6.jpeg","http://ac-uygandza.clouddn.com/392f3c84e0dfcc9d7807.jpeg"]

    },
    {
       title: 'Loving Strangers',
       detail: "Loving strangers, loving strangers,\n loving strangers, oh…\n Loving strangers, loving strangers,\n loving strangers, oh…\n I’ve got a hole in my pocket\n where all the money has gone\n I’ve got a whole lot of work\n to do with your heart\n cause it’s so busy, mine’s not\n Loving strangers, loving strangers,\n loving strangers, oh…\n Loving strangers, loving strangers,\n loving strangers, oh…\n It’s just the start of the winter\n and I’m all alone\n but I’ve got my eye right on you\n give me a coin and I'll take you to the moon\n give me a beer and I’ll kiss you so foolishly,\n like you do when you lie, when you’re not in my thoughts,\n like you do when you lie and I know it’s not my imagination\n Loving strangers, loving strangers,\n loving strangers, oh…\n repeat \n \n \n  喜欢Russian Red和lana del rey在diet mountain dew中的声音\n 慵懒的感觉真好",
       images:["http://ac-uygandza.clouddn.com/7dc4e22da273cfd2167b.JPG","http://ac-uygandza.clouddn.com/df22fb48ae321453ba8f.JPG","http://ac-uygandza.clouddn.com/7efbebabf7b038bda36a.JPG","http://ac-uygandza.clouddn.com/ccbb2d0f333be7979fc2.JPG","http://ac-uygandza.clouddn.com/7f96136be3dc35b65e92.PNG"]
    }
   ];

const navBarHeight = base.realSize(base.isIOS?64:44)
var firstClick = 0
export default class HomePage extends Component {
    static navigationOptions={
        header:null
    }
    constructor(props){
        super(props)
        this.state ={
            sliderActiveSlide: 0,
            date: Moment().format("YYYY-MM-DD"),
            chooseDateVisible: false,
            offset: new Animated.Value(0),
            listData:[],
            headData:[],
            showDefault: true,
            isRefresh:false
        }
        
    }
    componentWillMount(){
        this.headRefresh()
    }

    componentDidMount(){
        SplashScreen.hide()
        // BackHandler.addEventListener('hardwareBackPress', this._handleBack)
    }

    componentWillUnmount(){
        // BackHandler.removeEventListener('hardwareBackPress', this._handleBack)
    }
    _handleBack=()=>{

        
        var timestamp = new Date().getTime()

        if (timestamp - firstClick > 2000){
            firstClick = timestamp
            this.refs.toast.show('再按一次退出应用')
            return true
        }else{
            BackHandler.exitApp()
            return false
        }
    }

    headRefresh(){
        this.queryData(this.state.date,true)
    }

    footerRefresh(){
        console.log('home footer')
        this.queryData(this.state.date,false)
    }

    //to one day
    toOneDay=(oneDay)=>{
        this.flatList.scrollToOffset({x:0,y:0,animated:true})
        this.queryData(oneDay,true)

    }
    //prepare data
    queryData=(date,isHead)=>{
        
        this.setState({date:date,isRefresh:isHead})
        var arr=isHead?[]:this.state.listData
        if (!isHead){
            if (arr.length >= 100){
                arr=arr.splice(0,20)
            }
        }
        var query = new AV.Query('PostNews')
        var moment = new Date(date)
        query.equalTo('moment',moment)
        query.include('owner')
        query.addDescending('updatedAt')
        query.skip(arr.length)
        query.limit(20)
        query.find().then((results)=>{
            if(isHead){
                this.setState({isRefresh:false})
            }
            var newArr = []
            //mark footer refresh
            if (results.length == 0){
                if (isHead){
                    this.setState({listData:arr})
                }
            }else{
                results.map((item,i)=>{
                    var isLoved = false
                    var isDissed = false
                    var mom = Moment(item.get('moment')).format('YYYY-MM-DD')
                    //query user's
                    AV.User.currentAsync().then((user)=>{
                        if(user != null){
                            var queryL = new AV.Query('LoveNews')
                            queryL.equalTo('owner',user)
                            queryL.equalTo('news',item)
                            queryL.find().then((results)=>{
                                if(results.length != 0){
                                    var data = this.state.listData
                                    data[i].isLoved =true
                                    this.setState({listData:data})
                                }
                            })
                
                            var queryD = new AV.Query('DissNews')
                            queryD.equalTo('owner',user)
                            queryD.equalTo('news',item)
                            queryD.find().then((results)=>{

                                if(results.length != 0){
                                    var data = this.state.listData
                                    data[i].isDissed =true
                                    this.setState({listData:data})
            
                                }
                            })
                        }
                    })

                    
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
                        isLoved:isLoved,
                        isDissed:isDissed
                        
                    }
                    newArr.push(dict)

                    //mark....
                    if (newArr.length == results.length){
                        arr = arr.concat(newArr)
                        this.setState({listData:arr})
                    }
                    
                })
            }
        }).catch((error)=>{
            console.error(error)
            this.setState({isRefresh:false})
            this.refs.error.show('网络出现了一点问题...')
        })

        var arrHead=[]
        if (isHead){
            var queryH = new AV.Query('PostNews')
            queryH.equalTo('moment',moment)
            queryH.include('owner')
            queryH.addDescending('popularity')
            queryH.limit(5)
            queryH.find().then((results)=>{
                // this.setState({isRefresh:false})
                if (results.length == 0){
                    this.setState({headData:headDefaultData,showDefault:true})
                }else{
                    results.map((item,i)=>{
                        var isLoved = false
                        var isDissed = false
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
                            isLoved:isLoved,
                            isDissed:isDissed
                            
                        }
                        arrHead.push(dict)
                        if (arrHead.length == results.length){
                            this.setState({headData:arrHead,showDefault:false})
                            
                        }
                    })
                }
            }).catch((error)=>{
                this.setState({headData:headDefaultData,showDefault:true})
                
            })
        }
   
       
    }
    //header
    _renderCarouselItem=({item,index})=>{
        var coverImage= require('../images/empty.jpg')
        if (item.images.length != 0){
            coverImage = {uri:item.images[0]}
        }
        return (
            <TouchableOpacity 
                style={{width: base.deviceWidth, height: 0.6*base.deviceWidth, backgroundColor: '#ffffff'}} 
                onPress={()=>{this._onPressCarouselItem(item,index)}}
            >
                <View style={{flex: 1}}>
                    <Image source={coverImage} style={[styles.carouselImage]}/>
                    <View style={[styles.carouselImage,{backgroundColor:'rgba(189,189,189,0.3)'}]}/>
                </View>
                <View style={styles.carouselTextContainer}>
                    <Text style={[styles.title,{color:base.titleColor}]} numberOfLines={1}>{item.title}</Text>
                    <Text style={[styles.detail,{color:base.subTitleColor}]} numberOfLines={2}>{item.detail}</Text>
                </View>
            </TouchableOpacity>
        )
    }
    _renderCarousel=()=>{
        
        return (
            <View style={{padding:0}}>
            <Carousel
                data={this.state.headData}
                renderItem={this._renderCarouselItem}
                sliderWidth={base.deviceWidth}
                itemWidth={base.deviceWidth}
                activeSlideAlignment='center'
                firstItem={0}
                containerCustomStyle={{}}
                loop={this.state.headData.length != 1}
                loopClonesPerSide={3}
                autoplay={true}
                autoplayDelay={500}
                autoplayInterval={3000}
                onSnapToItem={(index) => this.setState({ sliderActiveSlide: index }) }
            
            />
            
            <Pagination
                  dotsLength={this.state.headData.length}
                  activeDotIndex={this.state.sliderActiveSlide}
                  containerStyle={{position:'absolute', bottom: -20, alignSelf:'center'}}
                  dotColor={'rgba(255, 255, 255, 0.92)'}
                  dotStyle={{}}
                  inactiveDotColor='black'
                  inactiveDotOpacity={0.4}
                  inactiveDotScale={0.6}

                />
            </View>
        )
    }

    _onPressCarouselItem=(item,index)=>{
        if (this.state.showDefault){
            this.props.navigation.navigate('DefaultDetail',{object:item})
        }else{
            this.props.navigation.navigate('Detail',{object:item})
        }
    }

    //list
    _renderListItem= ({item,index}) => {
        var coverImage= require('../images/empty.jpg')
        if (item.images.length != 0){
            coverImage = {uri:item.images[0]}
        }

        

        return(
            <TouchableOpacity style={styles.cellWrap} onPress={()=>this._onPressListItem(item,index)}>
            {this._renderType(item.type)}
            <CardView
                cardElevation={7}
                cardMaxElevation={7}
                cornerRadius={base.realSize(12)}
                style={styles.card}
            >
            {/* <View style={styles.card}> */}
                <Image source={coverImage} style={[styles.cellImage,{resizeMode: 'cover'}]}/>
                <View style={[styles.cellImageCover,{backgroundColor: 'rgba(189,189,189,0.3)'}]}>
                    {this._renderUserAvatar(item)}

                    <LinearGradient
                    style={styles.textContainer}
                    colors={['transparent','#616161']}
                    >
                        <View style={styles.titleAndDetail}>
                            <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
                            <Text style={styles.detail} numberOfLines={2}>{item.detail}</Text>
                        </View>
                        <View style={{justifyContent: 'space-between',flexDirection:'column',backgroundColor:'transparent'}}>
                            <View style={{flexDirection: 'row',alignItems:'center'}}>
                                <Text style={styles.loveOrNotNum}>{item.loveNum}</Text>
                                <Icon
                                    
                                    name="ios-thumbs-up"
                                    size={base.realSize(33)}
                                    style={{color:item.isLoved?'#ef9a9a':'#f5f5f5'}}
                                    onPress={()=>{this.love(item.object,index)}}
                                />
                            </View>
                            <View style={{flexDirection: 'row', alignItems:'center'}}>
                                <Text style={styles.loveOrNotNum}>{item.dissNum}</Text>
                                <Icon
                                    
                                    name='ios-thumbs-down'
                                    size={base.realSize(33)}
                                    style={{color:item.isDissed?'#ce93d8':'#f5f5f5'}}
                                    onPress={()=>{this.diss(item.object,index)}}
                                />
                            </View>
                        </View>
                    </LinearGradient>
                </View>
            {/* </View> */}
            </CardView>
            </TouchableOpacity>
        )
    }


    _renderType=(type)=>{
        var typeView=(style) => {
            return(
                <View style={style}/>
            )
        }

        switch(type){
            case'见闻':
            return typeView(styles.jianwen)
            break

            case'谣言':
            return typeView(styles.yaoyan)
            break

            case'记事':
            return typeView(styles.jishi)
            break

            default:
            return typeView(styles.jianwen)
            break
        }
    }

    _renderUserAvatar(item){
        var user = item.owner
        return(
            <LinearGradient
            style={styles.avatarContainer}
            colors={['rgba(97,97,97,0.5)','transparent']}
            >
                <TouchableOpacity
                    onPress={()=>this._onPressAvatar(user)}
                >
                    <Image source={{uri:user.get('avatar')}} style={styles.avatar}/>
                </TouchableOpacity>
                <Text style={styles.nickName}>{user.getUsername()}</Text>
                {renderUserTitle(user.get('title'))}

                <ModalDropdown
                    style={styles.reportIcon}
                    dropdownStyle = {{height:base.realSize(73)}}
                    dropdownTextStyle={{color:base.titleColor,fontSize: 15}}
                    dropdownTextHighlightStyle={{color:base.titleColor}}
                    options={['分享','举报']}
                    onSelect={(index,value)=>{this._handleReport(value,item)}}
                >          
                    <Icon name="md-more"
                        size={base.realSize(33)}
                        color='white'
                    />
                </ModalDropdown> 

            </LinearGradient>
        )
    }

    //press on avatar
    _onPressAvatar=(user)=>{
        this.props.navigation.navigate('Stranger',{owner:user})
    }
    _handleReport=(value,item)=>{
        if (value=='举报'){
            this.props.navigation.navigate('Report',{object:item.object,success:()=>this.refs.toast.show('举报成功,我们会尽快处理~')})
        }else{
            
        }
    }
    //press
    _onPressListItem= (item,index) => {
        this.props.navigation.navigate('Detail',{object:item})
    }
    //love
    love=(object,index)=>{
        AV.User.currentAsync().then((user)=>{
            if (user == null){
                this.refs.toast.show('需要登录账户哦~~')
            }else{
                var query = new AV.Query('LoveNews')
                query.equalTo('owner',user)
                query.equalTo('news',object)
                query.find().then((results)=>{
                    if (results.length == 0){
                        var lo = new AV.Object('LoveNews')
                        lo.set('owner',user)
                        lo.set('news',object)
                        lo.save().then((result)=>{
                            var news = AV.Object.createWithoutData('PostNews',object.getObjectId())
                            news.increment('loveNumber',1)
                            news.increment('popularity',1)
                            news.save()
                            var data = this.state.listData
                            data[index].loveNum = data[index].loveNum+1
                            data[index].isLoved = true
                            this.setState({listData:data})
                            
                            this.refs.love+index.setNativeProps({style:{color:'red'}})
                        }).catch((error)=>{

                        })
                    }else{
                        AV.Object.destroyAll(results).then((results)=>{
                            var news = AV.Object.createWithoutData('PostNews',object.getObjectId())
                            news.increment('loveNumber',-1)
                            news.increment('popularity',-1)
                            news.save()
                            var data = this.state.listData
                            data[index].loveNum = data[index].loveNum-1
                            data[index].isLoved = false
                            this.setState({listData:data})
                        })
                    }
                }).catch((error)=>{
                    this.refs.error.show('网络不太好....')
                })
            }
        }).catch((error)=>{
            this.refs.toast.show('网络不太好~~')
        })
    }

    diss=(object,index)=>{
        AV.User.currentAsync().then((user)=>{
            if (user == null){
                this.refs.toast.show('需要登录账户哦~~')
            }else{
                var query = new AV.Query('DissNews')
                query.equalTo('owner',user)
                query.equalTo('news',object)
                query.find().then((results)=>{
                    if (results.length == 0){
                        var lo = new AV.Object('DissNews')
                        lo.set('owner',user)
                        lo.set('news',object)
                        lo.save().then((result)=>{
                            var news = AV.Object.createWithoutData('PostNews',object.getObjectId())
                            news.increment('dissNumber',1)
                            news.increment('popularity',-1)
                            news.save()
                            var data = this.state.listData
                            data[index].dissNum = data[index].dissNum+1
                            data[index].isDissed = true
                            this.setState({listData:data})
                            
                            this.refs.love+index.setNativeProps({style:{color:'red'}})
                        }).catch((error)=>{

                        })
                    }else{
                        AV.Object.destroyAll(results).then((results)=>{
                            var news = AV.Object.createWithoutData('PostNews',object.getObjectId())
                            news.increment('dissNumber',-1)
                            news.increment('popularity',1)
                            news.save()
                            var data = this.state.listData
                            data[index].dissNum = data[index].dissNum-1
                            data[index].isDissed = false
                            this.setState({listData:data})
                        })
                    }
                }).catch((error)=>{
                    this.refs.error.show('网络不太好....')
                })
            }
        }).catch((error)=>{
            console.log(error)
            this.refs.toast.show('网络不太好...')
        })
    }

    _renderListEmpty=()=>{
        return (
            <View style={{flex: 1,alignItems: 'center',justifyContent:'center'}}>

                <Image source={require('../images/empty.jpg')} style={{width:base.deviceWidth,height:base.deviceWidth}}/>
            </View>
        )
    }
    //action button's actions

    _createNew(){
        AV.User.currentAsync().then((user)=>{
            if (user == null){
                this.refs.error.show('此行为需要登录账号...')
            }else{
                this.props.navigation.navigate('Create',{showSuccess:()=>this.refs.toast.show('发布成功!!,coin +5')})
            }
        }),((e)=>{
            this.refs.error.show('网络不太好...')
        })
    }

    _crossToaRandomDay(){
        var arrRandom = []
        var query = new AV.Query('PostNews')
        query.addAscending('updatedAt')
        query.limit(10)
        query.find().then((results)=>{
            results.map((item,index)=>{
                var time = item.get('moment')
                arrRandom.push(time)
                if (arrRandom.length ==results.length){
                    var ran = base.randomItem(arrRandom)
                    this.flatList.scrollToOffset({x:0,y:0,animated:true})
                    this.queryData(ran,true)
                }
            })
        }).catch((error)=>{
            console.log(error)
            this.refs.error.show('迁跃失败...请检查你的网络')
        })
    }

    //render
    render() {

        var showY = this.state.offset.interpolate({
            inputRange: [0,10,base.deviceWidth*0.6-navBarHeight,base.deviceWidth*0.6],
            outputRange: [-navBarHeight,-navBarHeight,0,0]
        })
        
        var op = this.state.offset.interpolate({
            inputRange: [0,10,base.deviceWidth*0.6-navBarHeight,base.deviceWidth],
            outputRange: [0,0,1,1]
        })

        var todayIsX = this.state.offset.interpolate({
            inputRange:[-20,0,base.deviceWidth*0.6,base.deviceWidth],
            outputRange:[0,0,base.deviceWidth*0.25,base.deviceWidth*0.25]
        })
        return (
            <View style={{flex:1, backgroundColor: '#fafafa'}}>

                <FlatList 
                    ref={(l)=>this.flatList=l}
                    style={styles.list}
                    ListHeaderComponent={this._renderCarousel}
                    ListEmptyComponent={this._renderListEmpty}
                    data={this.state.listData}
                    renderItem={this._renderListItem}
                    keyExtractor={(item, index) => index}
                    scrollEventThrottle={16}
                    onScroll={Animated.event(
                        [{nativeEvent:{contentOffset:{y: this.state.offset}}}]
                    )}

                    refreshing={this.state.isRefresh}
                    onRefresh={()=>this.headRefresh()}
                    onEndReached={()=>this.footerRefresh()}
                    onEndReachedThreshold={0.1}
                />
                

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

                <Animated.View style={[styles.todayIs,
                    {
                        transform:[
                            {translateX:todayIsX}
                        ]
                    }]}
                >
                    <Text style={{fontSize:20, color:'white', fontWeight:'bold'}}>{Moment(this.state.date).format('LL')}</Text>
                    <Text style={{fontSize:15, color:'white', fontWeight:'bold'}}>{Moment(this.state.date).format('dddd')}</Text>
                </Animated.View>

                <ActionButton buttonColor="rgba(229,115,115,0.8)">
                <ActionButton.Item buttonColor={base.themeColor} title="记 录" onPress={() => {this._createNew()}}>
                <Icon name="md-create" style={styles.actionButtonIcon} />
                </ActionButton.Item>
                <ActionButton.Item buttonColor='#cddc39' title="回 溯" onPress={() => {this._crossToaRandomDay()}}>
                <Icon name="md-paper-plane" style={styles.actionButtonIcon} />
                </ActionButton.Item> 
                <ActionButton.Item buttonColor='#1abc9c' title="前 往" onPress={() => {this.setState({chooseDateVisible: true})}}>
                <Icon name="md-navigate" style={styles.actionButtonIcon} />
                </ActionButton.Item>
                </ActionButton>
                
                <ChooseDateModal
                    chooseDateVisible={this.state.chooseDateVisible}
                    closeModal={()=>{this.setState({chooseDateVisible:false})}}
                    onConfirm={(day)=>{this.toOneDay(day)}}
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
    list:{
        flex: 1,
        backgroundColor: 'white'
    },

    //carousel
    carouselImage:{
        ...StyleSheet.absoluteFillObject,
        width: base.deviceWidth, 
        height: 0.6*base.deviceWidth,
        // resizeMode: 'cover'
    },

    carouselTextContainer:{
        justifyContent:'center', 
        paddingTop:20, 
        paddingBottom:20, 
        paddingHorizontal: 16,
        backgroundColor: 'rgba(250,250,250,0.8)'
    },

    //listview
 

    cellWrap:{
        paddingHorizontal: base.realSize(20),
       paddingVertical:base.realSize(10)
        
    },

    card:{

        flexDirection: 'column',
        width: base.deviceWidth - base.realSize(40),
        height: base.deviceWidth-base.realSize(40),
        marginTop: base.realSize(10)
    },

    cellImage:{
        ...StyleSheet.absoluteFillObject,
        width: base.deviceWidth - base.realSize(40),
        height: base.deviceWidth-base.realSize(40),
        borderRadius:base.realSize(12),
    },

    cellImageCover:{
        ...StyleSheet.absoluteFillObject,
        width: base.deviceWidth - base.realSize(40),
        height: base.deviceWidth - base.realSize(40),
        borderRadius:base.realSize(12),
        alignContent:'space-between'
    },

    textContainer:{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingVertical: base.realSize(10),
        flexDirection: 'row',
        paddingHorizontal: base.realSize(15),
        justifyContent:'space-between',
        borderRadius: base.realSize(12)
    },

    avatarContainer:{
        borderRadius:base.realSize(12),
        
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: base.realSize(3)
        
    },
    
    avatar:{
        width:base.realSize(40),
        height:base.realSize(40),
        borderRadius:base.realSize(20),
        marginLeft: base.realSize(8),
        marginTop: base.realSize(5),
      
    },

    nickName:{
        marginLeft: base.realSize(8),
        color: 'white',
        fontSize: base.realSize(15),
      
       
    },

    reportIcon:{
        position:'absolute',
        right: base.realSize(10),
        padding:base.realSize(5),
        alignContent:'center'
       
    },

    navBar:{
        position:'absolute',
        backgroundColor:base.themeColor,
        left:0,
        right:0,
        top:0,
        height:navBarHeight,
    },

    todayIs:{
        position:'absolute', 
        flexDirection:'column',
        left:base.realSize(20),
        top:base.realSize(base.isIOS?20:0),
        backgroundColor:'transparent'
    },

    titleAndDetail:{
        justifyContent:'center',
        backgroundColor:'transparent',
        width:base.deviceWidth-base.realSize(110)
    },

    title:{
        fontSize: 13, 
        fontWeight: 'bold', 
        letterSpacing: 0.5,
        backgroundColor: 'transparent',
        color:'#ffffff'
    },

    detail:{
        marginTop: base.realSize(5), 
        fontSize: 12, 
        fontStyle: 'italic',
        backgroundColor: 'transparent',
        color:'#ffffff'
    },

    loveOrNotNum:{
        marginRight:base.realSize(3),
        fontSize:base.realSize(12), 
        color:'white'
    },

    //type
    jianwen:{
        position: 'absolute',
        top: base.realSize(30),
        left: 0,
        width: base.realSize(9),
        height: base.realSize(18),
        backgroundColor: '#00bcd4'
    },

    yaoyan:{
        position: 'absolute',
        top: base.realSize(30),
        left: 0,
        width: base.realSize(9),
        height: base.realSize(18),
        backgroundColor: '#9c27b0'
    },

    jishi:{
        position: 'absolute',
        top: base.realSize(30),
        left: 0,
        width: base.realSize(9),
        height: base.realSize(18),
        backgroundColor: '#ffca28'
    }
})