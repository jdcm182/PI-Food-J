const { Router } = require('express');
const router = Router();
const axios = require('axios');
const { Op } = require('sequelize');
const { Recipe, Diet } = require('../db.js');

require('dotenv').config();
const API_KEY = process.env.YOUR_API_KEY;



const extractDetailsFromAPI = (recipe) => {
    console.log('>> detailRouter.js > extractDetailsFromAPI: ')
    console.log('recipe: ', recipe)
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
        //cuisines: recipe.cuisines, // array
        //extendedIngredients array[{}]
    }
    console.log('obj: ', obj)
    return obj;
}

// GET /detail/11 --> API
// GET /detail/B2 --> BD
//           /detail/:id
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    console.log('>> GET /detail/:id >> ')
    console.log('id: ', id)
    if (id) {

        // GET /detail/B2 --> BD
        if (id[0] === 'B') {
            //
            console.log('ID pertenece a item de la Base de Datos local')
        } else {
            // GET /detail/11 --> API
            try {
                const url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
                const r = await axios.get(url);
                if (r) {
                    const recipe = extractDetailsFromAPI(r.data);
                    return res.json(recipe);
                }
            } catch (e) {
                console.log(e)
                return res.send({ error: 'Error al intentar traer detalle de la API' })
            }
        }
    }
});

module.exports = router;
