import { Stack } from 'expo-router';
import * as ScreenOrientation from 'expo-screen-orientation';
import { View } from "react-native";
import { RootSiblingParent } from 'react-native-root-siblings';

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