import React, { useEffect } from 'react';
import RecipeCard from './RecipeCard.jsx';
import style from './RecipesGrid.module.css';

export default function RecipesGrid(props) {

    //console.log('RecipesGrid.jsx --- creating component')
    //console.log('props: ', props)

    useEffect(() => {
        //console.log('RecipesGrid.jsx --- useEffect ---')
    })

    console.log('💦props: ', props)

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
                        diets={r.diets}
                        dishTypes={r.dishTypes}
                        healthScore={r.healthScore}
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


// let ghostCards = [];
// for (let i = 1; i <= 9; i++) { // 9: IMPORTAR ITEMS-x-PAGE
//     /* const elem = `<RecipeCard key=rcg${i}
//     id=null
//     name=''
//     image=''
// />` */
//     const elem = 'rcg' + i
//     ghostCards.push(elem);
// }

// {/* !props.recipes && */ ghostCards.map(g =>
//     <div key={"div" + g}>
//     <RecipeCard key={g}
//         id={null/* g.id */}
//         name={''/* r.name */}
//         image={''/* r.image */}
//     /* dietType? */
//     /* dishTypes={r.dishTypes} */
//     />
// </div>)
// }