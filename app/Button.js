import {Text, TouchableOpacity, View} from "react-native";

export default function CustomButton(props) {
    const { onPress, title = 'Save' } = props;
    return (
        <TouchableOpacity className="flex flex-col items-center bg-neutral-800 rounded-3xl shadow-md" onPress={onPress}>
            <View className="flex flex-col justify-center p-4 leading-normal w-full">
                <Text className="text-2xl font-bold tracking-tight text-white text-center">{title}</Text>
            </View>
        </TouchableOpacity>
    );
}