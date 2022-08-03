import React, { Component } from 'react'
import './App.scss'
import AppForm from './components/AppForm/AppForm'
import AppList from './components/AppList/AppList'

export default class App extends Component {
    render() {
        return (
            <div className='container'>
                <div className='app'>
                    <AppList />
                    <AppForm />
                </div>
            </div>
        )
    }
}
