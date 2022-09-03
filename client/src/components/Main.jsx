import React from 'react';
import style from './Main.module.css';

//const ITEMS_PER_PAGE = 9;

export default function Main(props) {
    console.log('Main.jsx > props: ', props)
    return (
        <div className={style.container}>
            MAIN
        </div>
    )
}