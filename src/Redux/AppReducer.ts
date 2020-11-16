import { Action } from "redux"
import { ThunkAction } from "redux-thunk"
import { GetPokemons } from "./PokemonsReducer"
import {AppStateType} from "./Store";

const AppInitialState = {
    isFetching: false,
    pokemonIsFetching: false,
    Error: '',
    isInitialise:false
}

export type AppInitialStateType = typeof AppInitialState

export const AppReducer = (state: AppInitialStateType = AppInitialState, action: AppActionTypes) => {
    switch (action.type) {
        case "APP/TOGGLE-IS-FETCHING": {
            return {...state, isFetching: action.isFetching}
        }
        case "APP/POKEMON-TOGGLE-IS-FETCHING": {
            return {...state, isFetching: action.pokemonIsFetching}
        }
        case "APP/SET-ERROR": {
            return {...state, Error: action.error}
        }
        case "APP/SET-INITIALIZED":{
            return {...state,isInitialise:action.initialized}
        }
        default:
            return state
    }
}

//actions

export const ToggleIsFetching = (isFetching: boolean) => {
    return {
        type: 'APP/TOGGLE-IS-FETCHING', isFetching
    } as const
}

export const PokemonToggleIsFetching = (pokemonIsFetching: boolean) => {
    return {
        type: 'APP/POKEMON-TOGGLE-IS-FETCHING', pokemonIsFetching
    } as const
}

export const SetError = (error: string) => {
    return {
        type: 'APP/SET-ERROR', error
    } as const
}

export const setInitializeSuccess = (initialized:boolean) => ({
    type: 'APP/SET-INITIALIZED', initialized
} as const)

//thunk

export const InitializeApp = (): ThunkAction<void, AppStateType, unknown, Action<string>> => (dispatch,getState) => {
    let promise = dispatch(GetPokemons(getState().pokemons.pageSize, getState().pokemons.currentPage))
    promise.then(()=>
        dispatch(setInitializeSuccess(true))
    )
}

//Actions types

type setInitializeType = ReturnType<typeof setInitializeSuccess>
export type ToggleIsFetchingType = ReturnType<typeof ToggleIsFetching>
export type PokemonToggleIsFetchingType = ReturnType<typeof PokemonToggleIsFetching>
export type SetErrorType = ReturnType<typeof SetError>

export type AppActionTypes = ToggleIsFetchingType | SetErrorType | PokemonToggleIsFetchingType | setInitializeType