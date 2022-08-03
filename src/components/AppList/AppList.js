import React, { Component } from 'react'
import TaskList from '../TaskList/TaskList'
import './AppList.scss'

export default class AppList extends Component {
    render() {
        return (
            <div className='app-list'>
                <h2 className='app-list__title'>
                    Задачи
                </h2>
                <input type='text' placeholder='Поиск по задачам' />
                <TaskList
                    // Прокидываем далее в компонент свойство tasks
                    tasks={this.props.tasks}
                />
            </div>
        )
    }
}
