import React, { Component } from "react";
import video from "./Images/Video.mp4.webm"
import plate from "./Images/Plate.png"
import style from "./Styles/Start.module.css"
import { Link } from "react-router-dom"

export default class Start extends Component {

    render() {
        return (
            <div>
                <div>
                    <video className={style.video} autoPlay loop muted>
                        <source src={video} type='video/mp4'></source>
                    </video>
                    <div className={style.overlay}></div>
                    <div className={style.absolute}>
                        <h1 className={style.text}>Henry PI Food</h1>
                    </div>
                    <div>
                        <Link to='/home'>
                            <img className={style.imag} src={plate} alt="Plate"></img>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}