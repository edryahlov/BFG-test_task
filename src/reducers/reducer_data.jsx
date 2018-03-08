import * as conf from "conf";

export default function (state = [], action) {
    let newState, temp;

    switch (action.type) {

        case conf.FETCH_DATA:
            // console.log('from reducer:',action)
            // TODO: возможно баговоно
            return action.payload.status !== 400 ? action.payload.data.items : action.payload.response.data.error_message;

        case conf.SWITCH_ORDER:
            // console.log(action,state)
            newState = JSON.parse(JSON.stringify(state));
            temp = newState[action.val1];
            newState[action.val1] = newState[action.val2];
            newState[action.val2] = temp;
            return newState;

        case conf.CHANGE_RATING:
            // console.log(action)
            newState = JSON.parse(JSON.stringify(state));
            if (action.direction === 'up') {newState[action.item].score += 1;}
            else if (action.direction === 'down' && newState[action.item].score !== 0) {newState[action.item].score -= 1;}
            return newState;

        default:
            return state
    }
    return state;
}

