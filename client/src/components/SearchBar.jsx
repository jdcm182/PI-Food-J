import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import style from './SearchBar.module.css';
import { search } from '../actions'
import { FaSearch } from 'react-icons/fa';

export function SearchBar({ search, setPage, searchSt }) {

    const [searchStr, setSearchStr] = React.useState('');

    useEffect(() => {
        //setSearchStr(searchSt);
        document.getElementById('searchBox').value = searchSt;
    }, [searchSt])

    let tempSearch = '';

    let handleChange = e => {
        tempSearch = e.target.value;
        setSearchStr(e.target.value);
        console.log('SearchBar > input onChange > handleChange > tempSearch: ', tempSearch)
    }

    let handleSubmit = (e) => {
        e.preventDefault();
        /* props. */search(searchStr);
        /* props. */setPage(1);
    }

    return (
        <form onSubmit={e => handleSubmit(e)}>

            <div className={style.searchContainer}>
                <input className={style.searchInput}
                    id='searchBox'
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


function mapStateToProps(state) {
    return {
        searchSt: state.searchStr
    }
}

function mapDispatchToProps(dispatch) {
    return {
        search: (str) => dispatch(search(str))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);