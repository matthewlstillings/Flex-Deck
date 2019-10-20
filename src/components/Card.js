import React from 'react';

export default (props) => {
    return (
        <div className={('card ') +  props.suit}>
            <div className="card_top">
                <img src={`../images/${props.suit}.svg`} alt={props.suit}/>
                <p>{props.reps}</p>
            </div>
            <div className="card_middle">
                <p>{props.name}</p>
                <button type="button" onClick={() => props.next()}>Next</button>
            </div>
            <div className="card_bottom">
                <p>{props.reps}</p>
                <img src={`../images/${props.suit}.svg`} alt={props.suit}/>
            </div>
        </div>
    )
}    
