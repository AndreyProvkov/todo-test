import React, { Component } from 'react'
import './AppForm.scss'

export default class AppForm extends Component {
    constructor(prop) {
        super(prop)
        // Объявляем новое состояние, в котором будем хранить текущее состояние приложения (добавление, редактирование или просмотр задачи) и значения текстовых полей
        this.state = {
            appStatus: 'watch',
            taskTitle: '',
            taskStatus: this.props.task.status,
            taskDescription: '',
            listStatus: {
                pending: 'Ожидает',
                process: 'В процессе',
                completed: 'Выполнена'
            }
        }
        this.changeAppStatus = this.changeAppStatus.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    render() {
        // Сохраним в переменные значение получаемой задачи и текущего состояния
        const task = this.props.task
        const appStatus = this.state.appStatus

        // Определяем переменные
        let buttonText
        let taskTitle
        let taskStatus
        let taskDescription
        let title

        // Проверяем состояние приложения, в зависимости от условия присваиваем переменным подходящие значения
        if (appStatus === 'edit' || appStatus === 'add') {
            taskTitle = (
                <input
                    type='text'
                    className='app-form__input'
                    placeholder='Название задачи'
                    name='taskTitle'
                    required
                    value={this.state.taskTitle}
                    onChange={this.handleChange}
                />
            )
            taskStatus = (
                <select
                    className='app-form__select'
                    name='taskStatus'
                    value={this.state.taskStatus}
                    onChange={this.handleChange}
                >
                    <option value="pending">Ожидает</option>
                    <option value="process">В процессе</option>
                    <option value="completed">Выполнена</option>
                </select>
            )
            taskDescription = (
                <textarea
                    placeholder='Описание задачи'
                    className='app-form__textarea'
                    name='taskDescription'
                    value={this.state.taskDescription}
                    onChange={this.handleChange}
                />
            )
        }
        if (appStatus === 'edit') {
            title = 'Редактирование'
            buttonText = 'Сохранить'
        }
        if (appStatus === 'add') {
            title = 'Добавление'
            buttonText = 'Добавить'
        }
        if (appStatus === 'watch' && task) {
            title = 'Просмотр'
            taskTitle = (
                <p className='app-form__task-info'>
                    {task.title}
                </p>
            )
            taskStatus = (
                <span className={`app-form__task-status app-form__task-status_${task.status}`}>
                    {this.state.listStatus[task.status]}
                </span>
            )
            taskDescription = (
                <p className='app-form__task-info'>
                    {task.description}
                </p>
            )
        }

        return (
            <form
                className='app-form'
                onSubmit={(e) => {
                    this.props.submitTask(
                        e,
                        appStatus,
                        task.id,
                        this.state.taskTitle,
                        this.state.taskStatus,
                        this.state.taskDescription
                    )
                    this.changeAppStatus(e, 'watch')
                }
                }
            >
                {
                    // Используем условный рендеринг в зависимости от существования задачи
                    (!task && appStatus !== 'add') ?
                        <h2 className='app-form__no-task'>
                            Задач нет
                        </h2> :
                        <div className='app-form__is-task'>
                            <div className='app-form__header'>
                                <h2 className='app-form__header-title'>
                                    {title} задачи
                                </h2>
                                {
                                    // Отображаем кнопки удаления и редактирования когда находимся в режиме просмотра
                                    (appStatus === 'watch') &&
                                    <div className='app-form__buttons'>
                                        <button
                                            type='button'
                                            className='btn-edit'
                                            onClick={(e) => this.changeAppStatus(e, 'edit')}
                                        />
                                        <button
                                            type='button'
                                            className='btn-delete'
                                            onClick={() => this.props.deleteTask(task.id)}
                                        />
                                    </div>
                                }
                            </div>
                            <h3 className='app-form__subtitle'>
                                Название задачи
                            </h3>
                            {taskTitle}
                            <h3 className='app-form__subtitle'>
                                Статус задачи
                            </h3>
                            {taskStatus}
                            <h3 className='app-form__subtitle'>
                                Описание задачи
                            </h3>
                            {taskDescription}
                            {
                                // Отображаем кнопки, когда находимся не в режиме просмотра
                                (appStatus !== 'watch') &&
                                <div className='app-form__buttons'>
                                    <button
                                        className='btn'
                                        type='button'
                                        onClick={(e) => this.changeAppStatus(e, 'watch')}
                                    >
                                        Отмена
                                    </button>
                                    <button
                                        className='btn'
                                        type='submit'
                                    >
                                        {/* Вставляем ранее присвоенный текст кнопки */}
                                        {buttonText}
                                    </button>
                                </div>
                            }
                        </div>
                }
                {
                    // Скрываем кнопку "добавить", когда открываем форму добавления
                    (appStatus === 'watch') &&
                    <button
                        className='btn-add'
                        type='text'
                        onClick={(e) => this.changeAppStatus(e, 'add')}
                    >
                        +
                    </button>
                }

            </form>
        )
    }

    // Меняем статус приложения в зависимости от нажатой кнопки
    changeAppStatus(e, status) {
        // Отменяем стандартное поведение кнопки в форме
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

    // Сохраняем значение поля после изменения в свойство равное переменной name изменяемого поля
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
}