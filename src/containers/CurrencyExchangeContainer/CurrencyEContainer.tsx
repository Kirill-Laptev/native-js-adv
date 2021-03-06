import React from 'react';
import CurrencyExchange from '../../components/CurrencyExchange/CurrencyExchange';
import { CurrencyState, CurrencyType } from '../../redux/currencyReducer';
import { Dispatch } from 'redux';
import {
    ChangeActionAC,
    ChangeCurrencyFieldAC,
    СhangeCurrentCurrencyAC,
    CurrencyReducersTypes
} from '../../redux/actions';
import { connect, ConnectedProps, useDispatch, useSelector } from 'react-redux';
import { selectAll } from './Selectors';

const CurrencyEContainer: React.FC = () => {

    const dispatch = useDispatch()

    // const {
    //     currencies,
    //     currentCurrency,
    //     isBuying,
    //     amountOfBYN,
    //     amountOfCurrency
    // } = props;

    const { currencies, currentCurrency, isBuying, amountOfBYN, amountOfCurrency } = useSelector(selectAll)

    let currencyRate: number = 0;
    const currenciesName = currencies.map((currency: CurrencyType) => {
        if (currency.currencyName === currentCurrency) {
            currencyRate = isBuying ? currency.buyRate : currency.sellRate;
        }
        return currency.currencyName;
    });

    const changeCurrencyField = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.currentTarget.value;
        if (!isFinite(+value)) return;
        if (e.currentTarget.dataset.currency) { // Проверка нужна для TS
            const trigger: string = e.currentTarget.dataset.currency;
            if (trigger === 'byn') {
                if (value === '') { // Если приходит пустая строка, то set'аем в reducer две пустые строки
                dispatch(ChangeCurrencyFieldAC(value, value)); 
                } else { // Если там не пустая строка то отправляем первое значение из инпута, второе - преобразованно по формуле
                    dispatch(ChangeCurrencyFieldAC(value, (+Number(value).toFixed(2) / currencyRate).toFixed(2)));
                }
            } else {
                if (value === '') {
                    dispatch(ChangeCurrencyFieldAC(value, value));
                } else {
                    dispatch(ChangeCurrencyFieldAC((+Number(value).toFixed(2) * currencyRate).toFixed(2), value));
                }
            }
        }
    };
    const changeAction = (e: React.MouseEvent<HTMLSpanElement>) => {
        e.currentTarget.dataset.action === 'buy' ? dispatch(ChangeActionAC(true)) : dispatch(ChangeActionAC(false));
    };

    const changeCurrentCurrency = (e: React.MouseEvent<HTMLLIElement>) => {
        // Такая запись необходима, так как e.currentTarget.dataset.currency  - может не существовать
        // и значение не отправиться в changeCurrency()
        e.currentTarget.dataset.currency && dispatch(СhangeCurrentCurrencyAC(e.currentTarget.dataset.currency));
    };

    return (
        <React.Fragment>
            <CurrencyExchange
                currenciesName={currenciesName}
                currentCurrency={currentCurrency}
                currencyRate={currencyRate}
                isBuying={isBuying}
                amountOfBYN={amountOfBYN}
                amountOfCurrency={amountOfCurrency}
                changeCurrencyField={changeCurrencyField}
                changeAction={changeAction}
                changeCurrentCurrency={changeCurrentCurrency}
            />
        </React.Fragment>
    );
};

// Мы достаем из state объект currency, для описания типа объекта из деструктуризации 
// используются фигурные скобки.
// Типом будет тот тип, которым мы описывали тип initialState - это CurrencyState.
// Если мы достаем несколько объектов, то мы достаем их через запятую, и тип так же описываем через запятую в {}
// const mapStateToProps = ( { currency } : {currency: CurrencyState} ): CurrencyState => { 
//     return {
//         currencies: currency.currencies,
//         currentCurrency: currency.currentCurrency,
//         isBuying: currency.isBuying,
//         amountOfBYN: currency.amountOfBYN,
//         amountOfCurrency: currency.amountOfCurrency,
//     };
// };

// // @ts-ignore
// const mapDispatchToProps = (dispatch: Dispatch<CurrencyReducersTypes>) : any => {
//     return {
//         setCurrencyAmount(amountOfBYN: string, amountOfCurrency: string) {
//             dispatch(ChangeCurrencyFieldAC(amountOfBYN, amountOfCurrency));
//         },
//         setAction(isBuying: boolean) {
//             dispatch(ChangeActionAC(isBuying));
//         },
//         changeCurrency(currency: string) {
//             dispatch(СhangeCurrentCurrencyAC(currency));
//         },
//     };
// };

// // @ts-ignore
// const connector = connect(mapStateToProps, { ChangeCurrencyFieldAC, ChangeActionAC, СhangeCurrentCurrencyAC });

// type TProps = ConnectedProps<typeof connector>;

export default CurrencyEContainer;

