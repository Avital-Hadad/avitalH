import produce from 'immer';
import createReducer from "./ReducerUtils"

const initialState = {
    User: {
        userName: "",
        password: "",
        id: ""
    }
}
const user = {
    setUserName(state, action) {
        state.User.userName = action.payload;
    },
    setPassword(state, action) {
        state.User.password = action.payload;
    },
    setId(state, action) {
        state.User.id = action.payload;
    }
};

export default produce((state, action) => createReducer(state, action, user), initialState);