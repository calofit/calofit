import {Stack} from 'expo-router';
import * as SplashScreen from "expo-splash-screen";
import {View} from "react-native";
import * as ScreenOrientation from 'expo-screen-orientation';

SplashScreen.preventAutoHideAsync();
const Layout = () => {

    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);

    return (
        <View className="h-full w-full">
            <Stack />
        </View>
    );
}

export default Layout;