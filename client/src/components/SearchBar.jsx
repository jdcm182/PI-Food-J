import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import style from './SearchBar.module.css';
import { doSearch, setSearchStr } from '../actions'
import { FaSearch } from 'react-icons/fa';

export function SearchBar({ dispatchSearch, setPage, searchStGlobal, setGlobalSearchStr, history }) {
    const [search, setSearch] = React.useState('');
    //console.log('💥match: ', match)
    useEffect(() => {
        //setSearch(searchSt);
        document.getElementById('searchBox').value = searchStGlobal;
    }, [searchStGlobal])

    let tempSearch = '';

    let handleChange = e => {
        tempSearch = e.target.value;
        setSearch(tempSearch);
        //setSearch(e.target.value)
        console.log('SearchBar > input onChange > handleChange > tempSearch: ', tempSearch)
        setGlobalSearchStr(tempSearch.toLowerCase());
    }

    let handleSubmit = (e) => {
        console.log('--- SearchBar > handleSubmit ---')
        console.log('tempSearch: ', tempSearch)
        e.preventDefault();
        //setSearch(tempSearch);
        if (history)
            history.push('/recipes/main');
        /* props. */dispatchSearch(search/* tempSearch */);
        if (setPage)
        /* props. */setPage(1);
        //setSearch(tempSearch/* tempSearch */); // set localState
        //setGlobalSearchStr(tempSearch.toLowerCase()/* tempSearch *//* e.target.value */); // set globalState (for cache list)
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
        searchStGlobal: state.searchStr
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatchSearch: (str) => dispatch(doSearch(str)),
        setGlobalSearchStr: (str) => dispatch(setSearchStr(str))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);