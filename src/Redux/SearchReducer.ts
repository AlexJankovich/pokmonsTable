import {PokemonsResultsType} from './PokemonsReducer';
import {ThunkAction} from 'redux-thunk';
import {AppStateType} from './Store';
import {PokeApi} from '../API/api';

const initialState = {
    names: [
        {name: '',}
    ],
    onChangeName: ''
}

export type searchInitialStateType = typeof initialState

export const SearchReducer = (state: searchInitialStateType = initialState, action: searchActionsTypes): searchInitialStateType => {
    switch (action.type) {
        case 'SEARCH/SET-NAMES': {
            return {
                ...state,
                names: action.names.map(i => {
                    return {name: i.name}
                })
            }
        }
        case 'SEARCH/SET-ON-CHANGE-NAME':{
            return {
                ...state,
                onChangeName: action.value
            }
        }
        default:
            return state
    }
}

//actions

export const SetNames = (names: PokemonsResultsType[]) => {
    return {
        type: 'SEARCH/SET-NAMES',
        names
    } as const
}

export const SetOnChangeName = (value:string) => {
    return {
        type: 'SEARCH/SET-ON-CHANGE-NAME',
        value
    } as const
}

//action types

export type SetNamesType = ReturnType<typeof SetNames>

export type SetOnChangeNameType = ReturnType<typeof SetOnChangeName>

type searchActionsTypes = SetNamesType | SetOnChangeNameType

//thunks

export const GetAllNames = (count:number): ThunkAction<any, AppStateType, unknown, searchActionsTypes> => {
    return (dispatch) => {
        PokeApi.PokesGet(count, 1).then(res => {
            if (res.status === 200) {
                dispatch(SetNames(res.data.results))
            }
        })
    }
}
