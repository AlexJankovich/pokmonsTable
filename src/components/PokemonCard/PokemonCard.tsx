import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {GetPokemon, PokemonStateType} from "../Redux/PokemonReducer";
import {AppStateType} from "../Redux/Store";
import {Preloader} from "../Common/Preloader";
import {Button, Card, Col, Row, Spin} from "antd"
import {DownloadOutlined, RightOutlined, LoadingOutlined,} from '@ant-design/icons';
import {BrowserRouter, Link, NavLink, useParams} from "react-router-dom";

type PokemonKartType = {
    url: string
    name: string
    index:number
}

export const PokemonKart = (props: PokemonKartType) => {

    const dispatch = useDispatch()
    const Pokemon = useSelector<AppStateType, PokemonStateType>(state => state.pokemon)

    useEffect(() => {
        dispatch(GetPokemon(props.name))
    }, [dispatch, props.name])

    let ImgUrl = Pokemon[`${props.name}`]?.sprites ? Pokemon[`${props.name}`].sprites.other["official-artwork"].front_default : ''

    // let ImgUrl = () => {
    //     if (!Pokemon) return
    //     for (let key in Pokemon){
    //         if (!Pokemon.key.id) continue
    //         if (Pokemon.key.id===props.index){
    //             return Pokemon.key.sprites.other["official-artwork"].front_default
    //         }
    //     }
    // }

    return <BrowserRouter>
        <div>
            <NavLink to={'/pokemon/' + props.name}>
                <Card
                style={{width: 250, margin: 10}}
                title={props.name}
                cover={<img src={ImgUrl} alt=""/>}
                // loading={ImgUrl}
                type='inner'
                bordered
                hoverable
                size='small'
            >
            </Card>
            </NavLink>
            <a href={'/pokemon/' + props.name}><Button>Show</Button></a>
            {/*{Pokemon? <><h1>{props.name}</h1>*/}
            {/*    <img src={ImgUrl} alt="pokemon-img"/></>: <><Preloader/></>}*/}
        </div>
    </BrowserRouter>
}

// Pokemon[`${props.name}`].sprites.other["official-artwork"].front_default