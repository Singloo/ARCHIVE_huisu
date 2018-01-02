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

} from 'react-native'


import base from '../base/base'
import PhotoBrowser from 'react-native-photo-browser'

export default class ShowPhotoBrowser extends Component {
    constructor(props){
        super(props)
        
        
    }

    componentDidMount() {
        
    }

    componentWillUnmount() {
    
    }

    render(){
        var medias = this.props.images
        var index = this.props.initialIndex
        return(
            <Modal
                animationType='none'
                onRequestClose={()=>{}}
                transparent={true}
                visible={this.props.isShow}
            >
                <PhotoBrowser
                    onBack={()=>this.props.closeModal()}
                    mediaList={medias}
                    initialIndex={index}
                    displayActionButton={false}
                    displayTopBar={true}
                    enableGrid={false}
                />


            </Modal>
        )
    }

}


const styles = StyleSheet.create({

})