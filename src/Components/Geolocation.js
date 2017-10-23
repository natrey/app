import React, { Component } from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import Icon from 'react-native-vector-icons/Ionicons';

export default class Geolocation extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            latitude: 0,
            longitude: 0,
            error: null,
        };
    }

    loadGeolocation() {
        return navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    error: null,
                });
            },
            (error) => this.setState({ error: error.message })
        ); 
    }
    
    updateCoordinates(e) {
        this.setState({
            latitude: e.nativeEvent.coordinate.latitude,
            longitude: e.nativeEvent.coordinate.longitude
        });
    }
    
    componentDidMount() {
        this.loadGeolocation();
    }

    render() {
        return (
            <View>        
                
                <View style={styles.mapContainer}>
                    <MapView                        
                        style={styles.map}
                        region={{
                            latitude: this.state.latitude,
                            longitude: this.state.longitude,
                            latitudeDelta: 0.0491,
                            longitudeDelta: 0.0375
                        }}
                    >
                        <MapView.Marker
                            draggable
                            coordinate={{
                                latitude: this.state.latitude,
                                longitude: this.state.longitude
                            }}
                            pinColor={'#4F8EF7'}
                            onDragEnd={(e) => this.updateCoordinates(e)}
                        />
                    </MapView>
                </View>
                
                {
                    this.state.latitude ? <View style={styles.textContainer}>
                        <Text style={styles.textContent}>Latitude: {this.state.latitude}</Text>
                        <Text style={styles.textContent}>Longitude: {this.state.longitude}</Text>
                    </View> : null
                }

                {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
                
                <View style={styles.buttonContainer}>                   
                    <Icon.Button
                        name={'md-locate'}
                        size={30}
                        backgroundColor="#FFF"
                        color={'#4F8EF7'}
                        onPress={() => this.loadGeolocation()}
                        style={{paddingRight: 0}}
                    />
                </View>
                
            </View>
        );
    }
}

const styles = StyleSheet.create({    
    textContainer: {
        position: 'absolute',
        right: 10,
        top: 10,
        padding: 10,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'        
    },
    textContent: {
        color: '#000',
        textAlign: 'center',
        justifyContent: 'center',
    },
    mapContainer: {
        width: '100%',
        height: '100%'
    },
    map:{
        ...StyleSheet.absoluteFillObject
    },
    buttonContainer: {
       position: 'absolute',
       right: 10,
       bottom: 60,
       justifyContent: 'center',
       alignItems: 'center', 
    }
});
