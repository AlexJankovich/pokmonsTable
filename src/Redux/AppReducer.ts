const AppInitialState = {
    isFetching: false,
    pokemonIsFetching: false,
    Error: ''
}

export type AppInitialStateType = typeof AppInitialState

export const AppReducer = (state: AppInitialStateType = AppInitialState, Actions: AppActionTypes) => {
    switch (Actions.type) {
        case "APP/TOGGLE-IS-FETCHING": {
            return {...state, isFetching: Actions.isFetching}
        }
        case "APP/POKEMON-TOGGLE-IS-FETCHING": {
            return {...state, isFetching: Actions.pokemonIsFetching}
        }
        case "APP/SET-ERROR": {
            return {...state, isFetching: Actions.error}
        }
        default:
            return state
    }
}

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

export type ToggleIsFetchingType = ReturnType<typeof ToggleIsFetching>
export type PokemonToggleIsFetchingType = ReturnType<typeof PokemonToggleIsFetching>
export type SetErrorType = ReturnType<typeof SetError>

export type AppActionTypes = ToggleIsFetchingType | SetErrorType | PokemonToggleIsFetchingType