import React from "react";
import s from "./Header.module.css"
import {NavBar} from "../NavBar/NavBar";

export const Header = () => {
    return <div className={s.headerWrapper}>
        <NavBar/>
    </div>
}