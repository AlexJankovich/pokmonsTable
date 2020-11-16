import React, {useEffect} from 'react'
import {Button, Card, Row} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import {AppStateType} from '../../Redux/Store';
import {GetPokemon, PokemonStateType} from '../../Redux/PokemonReducer';
import {Link, useParams} from 'react-router-dom';
import {routeLinks} from '../../Common/routes';
import {PokemonSearch} from './PokemonSearch';
import s from './Pokemon.module.css'

export const Pokemon = () => {

    let name: { name: string } = useParams()

    const Pokemon = useSelector<AppStateType, PokemonStateType>(state => state.pokemon)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(GetPokemon(name.name))
    }, [dispatch, name.name])

    let ImgUrl = Pokemon.sprites ? Pokemon.sprites.other['official-artwork'].front_default : ''

    return (
        <div className={s.pokemonWrapper}>

            <Row justify='center'>
                <div className={s.searchWrapper}>
                    <PokemonSearch/>
                </div>
            </Row>

            <div>
                <Row justify='center'>
                    <Card
                        style={{textAlign: 'center', maxWidth: '600px'}}
                        loading={ImgUrl === ''}
                        title={Pokemon.name}
                        type='inner'
                    >
                        <Row justify='center'>
                            <img src={ImgUrl} alt="PokemonIMG" style={{width: '100%'}}/>
                            <Row justify='center' gutter={{xs: 4, sm: 10, md: 12, lg: 45}}>

                                <Card title='Abilities' className={s.skillStyle} >
                                    {Pokemon.abilities.map((i, index) => <div key={index}>{i.ability.name}</div>)}
                                </Card>

                                <Card title='Base experience' className={s.skillStyle}>
                                    {Pokemon.base_experience}
                                </Card>

                                <Card title='Height' className={s.skillStyle}>
                                    {Pokemon.height}
                                </Card>

                                <Card title='Weight' className={s.skillStyle}>
                                    {Pokemon.weight}
                                </Card>

                                <Card title='Type' className={s.skillStyle}>
                                    {Pokemon.types.map(i => <div key={i.type.name}>{i.type.name}</div>)}
                                </Card>

                                <Card title='Held-items' className={s.skillStyle}>
                                    {Pokemon.held_items.map(i => <div
                                        key={i.item.name}>{i.item.name || 'none'}</div>)}
                                </Card>

                            </Row>
                        </Row>

                        <Row justify="space-around" style={{padding: '20px 0'}}>

                            <Button title='next'>
                                <Link to={routeLinks.pokemon + `${Pokemon.id - 1 === 0 ? 1 : Pokemon.id - 1}`}>
                                    {'<'}
                                </Link>
                            </Button>

                            <Button title='next'>
                                <Link to={routeLinks.pokemon + (Pokemon.id + 1)}>
                                    {'>'}
                                </Link>
                            </Button>

                        </Row>
                    </Card>
                </Row>
            </div>
        </div>)
}