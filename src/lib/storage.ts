import AsyncStorage from "@react-native-async-storage/async-storage";

export async function save<T>(key: string, value: T) {
    await AsyncStorage.setItem(key, JSON.stringify(value));
}

export async function load<T>(key: string, fallback?: T): Promise<T | undefined> {
    const raw = await AsyncStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
}

export async function remove(key: string) {
    await AsyncStorage.removeItem(key);
}
