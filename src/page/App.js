import React,{ Component } from 'react';
import Nav from './public/nav';

class App extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div>
                <Nav />
                { this.props.children }
            </div>
        )
    }
}
export default App;