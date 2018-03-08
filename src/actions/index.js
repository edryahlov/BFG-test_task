import axios from 'axios';
import * as conf from 'conf';

export const fetchData = (date = conf.DATE) => {
    const request = axios.get("http://localhost:3000/db")
        // const request = axios.get(conf.URL + date + conf.RESULTS)
        .then(function(response) {
            // console.log('good response:',response)
            return response
        })
        .catch(function(response) {
            // console.log('bad response:',response.response.data.error_message)
            return response
        });

    return {
        type: conf.FETCH_DATA,
        payload: request
    }
}

export const switchOrder = (data, val1, val2) => {
    return {
        type: conf.SWITCH_ORDER,
        payload: data,
        val1,
        val2
    }
}

export const placeTo = (data, from, to) => {
    return {
        type: conf.PLACE_TO,
        payload: data,
        from,
        to
    }
}

export const changeRating = (data, direction, item) => {
    return {
        type: conf.CHANGE_RATING,
        payload: data,
        direction,
        item
    }
}