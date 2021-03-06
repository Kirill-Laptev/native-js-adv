import { IGlobalState } from './../../redux/state';

// Импортируем типизацию для нашего глобального state из state.ts (IGlobalState)
// У селекторов есть свой тип и он пустой - называется он IRootState.
// Далее мы будем создавать интерфейс и наследоваться от IGlobalState.
// Обязательно указывается типизация, именно в таком виде. 
// В конце оставляем просто {} так как мы больше ничего не добавляем в IRootState.

interface IRootState extends IGlobalState {}

export const selectCurrencies = (state: IRootState) => state.currency.currencies 
export const selectCurrentCurrency = (state: IRootState) => state.currency.currentCurrency
export const selectIsBuying = (state: IRootState) => state.currency.isBuying
export const selectAmountOfBYN = (state: IRootState) => state.currency.amountOfBYN
export const amountOfCurrency = (state: IRootState) => state.currency.amountOfCurrency


// Можно облегчить жизнь, сделав так и в самом компоненте уже доставать необходимые данные деструктуризацией
export const selectAll = (state: IRootState) => state.currency