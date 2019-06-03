import React, { useReducer } from 'react';
import { bankOne, bankTwo } from './dataBanks';
const INITIAL_STATE = {
    power: true,
    display: "Press a key word or, click",
    currentPadBank: bankOne,
    currentPadBankId: 'Heater Kit',
    sliderVal: 0.3,
    textColor:'white'
};
const Types = {
    pc: 'powerControl',
    sb: 'selectBank',
    dn: 'displayClipName',
    av: 'adjustVolume',
    cd: 'clearDisplay',
    tx: 'textColor'
}
export const functionsToDispatch = {
    powerControl: function () {
        return {
            type: Types.pc
        }
    },
    selectBank: function () {
        return {
            type: Types.sb
        }
    },
    displayClipName: function (name) {
        return {
            type: Types.dn,
            payload: name
        }
    },
    adjustVolume: function (e) {
        return {
            type: Types.av,
            payload: e.target.value
        }
    },
    clearDisplay: function () {
        return {
            type: Types.cd,
            payload: String.fromCharCode(160)
        }
    },
    setTextColor: function (color){
        return {
            type: Types.tx,
            payload: color
        }
    }


}

export const Context = React.createContext(INITIAL_STATE);

function reducer(state, action) {
    switch (action.type) {
        case Types.pc: return {
            ...state,
            power: !state.power,
            display: !state.power?"on":"off"
        }
        case Types.sb: return state.power ? {
            ...state,
            ...state.currentPadBankId === 'Heater Kit' ? {  currentPadBank: bankTwo, display: 'Smooth Piano Kit', currentPadBankId: 'Smooth Piano Kit' } : { 
                currentPadBank: bankOne, display: 'Heater Kit', currentPadBankId: 'Heater Kit'
            }
        } : state;
        case Types.dn: return state.power ? {
            ...state,
            display: action.payload
        } : state;
        case Types.av: return state.power ? {
            ...state,
            sliderVal: action.payload,
            display: "Volume: " + Math.round(action.payload * 100)
        } : state;
        case Types.cd: return {
            ...state,
            display: action.payload
        }
        case Types.tx: return {
            ...state,
            textColor: action.payload
        }
        default: return {...state};
    }
}
export function Store({ children }) {
    const [store, dispatch] = useReducer(reducer, INITIAL_STATE);
    return (
        <Context.Provider value={[store, dispatch]}>
            {children}
        </Context.Provider>
    );
}
