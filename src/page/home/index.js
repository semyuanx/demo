import React, { Component } from 'react';
import {Link} from 'react-router';


class Index extends Component{
    render(){
        return (
            <div>
                <Link to="/award">去开奖啦</Link>
            </div>
        )
    }
}

export default Index;