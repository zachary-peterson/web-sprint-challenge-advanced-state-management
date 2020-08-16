import React from 'react';

const Smurf = (props) => {
    
    return (
        <div>
            <h2>{props.name}</h2>
            <h3>{props.age}</h3>
            <h3>{props.height}</h3>
        </div>
    )
}

export default Smurf;