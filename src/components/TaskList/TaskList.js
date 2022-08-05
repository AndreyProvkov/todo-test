import React, { Component } from 'react'
import TaskItem from '../TaskItem/TaskItem'
import './TaskList.scss'

export default class TaskList extends Component {
    render() {
        // Заполняем переменную tasks массивом, содержащим компоненты TaskItem с разными ключами
        // Ключи необходимы для правильного рендеринга
        const tasks = this.props.tasks.map(task => {
            return (
                <TaskItem
                    key={task.id}
                    task={task}
                    selectedTask={this.props.selectedTask}
                    setSelectedTask={this.props.setSelectedTask}
                />)
        })

        return (
            <ul className='app-list__list'>
                {/* Распаковываем массив tasks */}
                {tasks}
            </ul>
        )
    }
}
