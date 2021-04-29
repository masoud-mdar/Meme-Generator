import React from "react";

function GeneratorUI(props){
    return(
        <div>
            <form onSubmit={()=> props.handleSubmit}>
                <input type="text" name="topText" value={props.state.topText} onChange={()=> props.handleChange} />
                <input type="text" name="bottomText" value={props.state.bottomText} onChange={()=> props.handleChange} />
                <button>Generate</button>
            </form>
            <br />
            <div className="position-wrapper">
                <div className="selector">
                    <button name="selectorButton" onClick={()=> props.handleSelector} style={props.state.color}>Top/Bottom</button>
                </div>
                <div className="position-changer">
                    <button name="top" onClick={()=> props.handleClick}>Top</button>
                    <button name="right" onClick={()=> props.handleClick}>Right</button>
                    <button name="bottom" onClick={()=> props.handleClick}>Bottom</button>
                    <button name="left" onClick={()=> props.handleClick}>Left</button>
                </div>
            </div>
            <br />
            <div className="meme-wrapper">
                <img src={props.state.randomImg} alt="Meme image"/>
                <h2 className="topText" style={props.state.topTextPosition}></h2>
                <h2 className="bottomText" style={props.state.bottomTextPosition}></h2>
            </div>
        </div>
    )
}

export default GeneratorUI;