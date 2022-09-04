import React from 'react';
import style from './Main.module.css';
import Test from './Test.jsx'

//const ITEMS_PER_PAGE = 9;

export default function Main(props) {
    console.log('Main.jsx > props: ', props)
    return (
        <div className={style.container}>
            MAIN
            <br />
            <Test />
        </div>
    )
}