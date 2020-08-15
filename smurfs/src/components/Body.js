import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Smurf from './Smurf';
import axios from 'axios';

import {fetchSmurfs, postSmurf} from '../store';

const smurfsAPI = 'http://localhost:3333/smurfs';

const formSmurf = {
    Name: '',
    Age: '',
    Height: ''
}

const Body = (props) => {

    const [newSmurf, setNewSmurf] = useState(formSmurf);
    const [formValues, setFormValues] = useState(formSmurf);

    const handleChanges = event => {
        setNewSmurf({
            ...newSmurf,
            [event.target.name]: event.target.value
        })
    };

    useEffect(() => {
        props.fetchSmurfs();
    }, []);

    console.log(newSmurf)

    const handleSubmit = (evt) => {
        evt.preventDefault();
        console.log(newSmurf)
        props.postSmurf(newSmurf);
    }

    return (
        <section>
            <div>
                <form onSubmit={handleSubmit}>
                    <label htmlFor='name'>Name:</label>
                    <input 
                        name='name'
                        id='name'
                        type='text'
                        value={newSmurf.name}
                        onChange={handleChanges}
                    />

                    <label htmlFor='age'>Age:</label>
                    <input 
                        name='age'
                        type='text'
                        id='age'
                        value={newSmurf.age}
                        onChange={handleChanges}
                    />

                    <label htmlFor='height'>Height:</label>
                    <input 
                        name='height'
                        id='height'
                        type='text'
                        value={newSmurf.height}
                        onChange={handleChanges}
                    />
                </form>
                    
                <button onClick={handleSubmit}>Submit</button>
            </div>
            <article>
                {props.isLoading ? <div>LOADING...</div> : null}
                {props.error ? <div>Error: {props.error}</div> : null}
                {props.smurfs.length > 0 ? props.smurfs.map(smurf => {
                    return (
                        <Smurf key={smurf.name} name={smurf.name} age={smurf.age} height={smurf.height} />
                    )
                }) : null}
            </article>
        </section>
    )
}

const mapStateToProps = (state) => {
    return {
        smurfs: state.smurfs,
        isLoading: state.isLoading,
        error: ''
    };
  };

export default connect(mapStateToProps, { fetchSmurfs, postSmurf })(Body);