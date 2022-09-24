import React, { useEffect } from 'react';
import { connect/* , useDispatch, useSelector */ } from 'react-redux';
import { getDetail } from '../actions';
import style from './Detail.module.css';
import NavBar from './NavBar'

export /* default */ function Detail({ match, detailGlobal, getDetailGlobal }) {

    let id = /* props. */match.params.id;

    useEffect(() => {
        console.log('Detail.jsx > useEffect > id: ', id)
        console.log('detailGlobal: ', detailGlobal)
        console.log('typeof detailGlobal.id: ', typeof (detailGlobal.id)) // --> number
        console.log('typeof id: ', typeof (id))                          // --> string
        if (!detailGlobal || detailGlobal.id !== parseInt(id)) getDetailGlobal(id);
    }, [detailGlobal/* , id, getDetailGlobal *//* id, props.detailGlobal */])

    return (
        <div className={style.detail}>
            <NavBar setPage={1/* actPage */} />
            DETAIL
            <br />
            {/* JSON.stringify(props) */}
            <br />
            id: {/* props.detailGlobal. */id} <br />
            name: {detailGlobal.name} <br />
            type: {detailGlobal.image} <br />
        </div>
    )

    /*
        detailGlobal: 
            const obj = {
                id: recipe.id,
                image: recipe.image,
                name: recipe.title,
                dietTypes: recipe.diets,    //  array
                dishTypes: recipe.dishTypes, // array
                summary: recipe.summary,
                healthScore: recipe.healthScore,
                instructions: recipe.instructions,
                stepByStep: recipe.analyzedInstructions // array {name, steps[]}
    }
    */

}

function mapStateToProps(state) {
    return {
        detailGlobal: state.detail
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getDetailGlobal: (id) => dispatch(getDetail(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail)