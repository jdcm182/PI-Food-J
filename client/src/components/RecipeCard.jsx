import React from 'react';
import { useSelector } from 'react-redux';
import style from './RecipeCard.module.css';
import { Link } from 'react-router-dom';

export default function RecipeCard(props) {

    const allTypes = useSelector((state) => state.dietTypes);

    const myDietTypes = [];
    /* if (allTypes) { */
    if (props.diets) props.diets.forEach(d => {
        const globalItem = allTypes.find(g => g.type === d);
        myDietTypes.push(globalItem);
    });
    /* } else {
        console.log('ERROR: allTypes.find > TypeError: types.find is not a function')
    } */
    //allTypes.filter(global => global.type ===)
    // console.log('--- props.name:  ', props.name)
    // console.log('myDietTypes: ', myDietTypes)

    // const defaultImg = 'https://eadn-wc01-4177395.nxedge.io/wp-content/uploads/2020/02/ff-default-recipe.png';
    const defaultImg = 'https://spoonacular.com/recipeImages/607954-312x231.jpg';

    return (
        <div className={style.card}>
            <Link to={`/detail/${props.id}`}
                onClick={() => 0/* getDetail() */}>

                <div className={style.infoContainer}>
                    <div className={style.cardTitle}>
                        {props.name}
                    </div>
                </div>
                <div className={style.healthScore}>{props.healthScore}</div>
                <div className={style.dietTypes}>
                    {myDietTypes.map((t, i) => {
                        //console.log('t: ', JSON.stringify(t))
                        return t && (
                            <div className={/* filtering(t.type) */
                                t.filter ? style.active : style.diet}
                                key={`dt${i}`}>
                                {t.name}
                            </div>
                        )
                    }
                    )}
                </div>
                <div>
                    {props.dishTypes && <div>  {props.dishTypes} </div>}


                </div>
                <div className={style.imgContainer}>
                    <img className={style.image} src={props.image ? props.image : defaultImg} alt={"Cover image of " + props.name} />
                </div>
            </Link>
        </div>
    )

    /* const filtering = (type) => {

    } */
}