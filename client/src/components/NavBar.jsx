import React from 'react'
import { NavLink } from 'react-router-dom'
import style from './NavBar.module.css'
import SearchBar from './SearchBar.jsx'

export default function NavBar() {
    return (
        <div className={style.navBar}>

            <div className={style.logo}>
                FOOD PI
            </div>

            <nav className={style.menu}>
                <ul>
                    <li><NavLink to={'/'}>Landing</NavLink></li>
                    <li><NavLink to={'/recipes/main'}>Main</NavLink></li>
                    <li><NavLink to={'/recipes/create'}>Create</NavLink></li>
                </ul>
            </nav>

            <div className={style.searchWrapper}>
                {/* [SEARCH] */}{<SearchBar />}
            </div>

        </div>

    )

}