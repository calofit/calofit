import { Stack } from "expo-router";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";
import { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { StorageManager } from "../storageManager";
import CustomButton from "./Button";

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
        <View className="h-full w-full bg-neutral-800 p-8">
            <ExpoStatusBar style="light" />
            <Stack.Screen options={{
                headerShown: true,
                headerTitle: 'Create new Item',
                headerStyle: { backgroundColor: 'transparent' },
                headerTitleStyle: { color: '#FFF' }
            }} />
            <Text className="text-white text-2xl m-2">Name of the Food</Text>
            <TextInput className="bg-neutral-900 border border-neutral-600 rounded-lg text-2xl text-white text-center w-full m-2" placeholder={'Toast'} placeholderTextColor="#555555" value={itemNameInput} onChangeText={setItemNameInput} />
            <Text className="text-white text-2xl m-2">Calories of the Food</Text>
            <TextInput keyboardType='number-pad' className="bg-neutral-900 border border-neutral-600 rounded-lg text-2xl text-white text-center w-full m-2" placeholder={'240 kCal'} placeholderTextColor="#555555" value={itemCaloriesInput} onChangeText={test} />
            <CustomButton
                onPress={onPressSave}
                title="Save Item"
            />
        </View>
    )
}