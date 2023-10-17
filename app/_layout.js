import * as ScreenOrientation from 'expo-screen-orientation';
import * as SplashScreen from "expo-splash-screen";
import { Drawer } from '../comp/Drawer';


SplashScreen.preventAutoHideAsync();
const Layout = () => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    return (
        <Drawer>
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