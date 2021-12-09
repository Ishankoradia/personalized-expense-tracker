import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
import axios from 'axios';


const config = require('../config/config');

//initial state
const initialState = {
    transactions: [],
    error: null,
    loading: true
}

//create context
export const GlobalContext = createContext(initialState);

//Provider component
export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    //actions
    async function getTransactions(){
       try {
           const res = await axios.get(`${config.SERVER_URI}/api/v1/transactions`);

           dispatch({
            type: 'GET_TRANSACTION',
            payload: res.data.data
           });
       } catch (error) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: error.response
            });
       }
    }

    async function deleteTransaction(id){
        try {
            await axios.delete(`${config.SERVER_URI}/api/v1/transactions/${id}`);
            dispatch({
                type: 'DELETE_TRANSACTION',
                payload: id
            });
        } catch (error) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: error.response
            });
        }
    }

    async function addTransaction(transaction){
        const config1 = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.post(`${config.SERVER_URI}/api/v1/transactions`, transaction, config1);

            dispatch({
                type: 'ADD_TRANSACTION',
                payload: transaction
            });
        } catch (error) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: error.response
            });
        }

       
    }

    return (<GlobalContext.Provider value ={{
        transactions: state.transactions,
        error: state.error,
        loading: state.loading,
        deleteTransaction,
        addTransaction,
        getTransactions
    }}
        >
            {children}
        </GlobalContext.Provider>);
}