import React, {Component} from "react";
import domtoimage from 'dom-to-image';

class Generator extends Component{
    constructor(props){
        super(props);
        this.state = {
            topText:"",
            bottomText:"",
            randomImg:"https://i.imgflip.com/8p0a.jpg",
            allMemesArr:[],
            topTextPosition:{
                top:0,
                left:550,
            },
            bottomTextPosition:{
                bottom:0,
                left:550,
            },
            topSelected:true,
            color:{
                background:"whitesmoke"
            },
            textColor:{
                color:"beige"
            }
        };
    }

    handleChange = (event) => {
        const {name,value} = event.target;
        this.setState({
            [name]:value,
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const allMemes = this.state.allMemesArr;
        const randomNum = Math.floor(Math.random()*allMemes.length);
        const randomImg = allMemes[randomNum].url;
        this.setState({
            randomImg: randomImg,
        })
    }

    handleClick = (event) => {
        const {name} = event.target;
        const selector = this.state.topSelected;
        if (selector){
            const newObj = Object.assign({},this.state.topTextPosition);
            switch (name){
                case "top":
                    newObj[name] +=5;
                    break
                case "bottom":
                    newObj.top -=5;
                    break;
                case "left":
                    newObj[name] +=5;
                    break;
                case "right":
                    newObj.left -=5;
                    break;
            }
            
            this.setState({
                topTextPosition:newObj,
            })
        } else{
            const newObj = Object.assign({},this.state.bottomTextPosition);
            switch (name){
                case "bottom":
                    newObj[name] +=5;
                    break
                case "top":
                    newObj.bottom -=5;
                    break;
                case "left":
                    newObj[name] +=5;
                    break;
                case "right":
                    newObj.left -=5;
                    break;
            }
            this.setState({
                bottomTextPosition:newObj,
            })
        }
    }

    handleSelector = (event) => {
        const {name} = event.target;
        if (name === "selectorButton"){
            this.setState(state =>({
                topSelected: !state.topSelected,
            }))
            const newColor = (this.state.topSelected)? "rgba(218, 214, 214, 0.479)": "whitesmoke";
            this.setState({
                color:{
                    background:newColor,
                }
            })
        } else{
            if (this.state.textColor.color === "beige"){
                this.setState({
                    textColor:{
                        color:"black",
                    }
                })
            } else{
                this.setState({
                    textColor:{
                        color:"beige",
                    }
                })
            }
        }

        
    }
    handleCapture = () => {
        domtoimage.toPng(document.getElementById('box'), { quality: 0.95 })
        .then(function (dataUrl) {
            var link = document.createElement('a');
            link.download = 'my-meme.jpeg';
            link.href = dataUrl;
            link.click();
        });
    }


    componentDidMount(){
        fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(response => this.setState({
                allMemesArr: response.data.memes,
            }))
    }

    

    render(){

        return(
            <div>
                <form className="form" onSubmit={this.handleSubmit}>
                    <input type="text" name="topText" placeholder="Top Text" value={this.state.topText} onChange={this.handleChange} />
                    <input type="text" name="bottomText" placeholder="Bottom Text" value={this.state.bottomText} onChange={this.handleChange} />
                    <button>Generate</button>
                </form>
                <br />
                <div className="position-wrapper">
                    <div className="selector">
                        <button name="selectorButton" onClick={this.handleSelector} style={this.state.color}>Top/Bottom</button>
                        <button name="colorSelector" onClick={this.handleSelector}>Dark/Bright</button>
                        <button id="btnSave" onClick={this.handleCapture}>Download</button>
                    </div>
                    <div className="position-changer">
                        <button name="bottom" onClick={this.handleClick}>Top</button>
                        <button name="top" onClick={this.handleClick}>Bottom</button>    
                        <button name="right" onClick={this.handleClick}>Left</button>
                        <button name="left" onClick={this.handleClick}>Right</button>
                    </div>
                </div>
                <br />
                <div className="meme-wrapper" id="box">
                    <div className="topText" style={this.state.topTextPosition}>
                    <h2 style={this.state.textColor}>{this.state.topText}</h2>
                    </div>
                    <img src={this.state.randomImg} alt="Meme image"/>
                    <div className="bottomText" style={this.state.bottomTextPosition}>
                    <h2 style={this.state.textColor}>{this.state.bottomText}</h2>
                    </div>
                </div>
            </div>          
        )
    }
}

export default Generator;