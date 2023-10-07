import AsyncStorage from "@react-native-async-storage/async-storage";

export class StorageManager {

    static instance;
    data = null;
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

    async init() {
        if (this.data !== null) {
            return { loadingState: false, errorState: null }
        }

        try {
            let response = await AsyncStorage.getItem('trackerData')
            if (response === null || response.length === 0) {
                response = this.dataTemplate
            }

            this.data = JSON.parse(response)
            this.quickAddItems = this.data.quickAdd
            this.calories = this.data.calories
            return { loadingState: false, errorState: null }

        } catch (err) {
            console.error(err)
            return { loadingState: false, errorState: err }
        }

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