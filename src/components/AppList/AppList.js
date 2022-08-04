import React, { Component } from 'react'
import TaskList from '../TaskList/TaskList'
import './AppList.scss'

export default class AppList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: '',
        }
        this.searchFilter = this.searchFilter.bind(this)
        this.getFilterTasks = this.getFilterTasks.bind(this)
        this.mouseDown = this.mouseDown.bind(this)
        this.mouseMove = this.mouseMove.bind(this)
        this.mouseUp = this.mouseUp.bind(this)
    }

    render() {
        return (
            <div className='app-list'>
                <h2 className='app-list__title'>
                    Задачи
                </h2>
                <input className='app-list__search-input' type='text' placeholder='Поиск задач' value={this.state.value} onInput={this.searchFilter} />
                <TaskList
                    // Прокидываем далее в компонент свойства и методы
                    tasks={this.getFilterTasks()}
                    selectedTask={this.props.selectedTask}
                    setSelectedTask={this.props.setSelectedTask}
                />
                <div
                    onMouseDown={this.mouseDown}
                    className='app-list__resize'></div>
            </div>
        )
    }

    mouseMove(e) {
        let resizable = document.querySelector('.app-list');

        resizable.style.width = e.clientX - resizable.offsetLeft + 'px'
    }

    mouseDown(e) {
        // Отменяем выделение браузера по умолчанию
        e.preventDefault()

        document.addEventListener('mousemove', this.mouseMove);
        document.addEventListener('mouseup', this.mouseUp);
    }

    mouseUp() {
        document.removeEventListener('mouseup', this.mouseUp);
        document.removeEventListener('mousemove', this.mouseMove);
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
