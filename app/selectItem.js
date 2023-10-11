import { Stack, useRouter } from "expo-router";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";
import { useEffect, useState } from "react";
import { ActivityIndicator, SectionList, Text, TouchableOpacity, View } from 'react-native';
import Toast from "react-native-root-toast";
import { StorageManager } from "../storageManager";
import BasicRowItem from "../comp/BasicRowItem";


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
                headerShown: true,
                headerTitle: '',
                headerStyle: { backgroundColor: '#262626' },
                headerShadowVisible: false,
                headerTintColor: '#059669',
            }} />
            {isLoading ? (
                <ActivityIndicator size="small" />
            ) : error ? (
                <Text>Something went wrong</Text>
            ) : (
                <View className="p-4 bg-neutral-900">
                    <SectionList
                        sections={DATA}
                        stickySectionHeadersEnabled={false}
                        keyExtractor={(item, index) => item + index}
                        renderItem={({ item }) => (
                            <BasicRowItem
                                onPress ={(e) => onCardPress(e, item)}
                                title={item.name}
                                calories={item.calories}
                            />
                        )}
                        renderSectionHeader={({ section }) => (
                            <Text className="text-2xl font-bold tracking-tight text-white pb-4">{section.category}</Text>
                        )} />
                </View>
            )
            }
        </View>
    )
}