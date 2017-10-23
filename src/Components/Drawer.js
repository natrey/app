import React, { Component } from 'react';
import {
    Button,
    StyleSheet,
    Text,
    View    
} from 'react-native';

export default class Drawer extends Component {
    
    render() {
        const { navigate } = this.props.navigation;        
        return (
            <View style={styles.container}>
                <Text style={styles.header}>
                    Menu
                </Text>
                <View style={styles.button}> 
                    <Button
                        onPress={() => navigate('Modal')}
                        title="Open Modal"
                    />    
                </View>
                
                <Button
                    onPress={() => navigate('DrawerClose')}
                    title="Close me"
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
    button: {
        marginBottom: 20
    }
});