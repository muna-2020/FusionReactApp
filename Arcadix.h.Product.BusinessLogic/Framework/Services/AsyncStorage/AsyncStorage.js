import { AsyncStorage } from 'react-native';

export const storeToken = async (token) => {
    try {
        await AsyncStorage.setItem('@MySuperkeyUUIDTOKEN', token);
        ApplicationState.SetProperty('Token', token);
    } catch (error) {
        console.log("ERROR", error);
    }
}

export const retrieveToken = async () => {
    try {
        const value = await AsyncStorage.getItem('@MySuperkeyUUIDTOKEN');
        if (value !== null) {
            console.log("token", value);
            return value;
        }
    } catch (error) {
        console.log(error);
    }
};


export const storeData = async (key,value) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.log("ERROR", error);
    }
}

export const retrieveData = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);        
        return JSON.parse(value);
      
    } catch (error) {
        console.log(error);
    }
};