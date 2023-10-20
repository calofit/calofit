import * as ScreenOrientation from 'expo-screen-orientation';
import * as SplashScreen from "expo-splash-screen";
import { Drawer } from '../comp/Drawer';


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
                width: '100%',
                backgroundColor: '#171717',
                padding: 4,
            },
            drawerItemStyle: {
                padding: 4,
                borderRadius: 40
            },
            drawerLabelStyle: {
                
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
                    drawerLabel: "Home",
                    title: "Home",
                }}
            />
            <Drawer.Screen
                name="settings" // This is the name of the page and must match the url from root
                options={{
                    drawerLabel: "Settings",
                    title: "Settings",
                }}
            />
        </Drawer>
    );
}

export default Layout;