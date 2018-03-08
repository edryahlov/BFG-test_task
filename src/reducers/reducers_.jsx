export const itemsReducer = (state = '', action) => {
    switch (action.type) {
        case 'SET_ITEMS':
            return [
                // action.myItems.filter(el=>el.ShopId === 1)
                action.myItems
            ];
        default:
    }
    return state;
};

export const selectedReducer = (state = '', action) => {
    switch (action.type) {
        case 'SELECT_QUIZ':
            console.log(action.payload);
            return [
                action.payload
            ];
        default:
    }
    return state;
};
