import React from 'react';
import {
    DrawerNavigator,
    StackNavigator
} from 'react-navigation';
import getSlideFromRightTransition from 'react-navigation-slide-from-right-transition';
import Home from './Screens/Home';
import DeviceSearch from './Screens/DeviceSearch';
import WifiDeviceSearch from './Screens/WifiDeviceSearch';
import Profile from './Screens/Profile';
import Modal from './Screens/Modal';
import Drawer from './Components/Drawer';

// Stack navigation for main screens
const AppNavigation = StackNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            header: null
        },
    },
    DeviceSearch: {
        screen: DeviceSearch,
        navigationOptions: {
            title: 'Device search'
        },
    },
    WifiDeviceSearch: {
        screen: WifiDeviceSearch,
        navigationOptions: {
            title: 'Wifi Device search'
        },
    },
    Profile: {
        screen: Profile,
        navigationOptions: ({ navigation }) => ({
            title: `${navigation.state.params.user}'s Profile`,
        }),
    },
}, {
    headerMode: 'screen',
    transitionConfig: getSlideFromRightTransition
});

// Wrap stack navigation into drawer navigation
const StackWithDrawerNavigation = DrawerNavigator({
    Home: {
        screen: AppNavigation,
    }
}, {
    // Register custom drawer component
    contentComponent: props => <Drawer {...props} />
});

// Stack together drawer with stack cards and modal navigation
// to call Modal screen from any other screen
const Root = StackNavigator({
    StackWithDrawer: {
        screen: StackWithDrawerNavigation,
    },
    Modal: {
        screen: Modal
    },
}, {
    // In modal mode screen slides up from the bottom
    mode: 'modal',
    headerMode: 'none',
});

export default Root;


