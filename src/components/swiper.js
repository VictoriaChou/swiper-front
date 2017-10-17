import React from 'react'
import PropTypes from 'prop-types'
import Flipsnap from '../lib/flipsnap'

class Swiper extends React.Component{
    static propTypes = {
        swiperOptions: PropTypes.shape({
            distance: PropTypes.number,
            currentPic: PropTypes.number,
            continuous: PropTypes.bool,
            swTouchStart: PropTypes.func,
            swTouchEnd: PropTypes.func
        }),
        swiperStyle: PropTypes.shape({
            container: PropTypes.object,
            wrapper: PropTypes.object,
            child: PropTypes.object
        }),
        id: PropTypes.string,
        className: PropTypes.string
    }

    componentDidMount() { //componentDidMount() 生命周期钩子在组件已经渲染到DOM之后运行，可在此处设置timer
        const { options, children } = this.prop
        let len = children.length

        // 当非正常的react数据流修改子组件时可采用refs
        this.swiper = Flipsnap(this.refs.container, {
            distance: options.distance,
            currentPic: options.currentPic
        })

        // 各个阶段事件监听
        this.swiper.element.addEventListener('fstouchstart', function(ev) {
            options.swTouchstart && options.swTouchstart(ev)
        }, false)

        this.swiper.element.addEventListener('fstouchmove', function(ev) {
            options.swTouchmove && options.swTouchmove(ev)
        }, false)

        this.swiper.element.addEventListener('fstouchend', ev => {
            options.swTouchend && options.swTouchend(ev)
        }, false)
    }

    componentWillUnmount() {
        this.swiper.destroy()
    }

    refresh() {
        this.swiper.refresh();
    }

    render() {
        const { id, className, style, children } = this.props
        return (
            <div style={style.wrapper} className={className} ref="container">
                {React.Children.map(children, (child) => {
                    return React.cloneElement(child, {style: style.child})
                })}
            </div>
        )
    }
}

export default Swiper