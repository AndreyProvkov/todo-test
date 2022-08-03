import React, { Component } from 'react'
import './AppForm.scss'

export default class AppForm extends Component {
    render() {
        const task = this.props.task

        return (
            <div className='app-form'>
                {
                    // Используем условный рендеринг в зависимости от существования задачи
                    !task ?
                        <h2 className='app-form__no-task'>
                            Задач нет
                        </h2> :
                        <div className='app-form__is-task'>
                            <h2 className='app-form__title'>
                                Просмотр задачи
                            </h2>
                            <h3 className='app-form__subtitle'>
                                Название задачи
                            </h3>
                            <p>
                                {task.title}
                            </p>
                            <h3 className='app-form__subtitle'>
                                Описание задачи
                            </h3>
                            <p>
                                {task.description}
                            </p>
                        </div>
                }
            </div>
        )
    }
}
