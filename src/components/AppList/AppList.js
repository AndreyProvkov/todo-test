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
                    // Используем дополнительный блок и размещаем его справа от списка задач на всю высоту
                    // Добавляем обработчик по нажатию и удержанию клавиши мыши
                    onMouseDown={this.mouseDown}
                    className='app-list__resize'></div>
            </div>
        )
    }

    // Объявляем метод, который будет вызываться при передвижении мыши
    mouseMove(e) {
        // Получаем элемент из DOM (хотя это и противоречит философии React, но что поделать :( )
        let resizable = document.querySelector('.app-list');

        // Изменяем ширину блока с задачами
        // Используем текущую позицию курсора и вычитаем расстояние от левого края родительского блока до левого края выбранного блока
        resizable.style.width = e.clientX - resizable.offsetLeft + 'px'
    }

    mouseDown(e) {
        // Отменяем выделение браузера по умолчанию
        e.preventDefault()

        // Устанавливаем обработчики событий перемещения мыши и отпускания клавиши при нажатии клавиши мыши
        document.addEventListener('mousemove', this.mouseMove);
        document.addEventListener('mouseup', this.mouseUp);
    }

    mouseUp() {
        // При отпускании кнопки мыши удаляем обработчики события
        document.removeEventListener('mouseup', this.mouseUp);
        document.removeEventListener('mousemove', this.mouseMove);
    }

    // Метод для записи в состояние искомого наименования задачи
    searchFilter(e) {
        // Переводим строку с наименованием в нижний регистр для дальнейшего поиска
        this.setState({ value: e.target.value.toLowerCase() })
    }

    // Метод для получения списка задач на основе строки поиска
    getFilterTasks() {
        // Возвращаем новый массив задач, у которых наименование удовлетворяет строке поиска (если есть какое-либо совпадение, то задачу добавляем в новый массив)
        return this.props.tasks.filter(task => {
            if (task.title.toLowerCase().includes(this.state.value)) {
                return true
            }
            return false
        })
    }
}
