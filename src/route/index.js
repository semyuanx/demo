import React, { Component } from 'react';
import { Router, Route, IndexRoute, Redirect, browserHistory } from 'react-router';
import App from '../page/App'
import Index from '../page/home';  // 首页
import Award from '../page/award'; // 开奖页面

//  路由配置
const RouteConfig = (
    <Router history={browserHistory}>
         <Route path="/" component={ App }>
            <IndexRoute component={Index} />
            <Route path="/award" component= { Award } />
        </Route>       
    </Router>
)

export default RouteConfig;