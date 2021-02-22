import produce from 'immer';
import createReducer from "./ReducerUtils"

const initialState = {
    History: {
        date: "",
        city: "",
        weather: "",
        user: "",
    }
}
const history = {
    setDate(state, action) {
        state.History.date = action.payload; 
    },
    setCity(state, action) {
        state.History.city = action.payload;
    },
    setWeather(state, action) {
        state.History.weather = action.payload;
    },
    setUser(state, action) {
        state.History.user = action.payload;
    }
};

export default produce((state, action) => createReducer(state, action, history), initialState);