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
                    description: 'Помыть до 14:00'
                },
                {
                    id: 2,
                    title: 'Доделать задание',
                    description: 'Задание доделать до 16ого числа до закрытия приема заявок стажировки'
                }
            ]
        }
        // Привязываем контекст класса к методам
        this.setSelectedTask = this.setSelectedTask.bind(this)
        this.getSelectedTask = this.getSelectedTask.bind(this)
        this.deleteTask = this.deleteTask.bind(this)
    }

    // Render вызывается каждый раз при изменении состояния
    render() {
        return (
            <div className='container'>
                <div className='app'>
                    {/* Используем два созданных компонента и передаем им свойства (props) */}
                    <AppList
                        tasks={this.state.tasks}
                        setSelectedTask={this.setSelectedTask}
                    />
                    <AppForm
                        task={this.getSelectedTask()}
                        deleteTask={this.deleteTask}
                    />
                </div>
            </div>
        )
    }

    // Получаем id выбранной задачи из списка задач и записываем в state
    setSelectedTask(id) {
        this.setState({ selectedTask: id })
    }

    // На основе id выбранной задачи из списка задач возвращаем соответствующий объект задачи
    getSelectedTask() {
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
}
