import {Stack} from 'expo-router';
import * as SplashScreen from "expo-splash-screen";
import {SafeAreaView} from "react-native";

SplashScreen.preventAutoHideAsync();

const Layout = () => {

    return (
        <SafeAreaView className="h-full w-full bg-neutral-800">
            <Stack />
        </SafeAreaView>
    );
}

export default Layout;