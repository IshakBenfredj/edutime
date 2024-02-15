export const findEle = (arr,id) => {
    const ele = arr.find(ele => ele._id === id)
    return ele
}