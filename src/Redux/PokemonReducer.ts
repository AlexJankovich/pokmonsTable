import {Dispatch} from "react";
import {PokeApi} from "../API/api";
import {PokemonToggleIsFetching, SetError} from "./AppReducer";

const PokemonInitialState = {
    id: 0,
    name: '',
    base_experience: 0,
    height: 0,
    is_default: false,
    order: 0,
    weight: 0,
    abilities: [
        {
            is_hidden: false,
            slot: 0,
            ability: {
                name: '',
                url: ''
            }
        }
    ],
    forms: [
        {
            name: '',
            url: ''
        }
    ],
    game_indices: [
        {
            game_index: 0,
            version: {
                name: '',
                url: ''
            }
        }
    ],
    held_items: [
        {
            item: {
                name: '',
                url: ''
            },
            version_details: [
                {
                    rarity: '',
                    version: {
                        name: '',
                        url: ''
                    }
                }
            ]
        }
    ],
    location_area_encounters: '',
    moves: [
        {
            move: {
                name: '',
                url: ''
            },
            version_group_details: [
                {
                    level_learned_at: 0,
                    version_group: {
                        name: '',
                        url: ''
                    },
                    move_learn_method: {
                        name: '',
                        url: ''
                    }
                }
            ]
        }
    ],
    species: {
        name: '',
        url: ''
    },
    sprites: {
        back_female: '',
        back_shiny_female: '',
        back_default: 'string',
        front_female: '',
        front_shiny_female: '',
        back_shiny: '',
        front_default: '',
        front_shiny: '',
        other: {
            dream_world: '',
            "official-artwork": {front_default: ''}
        },
        versions: {
            " generation-i": {
                "red-blue": {},
                yellow: {},
            },
            "generation-ii": {
                crystal: {},
                gold: {},
                silver: {},
            },
            "generation-iii": {
                emerald: {},
                "firered-leafgreen": {},
                "ruby-sapphire": {},
            },
            "generation-iv": {
                "diamond-pearl": {},
                "heartgold-soulsilver": {},
                platinum: {},
            },
            "generation-v": {
                "black-white": {},
            },
            "generation-vi": {
                "omegaruby-alphasapphire": {},
                "x-y": {},
            },
            "generation-vii": {
                icons: {},
                "ultra-sun-ultra-moon": {},
            },
            "generation-viii": {
                icons: {},
            }
        }
    },
    stats: [
        {
            base_stat: 0,
            effort: 0,
            stat: {
                name: '',
                url: '',
            }
        }
    ],
    types: [
        {
            slot: 0,
            type: {
                name: '',
                url: '',
            }
        }
    ]
}

export type PokemonStateType = typeof PokemonInitialState

export const PokemonReducer = (state = PokemonInitialState, actions: PokemonActionTypes): PokemonStateType => {

    switch (actions.type) {
        case "POKEMON/SET-POKEMON-DATA": {
            return {...actions.Data}
        }
        default:
            return state
    }

}

export const SetPokemonData = (Data: PokemonStateType) => {
    return {
        type: 'POKEMON/SET-POKEMON-DATA', Data
    } as const
}

type SetPokemonDataType = ReturnType<typeof SetPokemonData>

type PokemonActionTypes = SetPokemonDataType

export const GetPokemon = (name: string) => {
    return (dispatch: Dispatch<any>) => {
        PokeApi.PokemonGet(name).then(response => {
            if (response.status === 200) {
                dispatch(SetPokemonData(response.data))
            }
        })
            .catch(e => dispatch(SetError(e.message)))
            .finally(() => dispatch(PokemonToggleIsFetching(false)))
    }
}