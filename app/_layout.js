import * as ScreenOrientation from 'expo-screen-orientation';
import * as SplashScreen from "expo-splash-screen";
import { Drawer } from '../comp/Drawer';
import { Entypo } from '@expo/vector-icons';
import { Text, View } from "react-native";


SplashScreen.preventAutoHideAsync();
const Layout = () => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    return (
        <Drawer screenOptions={{
            headerShown: false,
            drawerActiveBackgroundColor: '#262626',
            drawerActiveTintColor: 'white',
            drawerInactiveBackgroundColor: '#262626',
            drawerInactiveTintColor: 'white',
            drawerType: 'front',
            drawerStyle: {
                backgroundColor: '#171717',
                padding: 4,
            },
            drawerItemStyle: {
                borderRadius: 40,
                marginBottom: 4,
            },
            drawerLabelStyle: {
                fontSize: 18,
                lineHeight: 24,
                fontWeight: 700,
            }
        }}
        >
            <Drawer.Screen
                name="index" // This is the name of the page and must match the url from root
                options={{
                    drawerLabel: "Home",
                    title: "overview",
                    drawerItemStyle: { display: 'none' }
                }}
            />
            <Drawer.Screen
                name="home" // This is the name of the page and must match the url from root
                options={{
                    drawerLabel: () => <View className="flex flex-row p-2 items-center"><Entypo name="home" size={32} color="white" /><Text className="ml-4 text-2xl font-bold tracking-tight text-white">Home</Text></View>,
                    title: "Home",
                }}
            />
            <Drawer.Screen
                name="settings" // This is the name of the page and must match the url from root
                options={{
                    drawerLabel: () => <View className="flex flex-row p-2 items-center"><Entypo name="cog" size={32} color="white"/><Text className="ml-4 text-2xl font-bold tracking-tight text-white">Settings</Text></View>,
                    title: "Settings",
                }}
            />
        </Drawer>
    );
}

export default Layout;