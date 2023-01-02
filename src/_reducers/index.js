import { combineReducers } from 'redux';
import { loopreducerConstant } from '../_constants';


import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import { misc } from './misc.reducer';
import { test } from './test.reducer';
import { modal } from './modal.reducer';
import { fileupload } from './fileupload.reducer';



let reducers = {
     authentication,
     registration,
     users,
     alert,
     misc,
     test,
     modal,
     fileupload,
   
}

function capitalize(string) {
     string = string.toLowerCase();
     return string.charAt(0).toUpperCase() + string.slice(1);
}

/*for (let i = 0; loopreducerConstant.length > i; i = i + 1) {
    let newreducer = 'reducers.' + loopreducerConstant[i].toLowerCase() + `= function (state = { requestStatus: 0, ` + loopreducerConstant[i].toLowerCase() + `Data:{}, data: {}, request` + capitalize(loopreducerConstant[i]) + `Status:0 }, action) {

    switch (action.type) {
        case '` + loopreducerConstant[i] + 'ADD_REQUEST' + `':
            return {...state, requestStatus: '` + loopreducerConstant[i] + 'ADD_REQUEST' + `', request` + capitalize(loopreducerConstant[i]) + `Status: '` + loopreducerConstant[i] + 'ADD_REQUEST' + `', data: action.data };
       case '` + loopreducerConstant[i] + 'ADD_SUCCESS' + `':
            return {...state, requestStatus: '` + loopreducerConstant[i] + 'ADD_SUCCESS' + `', request` + capitalize(loopreducerConstant[i]) + `Status: '` + loopreducerConstant[i] + 'ADD_SUCCESS' + `', ` + loopreducerConstant[i].toLowerCase() + `Data : action.data.data , data: action.data };
       case '` + loopreducerConstant[i] + 'ADD_FAILURE' + `':
            return {...state, requestStatus: '` + loopreducerConstant[i] + 'ADD_FAILURE' + `', request` + capitalize(loopreducerConstant[i]) + `Status: '` + loopreducerConstant[i] + 'ADD_FAILURE' + `', data: action.data };


        case '` + loopreducerConstant[i] + 'DELETE_REQUEST' + `':
            return {...state, requestStatus: '` + loopreducerConstant[i] + 'DELETE_REQUEST' + `', request` + capitalize(loopreducerConstant[i]) + `Status: '` + loopreducerConstant[i] + 'DELETE_REQUEST' + `', data: action.data };
       case '` + loopreducerConstant[i] + 'DELETE_SUCCESS' + `':
            return {...state, requestStatus: '` + loopreducerConstant[i] + 'DELETE_SUCCESS' + `', request` + capitalize(loopreducerConstant[i]) + `Status: '` + loopreducerConstant[i] + 'DELETE_SUCCESS' + `', ` + loopreducerConstant[i].toLowerCase() + `Data : action.data.data , data: action.data };
       case '` + loopreducerConstant[i] + 'DELETE_FAILURE' + `':
            return {...state, requestStatus: '` + loopreducerConstant[i] + 'DELETE_FAILURE' + `', request` + capitalize(loopreducerConstant[i]) + `Status: '` + loopreducerConstant[i] + 'DELETE_FAILURE' + `', data: action.data };


             case '` + loopreducerConstant[i] + 'LIST_REQUEST' + `':
            return {...state, requestStatus: '` + loopreducerConstant[i] + 'LIST_REQUEST' + `', request` + capitalize(loopreducerConstant[i]) + `Status: '` + loopreducerConstant[i] + 'LIST_REQUEST' + `', data: action.data };
       case '` + loopreducerConstant[i] + 'LIST_SUCCESS' + `':
            return {...state, requestStatus: '` + loopreducerConstant[i] + 'LIST_SUCCESS' + `', request` + capitalize(loopreducerConstant[i]) + `Status: '` + loopreducerConstant[i] + 'LIST_SUCCESS' + `', ` + loopreducerConstant[i].toLowerCase() + `Data : action.data.data , data: action.data };
       case '` + loopreducerConstant[i] + 'LIST_FAILURE' + `':
            return {...state, requestStatus: '` + loopreducerConstant[i] + 'LIST_FAILURE' + `', request` + capitalize(loopreducerConstant[i]) + `Status: '` + loopreducerConstant[i] + 'LIST_FAILURE' + `', data: action.data };


        default:
            return state;
    }
  }`;

   //console.log(newreducer);
    eval(newreducer);

    // reducers[loopreducerConstant[i].toLowerCase()] = window[loopreducerConstant[i].toLowerCase()];

}
*/
//console.log(reducers);

const rootReducer = combineReducers(reducers);

export default rootReducer;