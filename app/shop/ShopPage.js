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
    Alert,
    ScrollView
} from 'react-native'

import AV, { Query } from 'leancloud-storage'
import {BlurView} from 'react-native-blur'
import {Button} from 'react-native-elements'
import base from '../base/base'
import Moment from 'moment'
import Toast,{DURATION} from 'react-native-easy-toast'

import Secret from './Secret'

const treasure = [1,1,2,2,2,2,3,3,3,3,5,5,5,5,6,6,6,6,7,7,7,7,7,8,8,8,10,10,10,100]
const tiger = [1,1,2,2,2,2,2,2,2,3,3,3]
const blessing=['生日快乐~~~','晚安~~','love you','都会过去的','你不是最惨的','啊,你....','什么?','为什么会这样?...','刚刚给你打了100万,去吱付宝看看吧','我认识你...','早上好啊','人被杀...就会死的','开心当然最重要了']

const beautyAgree=['谢谢','只是..不善拒绝罢了','你怕不是想多了?','啊,真是意料之内','我应该表现得惊喜吗?','你不走?','不可能的','少yy','第一次见面,我保证这是最后一次']
const beautyRefuse=['呵呵','你是谁?','你也配?','庸人','loser大概就是你吧','真是....千篇一律啊','你以为呢','活在梦里','可以让开么?','何时轮得到你?']

const mose = ['.','-']

const book = ['再没有...可以原谅我们的人','Be wild','在意别人的看法,这是作为人类所拥有的特征','人类是一个光蛋','我看见大地一片金色流动','对与错,不过是人类设定的标准...','总有傻逼跳出来','我还能去反驳你么?','不再评论人和事','在下有一绝学...','哦?出手吧','没想到吧?爷会飞!','后会有期!','你们未免也太愚蠢了吧','贪婪是你','不要放纵','人类这么多,大部分人都是傻逼也是可以接受的','虚荣是你']

const inCreaseSomeNum = ['kindNum','charmNum','devilNum']

const allTitle = ['mei','shen','mo','xia','xie','meng','ling','yao','yuchun']

const kind = ['xia','yuchun','shen']
const charm = ['mei','meng','ling']
const devil = ['mo','xie','yao']

export default class ShopPage extends Component {
    static navigationOptions={
        title:'薯片半价商店',
        
    }

    
    constructor(props){
        super(props)
        this.state ={
           portalTappedNum:0,
           goBackTappedNum:0,
           secretVisible:false
        }
        
        this.data = [
            {
                iteminfo:'宝箱!!!,居然免费,可惜一天一个..',
                imageSource:require('../images/productTreasure.jpg'),
                price:'免费',
                alertTitle:'打开宝箱?',
                onPurchase:this._treasure,
            },
        
            {
                iteminfo:'老虎机,爱玩不玩',
                imageSource:require('../images/productTiger.jpg'),
                price:'5coin/次',
                alertTitle:'玩老虎机么?',
                onPurchase:this._tiger,
            },
        
            {
                iteminfo:'熊猫机,来玩嘛~',
                imageSource:require('../images/productPanda.jpg'),
                price:'10coin/次',
                alertTitle:'玩熊猫机么?',
                onPurchase:this._panda,
            },
        
            {
                iteminfo:'一个乞丐,你想做什么?',
                imageSource:require('../images/productBegger.jpg'),
                price:'8coin/次',
                alertTitle:'玩乞丐么?',
                onPurchase:this._begger,
            },
        
            {
                iteminfo:'哇,好看的女生,与你何干?',
                imageSource:require('../images/productBeauty.jpg'),
                price:'15coin/次',
                alertTitle:'触发一次行为?',
                onPurchase:this._beauty,
            },
        
            {
                iteminfo:'一本奇怪的书,能修仙?',
                imageSource:require('../images/productBook.jpg'),
                price:'20coin/次',
                alertTitle:'翻开一页书?',
                onPurchase:this._book,
            },
        
            {
                iteminfo:'传送枪,能让你去往未来...,代价似乎比回去低',
                imageSource:require('../images/productPortalgun.jpg'),
                price:'55555',
                alertTitle:'打开时空之门?',
                onPurchase:this._portalgun,
            },
        
            {
                iteminfo:'我可以让你回到过去,你信么?',
                imageSource:require('../images/productGoback.jpg'),
                price:'99999',
                alertTitle:'回到过去?',
                onPurchase:this._goback,
            },
        ]
    }

    componentWillMount(){
    
    }

    componentDidMount(){
        this._ifHasNewTitle()
    }

    _ifHasNewTitle(){
        AV.User.currentAsync().then((user)=>{
            if (user != null){
                var query = new AV.Query('UserTitle')
                query.equalTo('owner',user)
                query.include('owner')
                query.find().then((result)=>{
                    var object = result[0]
                    var kindNum = object.get('kindNum')
                    var devilNum = object.get('devilNum')
                    var charmNum = object.get('charmNum')
                    var mysticNum = object.get('mysticNum')
                    //kind title
                    if (kindNum >= 50 && kindNum < 100){
                        if (!object.get('xia')){
                            object.set('xia',true)
                            object.save()
                            alert('解锁称号: 侠')
                        }
                    }else if (kindNum >= 150 && kindNum < 150){
                        if (!object.get('yuchun')){
                            object.set('yuchun',true)
                            object.save()
                            alert('解锁称号: 鱼唇')
                        }
                    }else if(kindNum >= 500){
                        if (!object.get('shen')){
                            object.set('shen',true)
                            object.save()
                            alert('解锁称号: 神')
                        }
                    }

                    //devil
                    if (devilNum >= 50 && devilNum < 100){
                        if (!object.get('xie')){
                            object.set('xie',true)
                            object.save()
                            alert('解锁称号: 邪')
                        }
                    }else if (devilNum >= 100 && devilNum < 150){
                        if (!object.get('mo')){
                            object.set('mo',true)
                            object.save()
                            alert('解锁称号: 魔')
                        }
                    }else if(devilNum >= 200){
                        if (!object.get('yao')){
                            object.set('yao',true)
                            object.save()
                            alert('解锁称号: 妖')
                        }
                    }
                    //charm
                    if (charmNum >= 50 && charmNum < 100){
                        if (!object.get('mei')){
                            object.set('mei',true)
                            object.save()
                            alert('解锁称号: 魅')
                        }
                    }else if (charmNum >= 150 && charmNum < 150){
                        if (!object.get('meng')){
                            object.set('meng',true)
                            object.save()
                            alert('解锁称号: 萌')
                        }
                    }else if(charmNum >= 500){
                        if (!object.get('ling')){
                            object.set('ling',true)
                            object.save()
                            alert('解锁称号: 绫')
                        }
                    }

                    //mystic
                    if (mysticNum >= 100){
                        var randomTitle = base.randomItem(allTitle)
                        object.set(randomTitle,true)
                        object.increment('mysticNum',-100)
                        object.save()
                        alert('由于某种神秘力量...你解锁了一个随机称号')
                    }
                })
            }
        })
    }
    _beforePay= (title,func)=>{
        Alert.alert(title,'',[
            {text:'点错了', onPress:()=>{},style:'cancel'},
            {text:'是的', onPress:func}
        ])
    }


    _treasure=()=>{
       AV.User.currentAsync().then((user)=>{
           if (user == null){
                this.refs.error.show('上面写着...没有账号,不可打开...')
           }else{
                var query = new AV.Query('UserTitle')
                query.equalTo('owner',user)
                query.include('owner')
                query.find().then((result)=>{

                    var object = result[0]
                    var owner = object.get('owner')
                    var date = object.get('checkInDate')
                    // var moment = new Date(Moment())
                    if (date == null){
                        this._checkIn(object,owner)
                    }else{
                        var lastCheckInDate = Moment(date)
                        var isAfterOneDay = Moment().subtract(20,'hours').isAfter(lastCheckInDate)
    
                        if (isAfterOneDay){
                            this._checkIn(object,owner)
                        }else{
                            Alert.alert('一天只可获得一次....人类..不可贪心')
                        }
                    }
                })
           }
       })
    }

    _checkIn=(object,owner)=>{
        var randomCoin = base.randomItem(treasure)
        object.set('checkInDate',new Date(Moment()))
        object.save()
        owner.increment('userCoin',randomCoin)
        owner.save()
        Alert.alert('打开宝箱...获得了金币+'+`${randomCoin}`)
    }
    //

    _tiger=()=>{
        AV.User.currentAsync().then((user)=>{
            if (user == null){
                this.refs.error.show('嗯...你的账号呢?')
            }else{
                var query = new AV.Query('UserTitle')
                query.equalTo('owner',user)
                query.include('owner')
                query.find().then((result)=>{
                    var object = result[0]
                    var owner = object.get('owner')
                    if (owner.get('userCoin') < 5){

                        Alert.alert('你的金币不足...玩不了')
                    }else{
                        owner.increment('userCoin',-5)
                        owner.save().then((user)=>{
                            var randomNum = Math.random()
                            if (randomNum > 0.9){
                                user.increment('userCoin',100)
                                user.save()
                                Alert.alert('哇,运气爆炸,获得 100 金币')
                            }else if (randomNum < 0.3){
                                user.increment('userCoin',5)
                                user.save()
                                Alert.alert('获得 5 金币,嗯...至少没亏')
                            }else{
                                this._tigerDefine(object,user)
                            }
                        }).catch((error)=>{
                            console.log(error)
                            this.refs.error.show('网络...')
                        })
                    }
                })
            }
        })
    }

    _tigerDefine=(object,user)=>{
        var tigerRandom = base.randomItem(tiger)
        var coin = base.randomItem(treasure)
        var titleNum = base.randomItem(inCreaseSomeNum)
        if (tigerRandom == 1){
            Alert.alert('什么都没有...'+base.randomItem(blessing))
        }else if(tigerRandom == 2){
            user.increment('userCoin',coin)
            object.save()
            Alert.alert('获得了一些金币..'+`${coin}`)
        }else if(tigerRandom == 3){
            object.increment(titleNum,5)
            object.save()
            Alert.alert('一些属性增加了...似乎会发挥一些作用')
        }
      
        
    }

    //panda

    _panda=()=>{
        AV.User.currentAsync().then((user)=>{
            if (user == null){
                this.refs.error.show('嗯...你的账号呢?')
            }else{
                var query = new AV.Query('UserTitle')
                query.equalTo('owner',user)
                query.include('owner')
                query.find().then((result)=>{
                    var object = result[0]
                    var owner = object.get('owner')
                    if (owner.get('userCoin') < 10){
                        Alert.alert('你的金币不足...玩不了')
                    }else{
                        owner.increment('userCoin',-10)
                        owner.save().then((user)=>{
                            var randomNum = Math.random()
                            if (randomNum > 0.9){
                                user.increment('userCoin',200)
                                user.save()
                                Alert.alert('哇,运气爆炸,获得 200 金币')
                            }else if (randomNum < 0.3){
                                user.increment('userCoin',10)
                                user.save()
                                Alert.alert('获得 10 金币,嗯...至少没亏')
                            }else{
                                this._pandaDefine(object,user)
                            }
                        }).catch((error)=>{
                            this.refs.error.show('网络...')
                        })
                    }
                })
            }
        })
    }

    _pandaDefine=(object,user)=>{
        var tigerRandom = base.randomItem(tiger)
        var coin = 2*base.randomItem(treasure)
        var titleNum = base.randomItem(inCreaseSomeNum)
        if (tigerRandom == 1){
            Alert.alert('什么都没有...'+base.randomItem(blessing))
        }else if(tigerRandom == 2){
            user.increment('userCoin',coin)
            object.save()
            Alert.alert('获得了一些金币..'+`${coin}`)
        }else if(tigerRandom == 3){
            object.increment(titleNum,10)
            object.save()
            Alert.alert('一些属性增加了...似乎会发挥一些作用')
        }
    }
//begger

    _begger=()=>{
        AV.User.currentAsync().then((user)=>{
            if (user == null){
                this.refs.error.show('账号啊...')
            }else{
                var query = new AV.Query('UserTitle')
                query.equalTo('owner',user)
                query.include('owner')
                query.find().then((result)=>{
                    var object = result[0]
                    var owner = object.get('owner')
                    if(owner.get('userCoin') < 8){
                        Alert.alert('没钱你装大款?')
                    }else{
                        owner.increment('userCoin',-8)
                        owner.save()
                        Alert.alert('你想干吗?','',[
                            {text:'揍他', onPress:()=>{
                                object.increment('devilNum',10)
                                object.save()
                                if (Math.random() < 0.3){
                                    owner.increment('userCoin',2)
                                    owner.save()
                                    alert('手无缚鸡之力的乞丐被你打跑了,你捡起了他掉了2Coin,呸,败类')
                                }else{
                                    alert('乞丐一脸血污,你满意了?')
                                }
                            },style:'cancel'},
                            {text:'施舍', onPress:()=>{
                                object.increment('kindNum',10)
                                object.save()
                                if (Math.random() < 0.3){
                                    owner.increment('userCoin',-2)
                                    owner.save()
                                    alert('乞丐表示嫌弃,并抢走 2 coin.不过某些数值增加了...')
                                }else{
                                    alert('感谢你的金币,虽然并不能改变什么..(一些东西增加了...)')
                                }
                            }}
                        ])
                    }
                })
            }
        })
    }
    //beauty

    _beauty=()=>{
        AV.User.currentAsync().then((user)=>{
            if (user==null){
                this.refs.error.show('5731次...请登录账号..')
            }else{
                var query = new AV.Query('UserTitle')
                query.equalTo('owner',user)
                query.include('owner')
                query.find().then((result)=>{
                    var object = result[0]
                    var owner = object.get('owner')
                    if (owner.get('userCoin') < 15){
                        Alert.alert('快走快走,别挡着我做生意')
                    }else{
                        owner.increment('userCoin',-15)
                        owner.save().then((user)=>{
                            var agree = base.randomItem(beautyAgree)
                            var refuse = base.randomItem(beautyRefuse)
                            Alert.alert('你想做什么?','',[
                                {text:'路过', onPress:()=>{
                                    if (Math.random()< 0.3){
                                        object.increment('charmNum',30)
                                        object.save()
                                        Alert.alert('++她说: ',agree)
                                    }else{
                                        object.increment('charmNum',-5)
                                        object.save()
                                        Alert.alert('-她说: ',refuse)
                                    }
                                }},
                                {text:'献花', onPress:()=>{
                                    if (Math.random()< 0.2){
                                        Alert.alert('=她说: ',refuse)
                                    }else{
                                        object.increment('charmNum',10)
                                        object.save()
                                        Alert.alert('+她说: ',agree)
                                    }
                                }}
                            ])
                        }).catch((error)=>{
                            console.log(error)
                            this.refs.error('与母星交互数据失败...放心,没扣你钱')
                        })
                    }
                })
            }
        })
    }
    //book
    _book=()=>{
        AV.User.currentAsync().then((user)=>{
            if (user == null){
                this.refs.error.show('账号啊...816251')
            }else{
                var query = new AV.Query('UserTitle')
                query.equalTo('owner',user)
                query.include('owner')
                query.find().then((result)=>{
                    var object = result[0]
                    var owner = object.get('owner')
                    if(owner.get('userCoin') < 20){
                        Alert.alert('没钱你装大款?')
                    }else{
                        owner.increment('userCoin',-20)
                        owner.save().then((user)=>{
                            var randomNum = Math.random()
                            if (randomNum < 0.3){
                                var finalMose = ''
                                for (var i=0;i<10;i++){
                                    finalMose = finalMose + base.randomItem(mose)
                                }
                                object.increment('mysticNum',30)
                                object.save()
                                Alert.alert('出现了一些奇怪的东西',finalMose)
                            }else{
                               var random = base.randomItem(book)
                               object.increment('mysticNum',20)
                               object.save()
                               Alert.alert('上面写着:',random)
                            }
                        }).catch((error)=>{
                            console.log(error)
                            this.refs.error('与母星交互数据失败...放心,没扣你钱')
                        })
                    }
                })
            }
        })
    }

    //

    _portalgun=()=>{
        if (this.state.goBackTappedNum == 5 && this.state.portalTappedNum == 2){
            this.setState({secretVisible:true})
        }else{
            alert('从技术上而言,去往未来的成本更低,但是你带够钱了么?')
            this.setState({portalTappedNum:this.state.portalTappedNum+1})
        }
        

    }


    _goback=()=>{
        if (this.state.goBackTappedNum == 5 && this.state.portalTappedNum == 2){
            this.setState({secretVisible:true})
        }else{
            alert('快回去干活,不要整天想这些有的没的')
            this.setState({goBackTappedNum:this.state.goBackTappedNum+1})
        }
        
    }

    _renderItem(){
        return this.data.map((item,i)=>{
            return (
                <View style={styles.container} key={i}>
                    <Image source={item.imageSource} style={{width:base.deviceWidth/2,height:base.deviceWidth/2}}/>
                    <BlurView style={styles.textContainer} blurType='dark' blurAmount={8}/>
                        <Text style={{color:'white',backgroundColor:'transparent'}}>{item.iteminfo}</Text>
                        <View style={{justifyContent:'space-between',alignItems:'center',flexDirection:'row',width:base.deviceWidth/2}}>
                            <Text style={{fontSize:13,color:'#e57373',marginLeft:20}}>{item.price}</Text>
                            <Button
                                title='购 买'
                                onPress={()=>this._beforePay(item.alertTitle,item.onPurchase)}
                                buttonStyle={{backgroundColor:'transparent',width:base.realSize(60),height:base.realSize(20)}}
                                textStyle={{color:base.themeColor,fontSize:13}}
                            />
                        </View>
                    {/* </BlurView> */}
                </View>
            )
        })
    }


    render() {
        return (
            <View style={{flex: 1,backgroundColor: "#f3f3f3",flexDirection:'row',flexWrap:'wrap'}}>
                <ScrollView style={{flex: 1}}>
                    <View style={{flex: 1,backgroundColor: "#f3f3f3",flexDirection:'row',flexWrap:'wrap'}}>
                    {this._renderItem()}
                    </View>
                </ScrollView>

                <Toast ref='toast' position='center'/>
                <Toast 
                    ref='error'
                    style={{backgroundColor:base.errorColor}}
                    position='top'
                    positionValue={200}
                    textStyle={{color:'white'}}
                    fadeInDuration={750}
                    fadeOutDuration={1000}
                />  

                <Secret 
                    secretVisible={this.state.secretVisible} 
                    closeModal={()=>{this.setState({secretVisible:false})}}
                />
            </View>
        )     
        
    }
}

const styles = StyleSheet.create({
    container:{
        width:base.deviceWidth/2,
        padding:5,
        height:base.deviceWidth/2 + base.realSize(35),
        flexDirection:'column',

    },

    textContainer:{
        position:'absolute',
        bottom:0,
        width:base.deviceWidth/2,
        paddingVertical:base.realSize(5),
        alignItems:'center',
        flexDirection:'column',
        
    }
})  