import { Stack } from 'expo-router';
import { View } from "react-native";
import { RootSiblingParent } from 'react-native-root-siblings';

const Layout = () => {

    return (
        <View className="h-full w-full bg-neutral-900">
            <RootSiblingParent>
                <Stack />
            </RootSiblingParent>
        </View>
    );
}

export default Layout;