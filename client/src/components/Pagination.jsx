import React from 'react'
// import { connect } from 'react-redux'
// import { setPage } from '../actions';
//import { NavLink } from 'react-router-dom';
import style from './Pagination.module.css';

//const ITEMS_PER_PAGE = 9;

export function Pagination(props) {

    //console.log('Pagination.jsx > props : ', props)

    let pages = Math.ceil(props.recipes && (props.recipes.length / props.itemsPerPage));

    React.useEffect(() => {
        //pages = Math.ceil(props.recipes.length / props.itemsPerPage)
        //console.log('Pagination.jsx > useEffect > props: ', props)
    })

    function handlePage(e) {
        if (e === '<') {
            if (props.page > 1) props.setPage(props.page - 1);
        } else if (e === '>') {
            if (props.page < pages) props.setPage(props.page + 1);
        } else {
            props.setPage(e)
        }
    }
    /* <div>Pages: [1] [2] [3] </div> */
    //let ret = '';
    //<div> Pages: {ret} </div>
    //for (let i = 1; i <= pages; i++) ret += "<NavLink to={}>[ " + i + " ]</NavLink>"
    let arr = [];
    //arr.push('<');
    for (let i = 1; i <= pages; i++) arr.push(i);
    //arr.push('>');
    //console.log('Pagination > arr: ', arr)
    //<div> Pages: {arr.map((e, i) => <NavLink to={'/'} key={'nl' + i}> {e} </NavLink>)} </div>
    return (
        <div className={style.container}> {/* Pages: */}
            {props.page === 1 ? <button disabled>&lt;</button> : <button onClick={() => handlePage('<')} className={style.btnT} > &lt; </button>}
            {/* {<button onClick={() => handlePage('<')} className={style.btnT}> &lt; </button>} */}
            {arr.map((e, i) =>
                <button
                    onClick={() => handlePage(e)}
                    className={e === props.page ? style.actual : style.normal}
                    key={'nl' + i} >
                    {e}
                </button>)}
            {/* {<button onClick={() => handlePage('>')}> &gt; </button>} */}
            {props.page === pages ?
                <button disabled>&gt;</button>
                : <button onClick={() => handlePage('>')} className={style.btnT} > &gt; </button>}
        </div>
    )
}

// function mapStateToProps(state) {
//     return {
//         recipes: state.recipes,
//         page: state.page
//     }
// }

// function mapDispatchToProps(dispatch) {
//     return {
//         setPage: (p) => dispatch(setPage(p))
//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Pagination);