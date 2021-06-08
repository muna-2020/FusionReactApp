export function AddPerformanceLogProperty(Key, data) {
    return {
        type: "ADD",
        payload: {
            Key,
            data            
        }
    }
}