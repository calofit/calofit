import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export class StorageManager {

    static instance;
    data;
    calories = 0;
    quickAddItems = [];
    loaded = false;
    dataTemplate = {
        "calories": 0,
        "quickAdd": []
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new StorageManager()
        }

        return this.instance
    }

    init() {
        const [isLoading, setLoading] = useState(true)
        const [error, setError] = useState(null);

        async function fetchData(template) {
            try {
                let response = await AsyncStorage.getItem('trackerData')
                if (response.length === 0) {
                    response = template
                }
                setLoading(false)
                return JSON.parse(response)
            } catch (err) {
                setError(err)
            }
        }

        if(this.loaded) {
            setLoading(false)
            return {isLoading, error}
        }

        useEffect(() => {
            fetchData(this.dataTemplate).then(returnData => {
                this.loaded = true
                this.data = returnData
            })
        }, [])


        return {isLoading, error}
    }

    async setCalories(addedCalories) {
        this.calories += addedCalories
        await this.saveData()
    }

    async setQuickAddItems(newItems) {
        this.quickAddItems.push(newItems)
        await this.saveData()
    }

    async saveData() {
        this.data.calories = this.calories
        this.data.quickAdd = this.quickAddItems
        await AsyncStorage.setItem('trackerData', this.data)
    }

}