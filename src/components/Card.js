import React from 'react';

export default (props) => {
    return (
        <div className={('card ') +  props.suit}>
            <div className="card_top">
                <img src={`../images/${props.suit}.svg`} alt={props.suit}/>
            </div>
            <div className="card_middle">
                <p>{props.name}</p>
                <p>{props.reps}</p>
                <input type="button" value="Next" onClick={() => props.next()}/>
            </div>
            <div className="card_bottom">
                <img src={`../images/${props.suit}.svg`} alt={props.suit}/>
                <p>{props.reps}</p>
            </div>
        </div>
    )
}    
