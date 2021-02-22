import React from 'react'
import userReducer from './Reducer/UserReducer';
import historyReducer from './Reducer/HistoryReducer';
import { createStore, combineReducers } from 'redux';

const reducer = combineReducers({ userReducer, historyReducer });

const store = createStore(reducer);
window.store = store;
export default store;

