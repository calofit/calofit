import { Redirect } from "expo-router";
import { View } from "react-native";
//https://github.com/EvanBacon/expo-router-layouts-example
export default function Index() {
    return (
        <View>
            <Redirect href="/home" />
        </View>
    )
}