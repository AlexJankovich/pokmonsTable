import React from 'react';
import {NavLink, useLocation} from 'react-router-dom';
import {routeLinks, routes} from '../../Common/routes';
import s from './NavBar.module.css'

export const NavBar = () => {

    const url = useLocation()

    return <div className={s.navBarWrapper}>

        <div className={url.pathname===routes.mainPage||url.pathname===routes.default? s.links+ " " +  s.active:s.links}>

            <NavLink to={routeLinks.mainPage}>MainPage</NavLink>

        </div>
        <div className={url.pathname!==routes.mainPage&&url.pathname!==routes.default? s.links+ " " +  s.active:s.links}>

            <NavLink to={routeLinks.defaultPokemon}>Pokemon</NavLink>

        </div>
    </div>
}