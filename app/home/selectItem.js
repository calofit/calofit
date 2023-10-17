import { Stack, useRouter } from "expo-router";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";
import { useEffect, useState } from "react";
import { ActivityIndicator, SectionList, Text, View } from 'react-native';
import Toast from "react-native-root-toast";
import BasicRowItem from "../comp/BasicRowItem";
import CustomButton from "../comp/Button";
import { StorageManager } from "../storageManager";

export default function SelectItem() {
    const storageMgr = StorageManager.getInstance()
    const router = useRouter()

    let [isLoading, setLoading] = useState(true)
    let [error, setError] = useState(null)
    let [items, setItems] = useState([])
    let [empty, setEmpty] = useState(false)

    function onCardPress(_, itemData) {
        addCalories(itemData)
    }

    function addCalories(item) {
        storageMgr.addCalories(item.calories)
        storageMgr.addHistory(item).then(() => {
            Toast.show(<View className="rounded-3xl bg-emerald-800 shadow-md p-4"><Text className="text-xl font-bold tracking-tight text-white">Added to budget</Text></View>, {
                duration: Toast.durations.LONG,
                position: -1,
                opacity: 1,
                shadow: false,
                backgroundColor: "transparent",
            });
            router.replace('/home')
        })
    }

    useEffect(() => {
        storageMgr.init().then((returnVal) => {
            setLoading(returnVal.loadingState)
            setError(returnVal.errorState)
            setItems(storageMgr.quickAddItems)

            let amountOfItems = 0;
            storageMgr.quickAddItems.forEach(e => {
                amountOfItems += e.data.length
            });
            if (amountOfItems == 0) {
                setEmpty(true)
            }
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
                <View className="bg-neutral-900 h-full">
                    {empty ? (
                        <View className="p-4">
                            <Text className="text-center pb-4 text-white text-xl tracking-tight">no saved items available</Text>
                            <CustomButton title="add new" onPress={() => { router.push("newItem") }} />
                        </View>

                    ) : (
                        <SectionList
                            className="p-4"
                            sections={items}
                            stickySectionHeadersEnabled={false}
                            keyExtractor={(item, index) => item + index}
                            renderItem={({ item }) => (
                                <BasicRowItem
                                    onPress={(e) => onCardPress(e, item)}
                                    title={item.name}
                                    calories={item.calories}
                                />
                            )}
                            renderSectionHeader={({ section }) => {
                                let content = (<></>)
                                if (section.data.length > 0) {
                                    content = (<Text className="text-2xl font-bold tracking-tight text-white pb-4">{section.category}</Text>)
                                }
                                return (content)
                            }
                            } />
                    )}

                </View>
            )
            }
        </View>
    )
}