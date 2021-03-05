import { CurrencyReducersTypes, ACTIONS_TYPE } from './actions';


export type CurrencyType = {
    currencyName: string;
    buyRate: number;
    sellRate: number;
};
export type CurrencyState = {
    currencies: Array<CurrencyType>;
    currentCurrency: string;
    isBuying: boolean;
    amountOfBYN: string;
    amountOfCurrency: string;
};

const initialState: CurrencyState = {
    currencies: [
        {
            currencyName: 'USD',
            buyRate: 2.62,
            sellRate: 2.58,
        },
        {
            currencyName: 'EUR',
            buyRate: 3.1,
            sellRate: 3.06,
        },
        {
            currencyName: 'RUR',
            buyRate: 0.0345,
            sellRate: 0.0341,
        },
    ],
    currentCurrency: 'USD',
    isBuying: true,
    amountOfBYN: '',
    amountOfCurrency: '',
};

export const currencyReducer = (state: CurrencyState = initialState, action: CurrencyReducersTypes): CurrencyState => {
    // @ts-ignore
    switch (action.type) {

        case ACTIONS_TYPE.CHANGE_CURRENCY_FIELD_TYPE: 
            return {
                ...state,
                //@ts-ignore
                ...action.payload // Расскрытием данных в payload мы перезаписываем значения в state
                                  // Не забываем про зануление input'ов
            }
        
        case ACTIONS_TYPE.CHANGE_CHANGE_ACTION: 
            return {
                ...state,
                // @ts-ignore
                ...action.payload,  // По идее тут даже необязательно раскладывать payload
                amountOfBYN: '',   
                amountOfCurrency: ''
            }
        
        case ACTIONS_TYPE.CHANGE_CURRENT_CURRENCY: 
            return {
                ...state,
                ...action.payload,
                amountOfBYN: '',   
                amountOfCurrency: ''
            }
              
        default:
            return state;
    }
};
