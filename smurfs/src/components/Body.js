import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Smurf from './Smurf';
import axios from 'axios';

import {fetchSmurfs} from '../store';
import Axios from "axios";

const formSmurf = {
    name: '',
    age: '',
    height: ''
}

export 

const smurfsAPI = 'http://localhost:3333/smurfs';

const Body = (props) => {

    const [newSmurf, setNewSmurf] = useState({});
    
    const handleChanges = e => {
    setNewSmurf(e.target.value)
    };

    const submitSmurf = () => (dispatch) => {


    console.log('RUNNNNNN')

    axios.post(smurfsAPI, newSmurf).then(res =>{
        dispatch({ type: 'POST_SMURF', payload: res.data})
    }).catch(err =>{
        console.dir(err)
    })
}

    useEffect(() => {
        props.fetchSmurfs();
    }, []);

    return (
        <section>
            <div>
                <form>
                    <label htmlFor='name'>Name:</label>
                    <input 
                        name='name'
                        type='text'
                        value={newSmurf.name}
                        onChange={handleChanges}
                    />

                    <label htmlFor='age'>Age:</label>
                    <input 
                        name='age'
                        type='text'
                        value={newSmurf.age}
                        onChange={handleChanges}
                    />

                    <label htmlFor='height'>Height:</label>
                    <input 
                        name='height'
                        type='text'
                        value={newSmurf.height}
                        onChange={handleChanges}
                    />
                </form>

                <button onSubmit={submitSmurf}>Submit</button>
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

export default connect(mapStateToProps, { fetchSmurfs })(Body);