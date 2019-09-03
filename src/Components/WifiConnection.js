import React, { Component } from 'react';
import {
  PermissionsAndroid,
  ScrollView,
  View,
  Text,
  StyleSheet,
  Button,
  ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import wifi from 'react-native-android-wifi';
import Toast from '@remobile/react-native-toast';

const GAUGE_SSID = 'SagittaGauge';
const GAUGE_PWD = 'Sagittarius';

class WifiConnection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lat: this.props.lat,
      lng: this.props.lng,
      isWifiNetworkEnabled: false,
      connected: false,
      inRange: false,
      inProgress: false,
      loading: false,
    };

    this.checkConnection = this.checkConnection.bind(this);
    this.startDiscovery = this.startDiscovery.bind(this);
    this.enableWifi = this.enableWifi.bind(this);
    this.checkConnection = this.checkConnection.bind(this);
    this.checkConnectionStatus = this.checkConnectionStatus.bind(this);
  }

  componentDidMount() {
    setInterval(this.checkConnection, 3000);
  }

  componentWillUnmount() {
    clearInterval(this.checkConnection)
  }

  checkConnection() {
    wifi.isEnabled(isEnabled => {
      this.setState({ isWifiNetworkEnabled: isEnabled });

      if (isEnabled) this.checkConnectionStatus();
    });
  }

  checkConnectionStatus() {
    wifi.connectionStatus(isConnected => {
      if (isConnected) {
        wifi.getSSID(ssid => {
          if (ssid === GAUGE_SSID) {
            this.setState({ connected: true });
          }
        });
      }
    });
  }

  async askForPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          'title': 'Wifi networks',
          'message': 'We need your permission in order to find wifi networks'
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Toast.showShortBottom('Permission granted');
      } else {
        Toast.showShortBottom('Permission denied');
      }
    } catch (err) {
      console.warn(err)
    }
  }

  async enableWifi() {
    try {
      await this.askForPermission();
      await wifi.setEnabled(true);

      this.setState({ isWifiNetworkEnabled: true });
    } catch (err) {
      console.log(err);
    }
  }
  /**
   * Discover Gauge Wi-fi  available
   */
  async startDiscovery() {
    this.setState({ loading: true });

    try {
      wifi.findAndConnect(GAUGE_SSID, GAUGE_PWD, (found) => this.setState({ inRange: found }));
    } catch (err) {
      console.log(err);
    } finally {
      this.setState({ loading: false });
    }
  }

  async startMeasurement() {
    try {
      await API.startMeasurement();

      this.setState({ inProgress: true });
    } catch (err) {
      console.log(err);
      Toast.showShortBottom(err);
    }
  }

  async stopMeasurement() {

  }

  render() {
    const { isWifiNetworkEnabled, connected, inRange, inProgress, loading } = this.state;
    console.log(this.state);
    return (
      <ScrollView>
        <View style={styles.container}>
          {isWifiNetworkEnabled ? (
            <View style={styles.devicesMsg}>
              <Text style={styles.devicesMsgText}>Wi-Fi is enabled.</Text>
              <Text style={styles.devicesMsgText}>Press "discover" to start searching.</Text>
            </View>
          ) : (
            <View style={styles.devicesMsg}>
              <Text style={styles.devicesMsgText}>Enable Wi-Fi to start discovering.</Text>
              <Button
                style={styles.devicesMsgButton}
                title={'Enable'}
                onPress={this.enableWifi}
              />
            </View>
          )}

          <View style={styles.buttonBottom}>
            {
              inProgress && connected && (
                <Button
                  title={'Stop measurement'}
                  onPress={this.stopMeasurement}
                />
              )
            }

            {
              loading && (
                <ActivityIndicator
                  style={styles.activityIcon}
                  size={60} />
              )
            }

            {
              !connected && (
                <Button
                  title={'Discover'}
                  disabled={!isWifiNetworkEnabled}
                  onPress={this.startDiscovery} />
              )
            }
            {
              (connected && !inProgress) && (
                <Button
                  title={'Start measurement'}
                  disabled={!isWifiNetworkEnabled}
                  onPress={this.startMeasurement}
                />
              )
            }
          </View>
        </View>
      </ScrollView>
    );
  }
};

WifiConnection.propTypes = {
  lat: PropTypes.any.isRequired,
  lng: PropTypes.any.isRequired
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 60
  },
  buttonBottom: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10
  },
  activityContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    ...StyleSheet.absoluteFillObject

  },
  activityIcon: {
    marginBottom: 15
  },
  devicesListItem: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginVertical: 15
  },
  devicesName: {
    fontWeight: 'bold',
    color: '#000'
  },
  devicesId: {
    color:'#000'
  },
  devicesMsg: {
    padding: 20
  },
  devicesMsgText: {
    textAlign: 'center',
    color: '#000',
    fontSize: 16
  },
  devicesMsgButton: {
    marginTop: 20,
  },
  dataList: {
    marginTop: 20,
    paddingHorizontal: 15
  },
  dataListHeading: {
    fontWeight: 'bold',
    color: '#4F8EF7',
    fontSize: 16
  },
});

function mapStateToProps(state) {
  return {
    lat: state.currentLat.lat,
    lng: state.currentLng.lng
  };
}

export default connect(mapStateToProps)(WifiConnection);