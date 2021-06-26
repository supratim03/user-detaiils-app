export const addressHelper = addressObj => {
    let finalAddress = '';
    for (const [key, value] of Object.entries(addressObj)) {
        if (typeof value !== 'object') {
            finalAddress = finalAddress + value + " ";
        }

    }
    return finalAddress;
}

export const getUserListByIndex = (startIndex, endIndex, data) => {
    let arr = [];
    for (let i = startIndex; i <= endIndex; i++) {
        if (data[i]) {
            arr.push(data[i]);
        }

    }

    return arr;

}