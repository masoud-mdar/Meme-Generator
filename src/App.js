import React from "react";
import Header from "./Header";
import Generator from "./Generator";
import Footer from "./Footer";

class App extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div>
                <Header />
                <Generator />
                <Footer />
            </div>
        )
    }
}


export default App;