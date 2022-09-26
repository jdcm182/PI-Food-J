const { Router } = require('express');
const router = Router();
const axios = require('axios');
const { Op } = require('sequelize')
const { Recipe, Diet } = require('../db.js');

require('dotenv').config();
const API_KEY = process.env.YOUR_API_KEY;
const MAX_AMOUNT = 100; // API's MAX AMOUNT: 100 items!



//           /recipes     ?search={recipe}   <---  query
//          /recipes
router.get('/', async (req, res) => {

    const { search } = req.query;

    console.log('recipesRouter > GET /recipes > req.query: ', req.query)
    console.log('recipesRouter > GET /recipes > search: ', search)

    if (search === undefined) {

        try {

            // GET recipes from DATABASE:
            const mydbRecipes = await Recipe.findAll({ include: { model: Diet/* , as: 'dietsDB' */, attributes: ['type'] } })
            /*const mydbRecipes = await Recipe.findAll(
                {
                include: // Diet
                {
                    model: Diet, as: 'dietsDB'// , attributes: ['type']
                }      // , attributes: type 
            });*/ //  ReferenceError: type is not defined

            console.log('\n----------------------------------------------------------')
            //console.log('recipesRouter.jsx > router.get /recipes > mydbRecipes: ', /* JSON.stringify */(mydbRecipes))
            //console.log('mydbRecipes: ', mydbRecipes)
            console.log('\nLimpiando array de diets..\n')
            //en diets necesito solo un arreglo de strings (dietType) y no de objetos
            let cleanRecipesFromDB = [];
            mydbRecipes.forEach(r => {
                const aux = extractMainKeys(r);
                cleanRecipesFromDB.push(aux);
            });
            console.log('cleanRecipesFromDB: ', JSON.stringify(cleanRecipesFromDB))

            /* // No me deja modificar el array!!!!! POR QUEEEEEEEEE???????????????
            let newArr = [...mydbRecipes];
            let auxDiets = [];
            newArr = newArr.map(recipe => {
                console.log('recipe: ', JSON.stringify(recipe))
                if (recipe.diets) {
                    recipe['kkkkkkkkkkk'] = recipe.diets.map(d => {
                        console.log('d.type: ', d.type)
                        auxDiets.push(d.type);
                        return d.type
                    })
                    recipe.kikiki = [...auxDiets];
                    recipe['lalalalalala'] = [...auxDiets];
                }
                return recipe;
            });
            newArr.popopo = auxDiets;
            console.log('newArray: ', JSON.stringify(newArr))

            console.log('newArray: ', JSON.stringify(newArr))
            */
            /*{    //  No me deja modificar el array!!!!! POR QUEEEEEEEEE???????????????
            if (recipe.diets) {
                const newDietTypes = [];
                recipe.kk = recipe.diets.map(diet => {
                    diet.type && newDietTypes.push(diet.type);
                    return diet.type;
                });
                recipe.diet = [...newDietTypes];
                cleanRecipes.push(recipe);
                //recipe.kk = newDietTypes;
                recipe['kk2'] = newDietTypes;
                console.log('cleanRecipes: ', JSON.stringify(cleanRecipes))
                return recipe;
            }
        } 
        );
            console.log('cleanRecipes: ', JSON.stringify(cleanRecipes))
            console.log('clean2: ', JSON.stringify(clean2))
*/
            // // GET recipes from Spoonacular API
            // // offset  0 - The number of results to skip(between 0 and 900).
            // const offset = 0;
            // const number = MAX_AMOUNT; //API's MAX AMOUNT: 100 items
            // // number 10 - The number of expected results(between 1 and 100).
            // const url = `https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&offset=${offset}&number=${number}&apiKey=${API_KEY}`;
            // const r = await axios.get(url)
            // const apiRecipes = r.data.results

            // // // PARA NO GASTAR LOS REQUEST A LA API USO ARRAY GUARDADO!!!
            // // import { data } from '../../../resJSON/number_100,offset_0.js';
            const data = require('../../../resJSON/number_100,offset_0.json');
            const apiRecipes = data.results;

            console.log('--------------------------------------------------------------------')
            //console.log('recipesRouter.jsx > router.get /recipes > apiRecipes: ', apiRecipes)
            console.log('recipesRouter.jsx > router.get /recipes > apiRecipes.length: ', apiRecipes.length)


            // // JOIN all recipes:[ DATABASE + API ] 
            //const allRecipes = [...mydbRecipes, ...apiRecipes.map(r => extractMainKeys(r))];
            const allRecipes = [...cleanRecipesFromDB, ...apiRecipes.map(r => extractMainKeys(r))];
            //const allRecipes = apiRecipes;//mydbRecipes.concat(apiRecipes);
            console.log('--------------------------------------------------------------------')
            //console.log('recipesRouter.jsx > router.get /recipes > allRecipes: ', allRecipes)
            console.log('recipesRouter.jsx > router.get /recipes > allRecipes.length: ', allRecipes.length)

            //console.log('allRecipes: ', JSON.stringify(allRecipes))

            let subset = [];
            subset = allRecipes.slice(0, MAX_AMOUNT);
            //console.log('enviando array subset: ' , allRecipes.json() )
            //console.log('array: ', JSON.stringify(subset))


            //console.log('\n\n\n\nsubset: ', subset)

            return res.json(subset); /* JSON.stringify(allRecipes) *//* status(201). */
            //return res.json(allRecipes); /* JSON.stringify(allRecipes) *//* status(201). */


        } catch (e) {
            console.log('recipesRouter.jsx > router.get /recipes > catch e: ', e)
            return res.json({ error: e.message, e: e }) /* status(400). */
        }
    }
    else { // search !== undefined     ?search={recipe}   <---  query
        //  // query > recipe:  { search: 'garlic' }

        const searchStr = search.replace(/\s/g, '').toLowerCase(); //remove spaces

        // Search in local DB
        let foundRecipesFromDB = await Recipe.findAll({
            where: {
                name: {
                    [Op.iLike]: '%' + search + '%'
                }
            }
        })
        console.log(`found ${foundRecipesFromDB.length} in local Database`)

        // Search in API (w/cache)
        const fileName = `search_${searchStr}`
        const filePath = '../res_cache/';
        const fileExtension = '.json';
        const file = filePath + fileName + fileExtension;

        let foundRecipesFromAPI = [];

        const fs = require('fs');
        if (!fs.existsSync(file)) {
            console.log(`There´s no cache for "${search}" search string (${searchStr})... fetching from API`)
            console.log(`The file ${file} doesn't exists`)

            try {
                const number = MAX_AMOUNT; //API's MAX AMOUNT: 100 items
                const url = `https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&number=${number}&query=${search}&apiKey=`;
                foundRecipesFromAPI = await axios.get(url + API_KEY)
                // https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&number=100&query=qwerqweqwasd&apiKey=
                // console.log('foundRecipesFromAPI: ', foundRecipesFromAPI)
                await console.log(`found ${foundRecipesFromAPI.data.results.length} in external API`)
                //console.log('foundRecipesFromAPI: ', foundRecipesFromAPI)


                //-----------------------------------------------------------------
                // save results to cache
                let data = {};
                data.results = foundRecipesFromAPI.data.results;
                data.LLAMADO_REALIZADO = url;
                data.date = foundRecipesFromAPI.headers.date;
                data['X-API-Quota-Request'] = foundRecipesFromAPI.headers['x-api-quota-request'];
                data['X-API-Quota-Used'] = foundRecipesFromAPI.headers['x-api-quota-used'];
                data['X-API-Quota-Left'] = foundRecipesFromAPI.headers['x-api-quota-left'];

                //guardar data en archivo JSON
                const strData = JSON.stringify(data);
                fs.writeFile(file, strData, (err) => {
                    if (err) {
                        throw err;
                    }
                    console.log("JSON data is saved to " + filePath + fileName);
                }, null, 4);
                //-----------------------------------------------------------------

                foundRecipesFromAPI = foundRecipesFromAPI.data;
                //console.log('foundRecipesFromAPI desp de pisarlo con el .data:  ', foundRecipesFromAPI);


            } catch (e) {
                console.log(e)
                return res.status(404).send({ error: e.message, e })
            }


        } else { // ya existe cache para esa busqueda
            //const data = require('../../../resJSON/number_100,offset_0.json');
            console.log(`Found a cache file for ${search}! File: ${file}`)
            const data = require('../../' + file);
            foundRecipesFromAPI = data//.results;
            //console.log('data: ', data)
            //console.log('data.results: ', data.results)

        }

        // join results from local DB & from external API into one
        let foundRecipes = foundRecipesFromDB.concat(foundRecipesFromAPI/* .data */.results.map(r => extractMainKeys(r)));
        console.log('\n >> (search) foundRecipes.length: ', foundRecipes.length)
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
        //console.log('foundRecipes.length < 0 ????????????????????????????????????????????')
        return res.status(400).json({ error: 'foundRecipes.length < 0 ?' });

    }
})

//          /recipes/cache
router.get('/cache', async (req, res) => {
    const folder = '../res_cache/';
    const fs = require('fs');

    fs.readdir(folder, (err, files) => {
        let cacheList = [];
        files.forEach(file => {
            console.log(file)
            if (file.startsWith('search_')) {
                let newName = '';
                newName = file.replace('search_', '');
                newName = newName.replace('.json', '');
                cacheList.push(newName);
            }
        })
        console.log(cacheList)
        return res.send(cacheList);
    })
})


module.exports = router;


function extractMainKeys(recipe) {
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
        name: recipe.title,
        // dietType: ??? 
        diets: dietTypes, // recipe.diets,
        dishTypes: recipe.dishTypes,
        summary: recipe.summary,
        healthScore: recipe.healthScore,
        stepByStep: recipe.stepByStep
    }
    return obj;
}
/*
extract Only Main       Keys
map          Principal  Props
get

*/

