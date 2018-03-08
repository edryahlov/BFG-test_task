import moment from 'moment';

export const URL = 'https://api.stackexchange.com/2.2/search/advanced?order=desc&sort=votes&title=react-redux&site=stackoverflow&fromdate=';
export const RESULTS = '&pagesize=5'; // кол-во вопросов
export const DATE = moment().set({ 'year': 2018, 'month': 0, 'date': 1 }).unix(); // начальная дата 1 января 2018г.

// ACTIONS
export const FETCH_DATA = 'FETCH_DATA';
export const SWITCH_ORDER = 'SWITCH_ORDER';
export const PLACE_TO = 'PLACE_TO';
export const CHANGE_RATING = 'CHANGE_RATING';

// объект для контейнера item.jsx - т.к. стейт с задержкой, стор для этого излишне имхо - решил сюда
export const double = {
    flag: true,
    first: 0,
    second: 0
};