import React, { Component } from 'react'
import './TaskItem.scss'

export default class TaskItem extends Component {
    render() {
        return (
            <li
                className={`
                    app-list__list-item
                    app-list__list-item_${this.props.task.status}
                    ${(this.props.selectedTask === this.props.task.id) ? 'app-list__list-item_active' : ''}
                `}
                // Добавляем обработчик нажатий на элемент списка, вызываем переданный метод и передаем в аргументах id выбранного элемента
                onClick={() => this.props.setSelectedTask(this.props.id)
                }
            >
                {/* Принимаем переданное свойство task и выводим заголовок задачи title */}
                {this.props.task.title}
            </li >
        )
    }
}
