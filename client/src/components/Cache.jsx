import React, { useEffect, useState } from 'react';
import style from './Cache.module.css';
import { /* useSelector, */ connect/* , useDispatch */ } from 'react-redux';
//import { NavLink } from 'react-router-dom';
import { doSearch, setSearchStr, setFilters, clearFilters } from '../actions'

import axios from 'axios';

export /* default */ function Cache(/* props */{ search, searchStr, setSearchStr, clearAllFilters/* setFilters */ }) {


    const [files, setFiles] = useState([]);

    useEffect(() => {
        //!files && files.length === 0 && handleClick();
        //setFiles(handleClick())
        files && files.length === 0 && handleClick();
    }/* , [files] */)

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
                <div key={'files' + i} className={searchStr === f ? style.activeFile : style.file}
                    onClick={() => {
                        clearAllFilters();
                        //dispatch(search(f));
                        //dispatch(setSearchStr(f));
                        /* props. */search(f);
                        /* props. */setSearchStr(f);
                        //setFilters([]);

                    }}>
                    {f ? f : 'ALL'} < br />
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
            //setSearchStr(resp.data);
            //setpage <-- 1
            return resp.data;
        } catch (e) {
            console.log(e)
        }
    }
}

function mapDispatchToProps(dispatch) {
    return {
        search: (str) => dispatch(doSearch(str)),
        setSearchStr: (str) => dispatch(setSearchStr(str)),
        setFilters: (arr) => dispatch(setFilters(arr)),
        clearAllFilters: () => dispatch(clearFilters())
    }
}

function mapStateToProps(state) {
    return {
        searchStr: state.searchStr
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cache);