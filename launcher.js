/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
'use strict';

 import React, {Component} from 'react';
 import{
     AppRegistry,
 }from 'react-native';

 import rootApp from './app/root';
 import AV from 'leancloud-storage';
 
 AV.init({appId:'UYganDzaND6XsvYaL552tlbs-gzGzoHsz', appKey:'l5ld3QxRSvLCaJ4Rpv6gXbIq'});
 AppRegistry.registerComponent('old_fasion', () => rootApp);
