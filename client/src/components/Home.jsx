import React from "react";
import { Link } from "react-router-dom"
import Recipe from "./Recipe"
import SearchBar from "./SearchBar";
import Paginated from "./Paginated";
import style from "./Styles/Home.module.css";  // module.css allows us to import the styles into the javascript code
import { useState, useEffect } from "react";
import { connect } from "react-redux";  // function that connects the react component to the redux store
import { fetchRecipes, filterByDietType, orderByLetter, orderByHealthScore} from "../redux/actions"
import img1 from "./Images/Star.png"

let prevId = 1;

function Home(props) {  // props being the object sent by the corresponding component

    const [/* order */, setOrder] = useState('')

    // 9 recipes per page
    const [page, setPage] = useState(1);
    const recipesPage = 9;
    const numberOfRecipes = page * recipesPage;
    const firstRecipe = numberOfRecipes - recipesPage;
    const showRecipes = props.shownRecipes.slice(firstRecipe, numberOfRecipes);

    const paged = function (pageNumber) {
        setPage(pageNumber)
    };

    useEffect(() => {
        props.fetchRecipes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.fetchRecipes]);

    let handleClick = (e) => {
        e.preventDefault();  // To stop it from refreshing on each click over something
        props.fetchRecipes();
        setPage(1);
        setOrder('')
        window.location.reload();  // To have the option to reload the page erasing all "select"
    }

    let handleFilterByDietType = (e) => {
        e.preventDefault();
        props.filterByDietType(e.target.value);
        setPage(1);
    }

    let handleOrderByLetter = (e) => {
        e.preventDefault();
        props.orderByLetter(e.target.value);
        setPage(1);
        setOrder(e.target.value);
    }

    let handleOrderByHealthScore = (e) => {
        e.preventDefault();
        props.orderByHealthScore(e.target.value);
        setPage(1);
        setOrder(e.target.value);
    }

    return (
        <div>
            {/* SearchBar */}
            <SearchBar />
            <hr></hr>
            <div className={style.btnYfilt}>
                {/* Refresh Button */}
                <div>
                    <button className={style.btn} onClick={handleClick}>Refresh</button>
                </div>
                {/* Recipe Creation Button */}
                <div>
                    <Link to="/recipe">
                        <button className={style.btn}>Create</button>
                    </Link>
                </div>
                {/* Filter By Diet Type */}
                <div className={style.box}>
                    <select defaultValue={'all'} name="diets" onChange={e => handleFilterByDietType(e)}>
                        <option value="all">Filter by diet type</option>
                        <option value="gluten free">Gluten Free</option>
                        <option value="ketogenic">Ketogenic</option>
                        <option value="vegetarian">Vegetarian</option>
                        <option value="lacto vegetarian">Lacto Vegetarian</option>
                        <option value="ovo vegetarian">Ovo Vegetarian</option>
                        <option value="lacto ovo vegetarian">Lacto Ovo Vegetarian</option>
                        <option value="vegan">Vegan</option>
                        <option value="pescatarian">Pescatarian</option>
                        <option value="paleolithic">Paleolithic</option>
                        <option value="primal">Primal</option>
                        <option value="fodmap friendly">Fodmap Friendly</option>
                        <option value="whole 30">Whole30</option>
                        <option value="dairy free">Dairy Free</option>
                    </select>
                </div>
                {/* Order By Letter */}
                <div className={style.box}>
                    <select defaultValue={'DEFAULT'} name="alphabetical" onChange={e => handleOrderByLetter(e)}>
                        <option value="DEFAULT" disabled>Order alphabetically</option>
                        <option value="atoz">A to Z</option>
                        <option value="ztoa">Z to A</option>
                    </select>
                </div>
                {/* Min to Max - Max to Min */}
                <div className={style.box}>
                    <select defaultValue={'DEFAULT'} name="numerical" onChange={e => handleOrderByHealthScore(e)}>
                        <option value="DEFAULT" disabled>Order by health score</option>
                        <option value="asc">Min to Max</option>
                        <option value="desc">Max to Min</option>
                    </select>
                </div>
            </div>
            <hr></hr>
            {/* Star */}
            <div className={style.ref}>
                <div>
                    <h1 className={style.starRef}>Health Score</h1>
                    <img className={style.star} src={img1} alt='Img not found'></img>
                </div>
            </div>
            <br></br>
            {props.shownRecipes.length === 0 ?
                <div className={style.load}>
                    <h5>Loading...</h5>
                </div> :
                <div className={style.recipes}>
                    {
                        showRecipes?.map(e => {
                            return (
                                <div className={style.recipe} key={prevId++}>
                                    <Recipe
                                        image={e.image}
                                        name={e.name}
                                        healthScore={e.healthScore}
                                        diets={e.diets}
                                        id={e.id}
                                    ></Recipe>
                                </div>
                            )
                        })
                    }
                </div>
            }
            <hr></hr>
            <div className={style.pag}>
                {  // Page turn-over simulator
                    props.shownRecipes.length > 9 ?
                        <div className={style.pag}>
                            <Paginated recipesPage={recipesPage} shownRecipes={props.shownRecipes.length} paged={paged} setPage={setPage} page={page}></Paginated>
                            <span className={style.actual}> {page} of {Math.ceil(props.shownRecipes.length / recipesPage)} </span>
                        </div> :
                        <div><span className={style.actual}> {page} of {Math.ceil(props.shownRecipes.length / recipesPage)} </span></div>
                }
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        shownRecipes: state.shownRecipes,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchRecipes: () => dispatch(fetchRecipes()),
        filterByDietType: (payload) => dispatch(filterByDietType(payload)),
        orderByLetter: (payload) => dispatch(orderByLetter(payload)),
        orderByHealthScore: (payload) => dispatch(orderByHealthScore(payload)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)