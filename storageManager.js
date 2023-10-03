import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export class StorageManager {

    static instance;
    data;
    calories = 0;
    quickAddItems = [];
    loaded = false;
    dataTemplate = '{"calories": 0,"quickAdd": []}'

    static getInstance() {
        if (!this.instance) {
            this.instance = new StorageManager()
        }

        return this.instance
    }

    init() {
        const [isLoading, setLoading] = useState(true)
        const [error, setError] = useState(null);



        if (this.loaded) {
            setLoading(false)
            return { isLoading, error }
        }

        useEffect(() => {

            const fetchData = async (template) => {
                try {
                    let response = await AsyncStorage.getItem('trackerData')
                    if (response === null || response.length === 0) {
                        response = template
                    }

                    this.data = JSON.parse(response)
                    //this.loaded = true
                    //  TODO: Buggy as shit
                    this.quickAddItems = this.data.quickAdd
                    this.calories = this.data.calories
                    setLoading(false)

                } catch (err) {
                    console.error(err)
                    setError(err)
                    setLoading(false)
                }

            }

            fetchData(this.dataTemplate)
        }, [])


        return { isLoading, error }
    }

    async setCalories(addedCalories) {
        this.calories += addedCalories
        await this.saveData()
    }

    async addQuickAddItems(newItems) {
        this.quickAddItems.push(newItems)
        await this.saveData()
    }

    async saveData() {
        this.data.calories = this.calories
        this.data.quickAdd = this.quickAddItems
        console.log(JSON.stringify(this.data))
        await AsyncStorage.setItem('trackerData', JSON.stringify(this.data))
    }

}