import { Text, TouchableOpacity, View } from "react-native";

export default function BasicRowItem(props) {
    const { onPress = false, title = 'null', calories = 0 } = props
    return (
        <View>
            {onPress != false ? (
                <TouchableOpacity className="flex flex-row rounded-3xl bg-neutral-800 shadow-md w-full p-4 mb-4" onPress={onPress} >
                    <Text className="text-2xl font-bold tracking-tight text-white basis-1/2">{title}</Text>
                    <View className="flex flex-row basis-1/2 justify-end">
                        <Text className="text-2xl text-white">{calories} kcal</Text>
                    </View>
                </TouchableOpacity>
            ) : (
                <View className="flex flex-row rounded-3xl bg-neutral-800 shadow-md w-full p-4 mb-4">
                    <Text className="text-2xl font-bold tracking-tight text-white basis-1/2">{title}</Text>
                    <View className="flex flex-row basis-1/2 justify-end">
                        <Text className="text-2xl text-white">{calories} kcal</Text>
                    </View>
                </View>
            )
            }
        </View>
    )
}