import React, { Component } from 'react'
import './AppForm.scss'

export default class AppForm extends Component {
    render() {
        return (
            <div className='app-form'>
                <h2 className='app-form__title'>
                    Просмотр задачи
                </h2>
                <h3>
                    Название задачи
                </h3>
                <p>
                    Описание задачи
                </p>
            </div>
        )
    }
}
