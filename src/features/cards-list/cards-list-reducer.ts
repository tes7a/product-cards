import axios from "axios";
import {AppThunkType} from "../../app/store";
import {uid} from "uid";
import {cardsAPI} from "../../api/cardsAPI";

//state
const initialState: initialStateType = {
    cards: [],
    modalData: {} as modalDataType,
    initialStatus: "loading",
};

//reducer
export const CardsListReducer = (state = initialState, action: CardsListReducerType): initialStateType => {
    switch (action.type) {
        case "cards-list/GET-CARDS":
            return {...state, cards: action.cards};
        case "cards-list/SELECTED-CARD":
            const arr = state.cards.filter(card => card.id === action.id);
            const {name, price, category} = arr[0];
            return {...state, modalData: {name, price, category}};
        case "cards-list/SELECTED-CHEAPEST-CARD": {
            const findCurrentCard =
                state.cards.reduce((prev, current) => {
                    return (prev.price < current.price) ? prev : current
                });
            const {name, price, category} = findCurrentCard
            return {...state, modalData: {name, price, category}}
        }
        case "cards-list/SET-STATUS":
            return {...state, initialStatus: action.value}
        default:
            return state
    }
}

//actions
export const getCardsAC = (cards: CardsWithIdType[]) =>
    ({type: "cards-list/GET-CARDS", cards} as const);
export const selectedCardAC = (id: string) =>
    ({type: "cards-list/SELECTED-CARD", id} as const);
export const selectedCheapestCardAC = () =>
    ({type: "cards-list/SELECTED-CHEAPEST-CARD"} as const);
export const setStatusAC = (value: RequestStatusType) =>
    ({type: "cards-list/SET-STATUS", value} as const);

//types
export type initialStateType = {
    cards: CardsWithIdType[],
    modalData: modalDataType,
    initialStatus: RequestStatusType,
};
export type CardsWithIdType = {
    name: string,
    category: string,
    price: number,
    id?: string,
};
export type modalDataType = {
    name: string,
    category: string,
    price: number,
};
type CardsListReducerType =
    | ReturnType<typeof getCardsAC>
    | ReturnType<typeof selectedCardAC>
    | ReturnType<typeof selectedCheapestCardAC>
    | ReturnType<typeof setStatusAC>
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

//thunks
export const getCardsTC = () => (dispatch: AppThunkType) => {
    dispatch(setStatusAC("loading"))
    cardsAPI.getAllCards()
        .then((res) => {
            dispatch(getCardsAC(res.data.map(c => {
                return {...c, id: uid()}
            })));
            dispatch(setStatusAC("succeeded"));
        })
        .catch((e) => {
            if (axios.isAxiosError(e)) {
                console.log(e.message);
                dispatch(setStatusAC("loading"))
            }
        })
};
