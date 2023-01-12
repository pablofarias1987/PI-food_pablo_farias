import React from "react";
import  style from "./Styles/Start.module.css"
import { Link } from "react-router-dom"

export default function Start() {


        return (
            <div className={style.landingbackground}>
            <div className={style.contlanding}>
                <h1>PI FOOD HENRY - PABLO FARIAS</h1>
                <Link to='/home'>
                    <button className={style.enterbutton}>ENTRAR</button>
                </Link>
            </div>
        </div>

        )
    }
