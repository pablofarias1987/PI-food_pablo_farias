import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchRecipeByName } from "../redux/actions";
import style from "./Styles/SearchBar.module.css"
import img from "./Images/Icono.png"

export default function SearchBar() {
    const dispatch = useDispatch();
    const [input, setInput] = useState("");

    let handleChange = (e) => {
        e.preventDefault();
        setInput(e.target.value);
        // dispatch(fetchRecipeByName(input));  // To avoid reaching the API requests limit
    }

    let handleSubmit = (e) => {
        e.preventDefault();
        dispatch(fetchRecipeByName(input));
        setInput("")
    }

    return (
        <div className={style.general}>
            <div className={style.title}>
                <img className={style.img} src={img} alt="Img Not Found"></img>
                <h1 className={style.txt}>PI Food</h1>
            </div>
            <div className={style.ib}>
                <input
                    className={style.input}
                    type="text"
                    placeholder="Search recipe by name..."
                    value={input}
                    onChange={e => handleChange(e)}
                ></input>
                <button
                    className={style.btn}
                    type="submit"
                    onClick={e => handleSubmit(e)}
                >Search</button>
            </div>
        </div>
    )
}