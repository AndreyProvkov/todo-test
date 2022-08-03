import React, { Component } from 'react'
import './App.scss'
import AppForm from './components/AppForm/AppForm'
import AppList from './components/AppList/AppList'

// Здесь и далее в приложении будем создавать классовый компонент
export default class App extends Component {
    constructor(prop) {
        // Вызываем родительский конструктор 
        super(prop)
        // Определяем состояние компонента
        this.state = {
            tasks: [
                {
                    id: 1,
                    title: 'Помыть посуду',
                    description: 'Помыть до 14:00'
                },
                {
                    id: 2,
                    title: 'Доделать задание',
                    description: 'Задание доделать до 16ого числа до закрытия приема заявок'
                }
            ]
        }
    }

    // Render вызывается каждый раз при изменении состояния
    render() {
        return (
            <div className='container'>
                <div className='app'>
                    {/* Используем два созданных компонента и передаем им свойства (props) */}
                    <AppList
                        tasks={this.state.tasks}
                    />
                    <AppForm
                        tasks={this.state.tasks}
                    />
                </div>
            </div>
        )
    }
}
