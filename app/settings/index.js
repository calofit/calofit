import { Stack, useNavigation } from "expo-router"
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar"
import { Text, View } from "react-native"
import CustomButton from "../../comp/Button"
import { StorageManager } from "../../storageManager"



export default function Settings() {
    const storageMgr = StorageManager.getInstance()
    const navigation = useNavigation()

    function reset() {
        storageMgr.reset()
        navigation.navigate("home")
    }

    return (
        <View className="flex h-full w-full bg-neutral-900 p-12">
            <ExpoStatusBar style="light" />
            <Stack.Screen options={{
                headerShown: false,
                headerStyle: { backgroundColor: '#262626' },
                headerTitle: '',
                headerShadowVisible: false,
            }} />
            {process.env.NODE_ENV === "development" ? (
                <CustomButton title="Reset Storage" onPress={reset} />
            ) : <Text className="text-2xl font-bold tracking-tight text-white pb-2 text-center">To configure the Calorie Budget just click on the circle on the home page.</Text>}
        </View>
    )
}