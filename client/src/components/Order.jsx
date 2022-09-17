import React from 'react';
import style from './Order.module.css';
//import { useSelector, useDispatch } from 'react-redux';
// import {setOrder } from '../actions';

export default function Order() {
    console.log('----------------- function Order() -----------------')

    return (
        <div className={style.order}>
            ORDER
            <br />
            <div>
                Recipe Name <br />
                <button >A-Z</button>
                <button >Z-A</button>
            </div>
            <div>
                Recipe Health Score<br />
                <button >1-9</button>
                <button >9-1</button>
            </div>
        </div>

    )
}