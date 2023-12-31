import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Stack, useRouter } from "expo-router";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";
import { useState } from "react";
import { Text, TextInput, View } from "react-native";
import Toast from 'react-native-root-toast';
import CustomButton from "../../comp/Button";
import CategorySelector from "../../comp/CategorySelector";
import { StorageManager } from "../../storageManager";

const CATEGROIES = [
    [
        { title: 'Drinks', icon: <Ionicons name="pint" size={48} color="white" /> },
        { title: 'Main', icon: <MaterialCommunityIcons name="food" size={48} color="white" /> }
    ],
    [
        { title: 'Sides', icon: <MaterialCommunityIcons name="food-apple" size={48} color="white" /> },
        { title: 'Deserts', icon: <Ionicons name="ice-cream" size={48} color="white" /> }
    ]
]

export default function NewItem() {
    const router = useRouter()
    const [itemNameInput, setItemNameInput] = useState("")
    const [itemCaloriesInput, setItemCaloriesInput] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("")

    const storageMgr = StorageManager.getInstance()

    function onPressCategroy(pressEvent, itemTitle) {
        setSelectedCategory(itemTitle)
    }


    function onPressSave(pressEvent) {
        if (selectedCategory === "" || itemCaloriesInput === "" || selectedCategory === "") {
            Toast.show(<View className="rounded-3xl bg-red-800 shadow-md p-4"><Text className="text-xl font-bold tracking-tight text-white">invalid input</Text></View>, {
                duration: Toast.durations.LONG,
                position: -1,
                opacity: 1,
                shadow: false,
                backgroundColor: "transparent",
            });
            return
        }

        const itemData = {
            "name": itemNameInput,
            "calories": itemCaloriesInput,
        }
        storageMgr.addQuickAddItem(selectedCategory, itemData)
        
        addToHistory(itemData)

        router.replace('/home')
    }
    function addToHistory(item) {
        storageMgr.addCalories(item.calories)
        storageMgr.addHistory(item)
    }

    function handleCaloryInput(txt) {
        setItemCaloriesInput(txt.replace(/[^0-9]/g, ''))
    }

    return (
        <View className="h-full w-full px-4 pt-4 bg-neutral-900">
            <ExpoStatusBar style="light" />
            <Stack.Screen options={{
                headerShown: true,
                headerTitle: '',
                headerStyle: { backgroundColor: '#262626' },
                headerShadowVisible: false,
                headerTintColor: '#059669',
            }} />
            <View className="rounded-3xl bg-neutral-800 shadow-md w-full px-4 pt-2 pb-4 mb-4">
                <Text className="text-2xl font-bold tracking-tight text-white pb-2 text-center">Name</Text>
                <TextInput className="bg-neutral-900 rounded-xl text-2xl text-white w-full px-4 py-2" placeholder={'Toast'} placeholderTextColor="#555555" value={itemNameInput} onChangeText={setItemNameInput} />
            </View>
            <View className="rounded-3xl bg-neutral-800 shadow-md w-full px-4 pt-2 pb-4 mb-4">
                <Text className="text-2xl font-bold tracking-tight text-white pb-2 text-center">Calories</Text>
                <TextInput keyboardType='number-pad' className="bg-neutral-900 rounded-xl text-2xl text-white w-full px-4 py-2" placeholder={'240 kCal'} placeholderTextColor="#555555" value={itemCaloriesInput} onChangeText={handleCaloryInput} />
            </View>
            <View className="rounded-3xl bg-neutral-800 shadow-md w-full p-2 mb-4">
                {
                    CATEGROIES.map((row, index) => {
                        return (
                            <View key={index} className="flex flex-row">
                                {row.map((item) => {
                                    return (
                                        <CategorySelector
                                            title={item.title}
                                            isSelected={selectedCategory === item.title}
                                            icon={item.icon}
                                            key={item.title}
                                            onPress={(e) => { onPressCategroy(e, item.title) }}
                                        />
                                    )
                                })}

                            </View>
                        )
                    })
                }
            </View>
            <CustomButton
                onPress={onPressSave}
                title="Save Item"
            />
        </View>
    )
}