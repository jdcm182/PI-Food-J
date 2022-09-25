import React, { useEffect } from 'react';
import { connect/* , useDispatch, useSelector */ } from 'react-redux';
import { getDetail } from '../actions';
import style from './Detail.module.css';
import NavBar from './NavBar'

export /* default */ function Detail({ match, detailGlobal, getDetailGlobal }) {

    let id = /* props. */match.params.id;

    useEffect(() => {
        console.log('Detail.jsx > useEffect > id: ', id)
        console.log('detailGlobal: ', detailGlobal)
        console.log('typeof detailGlobal.id: ', typeof (detailGlobal.id)) // --> number
        console.log('typeof id: ', typeof (id))                          // --> string
        if (!detailGlobal || detailGlobal.id !== parseInt(id)) getDetailGlobal(id);
    }, [detailGlobal/* , id, getDetailGlobal *//* id, props.detailGlobal */])

    /* var summary = detailGlobal.summary;
    var summaryHtmlObject = document.createElement('div');
    summaryHtmlObject.innerHTML = summary; */
    //htmlObject.getElementById("myDiv").style.marginTop = something;
    /* https://stackoverflow.com/questions/2522422/converting-a-javascript-string-to-a-html-object */

    return (
        <div className={style.detail}>
            <NavBar setPage={1/* actPage */} />
            DETAIL
            <br />
            {/* JSON.stringify(props) */}
            <br />
            id: {/* props.detailGlobal. */id} <br />
            name: {detailGlobal.name} <br />
            <div className={style.dietContainer}>
                dietTypes: {detailGlobal && detailGlobal.dietTypes && detailGlobal.dietTypes.map((diet, i) => (
                    <div className={style.dietType}
                        key={"et" + i}>
                        {diet}
                    </div>))} <br />
            </div>
            <div className={style.dishContainer}>
                dishTypes: {detailGlobal && detailGlobal.dishTypes && detailGlobal.dishTypes.map((dish, i) => (
                    <div className={style.dishType}
                        key={"ht" + i}>
                        {dish}
                    </div>))
                } <br />
            </div >

            <img className={style.image} src={detailGlobal.image ? detailGlobal.image : null} alt={"Cover image of " + detailGlobal.name} /> <br />

            img: {detailGlobal.image} <br />
            <br />
            summary: {/* summaryHtmlObject */detailGlobal.summary} <br />
            healthScore: {detailGlobal.healthScore} <br />
            instructions: {detailGlobal.instructions} <br />
            <br />
            <div className={style.stepByStepContainer}>
                stepByStep: {detailGlobal && detailGlobal.stepByStep && detailGlobal.stepByStep.map((obj, i) => (
                    <div className={style.obj} key={"objst" + i}>
                        name: {obj.name}      <br />
                        steps:
                        <div className={style.stepsContainer}>
                            {obj.steps && obj.steps.map((step, i) => (
                                <div key={"objste" + i}>
                                    <span className={style.stepNumber}>
                                        {step.number}
                                    </span>
                                    - {step.step} <br />
                                    ingredients: {step.ingredients && step.ingredients.map(ingr =>
                                        <div>
                                            {ingr.name}
                                            <img className={style.ingredientImg} src={`https://spoonacular.com/cdn/ingredients_100x100/${ingr.image}/`} alt={"Image of ingredient " + ingr.name} />
                                        </div>
                                    )}
                                    equipment: {step.equipment && step.equipment.map(equip =>
                                        <div>
                                            {equip.name}
                                            <img className={style.equipmentImg} src={`https://spoonacular.com/cdn/equipment_100x100/${equip.image}/`} alt={"Image of " + equip.name} />
                                        </div>
                                    )}

                                </div>
                            ))}
                        </div>
                    </div>))}<br />
                {/* stepByStep: {JSON.stringify(detailGlobal.stepByStep)} */}
            </div >

        </div >
    )

    /*
        detailGlobal: 
            const obj = {
                id: recipe.id,
                image: recipe.image,
                name: recipe.title,
                dietTypes: recipe.diets,    //  array
                dishTypes: recipe.dishTypes, // array
                summary: recipe.summary,
                healthScore: recipe.healthScore,
                instructions: recipe.instructions,
                stepByStep: recipe.analyzedInstructions // array {name, steps[]}
    }
    */

}

function mapStateToProps(state) {
    return {
        detailGlobal: state.detail
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getDetailGlobal: (id) => dispatch(getDetail(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail)