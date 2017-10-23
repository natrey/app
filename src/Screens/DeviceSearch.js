import React, { Component } from 'react';
import {
    Button,
    StyleSheet,
    Text,
    View
} from 'react-native';
import HeaderButton from '../Components/HeaderButton';

export default class DeviceSearch extends Component {
    
    render() {
        const { navigate } = this.props.navigation;        
        return(
            <View style={styles.container}>
                <HeaderButton onPress={() => navigate('DrawerOpen')} />
                <Text style={styles.header}>
                    Device Search
                </Text>
                <View style={styles.button}> 
                    <Button
                        onPress={() => navigate('Profile', { user: 'User' })}
                        title="Open Profile"
                    />    
                </View>                
                <Button
                    onPress={() => navigate('Modal')}
                    title="Open Modal"
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