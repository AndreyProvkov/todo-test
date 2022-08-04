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
                <input type='text' placeholder='Поиск задач' />
                <TaskList
                    // Прокидываем далее в компонент свойства и методы
                    tasks={this.props.tasks}
                    selectedTask={this.props.selectedTask}
                    setSelectedTask={this.props.setSelectedTask}
                />
            </div>
        )
    }
}
