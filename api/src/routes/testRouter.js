const { default: axios } = require('axios');
const { Router } = require('express');
const router = Router();

require('dotenv').config();
const API_KEY = process.env.YOUR_API_KEY;



//           /test
//           /test/api_to_JSON
//           /test/api_to_JSON?offset=200
router.get('/api_to_JSON', async (req, res) => {
    const number = 100;
    const { offset } = req.query;
    const filePath = '../resJSON/';
    const fileName = `number_${number},offset_${offset}.json`;
    const fs = require('fs');

    try {
        // Check if file doesnt exist:
        if (!fs.existsSync(filePath + fileName)) {
            const url = `https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&offset=${offset}&number=${number}&apiKey=${API_KEY}`;
            const r = await axios.get(url);
            let data = r.data;
            data.LLAMADO_REALIZADO = url;
            data.date = r.headers.date;
            data['X-API-Quota-Request'] = r.headers['x-api-quota-request'];
            data['X-API-Quota-Used'] = r.headers['x-api-quota-used'];
            data['X-API-Quota-Left'] = r.headers['x-api-quota-left'];

            //guardar data en archivo JSON
            //const data = require('../../../resJSON/number_100,offset_0.json');
            //const apiRecipes = data.results;
            //const filePath = '../../../resJSON/';
            const strData = JSON.stringify(data);
            fs.writeFile(filePath + fileName, strData, (err) => {
                if (err) {
                    throw err;
                }
                console.log("JSON data is saved to " + filePath + fileName);
            });


            //const apiRecipes = r.data.results;
            console.log('testRouter.jsx > get /api_to_JSON > req.params > r: ', r);
            console.log('testRouter.jsx > get /api_to_JSON > req.params > offset: ', offset);

            return res.json(data)

        }
        else { // File already exists
            return res.json('File already exists')
        }
    } catch (e) {
        return res.json({ error: e.message, e });
    }
})

module.exports = router;