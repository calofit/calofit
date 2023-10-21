import { AntDesign, Entypo } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";
import { useEffect, useState } from "react";
import { ActivityIndicator, Modal, ScrollView, Text, TextInput, TouchableOpacity, View, Pressable } from "react-native";
import Toast from "react-native-root-toast";
import Svg, { Circle } from "react-native-svg";
import BasicRowItem from "../../comp/BasicRowItem";
import Button from "../../comp/Button";
import { StorageManager } from "../../storageManager";


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

function BudgetSettingsModal({ onPress, isVisible, onClose }) {
    const [input, setInput] = useState('')

    function handleInput(txt) {
        setInput(txt.replace(/[^0-9]/g, ''))
    }

    function handleSave() {
        if (input?.length === 0) {
            Toast.show(<View className="rounded-3xl bg-red-800 shadow-md p-4"><Text className="text-xl font-bold tracking-tight text-white">invalid input</Text></View>, {
                duration: Toast.durations.LONG,
                position: -1,
                opacity: 1,
                shadow: false,
                backgroundColor: "transparent",
            });
            return
        }
        onPress(input)
        onClose()
        setInput('')
    }

    return (
        <Modal animationType="slide" transparent={true} visible={isVisible}>
            <View className="flex justify-center items-center h-screen w-screen">
                <View className=" bg-neutral-900 rounded-xl p-12">
                    <View className="rounded-3xl bg-neutral-800 shadow-md w-full p-2 pb-4 mb-4">
                        <Text className="text-2xl font-bold tracking-tight text-white pb-2 text-center">New calorie Budget</Text>
                        <TextInput className="bg-neutral-900 rounded-xl text-2xl text-white w-full py-2" placeholder={'3000 kCal'} placeholderTextColor="#555555" value={input} onChangeText={handleInput} />
                    </View>
                    <Button onPress={handleSave} />
                    <View className="flex justify-center items-center pt-2">
                        <Pressable className="bg-red-500 rounded-lg" onPress={onClose}>
                            <AntDesign name="close" size={24} color="black" />
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
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
            setCalorieBudget(storageMgr.budget)
            setHistory(storageMgr.history)
        })
    }, [])

    const [calories, setCalories] = useState(2000)
    const [history, setHistory] = useState([])
    const [calorieBudget, setCalorieBudget] = useState(3000)
    const [modalState, setModalState] = useState(false)

    function openCardCreator(_) {
        router.push('/home/newItem')
    }

    function openCardSelector(_) {
        router.push('/home/selectItem')
    }



    function toggleSettingsModal() {
        setModalState(!modalState)
    }

    function setNewCalorieBudget(budget) {
        storageMgr.setCalorieBudget(budget)
        setCalorieBudget(budget)
    }

    return (
        <View className="flex h-full w-full bg-neutral-900">
            <ExpoStatusBar style="light" />
            <Stack.Screen options={{
                headerShown: false,
                headerStyle: { backgroundColor: '#262626' },
                headerTitle: '',
                headerShadowVisible: false,
            }} />
            {isLoading ? (
                <ActivityIndicator size="small" />
            ) : error ? (
                <Text>Something went wrong</Text>
            ) : (
                <ScrollView className="flex w-full px-4 pt-4">
                    <BudgetSettingsModal onPress={setNewCalorieBudget} isVisible={modalState} onClose={toggleSettingsModal} />
                    <Pressable className="bg-neutral-800 rounded-3xl mb-4 shadow-md" onPress={toggleSettingsModal}>
                        <Text className="text-2xl font-bold tracking-tight text-white pt-4 pl-6">Calories Budget</Text>
                        {progressCircle(calories, calorieBudget)}
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
                                <BasicRowItem
                                    key={index}
                                    title={item.name}
                                    calories={item.calories}
                                />
                            )
                        })
                    }

                </ScrollView>
            )
            }
        </View >
    );
}