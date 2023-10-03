import {TextInput, View} from "react-native";
import {useState} from "react";
import {StorageManager} from "../storageManager";

export default function NewItem() {
    const [itemNameInput, setItemNameInput] = useState("")
    const [itemCaloriesInput, setItemCaloriesInput] = useState("")

    const storageMgr = StorageManager.getInstance()

    function handleItemNameInput() {

    }

    function handleItemCaloriesInput() {

    }

    return (
        <View>
            <TextInput className="bg-neutral-900 border border-neutral-600 rounded-lg text-2xl text-white text-center w-full pt-0.5" placeholder={'Toast'} placeholderTextColor="#555555" value={itemNameInput} onChangeText={handleItemNameInput}/>
            <TextInput className="bg-neutral-900 border border-neutral-600 rounded-lg text-2xl text-white text-center w-full pt-0.5" placeholder={'240 kCal'} placeholderTextColor="#555555" value={itemCaloriesInput} onChangeText={handleItemCaloriesInput}/>
        </View>
    )
}