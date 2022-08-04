import React, { Component } from 'react'
import './App.scss'
import AppForm from './components/AppForm/AppForm'
import AppList from './components/AppList/AppList'

// Здесь и далее в приложении будем создавать классовый компонент
export default class App extends Component {
    constructor(prop) {
        // Вызываем родительский конструктор 
        super(prop)
        // Определяем состояние компонента
        this.state = {
            selectedTask: 1,
            tasks: [
                {
                    id: 1,
                    title: 'Помыть посуду',
                    description: 'Помыть до 14:00',
                    status: 'pending'
                },
                {
                    id: 2,
                    title: 'Доделать задание',
                    description: 'Задание доделать быстро и качественно',
                    status: 'process'
                },
                {
                    id: 3,
                    title: 'Поспать',
                    description: 'Поспать хорошо',
                    status: 'completed'
                }
            ]
        }
        // Привязываем контекст класса к методам
        this.setSelectedTask = this.setSelectedTask.bind(this)
        this.getSelectedTask = this.getSelectedTask.bind(this)
        this.deleteTask = this.deleteTask.bind(this)
        this.submitTask = this.submitTask.bind(this)
        this.editTask = this.editTask.bind(this)
        this.addTask = this.addTask.bind(this)
    }

    // Render вызывается каждый раз при изменении состояния
    render() {
        return (
            <div className='container'>
                <div className='app'>
                    {/* Используем два созданных компонента и передаем им свойства (props) */}
                    <AppList
                        tasks={this.state.tasks}
                        selectedTask={this.state.selectedTask}
                        setSelectedTask={this.setSelectedTask}
                    />
                    <AppForm
                        task={this.getSelectedTask()}
                        deleteTask={this.deleteTask}
                        submitTask={this.submitTask}
                    />
                </div>
            </div>
        )
    }

    // Используем метод жизненного цикла для отслеживания изменения состояния
    componentDidUpdate(prevProps, prevState) {
        const tasks = this.state.tasks
        // Будем изменять выбранную задачу, когда задачи существуют и их количество изменилось
        if (prevState.tasks.length !== tasks.length && tasks.length !== 0) {
            // Так как новые задачи будут добавляться в конец списка задач, то выбираем последнюю задачу из списка и перезаписываем состояние для выбранной задачи
            if (prevState.tasks.length < tasks.length) {
                this.setState({ selectedTask: tasks[tasks.length - 1].id })
            } else {
                // При удалении задачи из списка будем выбирать первую в массиве задач
                this.setState({ selectedTask: tasks[0].id })
            }
        }
    }

    // Получаем id выбранной задачи из списка задач и записываем в state
    setSelectedTask(id) {
        this.setState({ selectedTask: id })
    }

    // На основе id выбранной задачи из списка задач возвращаем соответствующий объект задачи
    getSelectedTask() {
        // Проверяем существуют ли задачи
        if (this.state.tasks.length === 0) {
            return false
        }
        return this.state.tasks.filter(task => task.id === this.state.selectedTask).pop()
    }

    // Используем метод filter и удаляем задачу по id
    deleteTask(id) {
        this.setState(state => ({
            tasks: state.tasks.filter(task => {
                return task.id !== id
            })
        }))
    }

    submitTask(e, status, ...values) {
        // Отменяем перезагрузку страницы при отправки формы
        e.preventDefault()
        // Используем деструктуризацию массива
        let [id, taskTitle, taskStatus, taskDescription] = values

        // Убираем пробелы на концах строки и несколько пробелов подряд в самой строке
        taskTitle = taskTitle.trim().replace(/\s+/gi, ' ')
        taskDescription = taskDescription.trim().replace(/\s+/gi, ' ')

        // Проверяем состояние приложения
        if (status === 'edit') {
            // Если изменяем задачу, то перезаписываем массив задач с новыми данными в изменяемой задаче
            this.editTask(id, taskTitle, taskStatus, taskDescription)
        }
        if (status === 'add') {
            // При добавлении задач добавляем новую задачу в конец массива задач
            this.addTask(taskTitle, taskStatus, taskDescription)
        }
    }

    editTask(id, taskTitle, taskStatus, taskDescription) {
        this.setState(state => ({
            tasks: state.tasks.map(task => {
                if (task.id === id) {
                    return {
                        id: task.id,
                        title: taskTitle,
                        description: taskDescription,
                        status: taskStatus
                    }
                }
                return task
            })
        }))
    }

    addTask(taskTitle, taskStatus, taskDescription) {
        // Генерируем уникальный id
        let id = Date.now()

        this.setState(state => ({
            // Используем spread оператор, раскрываем массив и в конце добавляем новый объект задачи
            tasks: [...state.tasks, {
                id: id,
                title: taskTitle,
                description: taskDescription,
                status: taskStatus
            }]
        }))
    }
}
