import {Dispatch} from "react";
import {PokeApi} from "../API/api";
import {AppActionTypes, SetError, ToggleIsFetching} from "./AppReducer";
import {PokemonStateType} from "./PokemonReducer";

const PokemonInitialState: any = null
type resultsType = Array<PokemonsResultsType>

type PokemonsResultsType = {
    name: string
    url: string
    img?: string
    id?: string
}

export type PokemonInitialStateType = {
    count?: number
    next?: string
    previous?: string
    results?: resultsType
}

export const PokemonsReducers = (state = PokemonInitialState, Actions: PokemonsActionTypes) => {
    switch (Actions.type) {
        case "POKEMONS/SET-POKEMONS-DATA": {
            return {...Actions.Data}
        }
        case "POKEMONS/SET-POKEMONS-IMG-DATA": {

            return {
                ...state, results: [...state.results.map((i: any, index: number) => {
                    if (i.name === Object.values(Actions.Data).find(v => v === i.name)) {
                        i.push = (Actions?.Data?.sprites?.other["official-artwork"].front_default, Actions.Data.id)
                    }
                })]
            }
            return
        }

        default:
            return state
    }
}

export const SetPokemonsData = (Data: PokemonInitialStateType) => {
    return {
        type: 'POKEMONS/SET-POKEMONS-DATA', Data
    } as const
}
export const SetPokemonsImgData = (Data: PokemonStateType,) => {
    return {
        type: 'POKEMONS/SET-POKEMONS-IMG-DATA', Data
    } as const
}

type SetPokemonsDataType = ReturnType<typeof SetPokemonsData>
type SetPokemonsImgDataType = ReturnType<typeof SetPokemonsImgData>

type PokemonsActionTypes = SetPokemonsDataType | SetPokemonsImgDataType

export const GetPokemons = (id?: number) => {
    return (dispatch: Dispatch<DispatchType>) => {
        PokeApi.PokesGet().then(response => {
            if (response.status === 200) {
                dispatch(SetPokemonsData(response.data))
            }
        })
            .catch(e => dispatch(SetError(e.message)))
            .finally(() => dispatch(ToggleIsFetching(false)))
    }
}

export const GetNextPokemons = (next: string) => {
    return (dispatch: Dispatch<DispatchType>) => {
        dispatch(ToggleIsFetching(true))
        PokeApi.PokesNextGet(next).then(response => {
            if (response.status === 200) {
                dispatch(SetPokemonsData(response.data))
            }
        })
            .catch(e => dispatch(SetError(e.message)))
            .finally(() => dispatch(ToggleIsFetching(false)))
    }
}

type DispatchType = PokemonsActionTypes | AppActionTypes