import React, {useEffect, useState} from "react"
import {Button, Card, Col, Row, Spin, Pagination } from "antd";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../Redux/Store";
import {GetPokemon, PokemonStateType} from "../Redux/PokemonReducer";
import { useParams } from "react-router-dom";
import {PokemonInitialStateType} from "../Redux/PokemonsReducer";

type PokemonType = {
    // name:string
}

export const Pokemon = (props:PokemonType) => {
    let name = useParams()
    const Pokemon = useSelector<AppStateType, PokemonStateType>(state => state.pokemon)
    debugger
    const dispatch = useDispatch()
    let url = Object.values(name)[0]
    // // const [path, setPath] = useState<string>('')
    //
    // useEffect(()=>{
    //     if (typeof url === "string") {
    //         setPath(url) }
    // },[dispatch, url])

    useEffect(()=>{
        if (typeof url === "string") dispatch(GetPokemon(url))
    },[dispatch, url])



    // console.log(Object.values(name)[0])

    // let ImgUrl = () => {
    //     for (let key in Pokemon){
    //         if (Pokemon.key.id===i){
    //             return Pokemon.key.sprites.other["official-artwork"].front_default
    //         }
    //     }
    // }

    let ImgUrl = Pokemon[`${url}`]?.sprites ? Pokemon[`${url}`].sprites.other["official-artwork"].front_default : ''

    return <div>
        <Card
            style={{width: 400, margin: 10}}
            cover={<img src={ImgUrl} alt="PokemonIMG"/>}
        >
        </Card>
    </div>
}