import React from 'react'
import './TodoItem.css';

function TodoItem({ id, title, description, style }) {

    const drag = (e) => {
        e.dataTransfer.setData('item', id);
    }

    return (
        <div id={id} className={`todo-item ${style}`} draggable={true} onDragStart={drag}>
            <p className='title'>{title.toUpperCase()}</p>
            <p className='descript'>{description.length > 300 ? `${description.substring(0,300)}.....`: description }</p>
        </div>
    )
}

export default TodoItem
