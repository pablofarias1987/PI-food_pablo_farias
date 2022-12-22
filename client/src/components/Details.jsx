import React from "react";
import { clearDetail, fetchRecipeDetails } from "../redux/actions";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import style from "./Styles/Details.module.css"


class Details extends React.Component {
    componentDidMount() {
        this.props.fetchRecipeDetails(this.props.match.params.id);
    }
    componentWillUnmount() {
        this.props.clearDetail()
    }
    render() {
        const { recipeDetails } = this.props  // Using the "this" keyword, we gather the information from this.props
        return (
            <div className={style.div} key={this.props.match.params.id}>
                {recipeDetails.name ?
                    <div>
                        {/* Name */}
                        <div className={style.title}>
                            <h1>{recipeDetails.name}</h1>
                        </div>
                        {/* Image*/}
                        <div>
                            {
                                recipeDetails.image ? <img className={style.img} src={recipeDetails.image} alt="Img Not Found."></img>
                                    :
                                    <img className={style.img} src={"https://agencias.assist1.com.co/assets/images/no-image.png"} alt="Img Not Found."></img>  // Simple if or else to show no image.png
                            }
                        </div>
                        {/* Dish type */}
                        {recipeDetails.dish ?
                            <div>
                                <h3 className={style.title}>Dish Type: </h3>
                                {recipeDetails.dish?.map(d => {
                                    return (
                                        <p key={d}>- {d[0].toUpperCase() + d.slice(1)} </p>
                                    )
                                })}
                            </div> :
                            <h5 className={style.notFound}>This recipe has no dish type.</h5>
                        }
                        {/* Diets */}
                        {recipeDetails.diets ?
                            <div>
                                <h3 className={style.title}>Types of diets: </h3>
                                {
                                    recipeDetails.diets?.map(d => {
                                        if (d.hasOwnProperty('name')) {
                                            return (
                                                <p key={d.name}>- {d.name[0].toUpperCase() + d.name.slice(1)} </p>
                                            )
                                        } else {
                                            return (
                                                <p key={d}>- {d[0].toUpperCase() + d.slice(1)} </p>
                                            )
                                        }
                                    })
                                }
                            </div>
                            :
                            <h5 className={style.notFound}>This recipe has no diet type.</h5>
                        }
                        {/* Summary */}
                        {recipeDetails.summary ?
                            <div>
                                <h3 className={style.title}>Summary: </h3>
                                <p className={style.area1}>{recipeDetails.summary?.replace(/<[^>]*>/g, '')}</p>
                            </div> :
                            <h5 className={style.notFound}>This recipe does not have summary.</h5>
                        }
                        {/* Health Score */}
                        {recipeDetails.healthScore ?
                            <div>
                                <h3 className={style.health}>Health Score: </h3>
                                <p>{recipeDetails.healthScore}</p>
                            </div> :
                            <h5 className={style.notFound}>This recipe does not have health score.</h5>
                        }
                        {/* Steps */}
                        {recipeDetails.steps ?
                            <div>
                                <h3 className={style.title}>Steps: </h3>
                                <ul>{Array.isArray(recipeDetails.steps) ? recipeDetails.steps.map(s => {
                                    return (
                                        <p className={style.area2} key={s.number}>{s.number}: {s.step}</p>
                                    )
                                }) :
                                    <p className={style.area2}>{recipeDetails.steps}</p>
                                } </ul>
                            </div> :
                            <h5 className={style.notFound}>This recipe does not have steps</h5>
                        }
                    </div> : <h1>Loading...</h1>
                }
                <div>
                    <Link to="/home"> <button className={style.btn}>HOME</button> </Link>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        recipeDetails: state.recipeDetails,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchRecipeDetails: (id) => dispatch(fetchRecipeDetails(id)),
        clearDetail: () => dispatch(clearDetail())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Details);