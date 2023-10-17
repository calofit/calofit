import {
    createDrawerNavigator
} from "@react-navigation/drawer";

import { withLayoutContext } from "expo-router";

const { Navigator } = createDrawerNavigator();

export const Drawer = withLayoutContext(Navigator);