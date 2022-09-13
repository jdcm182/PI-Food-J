import React, { useState } from 'react';
import style from './Cache.module.css';
import { /* useSelector, */ connect/* , useDispatch */ } from 'react-redux';
//import { NavLink } from 'react-router-dom';
import { search, setSearchStr } from '../actions'

import axios from 'axios';

export /* default */ function Cache(props) {


    const [files, setFiles] = useState([]);

    //const dispatch = useDispatch();

    //const types = useSelector((state) => state.dietTypes)

    /*     const fs = require('fs');
    
        const folder = './';
        //const files = 
    
        fs.readdir(folder, (err, files) => {
            files.forEach(file => {
                console.log(file)
            });
        }); */


    return (
        <div className={style.cache}>
            CACHE <br />
            {files && files.map((f, i) => (
                <div key={'files' + i} className={style.file}
                    onClick={() => {
                        //dispatch(search(f));
                        //dispatch(setSearchStr(f));
                        props.search(f);
                        props.setSearchStr(f);
                    }}>
                    {f} < br />
                </div>
            )
            )
            }
            <button className={style.btn} onClick={handleClick} >Cargar</button>
        </div >

        /*
    return (
        <div className={style.filters}>
            CACHE <br />
            {types && types.map((t, i) => (
                <div
                    key={'fil' + i}
                    className={style.fil} >
                    {t.name} < br />
                </div>
            )
            )
            }
            <button className={style.btnTest} onClick={handleClick} />
        </div >
    */
    )

    async function handleClick() {
        try {
            let resp = await axios.get(`http://localhost:3001/recipes/cache`);
            console.log('💫handleClick > resp: ', resp)
            setFiles(resp.data);
            setSearchStr(resp.data);
            //setpage <-- 1
        } catch (e) {
            console.log(e)
        }
    }



}
function mapDispatchToProps(dispatch) {
    return {
        search: (str) => dispatch(search(str)),
        setSearchStr: (str) => dispatch(setSearchStr(str))
    }
}

export default connect(null, mapDispatchToProps)(Cache);