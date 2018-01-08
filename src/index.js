import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './route';
import { createStore,applyMiddleware,compose } from 'redux';
import { Provider } from 'react-redux';
import reducer from './redux/reducer';
import thunk from 'redux-thunk';
// 组织 redux 中间件 
const store = createStore(reducer,compose(
    applyMiddleware(thunk)
));

ReactDOM.render(
    <Provider store={store}>
        <Routes />
    </Provider>
    , document.getElementById('root'));