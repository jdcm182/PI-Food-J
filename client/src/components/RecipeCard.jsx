import React from 'react';
import { useSelector } from 'react-redux';
import style from './RecipeCard.module.css';
import { Link } from 'react-router-dom';

export default function RecipeCard(props) {

    const allTypes = useSelector((state) => state.dietTypes);

    const myDietTypes = [];
    if (props.diets) props.diets.forEach(d => {
        const globalItem = allTypes.find(g => g.type === d);
        myDietTypes.push(globalItem);
    });
    //allTypes.filter(global => global.type ===)

    return (
        <div className={style.card}>
            <Link to="">

                <div className={style.infoContainer}>
                    <div className={style.cardTitle}>
                        {props.name}
                    </div>
                </div>
                <div className={style.dietTypes}>
                    {myDietTypes.map((t, i) =>
                        <div className={style.diet}
                            key={`dt${i}`}>
                            {t.name}
                        </div>
                    )}
                </div>
                <div className={style.imgContainer}>
                    <img className={style.image} src={props.image} alt={"Cover image of " + props.name} />
                </div>
            </Link>
        </div>
    )
}