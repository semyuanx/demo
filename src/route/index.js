import React, { Component } from 'react';
import { Router, Route, IndexRoute, Redirect, browserHistory } from 'react-router';
import App from '../page/App'
import Index from '../page/home';  // 首页
import MyAccount from '../page/my-account'; // 我的账户
import Recharge from '../page/recharge'; // 账户充值
import Betting from '../page/betting'; // 投注

//  路由配置
const RouteConfig = (
    <Router history={browserHistory}>
         <Route path="/" component={ App }>
            <IndexRoute component={Index} />
            <Route path="/my-account" component= { MyAccount } />
            <Route path="/recharge" component= { Recharge } />
            <Route path="/betting" component= { Betting } />
        </Route>       
    </Router>
)

export default RouteConfig;