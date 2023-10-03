import { Entypo } from '@expo/vector-icons';
import { Stack, useRouter } from "expo-router";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";
import { useState } from "react";
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
                <Text className="text-6xl text-white w-2/3 text-center font-semibold">{value}</Text>
                <Text className="text-5xl text-white w-2/3 text-center font-semibold">/ {maxValue}</Text>
                <Text className="text-4xl text-white w-2/3 text-center">kCal</Text>
            </View>
            <Svg className="h-96 -rotate-90">
                <Circle className="stroke-neutral-900" fill="transparent" strokeWidth="20" r="165" cx="50%" cy="50%" />
                <Circle className="stroke-emerald-500" strokeWidth="28" strokeDasharray={circumference} strokeDashoffset={dashoffset} strokeLinecap="round" fill="transparent" r="165" cx="50%" cy="50%" />
                <Circle className="stroke-amber-500" strokeWidth="28" strokeDasharray={circumference} strokeDashoffset={dashoffset2} strokeLinecap="round" fill="transparent" r="165" cx="50%" cy="50%" />
            </Svg>
        </View>
    )
}

export default function Home() {
    const router = useRouter();
    const storageMgr = StorageManager.getInstance()
    const { isLoading, error } = storageMgr.init()


    const [input, setInput] = useState("")

    const [calories, setCalories] = useState(2000)


    function handleCalorieInput(input) {
        //setInput(input.replace(/[^0-9]/g, ''))
    }

    function onCardPress(pressEvent, itemData) {
        console.log(itemData)
        addCalories(itemData.calories)
    }

    function openCardCreator(pressEvent) {
        router.push('/newItem')
    }

    function addCalories(addedValue) {
        storageMgr.setCalories(addedValue).then(() => {
            // TODO: Send a Toast that Data was saved
        })
    }

    return (
        <View className="flex h-full w-full bg-neutral-900">
            <ExpoStatusBar style="light" />
            <Stack.Screen options={{
                headerShown: false,
            }} />
            {isLoading ? (
                <ActivityIndicator size="small" />
            ) : error ? (
                <Text>Something went wrong</Text>
            ) : (
                <View className="flex w-full px-4">
                    <View className="bg-neutral-800 rounded-3xl mb-4 shadow-md">
                        <Text className="text-2xl font-bold text-white pt-4 pl-6">Calories Budget</Text>
                        {progressCircle(calories, 3000)}
                    </View>
                    <View className="flex flex-row mb-4">
                        <TouchableOpacity className="basis-1/2 pr-2" onPress={(e) => { openCardCreator(e) }}>
                            <View className="flex flex-col items-center bg-neutral-800 rounded-3xl shadow-md">
                                <View className="flex flex-col justify-center items-center p-4 leading-normal w-full">
                                    <Entypo name="plus" size={28} color="white" />
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity className="basis-1/2 pl-2" onPress={(e) => { openCardCreator(e) }}>
                            <View className="flex flex-col items-center bg-neutral-800 rounded-3xl shadow-md">
                                <View className="flex flex-col justify-center items-center p-4 leading-normal w-full">
                                    <Entypo name="add-to-list" size={28} color="white" />
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <Text className="text-2xl font-bold text-white mb-4">Recent Meals</Text>

                    <View className="flex flex-row rounded-3xl bg-neutral-800 shadow-md w-full p-4">
                        <Text className="text-2xl font-bold tracking-tight text-white basis-1/2">Green Salad</Text>
                        <View className="flex flex-row basis-1/2 justify-end">
                            <Text className="text-2xl text-white">120kal</Text>
                        </View>
                    </View>
                    <FlatList
                        data={storageMgr.quickAddItems}
                        className="w-full pt-4"
                        renderItem={(resultData) => {
                            let quickAddItem = resultData.item
                            return (
                                <></>
                            )
                        }}
                    />
                </View>
                </View>
    )
}
        </View >
    );
}