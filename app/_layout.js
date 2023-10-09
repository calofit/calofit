import { Stack } from 'expo-router';
import * as SplashScreen from "expo-splash-screen";
import {View} from "react-native";
import * as ScreenOrientation from 'expo-screen-orientation';
import { RootSiblingParent } from 'react-native-root-siblings';


SplashScreen.preventAutoHideAsync();
const Layout = () => {

    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);

    return (
        <View className="h-full w-full bg-neutral-900">
            <RootSiblingParent>
                <Stack />
            </RootSiblingParent>
        </View>
    );
}

export default Layout;