import React, {ChangeEvent, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppStateType} from '../../Redux/Store';
import {GetAllNames, searchInitialStateType, SetOnChangeName} from '../../Redux/SearchReducer';
import {NavLink} from 'react-router-dom';
import {routeLinks} from '../../Common/routes';
import s from './PokemonSearch.module.css'
import {Button, Card} from 'antd';

export const PokemonSearch = () => {

    const pokemonList = useSelector<AppStateType, searchInitialStateType>(state => state.search)

    const pokemonCount = useSelector<AppStateType, number>(state => state.pokemons.count)

    const dispatch = useDispatch()

    const [showPokemonList, setShowPokemonList] = useState<boolean>(false)

    const showSearchWindow = (showList: boolean) => {
        setShowPokemonList(showList)
        dispatch(SetOnChangeName(''))
    }

    const pokemonSortList = pokemonList.onChangeName === ''
        ? pokemonList.names :
        pokemonList.names.filter(i => i.name.substr(0, pokemonList.onChangeName.length) === pokemonList.onChangeName)

    const pokemonRenderList = pokemonSortList.map(i => {
        return <div key={i.name}>
            <NavLink
                to={routeLinks.pokemon + i.name}
                onClick={() => showSearchWindow(false)}
            >
                {i.name}
            </NavLink>
        </div>
    })

    useEffect(() => {
        dispatch(GetAllNames(pokemonCount))
    }, [dispatch, pokemonCount])

    const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(SetOnChangeName(e.currentTarget.value))
    }

    return <>
        <Card style={{textAlign: 'center'}}>
            <h2>Input pokemon name: </h2>
            <div className={s.inputWrapper}>
                <input
                    type="text"
                    value={pokemonList.onChangeName}
                    onChange={searchHandler}
                    onClick={() => showSearchWindow(true)}
                />
            </div>
            {showPokemonList
                ? <>
                    <div className={s.listWrapper}>
                        <>{pokemonRenderList}</>
                    </div>
                    <Button onClick={() => showSearchWindow(false)}>X Close X</Button>
                </>
                : null}
        </Card>
    </>
}