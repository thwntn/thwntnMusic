import style from './popular.module.css'
import { Row, Col } from 'react-bootstrap'
import Playing from '../playing/playing';
import { useEffect, useState } from 'react';

function Popular() {
    const [loop, setLoop] = useState(false)
    const [listPopular, setListPopular] = useState([])
    const [playing, setPlaying] = useState({
        item: {
            musicFile: 'null',
            imageName: null
        }
    })
    const [active, setActive] = useState(-1)

    const fetchData = () => {
        const url = 'http://localhost:8080/popular'
        fetch(url)
        .then(response => response.json())
        .then(responseJson => setListPopular(responseJson))
    }

    useEffect(() => {
        fetchData()
    }, [])

    return ( 
        <Row className = {style.popular}>
            <Col xs= {8}>
                <h5>Most Poppular</h5>
                <p>92 Songs</p>
                <Row className={style.frameList}>
                    {listPopular.map((item, index, array) => {
                        return (
                            <Row
                                className={active == index ? `${style.item} ${style.active}` : `${style.item}`}
                                onClick={() => {
                                    setPlaying({item, index, array})
                                    setActive(index)
                                }}
                            >
                                <Col xs = {1} style={{textAlign: 'center'}}>{index}</Col>
                                <Col
                                    xs ={2}
                                    className={style.img}
                                >
                                    <div style={{ backgroundImage: `url(http://localhost/thwntnMusic/database/image/${item.imageName})` }}></div>
                                </Col>
                                <Col xs = {4}>{item.musicName}</Col>
                                <Col xs = {4}>{item.musicSingerName}</Col>
                                <Col xs = {1}>09:20</Col>
                            </Row>
                        )
                    })}
                </Row>
            </Col>
            <Col xs= {4}>
                {listPopular.length != 0 ? <Playing props = {{playing, setPlaying, setActive}}></Playing> : null}
            </Col>
        </Row>
     );
}

export default Popular;