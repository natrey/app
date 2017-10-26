import React, { Component } from 'react';

import { Button, View, Text, StyleSheet,
    TouchableHighlight,
    NativeAppEventEmitter,
    NativeEventEmitter,
    NativeModules,
    Platform,
    PermissionsAndroid,
    ListView } from 'react-native';

import BleManager from 'react-native-ble-manager';

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

export default class BluetoothComponent extends Component {
    
    constructor() {
        super();

        this.state = {
            scanning: false
        };
        
        this.startScan = this.startScan.bind(this);
        
    }
    
    componentDidMount() {

        BleManager.start({showAlert: false})
        .then(() => {
            // Success code
            console.log('Module initialized');
        });
        
        this.handleDiscoverPeripheral = this.handleDiscoverPeripheral.bind(this);

        NativeAppEventEmitter.addListener(
            'BleManagerDiscoverPeripheral',
            this.handleDiscoverPeripheral
        );

        bleManagerEmitter.addListener(
            'BleManagerStopScan',
            () => {
                console.log('Scanning stopped!')
            }
        );

        //A peripheral was connected.
        NativeAppEventEmitter.addListener('BleManagerConnectPeripheral', (args) => {
            console.log('BleManagerConnectPeripheral',args);
        });

        

        
        if (Platform.OS === 'android' && Platform.Version >= 23) {
            PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((result) => {
                if (result) {
                    console.log("Permission is OK");
                } else {
                    PermissionsAndroid.requestPermission(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((result) => {
                        if (result) {
                            console.log("User accept");
                        } else {
                            console.log("User refuse");
                        }
                    });
                }
            });
        }
        
    }    
    
    startScan() {
        BleManager.enableBluetooth()
            .then(() => {
                // Success code
                console.log('The bluetooth is already enabled or the user confirm');

                if (!this.state.scanning) {
                    BleManager.scan([], 15, true).then((results) => {
                        console.log('Scanning...');
                        this.setState({scanning:true});
                    });
                }
                
            })
            .catch((error) => {
                // Failure code
                console.log('The user refuse to enable bluetooth');
            });          
    }
    
    handleDiscoverPeripheral(data){
        console.log(data);
        BleManager.getDiscoveredPeripherals([])
            .then((peripheralsArray) => {
                // Success code
                let result = JSON.stringify(peripheralsArray);
                console.log('Discovered peripherals: ' + result);
            });
    }

    getConnectedPeripherals(){
        BleManager.getConnectedPeripherals([])
            .then((peripheralsArray) => {
                console.log('Connected peripherals: ' + JSON.stringify(peripheralsArray));
            });
    }
    
    render() {
        return (
            <View>
                <TouchableHighlight style={{marginTop: 40,margin: 20, padding:20, backgroundColor:'#ccc'}} onPress={this.startScan}>
                    <Text>Scan Bluetooth ({this.state.scanning ? 'on' : 'off'})</Text>
                </TouchableHighlight>
                <TouchableHighlight style={{marginTop: 40,margin: 20, padding:20, backgroundColor:'#ccc'}} onPress={this.getDevices}>
                    <Text>Get Devices</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={{marginTop: 40,margin: 20, padding:20, backgroundColor:'#ccc'}}
                    
                    onPress={this.getConnectedPeripherals.bind(this)}>
                    <Text>getConnectedPeripherals</Text>
                </TouchableHighlight>
            </View>
        )
    }
}

const styles = StyleSheet.create({ 
    
});