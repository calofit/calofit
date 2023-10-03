import { Pressable, Text, View } from "react-native";

export default function CustomButton(props) {
    const { onPress, title = 'Save' } = props;
    return (
        <Pressable className="flex flex-col items-center m-2 mt-10 bg-neutral-700 rounded-lg shadow-md" onPress={onPress}>
            <View className="flex flex-col justify-center p-4 leading-normal w-full">
                <Text className="text-2xl font-bold tracking-tight text-white text-center">{title}</Text>
            </View>
        </Pressable>
    );
}