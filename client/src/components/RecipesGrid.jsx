import React from 'react';
import RecipeCard from './RecipeCard.jsx';
import style from './RecipesGrid.module.css';

export default function RecipesGrid(props) {
    return (
        <div className={style.cardsContainer}>
            RECIPES GRID

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