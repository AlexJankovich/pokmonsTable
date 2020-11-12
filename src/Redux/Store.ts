import {combineReducers, createStore, applyMiddleware} from 'redux'
import thunk from "redux-thunk";
import {PokemonsReducers} from "./PokemonsReducer";
import {AppReducer} from "./AppReducer";
import { PokemonReducer } from './PokemonReducer';
import {CardReducer} from "./CardReducer";

const RootReducer = combineReducers(
    {
        pokemons: PokemonsReducers,
        app:AppReducer,
        pokemon:PokemonReducer,
        card: CardReducer
    }
)

export type AppStateType = ReturnType<typeof RootReducer>

export const AppState = createStore(RootReducer, applyMiddleware(thunk))


// @ts-ignore
window.AppState = AppState