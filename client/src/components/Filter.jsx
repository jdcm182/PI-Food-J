import React from 'react';
import style from './Filter.module.css';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

export default function Filter() {

    const types = useSelector((state) => state.dietTypes)

    return (
        <div className={style.filters}>
            FILTER <br />
            { /* NavLink to="/" */}
            {types && types.map((t, i) => (
                <div
                    key={'fil' + i}
                    className={style.fil} >
                    {t.name} < br />
                </div>
            )
            )
            }
        </div >

    )
}