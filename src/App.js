import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import Header from './components/main/header';
import Body from './components/main/body';
import Footer from './components/main/footer';

const App = () =>
    (
        <div>
            <Header/>
            <Body/>
            <Footer/>
        </div>
    );

export default App;


