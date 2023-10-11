import {Text, TouchableOpacity, View} from "react-native";

export default function CategorySelector(props) {
    const { onPress, title = 'Category', icon, pad, isSelected = false} = props;
    let bColor = "bg-neutral-900"
    if(isSelected){
        bColor = "bg-emerald-600"
    }
    return (
        <TouchableOpacity className={`basis-1/2 ${pad}`} onPress={onPress}>
            <View className={`${bColor} rounded-3xl items-center p-4`}>
                {icon}
                <Text className="text-2xl font-bold tracking-tight text-white text-center">{title}</Text>
            </View>
        </TouchableOpacity>
    );
}