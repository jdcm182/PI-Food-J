import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import style from './CreateRecipe.module.css';
import NavBar from './NavBar.jsx';
import { createRecipe } from '../actions';


export default function CreateRecipe(props) {

    let [input, setInput] = React.useState({
        name: '',
        summary: '',
        healthScore: '',
        stepByStep: '',
        image: '',
        dietTypes: []
    });

    const dispatch = useDispatch();
    const allDietTypes = useSelector(state => state.dietTypes);

    let handleChange = (e) => {
        let val = e.target.value;
        if (e.target.name === 'dietTypes') {
            val = getSelectedValues(e.target);
        }
        setInput((prev) => ({ ...prev, [e.target.name]: val }));
        console.log('input: ', input)
    }

    let getSelectedValues = (select) => {
        let result = [];
        let options = select && select.options;
        let opt;

        for (let i = 0, iLen = options.length; i < iLen; i++) {
            opt = options[i];

            if (opt.selected) {
                result.push(opt.value || opt.text);
            }
        }
        return result;
    }

    let handleSubmit = (e) => {
        e.preventDefault();
        const spanMessages = {
            name: document.getElementById('nameSpan'),
            summary: document.getElementById('summarySpan'),
            healthScore: document.getElementById('healthScoreSpan'),
            stepByStep: document.getElementById('stepByStepSpan'),
            image: document.getElementById('imageSpan'),
            dietTypes: document.getElementById('dietTypesSpan')
        }
        for (const key in spanMessages) {
            if (Object.hasOwnProperty.call(spanMessages, key)) {
                const element = spanMessages[key];
                element.innerHTML = '';
            }
        }

        let errorFound = false;
        // MANEJO DE ERRORES
        if (input.name === '') {
            spanMessages.name.innerHTML = 'Name shouldn`t be empty';
            errorFound = true;
            console.log('ERROR: name is empty!')
        }
        if (input.summary === '') {
            spanMessages.summary.innerHTML = 'summary shouldn`t be empty';
            errorFound = true;
            console.log('ERROR: summary is empty!')
        }
        if (input.healthScore === '') {
            spanMessages.healthScore.innerHTML = 'healthScore shouldn`t be empty';
            errorFound = true;
            console.log('ERROR: healthScore is empty!')
        }
        if (parseInt(input.healthScore) != input.healthScore) {
            spanMessages.healthScore.innerHTML = 'healthScore should be a number';
            errorFound = true;
            console.log('ERROR: healthScore is not a number!')
        } else {
            if (input.healthScore < 0 || input.healthScore > 100) {
                spanMessages.healthScore.innerHTML = 'healthScore must be between 0 and 100';
                errorFound = true;
                console.log('ERROR: healthScore is not between 0 and 100!')
            }
        }
        if (input.stepByStep === '') {
            spanMessages.stepByStep.innerHTML = 'stepByStep shouldn`t be empty';
            console.log('ERROR: stepByStep is empty!')
            errorFound = true;
        }

        // NO ERRORS FOUND
        if (!errorFound) {
            let res = dispatch(createRecipe(input));
            setInput({ name: '', summary: '', healthScore: '', stepByStep: '', image: '', dietTypes: [] });
            props.history.push('/recipes/main')
            console.log('NO ERRORS FOUND!')
            console.log('res: ', res)
        }


    }

    return (
        <div className={style.createContainer}>
            <NavBar />
            <div>CREATE COMPONENT</div>
            <br />

            <form onSubmit={(e) => handleSubmit(e)}>

                <div className={style.inputContainer}>
                    <div className={style.inputItem}>
                        <label htmlFor="name">Name: </label>
                        <input name='name' id="name" type="text" value={input.name} autoComplete="off" onChange={(e) => handleChange(e)} />
                    </div>
                    <span id='nameSpan' className={style.msg}></span>
                </div>

                <div className={style.inputContainer}>
                    <div className={style.inputItem}>
                        <label htmlFor="summary">Summary: </label>
                        <input name='summary' id="summary" type="text" value={input.summary} autoComplete="off" onChange={(e) => handleChange(e)} />
                    </div>
                    <span id='summarySpan' className={style.msg}></span>
                </div>

                <div className={style.inputContainer}>
                    <div className={style.inputItem}>
                        <label htmlFor="healthScore">healthScore: </label>
                        <input name='healthScore' id="healthScore" type="text" value={input.healthScore} autoComplete="off" onChange={(e) => handleChange(e)} />
                    </div>
                    <span id='healthScoreSpan' className={style.msg}></span>
                </div>

                <div className={style.inputContainer}>
                    <div className={style.inputItem}>
                        <label htmlFor="stepByStep">stepByStep: </label>
                        <input name='stepByStep' id="stepByStep" type="text" value={input.stepByStep} autoComplete="off" onChange={(e) => handleChange(e)} />
                    </div>
                    <span id='stepByStepSpan' className={style.msg}></span>
                </div>

                <div className={style.inputContainer}>
                    <div className={style.inputItem}>
                        <label htmlFor="image">image: </label>
                        <input name='image' id="image" type="text" value={input.image} autoComplete="off" onChange={(e) => handleChange(e)} />
                    </div>
                    <span id='imageSpan' className={style.msg}></span>
                </div>

                <div className={style.inputContainer}>
                    <div className={style.inputItem}>
                        <label htmlFor="dietTypes">dietTypes: </label>
                        <select multiple name='dietTypes' id="dietTypesSelector" size="10" onChange={(e) => handleChange(e)} >
                            {allDietTypes && allDietTypes.map((dt, i) => (
                                <option key={"odt" + i} value={dt.type}>{dt.name}</option>
                            ))}
                        </select>
                    </div>
                    <span id='dietTypesSpan' className={style.msg}></span>
                </div>

                <div>
                    <input type={'submit'} value={'CREATE'} className={style.createBtn} />
                </div>

            </form>


        </div>
    )
}