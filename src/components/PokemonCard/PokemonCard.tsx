import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../Redux/Store";
import {Card} from "antd"
import {NavLink} from "react-router-dom";
import {cardInitialStateType, GetCardInfo} from "../../Redux/CardReducer";
import {routeLinks} from "../../Common/routes";

type PokemonKartType = {
    url: string
    name: string
    index: number
}

export const PokemonCard = (props: PokemonKartType) => {

    const dispatch = useDispatch()
    const Pokemon = useSelector<AppStateType, cardInitialStateType>(state => state.card)

    useEffect(() => {
        dispatch(GetCardInfo(props.name))
    }, [dispatch, props.name])

    let ImgUrl = ''
    if(Pokemon[Pokemon.findIndex(i=>i.name===props.name)]){
        ImgUrl=Pokemon[Pokemon.findIndex(i=>i.name===props.name)].img
    }

    return <div>
        <NavLink to={routeLinks.pokemon + props.name}>
            <Card
                style={{width: 250, margin: 10}}
                title={props.name}
                cover={<img src={ImgUrl} alt=""/>}
                loading={ImgUrl===''}
                type='inner'
                bordered
                hoverable
                size='small'
            >
            </Card>
        </NavLink>
    </div>

}
