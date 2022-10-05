import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import style from './NavBar.module.css'
import SearchBar from './SearchBar.jsx'

export default function NavBar(props) {
    console.log('NavBar > props: ', props)
    return (
        <div className={style.navBar}>

            <div className={style.logo}>
                FOOD PI
            </div>

            <nav className={style.menu}>
                <ul>
                    <li><NavLink to={'/'}>Landing</NavLink></li>
                    <li><Link to={'/recipes/main'}>Main</Link></li>
                    <li><Link to={'/recipes/create'}>Create</Link></li>
                </ul>
            </nav>

            <div className={style.searchWrapper}>
                {/* [SEARCH] */}{<SearchBar history={props.history}/* setPage={props.setPage} */ />}
            </div>

        </div>

    )

}