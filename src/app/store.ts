import {applyMiddleware, combineReducers, createStore, Action} from "redux";
import {CardsListReducer} from "../features/cards-list/cards-list-reducer";
import thunk, { ThunkDispatch } from "redux-thunk";
import { useDispatch } from "react-redux";

export const rootReducer = combineReducers({
    cards_list: CardsListReducer
})

// applyMiddleware supercharges createStore with middleware:
export const store = createStore(rootReducer, applyMiddleware(thunk));
export const useAppDispatch = () => useDispatch<AppThunkType>();

//types
export type AppRootType = ReturnType<typeof rootReducer>;
export type AppThunkType = ThunkDispatch<AppRootType, unknown, Action>

// and this is so that you can access the store in the console at any time
// @ts-ignore
window.store = store