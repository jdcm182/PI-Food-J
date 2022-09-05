const { Router } = require('express');
const router = Router();
const axios = require('axios');
const { Recipe, Diet } = require('../db.js');

require('dotenv').config();
const API_KEY = process.env.YOUR_API_KEY;
const MAX_AMOUNT = 100; // API's MAX AMOUNT: 100 items!



//          /recipes
router.get('/', async (req, res) => {
    try {

        // GET recipes from DATABASE:
        const mydbRecipes = await Recipe.findAll({ include: Diet });
        console.log('--------------------------------------------------------------------')
        console.log('recipesRouter.jsx > router.get /recipes > mydbRecipes: ', mydbRecipes)

        // // GET recipes from Spoonacular API
        // // offset  0 - The number of results to skip(between 0 and 900).
        // // number 10 - The number of expected results(between 1 and 100).
        // const offset = 0;
        // const number = MAX_AMOUNT; //API's MAX AMOUNT: 100 items
        // const url = `https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&offset=${offset}&number=${number}&apiKey=${API_KEY}`;
        // const r = await axios.get(url)
        // const apiRecipes = r.data.results

        // // // PARA NO GASTAR LOS REQUEST A LA API USO ARRAY HARDCODEADO!!!
        // // import { data } from '../../../resJSON/number_100,offset_0.js';
        const data = require('../../../resJSON/number_100,offset_0.json');
        const apiRecipes = data.results;

        console.log('--------------------------------------------------------------------')
        console.log('recipesRouter.jsx > router.get /recipes > apiRecipes: ', apiRecipes)


        // // JOIN all recipes:[ DATABASE + API ] 
        const allRecipes = [...mydbRecipes, ...apiRecipes.map(r => extractMainKeys(r))];
        //const allRecipes = apiRecipes;//mydbRecipes.concat(apiRecipes);
        console.log('--------------------------------------------------------------------')
        console.log('recipesRouter.jsx > router.get /recipes > allRecipes: ', allRecipes)


        let subset = [];
        subset = allRecipes.slice(0, MAX_AMOUNT);
        //console.log('enviando array subset: ' , allRecipes.json() )
        //console.log('array: ', JSON.stringify(subset))

        return res.json(subset); /* JSON.stringify(allRecipes) *//* status(201). */
        //return res.json(allRecipes); /* JSON.stringify(allRecipes) *//* status(201). */


    } catch (e) {
        console.log('recipesRouter.jsx > router.get /recipes > catch e: ', e)
        return res.json({ error: e.message, e: e }) /* status(400). */
    }
})

module.exports = router;


function extractMainKeys(recipe) {
    const obj = {
        id: recipe.id,
        image: recipe.image,
        name: recipe.title,
        /* dietType: ??? */
        dishTypes: recipe.dishTypes,
        summary: recipe.summary,
        healthScore: recipe.healthScore,
        /*  stepByStep: ??? */
    }
    return obj;
}
/*
extract Only Main       Keys
map          Principal  Props
get

*/

