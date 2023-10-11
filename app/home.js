import { Entypo } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";
import { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { StorageManager } from "../storageManager";


function progressCircle(value, maxValue) {
    let percent1 = Math.min(Math.round((value / maxValue) * 100), 100)
    let percent2 = 0;
    if (value > maxValue) {
        percent2 = Math.min(Math.round(((value - maxValue) / maxValue) * 100), 100)
    }
    let circumference = 165 * 2 * Math.PI
    let dashoffset = (circumference - percent1 / 100 * circumference);
    let dashoffset2 = (circumference - percent2 / 100 * circumference);

    return (
        <View className="w-full justify-center pb-1.5">
            <View className="absolute w-full items-center pt-2">
                <Text className="text-6xl text-white w-2/3 tracking-tight text-center font-semibold">{value}</Text>
                <Text className="text-5xl text-white w-2/3 tracking-tight text-center font-semibold">/ {maxValue}</Text>
                <Text className="text-4xl text-white w-2/3 tracking-tight text-center">kCal</Text>
            </View>
            <Svg className="h-96 -rotate-90">
                <Circle className="stroke-neutral-900" fill="transparent" strokeWidth="20" r="165" cx="50%" cy="50%" />
                <Circle className="stroke-emerald-600" strokeWidth="28" strokeDasharray={circumference} strokeDashoffset={dashoffset} strokeLinecap="round" fill="transparent" r="165" cx="50%" cy="50%" />
                <Circle className="stroke-amber-600" strokeWidth="28" strokeDasharray={circumference} strokeDashoffset={dashoffset2} strokeLinecap="round" fill="transparent" r="165" cx="50%" cy="50%" />
            </Svg>
        </View>
    )
}

export default function Home() {
    const router = useRouter()
    const storageMgr = StorageManager.getInstance()

    let [isLoading, setLoading] = useState(true)
    let [error, setError] = useState(null)

    useEffect(() => {
        storageMgr.init().then((returnVal) => {
            setLoading(returnVal.loadingState)
            setError(returnVal.errorState)
            setCalories(storageMgr.calories)
            setHistory(storageMgr.history)
        })
    }, [])

    const [calories, setCalories] = useState(2000)
    const [history, setHistory] = useState([])

    function openCardCreator(_) {
        router.push('/newItem')
    }

    function openCardSelector(_) {
        router.push('/selectItem')
    }

    function reset() {
        storageMgr.reset()
        router.replace('/home')
    }
    const menuButton = () => {
        return (
            <View className="-top-2 -left-2">
                <Entypo name="menu" size={28} color="white" />
            </View>
        )
    }

    return (
        <View className="flex h-full w-full bg-neutral-900">
            <ExpoStatusBar style="light" />
            <Stack.Screen options={{
                headerShown: true,
                headerStyle: { backgroundColor: '#262626' },
                headerTitle: '',
                headerLeft: menuButton,
                headerShadowVisible: false,
            }} />
            {isLoading ? (
                <ActivityIndicator size="small" />
            ) : error ? (
                <Text>Something went wrong</Text>
            ) : (
                <ScrollView className="flex w-full px-4 pt-4">
                    <View className="bg-neutral-800 rounded-3xl mb-4 shadow-md">
                        <Text className="text-2xl font-bold tracking-tight text-white pt-4 pl-6">Calories Budget</Text>
                        {progressCircle(calories, 3000)}
                    </View>
                    {/* TODO: Remove */}
                    <Pressable onPress={reset}>
                        <Text>Reset</Text>
                    </Pressable>
                    <View className="flex flex-row mb-4">
                        <TouchableOpacity className="basis-1/2 pr-2" onPress={openCardCreator}>
                            <View className="flex flex-col items-center bg-neutral-800 rounded-3xl shadow-md">
                                <View className="flex flex-col justify-center items-center p-4 leading-normal w-full">
                                    <Entypo name="plus" size={28} color="white" />
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity className="basis-1/2 pl-2" onPress={openCardSelector}>
                            <View className="flex flex-col items-center bg-neutral-800 rounded-3xl shadow-md">
                                <View className="flex flex-col justify-center items-center p-4 leading-normal w-full">
                                    <Entypo name="add-to-list" size={28} color="white" />
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <Text className="text-2xl font-bold tracking-tight text-white mb-4">Recent Meals</Text>
                    {
                        history.reverse().map((item, index) => {
                            return (
                                <View className="flex flex-row rounded-3xl bg-neutral-800 shadow-md w-full p-4 mb-2" key={index}>
                                    <Text className="text-2xl font-bold tracking-tight text-white basis-1/2">{item.name}</Text>
                                    <View className="flex flex-row basis-1/2 justify-end">
                                        <Text className="text-2xl text-white">{item.calories} kCal</Text>
                                    </View>
                                </View>
                            )
                        })
                    }

                </ScrollView>
            )
            }
        </View >
    );
}