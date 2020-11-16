import {ThunkAction} from "redux-thunk";
import {PokeApi} from "../API/api";
import {AppActionTypes, SetError, ToggleIsFetching} from "./AppReducer";
import {PokemonStateType} from "./PokemonReducer";
import {AppStateType} from "./Store";

export type PokemonsResultsType = {
    name: string
    url: string
    img?: string
    id?: number
}

const PokemonInitialState = {
    count: 1,
    results: [
        {
            name: '',
            url: '',
            img: '',
            id: 0
        }
    ],
    currentPage: 1,
    pageSize: 10
}

export type PokemonInitialStateType = typeof PokemonInitialState

export const PokemonsReducers = (state: PokemonInitialStateType = PokemonInitialState, actions: PokemonsActionTypes): PokemonInitialStateType => {
    switch (actions.type) {
        case "POKEMONS/SET-POKEMONS-DATA": {
            return {
                ...state,
                count: actions.Data.count,
                results: actions.Data.results
            }
        }
        case "POKEMONS/SET-POKEMONS-IMG-DATA": {
            return {
                ...state, results: state.results.map((i) => {
                    if (i.name && i.name === actions.Data.name) {
                        i = {
                            ...i,
                            id: actions.Data.id,
                            img: actions.Data.sprites.other["official-artwork"].front_default
                        }
                    } else {
                        i = {...i}
                    }
                    return i
                })
            }
        }
        case "POKEMONS/SET-PAGE-SIZE": {
            return {...state, pageSize: actions.size}
        }
        case 'POKEMONS/SET-CURRENT-SIZE': {
            return {...state, currentPage: actions.page}
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
export const SetPageSize = (size: number) => {
    return {
        type: 'POKEMONS/SET-PAGE-SIZE', size
    } as const
}
export const SetCurrentPage = (page: number) => {
    return {
        type: 'POKEMONS/SET-CURRENT-SIZE', page
    } as const
}

//Actions creators

type SetPokemonsDataType = ReturnType<typeof SetPokemonsData>
type SetPokemonsImgDataType = ReturnType<typeof SetPokemonsImgData>
type SetPageSizeType = ReturnType<typeof SetPageSize>
type SetCurrentPageType = ReturnType<typeof SetCurrentPage>

// Types of Actions creators

type PokemonsActionTypes =
    SetPokemonsDataType
    | SetPokemonsImgDataType
    | SetPageSizeType
    | SetCurrentPageType
 //Thunks
export const GetPokemons = (pageSize: number=20, currentPage: number): ThunkAction<any, AppStateType, unknown, DispatchType> => {
    return (dispatch, getState) => {
        return PokeApi.PokesGet(pageSize || getState().pokemons.pageSize,
            currentPage || getState().pokemons.currentPage).then(response => {
            if (response.status === 200) {
                dispatch(SetPokemonsData(response.data))
            }
        })
            .catch(e => {
                dispatch(SetError(e.message))
            })
            .finally(() => dispatch(ToggleIsFetching(false)))
    }
}


type DispatchType = PokemonsActionTypes | AppActionTypes