import React, { Component } from 'react'
import './TaskItem.scss'

export default class TaskItem extends Component {
    render() {
        return (
            <li>
                {/* Принимаем переданное свойство task и выводим заголовок задачи title */}
                {this.props.task.title}
            </li>
        )
    }
}
