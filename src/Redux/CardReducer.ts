import { PokemonStateType } from "./PokemonReducer"
import {Dispatch} from "react";
import {PokeApi} from "../API/api";

export type pokeInfoType = {
    name:string,
    img:string,
    id: number
}

const cardInitialState = [
    {
        name:'',
        img:'',
        id:0
    }
]
export type cardInitialStateType =typeof cardInitialState

export const CardReducer = (state:cardInitialStateType = cardInitialState, actions:actionsType):cardInitialStateType=> {
    switch (actions.type) {
        case "SET-CARD-DATA":{
            if (!actions.Data.name) {
                return state
            }else {
                return [...state, {
                    name: actions.Data.name,
                    img: actions.Data.sprites.other["official-artwork"].front_default,
                    id: actions.Data.id
                }]
            }
        }
        default: return state
    }
}

export const SetCardData = (Data:PokemonStateType)=>{
    return{
        type:'SET-CARD-DATA', Data
    } as const
}

export type SetCardDataType = ReturnType<typeof SetCardData>

export type actionsType = SetCardDataType

export const GetCardInfo = (name:string) => {
    return (dispatch:Dispatch<any>)=>{
        PokeApi.PokemonGet(name).then(res=>{
            if (res.status===200){
                dispatch(SetCardData(res.data))
            }
        })
    }
}