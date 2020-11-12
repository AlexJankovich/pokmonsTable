import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../Redux/Store";
import {
    GetPokemons,
    PokemonInitialStateType,
    SetCurrentPage,
    SetPageSize
} from "../../Redux/PokemonsReducer";
import {AppInitialStateType} from "../../Redux/AppReducer";
import React, {useEffect, useState} from "react";
import {PokemonCard} from "../PokemonCard/PokemonCard";
import {Button, Pagination, Row, Space, Spin} from "antd";
import {LeftOutlined, RightOutlined} from "@ant-design/icons";

export const MainPage = () => {

    const dispatch = useDispatch()

    const Pokemons = useSelector<AppStateType, PokemonInitialStateType>(state => state.pokemons)

    const AppData = useSelector<AppStateType, AppInitialStateType>(state => state.app)

    useEffect(() => {
        dispatch(GetPokemons(Pokemons.pageSize, Pokemons.currentPage))
    }, [dispatch])

    const PokemonsRender = Pokemons?.results ? Pokemons.results.map((i, index) => {
        return <div key={index}><PokemonCard url={i.url} name={i.name} key={index} index={index}/></div>
    }) : null

    const setPage = (page: number, pageSize?: number) => {
        dispatch(GetPokemons(pageSize, page))
        dispatch(SetPageSize(pageSize||10))
        dispatch(SetCurrentPage(page))
    }

    return <div className="App">
        {AppData.isFetching ? <Spin/> : null}
        <div className="pokeWrapper">
            <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                {PokemonsRender}
            </Row>
        </div>
        <>
            <Row justify='center'><Pagination
                total={Pokemons.count}
                showSizeChanger
                showQuickJumper
                onChange={setPage}
                defaultPageSize={Pokemons.pageSize}
                // showTotal={total => `Total ${total} items`}
                responsive
            /></Row>
        </>
    </div>
}