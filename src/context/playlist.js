import React, {createContext, useReducer} from 'react';
import { apiClient } from '../helpers';

const initialState = {};
const store = createContext(initialState);
const { Provider } = store;


function getLists(){
    return 
    
}

const StateProvider = ( { children } ) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch(action.type) {
      case 'get_playlist':

        const newState = // do something with the action
        return newState;
      default:
        throw new Error();
    };
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider }