import { Stack } from 'expo-router';
import * as SplashScreen from "expo-splash-screen";
import { SafeAreaView } from "react-native";
import { RootSiblingParent } from 'react-native-root-siblings';


SplashScreen.preventAutoHideAsync();

const Layout = () => {

    return (
        <SafeAreaView className="h-full w-full bg-neutral-900">
            <RootSiblingParent>
                <Stack />
            </RootSiblingParent>
        </SafeAreaView>
    );
}

export default Layout;