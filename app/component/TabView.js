/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
'use strict';

import React, {Component} from 'react'
import {
    Text,
    Dimensions,
    StyleSheet,
    Animated,
    Image
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import base from '../base/base'
import {StackNavigator, TabNavigator} from 'react-navigation'

import HomePage from '../homepage/HomePage'
import CreateNew from '../homepage/CreateNew'
import DetailPage from '../homepage/DetailPage'
import ReportView from '../homepage/ReportView'
import DefaultDetail from '../homepage/DefaultDetail'
import CommentPage from '../homepage/CommentView'
import StrangerPage from '../homepage/StrangerPage'

import UserPage from '../user/UserPage'
import Login from '../user/Login'
import Regist from '../user/Regist'
import Setting from '../user/Setting'
import ChooseTitle from '../user/ChooseTitle'


import RankPage from '../rankPage/RankPage'

import ShopPage from '../shop/ShopPage'
let {width, height} = Dimensions.get('window')

const HomeTab = StackNavigator({
    Home:{
        screen: HomePage,
        navigationOptions:{
            
        },
    },

    Detail:{
        screen: DetailPage,
        navigationOptions:{
            
        },
    },

    Report:{
        screen: ReportView,
        navigationOptions:{
            
        },
    },

    DefaultDetail:{
        screen: DefaultDetail,
        navigationOptions:{
            
        },
    },

    Comment:{
        screen: CommentPage,
        navigationOptions:{
            
        },
    },

    Stranger:{
        screen: StrangerPage,
        navigationOptions:{
            
        },
    },

    Create:{
        screen: CreateNew,
        navigationOptions:{
            
        },
    }
})

const RankTab = StackNavigator({
    Rank:{
        screen: RankPage,
        navigationOptions:{
            
        }
    },

    RankToDetail:{
        screen: DetailPage,
        navigationOptions:{
            
        },
    },
    
    Stranger:{
        screen: StrangerPage,
        navigationOptions:{
            
        },
    },

    Report:{
        screen: ReportView,
        navigationOptions:{
            
        },
    },

    Comment:{
        screen: CommentPage,
        navigationOptions:{
            
        },
    },
})

const ShopTab = StackNavigator({
    Shop:{
        screen: ShopPage,
        navigationOptions:{
            
        }
    },
})

const UserTab = StackNavigator({
    User:{
        screen: UserPage,
        navigationOptions:{
            
            
        }
    },

    Login:{
        screen: Login,
        navigationOptions:{
            header:null
        }
    },


    Regist:{
        screen: Regist,
        navigationOptions:{
            header:null
        }
    },

    Setting:{
        screen: Setting,
        navigationOptions:{
            
        }
    },

    ChooseTitle:{
        screen: ChooseTitle,
        navigationOptions:{
            
        }
    },

    UserToDetail:{
        screen: DetailPage,
        navigationOptions:{
            
        },
    },
    
    Stranger:{
        screen: StrangerPage,
        navigationOptions:{
            
        },
    },

    Report:{
        screen: ReportView,
        navigationOptions:{
            
        },
    },

    Comment:{
        screen: CommentPage,
        navigationOptions:{
            
        },
    },





})

const TabView = TabNavigator(
    {
        HomeTab:{
            screen: HomeTab,
            navigationOptions:{
                tabBarLabel: '主页',
                tabBarIcon:({tintColor, focused}) => (
                    <Icon
                    name={focused ? 'ios-flower' : 'ios-flower-outline'}
                    size={base.realSize(22)}
                    color={tintColor}
                    />
                )
            }
        },

        RankTab:{
            screen: RankTab,
            navigationOptions:{
                tabBarLabel: 'Remember',
                tabBarIcon:({tintColor, focused}) => (
                    <Icon
                    name={focused ? 'ios-podium' : 'ios-podium-outline'}
                    size={base.realSize(22)}
                    color={tintColor}
                    />
                )
            }
        },

        ShopTab:{
            screen: ShopTab,
            navigationOptions:{
                tabBarLabel: '商店',
                tabBarIcon:({tintColor, focused}) => (
                    <Icon
                    name={focused ? 'ios-ice-cream' : 'ios-ice-cream-outline'}
                    size={base.realSize(22)}
                    color={tintColor}
                    />
                )
            }
        },
        UserTab:{
            screen: UserTab,
            navigationOptions:{
                tabBarLabel: '我的',
                tabBarIcon:({tintColor, focused}) => (
                    <Icon
                    name={focused ? 'ios-outlet' : 'ios-outlet-outline'}
                    size={base.realSize(22)}
                    color={tintColor}
                    />
                )
            }
        }
    },
    {
        tabBarPosition: 'bottom',
        swipeEnabled: false,
        animationEnabled: false,
        tabBarOptions: {
            inactiveTintColor: '#666',
            activeTintColor: '#4fc3f7'
        }
    }
)

export default TabView

const styles = StyleSheet.create({
    tabbar: {
        height: base.realSize(46),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    hide: {
        transform: [
            {translateX:width}
        ]
    },
    tabStyle: {
        padding: base.realSize(4)
    }
})