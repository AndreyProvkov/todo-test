import React, { Component } from 'react'
import TaskList from '../TaskList/TaskList'
import './AppList.scss'

export default class AppList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: ''
        }
        this.searchFilter = this.searchFilter.bind(this)
        this.getFilterTasks = this.getFilterTasks.bind(this)
    }

    render() {
        return (
            <div className='app-list'>
                <h2 className='app-list__title'>
                    Задачи
                </h2>
                <input type='text' placeholder='Поиск задач' value={this.state.value} onInput={this.searchFilter} />
                <TaskList
                    // Прокидываем далее в компонент свойства и методы
                    tasks={this.getFilterTasks()}
                    selectedTask={this.props.selectedTask}
                    setSelectedTask={this.props.setSelectedTask}
                />
            </div>
        )
    }

    searchFilter(e) {
        this.setState({ value: e.target.value.toLowerCase() })
    }

    getFilterTasks() {
        return this.props.tasks.filter(task => {
            if (task.title.toLowerCase().includes(this.state.value)) {
                return true
            }
            return false
        })
    }
}
