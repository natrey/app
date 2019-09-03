import React, { Component } from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import HeaderButton from '../Components/HeaderButton';
import Geolocation from '../Components/Geolocation';

class Home extends Component {
    render() {
        const { navigate } = this.props.navigation;

        return (
            <View style={styles.container}>
                <Geolocation />

                <HeaderButton
                    onPress={() => navigate('DrawerOpen')}
                />

                <View style={styles.buttonBottom}>
                    <Button
                        title="Go!"
                        onPress={() => navigate('WifiDeviceSearch')}
                    />
                </View>
            </View>
        )
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },

    mainContent: {
        margin: 10,
        alignItems: 'center'
    },
    mainContentText: {
        alignItems: 'center'
    },
    buttonBottom: {
        position: 'absolute',
        bottom: 10,
        left: 10,
        right: 10
    }
});


export default Home;

