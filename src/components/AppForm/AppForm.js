import React, { Component } from 'react'
import './AppForm.scss'

export default class AppForm extends Component {
    constructor(prop) {
        super(prop)
        // Объявляем новое состояние, в котором будем хранить текущее состояние приложения (добавление, редактирование или просмотр задачи) и значения текстовых полей
        this.state = {
            appStatus: 'watch',
            taskTitle: '',
            taskDescription: ''
        }
        this.changeAppStatus = this.changeAppStatus.bind(this)
    }

    render() {
        // Установим начальные значения для рендера
        const task = this.props.task
        const appStatus = this.state.appStatus
        let buttonText = (appStatus === 'add') ? 'Добавить' : 'Сохранить'
        let title = 'Просмотр'
        let taskName = <input type='text' placeholder='Название задачи' name='taskTitle' value={this.state.taskTitle} onChange={this.handleChange} />
        let taskDescription = <textarea placeholder='Описание задачи' name='taskDescription' value={this.state.taskDescription} onChange={this.handleChange} />
        let btn = (<div>
            <button onClick={(e) => this.changeAppStatus(e, 'watch')}>Отмена</button>
            <button>{buttonText}</button>
        </div>)

        // Проверяем состояние приложения, в зависимости от условия присваиваем переменным подходящие значения
        switch (appStatus) {
            case 'add': {
                title = 'Добавление'
                buttonText = 'Добавить'
                break;
            }
            case 'edit': {
                title = 'Редактирование'
                break;
            }
            default: {
                taskName = (<p>
                    {task.title}
                </p>)
                taskDescription = (<p>
                    {task.description}
                </p>)
                btn = <button type='text' onClick={(e) => this.changeAppStatus(e, 'add')}>+</button>
                break;
            }
        }

        return (
            <form className='app-form'>
                {
                    // Используем условный рендеринг в зависимости от существования задачи
                    !task ?
                        <h2 className='app-form__no-task'>
                            Задач нет
                        </h2> :
                        <div className='app-form__is-task'>
                            <h2 className='app-form__title'>
                                {title} задачи
                            </h2>
                            <h3 className='app-form__subtitle'>
                                Название задачи
                            </h3>
                            {taskName}
                            <h3 className='app-form__subtitle'>
                                Описание задачи
                            </h3>
                            {taskDescription}
                        </div>
                }
                {btn}
            </form>
        )
    }

    // Меняем статус приложения в зависимости от нажатой кнопки
    changeAppStatus(e, status) {
        e.preventDefault()
        this.setState({ appStatus: status })

        // В зависимости от текущего состояния приложения заполняем поля ввода
        if (status === 'edit') {
            this.setState({
                taskTitle: this.props.task.title,
                taskDescription: this.props.task.description
            })
        } else {
            this.setState({
                taskTitle: '',
                taskDescription: ''
            })
        }
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
}
