import React, { useEffect } from 'react';
import RecipeCard from './RecipeCard.jsx';
import style from './RecipesGrid.module.css';

export default function RecipesGrid(props) {

    console.log('RecipesGrid.jsx --- creating component')
    console.log('props: ', props)

    useEffect(() => {
        console.log('RecipesGrid.jsx --- useEffect ---')
    })

    return (
        <div className={style.cardsContainer}>
            {!props.recipes && <div>RECIPES GRID</div>}

            {props.recipes && props.recipes.map(r =>
                <div key={"r" + r.id}>
                    <RecipeCard key={"rc" + r.id}
                        id={r.id}
                        name={r.name}
                        image={r.image}
                        /* dietType? */
                        dishTypes={r.dishTypes}
                    />
                </div>)}

            {/* <RecipeCard />
            <RecipeCard />
            <RecipeCard />
            <RecipeCard />
            <RecipeCard />
            <RecipeCard />
            <RecipeCard />
            <RecipeCard />
            <RecipeCard /> */}

        </div>
    )
}