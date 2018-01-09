import React,{ Component } from 'react';
import Head from './public/head/index';

class App extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div>
                <Head />
                { this.props.children }
            </div>
        )
    }
}
export default App;