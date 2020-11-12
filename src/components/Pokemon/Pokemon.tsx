import React, {useEffect} from "react"
import {Button, Card, Row, Space} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../Redux/Store";
import {GetNextPokemon, PokemonStateType} from "../../Redux/PokemonReducer";
import {Link, useParams} from "react-router-dom";

export const Pokemon = () => {
    debugger
    let name: { name: string } = useParams()

    const Pokemon = useSelector<AppStateType, PokemonStateType>(state => state.pokemon)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(GetNextPokemon(name.name))
    }, [name.name])

    let ImgUrl = Pokemon.sprites ? Pokemon.sprites.other["official-artwork"].front_default : ''

    return (
        <>
            <Row justify='center'><Card
                style={{textAlign: "center"}}
                // cover={<img src={ImgUrl} alt="PokemonIMG"/>}
                loading={ImgUrl === ''}
                title={Pokemon.name}
                type='inner'
            >
                <Row><img src={ImgUrl} alt="PokemonIMG"/>
                    <Space direction={"vertical"} size={1}>
                        <Card title='Abilities' style={{textAlign: "center"}} className="gutter-row">
                            {Pokemon.abilities.map((i, index) => <div key={index}>{i.ability.name}</div>)}
                        </Card>
                        <Card title='Base experience' style={{textAlign: "center"}}>
                            {Pokemon.base_experience}
                        </Card>
                        <Card title='Height' style={{textAlign: "center"}}>
                            {Pokemon.height}
                        </Card>
                        <Card title='Weight' style={{textAlign: "center"}}>
                            {Pokemon.weight}
                        </Card>
                    </Space></Row>
                <Space>
                    <Button title='next'><Link
                        to={`/Pokemon/${Pokemon.id - 1 === 0 ? 1 : Pokemon.id - 1}`}>previous</Link></Button>
                    <Button title='next'><Link to={`/Pokemon/${Pokemon.id + 1}`}>nextBeast</Link></Button>
                </Space>

            </Card></Row>
        </>)

}