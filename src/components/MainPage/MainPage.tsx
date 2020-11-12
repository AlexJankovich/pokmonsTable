import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../Redux/Store";
import {GetNextPokemons, GetPokemons, PokemonInitialStateType} from "../../Redux/PokemonsReducer";
import {AppInitialStateType} from "../../Redux/AppReducer";
import React, {useEffect} from "react";
import {PokemonCard} from "../PokemonCard/PokemonCard";
import {Button, Row, Spin} from "antd";
import {LeftOutlined, RightOutlined} from "@ant-design/icons";

export const MainPage = () => {

const dispatch = useDispatch()

const Pokemons = useSelector<AppStateType, PokemonInitialStateType>(state => state.pokemons)

const AppData = useSelector<AppStateType, AppInitialStateType>(state => state.app)

useEffect(() => {
    dispatch(GetPokemons())
}, [dispatch])

const PokemonsRender = Pokemons?.results ? Pokemons.results.map((i, index) => {
    return <div key={index}><PokemonCard url={i.url} name={i.name} key={index} index={index}/></div>
}) : null

const toNextPage = () => {
    if (!Pokemons.next) return
    dispatch(GetNextPokemons(Pokemons.next))
}
const toPreviousPage = () => {
    if (!Pokemons.previous) return
    dispatch(GetNextPokemons(Pokemons.previous))
}

return (
    <div className="App">
        {AppData.isFetching ? <Spin/> : null}
        <div className="pokeWrapper">
            <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                {PokemonsRender}
            </Row>
        </div>
        <div className="buttonWrapper">{Pokemons?.previous ? <Button
            onClick={toPreviousPage}
            disabled={AppData.isFetching}
            type='primary'
            shape='round'
            size='large'
            icon={<LeftOutlined/>}
        ></Button> : null}
            {Pokemons?.next ? <Button
                onClick={toNextPage}
                disabled={AppData.isFetching}
                type='primary'
                shape='round'
                size='large'
                icon={<RightOutlined/>}
            ></Button> : null}</div>
    </div>
)
}