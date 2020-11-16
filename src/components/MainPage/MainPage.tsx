import {useDispatch, useSelector} from 'react-redux';
import {AppStateType} from '../../Redux/Store';
import {GetPokemons, PokemonInitialStateType, SetCurrentPage, SetPageSize} from '../../Redux/PokemonsReducer';
import React, {useEffect} from 'react';
import {PokemonCard} from '../PokemonCard/PokemonCard';
import {Pagination, Row} from 'antd';
import s from './MainPage.module.css'

export const MainPage = () => {

    const dispatch = useDispatch()

    const Pokemons = useSelector<AppStateType, PokemonInitialStateType>(state => state.pokemons)

    useEffect(() => {
        dispatch(GetPokemons(Pokemons.pageSize, Pokemons.currentPage))
    }, [dispatch])

    const PokemonsArr = Pokemons?.results ? Pokemons.results.map((i, index) => {
        return <div key={i.name}><PokemonCard url={i.url} name={i.name} key={i.name} index={index}/></div>
    }) : null

    const setPage = (page: number, pageSize?: number) => {
        dispatch(GetPokemons(pageSize, page))
        dispatch(SetPageSize(pageSize || Pokemons.pageSize))
        dispatch(SetCurrentPage(page))
    }

    return <div>
        <div className={s.pokemonsWrapper}>
            <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}} justify='center'>
                {PokemonsArr}
            </Row>
        </div>
        <Row justify='center'>
            <Pagination
                total={Pokemons.count}
                showSizeChanger
                showQuickJumper
                onChange={setPage}
                pageSize={Pokemons.pageSize}
                defaultPageSize={10}
                current={Pokemons.currentPage}
                responsive
            />
        </Row>
    </div>
}