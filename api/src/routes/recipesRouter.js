const { Router } = require('express');
const router = Router();
const axios = require('axios');
const { Op } = require('sequelize')
const { Recipe, Diet } = require('../db.js');

require('dotenv').config();
const API_KEY = process.env.YOUR_API_KEY;
const MAX_AMOUNT = 100//100; // API's MAX AMOUNT: 100 items!



//           /recipes     ?search={recipe}   <---  query
//          /recipes
router.get('/', async (req, res) => {

    const { search } = req.query;
    console.log('recipesRouter > GET /recipes > req.query: ', req.query)
    console.log('recipesRouter > GET /recipes > search: ', search)
    if (search === undefined) {

        try {

            // GET recipes from DATABASE:
            const mydbRecipes = await Recipe.findAll({ include: Diet });
            console.log('--------------------------------------------------------------------')
            console.log('recipesRouter.jsx > router.get /recipes > mydbRecipes: ', mydbRecipes)

            // // GET recipes from Spoonacular API
            // // offset  0 - The number of results to skip(between 0 and 900).
            // const offset = 0;
            // const number = MAX_AMOUNT; //API's MAX AMOUNT: 100 items
            // // number 10 - The number of expected results(between 1 and 100).
            // const url = `https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&offset=${offset}&number=${number}&apiKey=${API_KEY}`;
            // const r = await axios.get(url)
            // const apiRecipes = r.data.results

            // // // PARA NO GASTAR LOS REQUEST A LA API USO ARRAY HARDCODEADO!!!
            // // import { data } from '../../../resJSON/number_100,offset_0.js';
            const data = require('../../../resJSON/number_100,offset_0.json');
            const apiRecipes = data.results;

            console.log('--------------------------------------------------------------------')
            //console.log('recipesRouter.jsx > router.get /recipes > apiRecipes: ', apiRecipes)
            console.log('recipesRouter.jsx > router.get /recipes > apiRecipes.length: ', apiRecipes.length)


            // // JOIN all recipes:[ DATABASE + API ] 
            const allRecipes = [...mydbRecipes, ...apiRecipes.map(r => extractMainKeys(r))];
            //const allRecipes = apiRecipes;//mydbRecipes.concat(apiRecipes);
            console.log('--------------------------------------------------------------------')
            //console.log('recipesRouter.jsx > router.get /recipes > allRecipes: ', allRecipes)
            console.log('recipesRouter.jsx > router.get /recipes > allRecipes.length: ', allRecipes.length)


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
    }
    else { // search !== undefined     ?search={recipe}   <---  query
        //  // query > recipe:  { search: 'garlic' }
        try {

            let foundRecipesFromDB = await Recipe.findAll({
                where: {
                    name: {
                        [Op.iLike]: '%' + search + '%'
                    }
                }
            })
            console.log(`found ${foundRecipesFromDB.length} in local Database`)

            const number = MAX_AMOUNT; //API's MAX AMOUNT: 100 items
            let foundRecipesFromAPI = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&number=${number}&query=${search}&apiKey=${API_KEY}`)
            console.log('foundRecipesFromAPI: ', foundRecipesFromAPI)
            await console.log(`found ${foundRecipesFromAPI.data.results.length} in external API`)

            let foundRecipes = foundRecipesFromDB.concat(foundRecipesFromAPI.data.results.map(r => extractMainKeys(r)));
            console.log('foundRecipies.length: ', foundRecipes.length)
            // limit amount of results
            if (foundRecipes.length > 0) {
                console.log('devolviendo arreglo foundRecipes... ')
                if (foundRecipes.length <= MAX_AMOUNT) {
                    console.log('devolviendo foundRecipes <= ', MAX_AMOUNT, `  - ${foundRecipes.length} recipes found`)
                    return res.json(foundRecipes);
                } else {
                    const slicedRecipes = foundRecipes.slice(0, MAX_AMOUNT);
                    console.log(`slicedRecipes.length: ${slicedRecipes.length}`)
                    return res.json(slicedRecipes);
                }
            } else {
                console.log('No se encontró ninguna receta con ', search)
                return res.status(400).json({ error: `No se encontro ninguna receta con ${search}` });
            }
            console.log('foundRecipes.length < 0 ????????????????????????????????????????????')
            return res.status(400).json({ error: 'foundRecipes.length < 0 ?' });


        } catch (e) {
            console.log(e)
            return res.status(404).send({ error: e.message, e })
        }
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

