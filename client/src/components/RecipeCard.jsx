import React from 'react';
import style from './RecipeCard.module.css';
import { Link } from 'react-router-dom';

export default function RecipeCard(props) {
    return (
        <div className={style.card}>
            <Link to="">

                <div className={style.infoContainer}>
                    <div className={style.cardTitle}>
                        {props.name}
                    </div>
                </div>
                <div className={style.imgContainer}>
                    <img className={style.image} src={props.image} alt={"Cover image of " + props.name} />
                </div>
            </Link>
        </div>
    )
}