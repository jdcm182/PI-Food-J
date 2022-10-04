import React, { useEffect } from 'react';
import { connect/* , useDispatch, useSelector */ } from 'react-redux';
import { getDetail, deleteR, getAllRecipes, displayError } from '../actions';
import style from './Detail.module.css';
import NavBar from './NavBar'

export /* default */ function Detail({ match, detailGlobal, getDetailGlobal, deleteR, history, displayError }) {

    let id = /* props. */match.params.id;

    useEffect(() => {
        /* console.log('Detail.jsx > useEffect > id: ', id)
        console.log('detailGlobal: ', detailGlobal)
        console.log('typeof detailGlobal.id: ', typeof (detailGlobal.id)) // --> number
        console.log('typeof id: ', typeof (id))                          // --> string
 */
        try {
            getDetailGlobal(id)
        } catch (e) {
            //history.push('/recipes/main');
            displayError(e.message);
        }
        //if (!detailGlobal || detailGlobal.id !== parseInt(id)) getDetailGlobal(id);
        /* if (!detailGlobal) getDetailGlobal(id)
        else if (detailGlobal.id && detailGlobal.id[0] === 'B') { // id from local DB
            detailGlobal.id !== id && getDetailGlobal(id);
        } else { // id from API
            console.log('💤💤💤 typeof detailGlobal.id : ', typeof detailGlobal.id)
            console.log('💤💤💤 parseInt(id) : ', parseInt(id))
            detailGlobal.id !== parseInt(id) && getDetailGlobal(id);
        } */
    }, [/* detailGlobal, */ id, getDetailGlobal /*, props.detailGlobal */])

    /* var summary = detailGlobal.summary;
    var summaryHtmlObject = document.createElement('div');
    summaryHtmlObject.innerHTML = summary; */
    //htmlObject.getElementById("myDiv").style.marginTop = something;
    /* https://stackoverflow.com/questions/2522422/converting-a-javascript-string-to-a-html-object */

    //console.log('Detail.jsx - id: ', id)
    //const defaultImg = 'https://eadn-wc01-4177395.nxedge.io/wp-content/uploads/2020/02/ff-default-recipe.png';
    const defaultImg = 'https://spoonacular.com/recipeImages/607954-312x231.jpg';

    if (detailGlobal) {
        return (
            <div className={style.detail}>
                {<NavBar /* setPage={actPage } */ />}

                <div className={style.glass}>

                    <div className={style.content}>

                        <button className={style.btnBack}
                            onClick={() => {
                                history.goBack();
                            }}>goBack</button>

                        {id && id[0] === 'B' ? <button className={style.btnDelete}
                            onClick={() => {
                                try {
                                    deleteR(id);
                                } catch (e) {
                                    displayError(e.message);
                                }
                                history.push('/recipes/main');
                                //getAllRecipes();
                            }}>Delete</button> : null}
                        < br />

                        <div className={style.discrete}>DETAIL ({id})</div> <br />

                        {/* JSON.stringify(props) */}


                        <div className={style.nameTitle}>
                            {detailGlobal.name}
                        </div> <br />


                        <div className={style.columnContainer}>


                            <div className={style.column}>

                                <img className={style.image} src={detailGlobal.image ? detailGlobal.image : defaultImg   /*null*/} alt={"Cover image of " + detailGlobal.name} />


                                <div className={style.dietContainer}>
                                    {detailGlobal && detailGlobal.dietTypes && <div><div className={style.discrete}>dietTypes:</div></div>}
                                    <div className={style.line}>

                                        {detailGlobal && detailGlobal.dietTypes && detailGlobal.dietTypes.map((diet, i) => (
                                            <div className={style.dietType}
                                                key={"et" + i}>
                                                {diet}
                                            </div>))}
                                    </div>
                                    <br />


                                    {detailGlobal && detailGlobal.diets && <div className={style.discrete}>diets:</div>}
                                    {detailGlobal && detailGlobal.diets && <br />}
                                    <div className={style.line}>
                                        <div className={style.dietTypeContainer}>
                                            {detailGlobal && detailGlobal.diets && detailGlobal.diets.map((diet, i) => (
                                                <div className={style.dietType}
                                                    key={"et" + i}>
                                                    {diet}
                                                </div>))}
                                        </div>
                                    </div>
                                    {detailGlobal && detailGlobal.diets && <br />}
                                </div>
                                {detailGlobal && detailGlobal.diets && <br />}




                                {detailGlobal.dishTypes && (<div className={style.dishContainer}>
                                    <div className={style.discrete}>dishTypes:</div>

                                    <div className={style.line}>
                                        {detailGlobal && detailGlobal.dishTypes && detailGlobal.dishTypes.map((dish, i) => (
                                            <div className={style.dishType}
                                                key={"ht" + i}>
                                                {dish}
                                            </div>))
                                        }
                                    </div>
                                    <br />
                                </div >)}

                                <br />

                                <div className={style.line}>
                                    <span className={style.discrete}> healthScore: </span> <span>{detailGlobal.healthScore}</span>
                                </div>

                                <br />



                            </div>


                            <div className={style.column}>

                                {/* img: {detailGlobal.image} <br />*/}

                                <div className={style.discrete}>
                                    summary:</div>
                                <p dangerouslySetInnerHTML={{ __html: detailGlobal.summary, }} />
                                <br />

                                <br />
                                {detailGlobal.instructions && (<div>
                                    <div className={style.discrete}>instructions:</div> <p dangerouslySetInnerHTML={{ __html: detailGlobal.instructions }} />
                                </div>)}
                                <br />

                                <br />
                            </div>

                        </div> {/* .columnContainer */}


                        <div className={style.stepByStepContainer}>
                            <div className={style.discrete}>stepByStep:</div>
                            {detailGlobal && detailGlobal.stepByStep && !Array.isArray(detailGlobal.stepByStep) && (

                                <div className={style.obj} >
                                    {detailGlobal.stepByStep}
                                </div>
                            )}

                            {/* stepByStep: */} {detailGlobal && detailGlobal.stepByStep && Array.isArray(detailGlobal.stepByStep) && detailGlobal.stepByStep.map((obj, i) => (
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
                                                {step.ingredients && step.ingredients.length > 0 && <b>ingredients:</b>}
                                                {step.ingredients && step.ingredients.map((ingr, i) =>
                                                    <div key={"ingr" + i}>
                                                        {ingr.name}
                                                        {/* <img className={style.ingredientImg} src={`https://spoonacular.com/cdn/ingredients_100x100/${ingr.image}/`} alt={"Image of ingredient " + ingr.name} /> */}
                                                    </div>
                                                )}
                                                {step.equipment && step.equipment.length > 0 && <b>equipment:</b>}
                                                {step.equipment && step.equipment.map((equip, i) =>
                                                    <div key={"equi" + i}>
                                                        {equip.name}
                                                        {/* <img className={style.equipmentImg} src={`https://spoonacular.com/cdn/equipment_100x100/${equip.image}/`} alt={"Image of " + equip.name} /> */}
                                                    </div>
                                                )}

                                            </div>
                                        ))}
                                    </div>
                                </div>))}<br />
                            {/* stepByStep: {JSON.stringify(detailGlobal.stepByStep)} */}
                        </div >


                    </div> {/* .content */}
                </div> {/* .glass */}
            </div>  /* .detail */
        )
    }

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
        getDetailGlobal: (id) => dispatch(getDetail(id)),
        deleteR: (id) => dispatch(deleteR(id)),
        getAllRecipes: () => dispatch(getAllRecipes()),
        displayError: (msg) => dispatch(displayError(msg)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail)