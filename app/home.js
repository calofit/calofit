import {View, Text, ActivityIndicator, TextInput} from "react-native";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";
import {Stack, useRouter} from "expo-router";
import {useState} from "react";

export default function Home() {
    const router = useRouter();

    const [calories, setCalories] = useState(0)

    return (
        <View className="flex h-full bg-neutral-800">
            <ExpoStatusBar style="light"/>
            <Stack.Screen options={{
                headerShown: true,
                headerTitle: '',
                headerStyle: {backgroundColor: 'rgb(23 23 23)'},
            }}/>
            <View className="m-auto">
                <Text className="text-6xl text-white">{calories} kcal</Text>
                <ActivityIndicator size="small" />
                <TextInput keyboardType='numeric' className="text-white h-6" placeholder={'Name'} placeholderTextColor="#FFF" onChangeText={(input) => {setCalories(input)}}/>
            </View>
        </View>
    );
}