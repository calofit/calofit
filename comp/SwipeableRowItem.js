import { AntDesign } from '@expo/vector-icons';
import { useRef } from 'react';
import { Animated, TouchableOpacity } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import BasicRowItem from "./BasicRowItem";


const AnimatedIcon = Animated.createAnimatedComponent(AntDesign);

export default function SwipeableRowItem(props) {
    const { onPress, title = 'null', calories = 0, onDelete } = props
    const ref = useRef(null)
    const renderRightActions = (progress, dragX) => {
        const scale = dragX.interpolate({
            inputRange: [-80, 0],
            outputRange: [1, 0],
            extrapolate: 'clamp',
        });
        return (
            <TouchableOpacity className="flex flex-row bg-red-600 justify-center items-center rounded-xl w-12 h-3/4 ml-4 mt-1" onPress={() => {
                ref.current.close()
                onDelete()
            }}>
                <AnimatedIcon name="delete" size={32} color="white" />
            </TouchableOpacity>
        );
    };
    return (
        <Swipeable ref={ref} renderRightActions={renderRightActions}>
            <BasicRowItem onPress={onPress} title={title} calories={calories} />
        </Swipeable>
    )
}