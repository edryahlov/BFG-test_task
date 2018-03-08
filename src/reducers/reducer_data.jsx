import * as conf from "conf";

export default function (state = [], action) {
    let temp;
    let newState = JSON.parse(JSON.stringify(state));

    switch (action.type) {

        case conf.FETCH_DATA:
            // console.log('from reducer:',action)
            // TODO: возможно будут баги при 400
            return action.payload.status !== 400 ? action.payload.data.items : action.payload.response.data.error_message;

        case conf.SWITCH_ORDER:
            temp = newState[action.val1];
            newState[action.val1] = newState[action.val2];
            newState[action.val2] = temp;
            return newState;

        case conf.PLACE_TO:
            temp = newState[action.from]
            newState.splice(action.from,1)
            newState.splice(action.to,0,temp)
            return newState

        case conf.CHANGE_RATING:
            if (action.direction === 'up') {newState[action.item].score += 1;}
            else if (action.direction === 'down' && newState[action.item].score !== 0) {newState[action.item].score -= 1;}
            return newState;

        default:
            return state
    }
    return state;
}

