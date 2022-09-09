import React from 'react';
import { connect } from 'react-redux'
import style from './SearchBar.module.css';
import { search } from '../actions'
import { FaSearch } from 'react-icons/fa';

export function SearchBar(props) {

    const [searchStr, setSearchStr] = React.useState('');

    let tempSearch = '';

    let handleChange = e => {
        tempSearch = e.target.value;
        setSearchStr(e.target.value);
        console.log('SearchBar > input onChange > handleChange > tempSearch: ', tempSearch)
    }

    let handleSubmit = (e) => {
        e.preventDefault();
        props.search(searchStr)
    }

    return (
        <form onSubmit={e => handleSubmit(e)}>

            <div className={style.searchContainer}>
                <input
                    id='searchBox'
                    className={style.input}
                    type='text'
                    placeholder='Search...'
                    autoComplete='on'
                    onChange={e => handleChange(e)}
                />
                {/* <input className={style.submit} type='submit' value='search' /> */}
                <button className={style.submit}>
                    {<FaSearch className={style.icon} />}
                </button>
            </div>


        </form>
    )
}


function mapDispatchToProps(dispatch) {
    return {
        search: (str) => dispatch(search(str))
    }
}

export default connect(null, mapDispatchToProps)(SearchBar);