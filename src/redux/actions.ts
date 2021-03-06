import { useDispatch as _useDispatch } from 'react-redux';

// В этом объекте будут хранится константы, которые мы сможем доставать через ACTIONS_TYPE.
// Пример ACTIONS_TYPE.CHANGE_CHANGE_ACTION
export enum ACTIONS_TYPE {
    CHANGE_CURRENCY_FIELD_TYPE = 'CurrencyExchange/CHANGE_CURRENCY_FIELD_TYPE',
    CHANGE_CHANGE_ACTION = 'CurrencyExchange/CHANGE_CHANGE_ACTION',
    CHANGE_CURRENT_CURRENCY = 'CurrencyExchange/CHANGE_CURRENT_CURRENCY',
}


export type ChangeCurrencyFieldType = {
    type: ACTIONS_TYPE.CHANGE_CURRENCY_FIELD_TYPE
    payload: {
        amountOfBYN: string
        amountOfCurrency: string
    }
};

// @ts-ignore
export const ChangeCurrencyFieldAC = (amountOfBYN: string, amountOfCurrency: string): ChangeCurrencyFieldType => {
    return {
        type: ACTIONS_TYPE.CHANGE_CURRENCY_FIELD_TYPE,
        payload: { amountOfBYN, amountOfCurrency }
    }
};

export type ChangeAction = {
    type: ACTIONS_TYPE.CHANGE_CHANGE_ACTION
    payload: {
        isBuying: boolean
    }
};

// @ts-ignore
export const ChangeActionAC = (isBuying: boolean): ChangeAction => {
    return {
        type: ACTIONS_TYPE.CHANGE_CHANGE_ACTION,
        payload: { isBuying }
    }
};

export type ChangeCurrentCurrencyType = {
    type: ACTIONS_TYPE.CHANGE_CURRENT_CURRENCY
    payload: {
        currentCurrency: string
    }
};

// @ts-ignore
export const СhangeCurrentCurrencyAC = (currentCurrency: string): ChangeCurrentCurrencyType => {
    return {
        type: ACTIONS_TYPE.CHANGE_CURRENT_CURRENCY,
        payload: { currentCurrency }
    }
};

export type CurrencyReducersTypes = ChangeCurrencyFieldType | ChangeAction | ChangeCurrentCurrencyType;

// Так как у хука useDispatch нет типизации и он может принимать любые типы экшенов 
// - нам необходимо его модифицировать.
// Сперва экспортируем его таким образом под другим именем - import { useDispatch as _useDispatch } from 'react-redux';
// По итогу useDispatch модифицированный будет возвращать функцию, которая принимает AC, и как раз туда мы передали
// типизацию всех наших action'ов. 
// В свою очеред эта функция возвращает другую функцию, которая уже занимается обычной передачей AC (который,
// превращается в объект action) в reducer.

export const useDispatch = () => {
    const dispatch = _useDispatch()
    return (ac: CurrencyReducersTypes) => dispatch(ac)
}