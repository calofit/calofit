import { Text, TouchableOpacity, View } from "react-native";

export default function CategorySelector(props) {
    const { onPress, title = 'Category', icon, isSelected = false } = props;
    let bColor = "bg-neutral-900"
    if (isSelected) {
        bColor = "bg-emerald-600"
    }
    return (
        <View className={`basis-1/2 p-2`} >
            <TouchableOpacity className={`${bColor} rounded-3xl h-32 items-center justify-center p-4`} onPress={onPress}>
                {icon}
                <Text className="text-2xl font-bold tracking-tight text-white text-center">{title}</Text>
            </TouchableOpacity>
        </View>
    );
}