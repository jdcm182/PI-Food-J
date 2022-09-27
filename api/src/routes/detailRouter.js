const { Router } = require('express');
const router = Router();
const axios = require('axios');
const { Op } = require('sequelize');
const { Recipe, Diet } = require('../db.js');

require('dotenv').config();
const API_KEY = process.env.YOUR_API_KEY;


function extractDetailFromDB(recipe) {
    let dietTypes = [];

    if (recipe.id && recipe.id[0] === 'B') {
        if (recipe.diets) {
            recipe.diets.forEach(d => dietTypes.push(d.type));
        }
    } else {
        dietTypes = recipe.diets;
    }

    const obj = {
        id: recipe.id,
        image: recipe.image,
        name: recipe.name,  // API: title,  DB: name
        // dietType: ??? 
        diets: dietTypes, // recipe.diets,
        dishTypes: recipe.dishTypes,
        summary: recipe.summary,
        healthScore: recipe.healthScore,
        stepByStep: recipe.stepByStep
    }
    return obj;
}


const extractDetailsFromAPI = (recipe) => {
    console.log('>> detailRouter.js > extractDetailsFromAPI: ')
    //console.log('recipe: ', recipe)
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
    //console.log('obj: ', obj)
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
            //
            //
            //            
            console.log('ID pertenece a item de la Base de Datos local')
            //
            //
            //
            //

            const r = await Recipe.findByPk(id, { include: { all: true } });

            if (r) {
                const newRec = extractDetailFromDB(r);
                console.log(`Receta ${id} encontrada en la BD`)
                console.log('newRec: ', JSON.stringify(newRec))
                return res.status(200).json(newRec);
            } else {
                console.log(`No se encontro el id ${id} en la BD`);
                return res.status(400).send('Error: No se encontro el id en la base de datos');
            }


        } else {
            // GET /detail/11 --> API

            // Get from API (w/cache)
            const fileName = `detail_${id}`;
            const filePath = '../res_cache/';
            const fileExtension = '.json';
            const file = filePath + fileName + fileExtension;
            const fs = require('fs');
            if (!fs.existsSync(file)) {
                console.log(`The file ${file} doesn't exists`)
                console.log(`There´s no cache for recipe id: "${id}". Fetching from API`)

                try {
                    const url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
                    const r = await axios.get(url);
                    if (r) {
                        const recipe = extractDetailsFromAPI(r.data);

                        // save results to cache:
                        const strData = JSON.stringify(r.data);
                        fs.writeFile(file, strData, (err) => {
                            if (err) { throw err; }
                            console.log("JSON data was saved to ", file)
                        }, null, 4);


                        return res.json(recipe);
                    }
                } catch (e) {
                    console.log(e)
                    return res.send({ error: 'Error al intentar traer detalle de la API' })
                }

            } else { // ya existe cache para esa receta
                console.log(`Found a cache file for recipe id: ${id}! \n File: ${file}`)
                try {
                    const recipe = require('../../' + file);
                    //console.log('recipe: ', recipe)
                    const obj = extractDetailsFromAPI(recipe);
                    //console.log('obj: ', obj)
                    return res.json(obj);
                } catch (e) {
                    console.log('error: ', e)
                }
            }


        }
    }
});

module.exports = router;
