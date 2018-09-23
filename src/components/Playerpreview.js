import PropTypes from "prop-types";
import React from 'react';



function PlayerPreview(props) {
    return(
        <div>
            <div className='column'>
                <img className='avatar' src={props.avatar} alt={props.username}></img>
                <h3 className='username'>@{props.username}</h3>

            </div>
            {props.children}
        </div>
    )

}

PlayerPreview.propTypes={
    avatar:PropTypes.string,
    username:PropTypes.string
    /*id:PropTypes.string,
    onReset:PropTypes.func*/
}


export default PlayerPreview;