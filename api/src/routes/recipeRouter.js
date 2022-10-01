const { Router } = require('express');
const router = Router();
//const { Op } = require('sequelize');
const { Recipe, Diet } = require('../db.js');


async function getNextFreeLocalId() {
    console.log('function getNextFreeLocalId: ')
    const storedRecipes = await Recipe.findAll();
    //const dbRecipes = await storedRecipes;
    console.log('storedRecipes: ', storedRecipes)
    console.log('!!storedRecipes: ', !!storedRecipes)
    if (storedRecipes.length) {
        storedRecipes.forEach(r => console.log(`${r.id} - ${r.name}`))

        const ids = storedRecipes.map(r => parseInt(r.id.substring(1)));
        const nextId = Math.max(...ids) + 1
        return 'B' + nextId;
    } else {
        return 'B1';
    }
}

const initTypes = async () => {
    const dietTypes = [
        { type: "gluten free", name: 'Gluten Free' },
        { type: "dairy free", name: 'Dairy Free' },
        { type: "lacto ovo vegetarian", name: 'Lacto-Ovo-Vegetarian' },
        { type: "vegan", name: 'Vegan' },
        { type: "paleolithic", name: 'Paleolithic' },
        { type: "primal", name: 'Primal' },
        { type: "whole 30", name: 'Whole 30' },
        { type: "pescatarian", name: 'Pescetarian' },
        { type: "ketogenic", name: 'Ketogenic' },
        { type: "fodmap friendly", name: 'Low FODMAP' }
    ]
    //Diet.addDiets(dietTypes);
    for (const d of dietTypes) {
        const newDietType = await Diet.create({ type: d.type, name: d.name });
        console.log('newDietType: ', newDietType)
    }
}

//            /recipe
router.post('/', async (req, res) => {
    /*
        name: '',
        summary: '',
        healthScore: '',
        stepByStep: '',
        image: '',
        dietTypes: []
    */
    const { name, summary, healthScore, stepByStep, image, dietTypes } = req.body;
    console.log('\n\n>>  router.post   >>')
    console.log('name: ', name)
    console.log('summary: ', summary)
    console.log('stepByStep: ', stepByStep)
    console.log('image: ', image)
    dietTypes && dietTypes.forEach(dt => console.log('dt: ', JSON.stringify(dt)))
    //console.log('name: ', name)

    try {
        const allDietsOnDB = await Diet.findAll();
        if (!allDietsOnDB || allDietsOnDB.length === 0) {
            initTypes();
        }
    } catch (e) {
        console.log(e);
    }

    try {
        // REQUIRED: id, name, summary
        if (name && summary) {
            const id = await getNextFreeLocalId();
            console.log('id: ', id)

            // CREAR NUEVA RECETA Y GUARDAR EN BD
            const newRecipe = {
                id,
                name,
                summary,
                healthScore,
                stepByStep,
                image
            }
            console.log('newRecipe: ', newRecipe)

            const newRecipeDB = await Recipe.create(newRecipe);

            let dietTypesDB = [];
            for (const dt of dietTypes) {
                if (dt /* && dt.type */) {
                    const newDietTypeInstance = await Diet.findOne({
                        where: { type: dt/* .type */ }
                    });
                    console.log('newDietTypeInstance: ', newDietTypeInstance)
                    dietTypesDB.push(newDietTypeInstance)
                } else {
                    console.log('ERROR: dt && dt.type > dt: ', JSON.stringify(dt))
                }

            }
            console.log('dietTypesDB (findOne) > ', JSON.stringify(dietTypesDB))

            newRecipeDB.addDiets(dietTypesDB);

            res.status(200).send({ newRecipe, id, msg: 'Recipe created successfully' });

        } else {
            // THROW ERROR?
            res.status(400).send({ error: 'ERROR: Missing required parameters' })
            console.log('ERROR: Missing required parameters')
        }
    } catch (e) {
        console.log(e)
        res.status(400).send({ error: 'Error: ' + e })
    }

})

//              /recipe/id
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    console.log('\nDELETE - id: ', id)
    if (id) {
        try {
            const r = await Recipe.findByPk(id);
            console.log('fetched recipe from DB > r: ', r)

            const count = await Recipe.destroy({
                where: {
                    id: id
                }
            });
            console.log(`deleted ${count} recipes`)
            return res.status(200).send(`deleted ${JSON.stringify(r)} recipe`);
        } catch (e) {
            return res.status(400).send('Error: ' + e);
        }
    }
})



module.exports = router;