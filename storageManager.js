import AsyncStorage from "@react-native-async-storage/async-storage";

export class StorageManager {

    static instance;
    data = null;
    calories = 0;
    quickAddItems = [];
    history = [];
    lastDay = null;
    dataTemplate = '{"calories": 0, "quickAdd": [], "history": [], "lastDay": ""}'

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
            this.history = this.data.history
            this.lastDay = this.data.lastDay

            if (this.lastDay !== (new Date).toDateString()) {
                this.lastDay = (new Date).toDateString()
                this.calories = 0
                this.saveData()
            }
            return { loadingState: false, errorState: null }

        } catch (err) {
            console.error(err)
            return { loadingState: false, errorState: err }
        }

    }

    async addCalories(addedCalories) {
        this.calories += addedCalories
        await this.saveData()
    }

    async addHistory(item) {
        this.history.push(item)
        await this.saveData()
    }

    async addQuickAddItems(newItems) {
        this.quickAddItems.push(newItems)
        await this.saveData()
    }

    async saveData() {
        this.data.calories = this.calories
        this.data.quickAdd = this.quickAddItems
        this.data.history = this.history
        this.data.lastDay = this.lastDay
        console.log(JSON.stringify(this.data))
        await AsyncStorage.setItem('trackerData', JSON.stringify(this.data))
    }

    async reset() {
        this.data = JSON.parse(this.dataTemplate)
        this.calories = 0;
        this.quickAddItems = [];
        this.history = [];
        this.lastDay = null;
        await AsyncStorage.setItem('trackerData', JSON.stringify(this.data))
    }

}