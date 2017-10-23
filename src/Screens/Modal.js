import React, { Component } from 'react';
import {
    Button,
    StyleSheet,
    Text,
    View
} from 'react-native';
import HeaderButton from '../Components/HeaderButton'; 

export default class Modal extends Component {
    
    render(){
        const { goBack } = this.props.navigation;
        return (
            <View
                style={styles.container}                
            >
                <HeaderButton 
                    onPress={() => goBack()} 
                    icon='md-close'
                />
                <Text style={styles.header}>
                    Hi, i am a modal!
                </Text>
                <Button
                    onPress={() => goBack()}
                    title='Close me'
                />
            </View>
        );
    }
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        fontSize: 20,
        marginVertical: 20,
        color: '#000'
    },
});