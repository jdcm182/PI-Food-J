const { default: axios } = require('axios');
const { Router } = require('express');
const router = Router();

require('dotenv').config();
const API_KEY = process.env.YOUR_API_KEY;



//           /test
//           /test/api_to_JSON
//           /test/api_to_JSON?offset=200
router.get('/api_to_JSON', async (req, res) => {
    const number = 1;
    const { offset } = req.query;
    const filePath = '../resJSON/';
    const fileName = `number_${number},offset_${offset}.json`;
    const fs = require('fs');
    console.log('BACK > get  /test/api_to_JSON > --------')
    console.log('number: ', number)
    console.log('offset:  ', offset)
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
            }, null, 4);


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

//Guardar resultados de API videogames en archivos JSON
//          /test/vg
router.get('/vg/:num', async (req, res) => {
    try {
        console.log('--------------------------------/videogames/:num')

        const fs = require('fs');
        let /* const */ { num } = req.params;
        console.log('num: ', num)


        let filePath = '../resJSONvideogames/';
        let fileName = 'videogames' + num + '.json';
        let file = filePath + fileName;//'../resJSONvideogames/videogames.json';
        //[Error: ENOENT: no such file or directory, open 'D:\PROYECTOS\2022\SoyHenry\PI\PI-Food-main\resJSONvideogames\videogames.json'] {
        // Chequear si no existe el directorio y CREARLO

        while (fs.existsSync(file)) {
            console.log(`the file ${file} already exists..`)
            num++;
            filePath = '../resJSONvideogames/';
            fileName = 'videogames' + num + '.json';
            file = filePath + fileName;//'../resJSONvideogames/videogames.json';
            console.log(`---While: //  num: ${num}   //    file:${file}   `)
            // console.log('num:', num)
            // console.log('file: ', file)
        }



        let strPag = '';
        if (num && num > 1) {
            strPag += '&page=' + num;
        }
        console.log('strPag:', strPag)

        const resp = await axios.get(`https://api.rawg.io/api/games?key=5ea5b52d99f748d8bcdf8607a5e23cb1` + strPag);
        const gamesFromAPI = resp.data;
        //console.log('-------- gamesFromAPI: ', gamesFromAPI)
        console.log('-------- gamesFromAPI.length: ', gamesFromAPI.length)

        const strData = JSON.stringify(gamesFromAPI, null, 4);
        fs.writeFile(file, strData, (err) => {
            if (err) {
                console.log('error: ', err)
                //throw err;
            }
            console.log("JSON data is saved as " + file)
        }, null, 4);

        return res.json(gamesFromAPI);
    } catch (e) {
        return res.json({ error: e.message, e })
    }
})

module.exports = router;