import {View, Text, ActivityIndicator, TextInput, FlatList, TouchableOpacity} from "react-native";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";
import {Stack, useRouter} from "expo-router";
import {useState} from "react";
import {StorageManager} from "../storageManager";
import Svg, {Circle} from "react-native-svg";


function progressCircle(value, maxValue) {
    let percent1 = Math.min(Math.round((value / maxValue) * 100), 100)
    let percent2 = 0;
    if(value > maxValue){
        percent2 = Math.min(Math.round(((value - maxValue) / maxValue) * 100),100)
    }
    let circumference = 150 * 2 * Math.PI
    let dashoffset = (circumference - percent1 / 100 * circumference);
    let dashoffset2 = (circumference - percent2 / 100 * circumference);

    return (
        <View className="w-full justify-center">
            <View className="absolute w-full items-center pt-2">
                <Text className="text-6xl text-white w-2/3 text-center font-semibold">{value}</Text>
                <Text className="text-5xl text-white w-2/3 text-center font-semibold">/ {maxValue}</Text>
                <Text className="text-4xl text-white w-2/3 text-center">kCal</Text>
            </View>
            <Svg className="h-96 -rotate-90">
                <Circle className="stroke-neutral-700" fill="transparent" strokeWidth="20" r="150" cx="50%" cy="50%"/>
                <Circle className="stroke-green-500" strokeWidth="20" strokeDasharray={circumference} strokeDashoffset={dashoffset} strokeLinecap="round" fill="transparent" r="150" cx="50%" cy="50%"/>
                <Circle className="stroke-amber-500" strokeWidth="20" strokeDasharray={circumference} strokeDashoffset={dashoffset2} strokeLinecap="round" fill="transparent" r="150" cx="50%" cy="50%"/>
            </Svg>
        </View>
    )
}

export default function Home() {
    const router = useRouter();
    const storageMgr = StorageManager.getInstance()
    const  {isLoading, error} = storageMgr.init()


    const [input, setInput] = useState("")

    const [calories, setCalories] = useState(2000)


    function handleCalorieInput(input) {
        setInput(input.replace(/[^0-9]/g, ''))
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
        <View className="flex h-full w-full bg-neutral-800">
            <ExpoStatusBar style="light"/>
            <Stack.Screen options={{
                headerShown: false,
                headerTitle: '',
                headerStyle: {backgroundColor: 'rgb(23 23 23)'},
            }}/>
                {isLoading ? (
                    <ActivityIndicator size="small" />
                ) : error ? (
                    <Text>Something went wrong</Text>
                ) : (
                    <View className="flex w-full justify-center items-center">
                        {progressCircle(calories,3000)}
                        <View className="w-4/6">
                            <TextInput keyboardType='number-pad' className="bg-neutral-900 border border-neutral-600 rounded-lg text-4xl text-white text-center w-full pt-0.5 h-16" placeholder={'2000 kCal'} placeholderTextColor="#555555" value={input} onChangeText={handleCalorieInput}/>
                            <TouchableOpacity onPress={(e) => {openCardCreator(e)}}>
                                <View className="flex flex-col items-center m-2 bg-neutral-700 rounded-lg shadow-md">
                                    <View className="flex flex-col justify-center p-4 leading-normal w-full">
                                        <Text className="mb-2 text-2xl font-bold tracking-tight text-white text-center">Add a new Item</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <FlatList
                                data={storageMgr.quickAddItems}
                                className="w-full pt-4"
                                renderItem={(resultData) => {
                                    let quickAddItem = resultData.item
                                    return(
                                        <TouchableOpacity onPress={(e) => {onCardPress(e, quickAddItem)}}>
                                            <View className="flex flex-col items-center m-2 bg-neutral-700 rounded-lg shadow-md">
                                                <View className="flex flex-col justify-center p-4 leading-normal w-full">
                                                    <Text className="mb-2 text-2xl font-bold tracking-tight text-white">{quickAddItem.name}</Text>
                                                    <Text className="mb-2 text-lg text-white">{quickAddItem.calories}</Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                }}
                            />
                        </View>
                    </View>
                )}
        </View>
    );
}