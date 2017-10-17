import React from 'react'
import ReactDOM from 'react-dom'
import Swiper from './components/swiper'
import './style/index.css'


let opt = {
    distance: 620, // 每次移动的距离，卡片的真实宽度
    currentPoint: 1,// 初始位置，默认从0即第一个元素开始
    swTouchend: (ev) => {
        let data = {
            moved: ev.moved,
            originalPoint: ev.originalPoint,
            newPoint: ev.newPoint,
            cancelled: ev.cancelled
        }
        console.log(data);
        this.setState({
            curCard: ev.newPoint
        })
    }
}

const element = 
    <div className="card-swipe" >
        <Swiper className="card-slide" options={opt}>
            <div className="item"></div>
        </Swiper>
    </div>

ReactDOM.render(
    element,
    document.getElementById('root')
)