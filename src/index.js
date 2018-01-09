import React from 'react';
import ReactDOM from 'react-dom';
import routes from './route';
import { createStore,applyMiddleware,compose } from 'redux';
import { Provider } from 'react-redux';
import reducer from './redux/reducer.js';
import thunk from 'redux-thunk';
import './reset.css';  //重置样式
// 组织 reducer 中间件 
const store = createStore(reducer,compose(
    applyMiddleware(thunk)
));

ReactDOM.render(
    <Provider store={store}>
        {routes }
    </Provider>   
    , document.getElementById('root'));