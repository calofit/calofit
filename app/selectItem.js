import { Stack, useRouter } from "expo-router";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";
import { useEffect, useState } from "react";
import { ActivityIndicator, SectionList, Text, TouchableOpacity, View } from 'react-native';
import Toast from "react-native-root-toast";
import { StorageManager } from "../storageManager";


const DATA = [
    {
        category: 'Main dishes',
        data: [{ name: 'Pizza', calories: 2000 }, { name: 'Burger', calories: 1000 }, { name: 'Risotto', calories: 800 }],
    },
    {
        category: 'Sides',
        data: [{ name: 'French Fries', calories: 800 }, { name: 'Salad', calories: 200 }, { name: 'Sandwich', calories: 1200 }],
    },
    {
        category: 'Drinks',
        data: [{ name: 'Water', calories: 0 }, { name: 'Limo', calories: 20 }],
    },
    {
        category: 'Desserts',
        data: [{ name: 'Ice', calories: 345 }],
    },
];

export default function SelectItem() {
    const storageMgr = StorageManager.getInstance()
    const router = useRouter()

    let [isLoading, setLoading] = useState(true)
    let [error, setError] = useState(null)

    function onCardPress(_, itemData) {
        addCalories(itemData)
    }

    function addCalories(item) {
        storageMgr.addCalories(item.calories)
        storageMgr.addHistory(item).then(() => {
            Toast.show('Saved Calories.', {
                duration: Toast.durations.LONG,
                position: -40
            });
            router.replace('/home')
        })
    }

    useEffect(() => {
        storageMgr.init().then((returnVal) => {
            setLoading(returnVal.loadingState)
            setError(returnVal.errorState)
        })
    }, [])

    return (
        <View>
            <ExpoStatusBar style="light" />
            <Stack.Screen options={{
                headerShown: false,
            }} />
            {isLoading ? (
                <ActivityIndicator size="small" />
            ) : error ? (
                <Text>Something went wrong</Text>
            ) : (
                <View className="p-10">
                    <SectionList
                        sections={DATA}
                        keyExtractor={(item, index) => item + index}
                        renderItem={({ item }) => (
                            <TouchableOpacity className="border rounded" onPress={(e) => onCardPress(e, item)}>
                                <Text className="text-5xl">{item.name}</Text>
                                <Text>{item.calories}</Text>
                            </TouchableOpacity>
                        )}
                        renderSectionHeader={({ section }) => (
                            <Text className="text-7xl">{section.category}</Text>
                        )} />
                </View>
            )
            }
        </View>
    )
}