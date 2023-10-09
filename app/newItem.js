import { Stack } from "expo-router";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";
import { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { StorageManager } from "../storageManager";
import CustomButton from "./Button";
import CategorySelector from "./CategorySelector";
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function NewItem() {
    const [itemNameInput, setItemNameInput] = useState("")
    const [itemCaloriesInput, setItemCaloriesInput] = useState("")

    const storageMgr = StorageManager.getInstance()

    function onPressSave(pressEvent) {
        console.log('Press')
        const itemData = {
            "name": itemNameInput,
            "calories": itemCaloriesInput.replace(/[^0-9]/g, '')
        }
        storageMgr.addQuickAddItems(itemData)
    }

    function test(txt) {
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
                <TextInput keyboardType='number-pad' className="bg-neutral-900 rounded-xl text-2xl text-white w-full px-4 py-2" placeholder={'240 kCal'} placeholderTextColor="#555555" value={itemCaloriesInput} onChangeText={test} />
            </View>
            <View className="rounded-3xl bg-neutral-800 shadow-md w-full p-4 mb-4">
                <View className="flex flex-row pb-4">
                    <CategorySelector
                        title="Drinks"
                        pad="pr-2"
                        icon={<Ionicons name="pint" size={48} color="white" />}
                    />
                    <CategorySelector
                        isSelected="true"
                        title="Main"
                        pad="pl-2"
                        icon={<MaterialCommunityIcons name="food" size={48} color="white" />}
                    />
                </View>
                <View className="flex flex-row">
                    <CategorySelector
                        title="Sides"
                        pad="pr-2"
                        icon={<MaterialCommunityIcons name="food-apple" size={48} color="white" />}
                    />
                    <CategorySelector
                        title="Deserts"
                        pad="pl-2"
                        icon={<Ionicons name="ice-cream" size={48} color="white" />}
                    />
                </View>
            </View>
            <CustomButton
                onPress={onPressSave}
                title="Save Item"
            />
        </View>
    )
}