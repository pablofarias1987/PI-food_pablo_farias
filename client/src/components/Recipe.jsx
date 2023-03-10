import React from "react";
import style from "./Styles/Recipe.module.css"
import { Link } from 'react-router-dom';
import img from "./Images/Star.png"

let prevId = 1;

export default function Recipe(props) {
    const { name, image, healthScore, diets, id } = props;

    var stars = Math.round((healthScore / 10) / 2)
    if (stars === 0) {
        stars = stars + 1;
    }

    return (
        <div className={style.general}>
            <Link to={`/home/${id}`}>
                {
                    image ? <img className={style.img} src={image} alt="Img Not Found."></img>
                        :
                        <img className={style.img} src={"https://agencias.assist1.com.co/assets/images/no-image.png"} alt="Img Not Found."></img>
                }
            </Link>
            <h1 className={style.name}>{name}</h1>
            <div>
                {
                    stars === 1 ? <img className={style.star} src={img} alt="Img Not Found."></img>
                        : stars === 2 ? <div><img className={style.star} src={img} alt="Img Not Found."></img> <img className={style.star} src={img} alt="Img Not Found."></img></div>
                            : stars === 3 ? <div><img className={style.star} src={img} alt="Img Not Found."></img> <img className={style.star} src={img} alt="Img Not Found."></img> <img className={style.star} src={img} alt="Img Not Found."></img> </div>
                                : stars === 4 ? <div><img className={style.star} src={img} alt="Img Not Found."></img> <img className={style.star} src={img} alt="Img Not Found."></img> <img className={style.star} src={img} alt="Img Not Found."></img> <img className={style.star} src={img} alt="Img Not Found."></img></div>
                                    : <div><img className={style.star} src={img} alt="Img Not Found."></img> <img className={style.star} src={img} alt="Img Not Found."></img> <img className={style.star} src={img} alt="Img Not Found."></img> <img className={style.star} src={img} alt="Img Not Found."></img> <img className={style.star} src={img} alt="Img Not Found."></img></div>
                }
            </div>
            <div>
                <h3>Types of diets: </h3>
                {
                    diets?.map(d => {
                        if (d.hasOwnProperty('name')) {
                            return (
                                <p key={prevId++}>- {d.name[0].toUpperCase() + d.name.slice(1)} </p>  // d.name.slice(1) takes out the first element of the array
                            )
                        } else {
                            return (
                                <p key={prevId++}>- {d[0].toUpperCase() + d.slice(1)} </p>
                            )
                        }
                    })
                }
            </div>
        </div>
    )
};