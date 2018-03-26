import React from 'react';
import ReactDOM from 'react-dom';
import jquery from 'jquery';
import {Provider} from 'react-redux';

import AppRouter from './routes/AppRouter';

import './styles/styles.scss'
import 'normalize.css/normalize.css'
import './styles/bootstrap.min.css';
import './styles/bootstrap';
import configStore from './configStore/store';

const store = configStore();

const jsx = (
    <Provider store={store} >
        <AppRouter />
    </Provider>
)
ReactDOM.render(jsx, document.querySelector('#app'));
