import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { Card, Container, Row, Col , Table, Button} from 'react-bootstrap'
import Axios from 'axios'
import Moment from 'moment/moment'

import Modal from '../component/Modal'

function Absen() {

    const token = localStorage.getItem("token")
    Axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    
    const navigate = useNavigate()
    
    const [absent, setAbsent] = useState([]);
    const [from, setFrom] = useState();
    const [to, setTo] = useState();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    useEffect(() => {
        if (!token) navigate('/')
        else getData()
    }, [])

    const getData = async () => {
        await Axios.get(`http://localhost:3000/api/attendance/byId`)
        .then((response) => {
            setAbsent(response.data.data)
        })
        .catch((error) => {
            alert(error.response.data.message)
        })
    }

    const search = () => {
        if (from !== undefined && to !== undefined) {
            if (absent.length == 0) getData()
            
            let filtered = absent.filter((item) => {
                const date = Moment(item.in).format('YYYY-MM-DD')
                return (date >= from && date <= to)
            })

            setAbsent(filtered)
        } else {
            alert('Silahkan pilih tanggal dari dan ke terlebih dahulu!')
        }
    }

    const attendaceIn = async () => {

        const payload = {
            in : Moment().locale('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss')
        }

        await Axios.post(`http://localhost:3000/api/attendance/in`,payload)
        .then((response) => {
            alert(response.data.message)
            handleClose()
            getData()
        })
        .catch((error) => {
            alert(error.response.data.message)
        })
    }

    const attendaceOut = async () => {
        
        const payload = {
            out : Moment().locale('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss')
        }

        await Axios.post(`http://localhost:3000/api/attendance/out`,payload)
        .then((response) => {
            alert(response.data.message)
            handleClose()
            getData()
        })
        .catch((error) => {
            alert(error.response.data.message)
        })
    }

    return (
        <div>
            <Container className="mt-3">
                <Row>
                    <Col md="{12}">
                        <Card className="border-0 rounded shadow-sm mb-5">
                            <Card.Body>
                                <Row>
                                    <Col md="5">
                                        <label className="form-label">Dari Tanggal</label>
                                        <input type="date" className="form-control" onChange={(e) => setFrom(e.target.value)}/>
                                    </Col>
                                    <Col md="5">
                                        <label className="form-label">Ke Tanggal</label>
                                        <input type="date" className="form-control" onChange={(e) => setTo(e.target.value)}/>
                                    </Col>
                                    <Col md="2">
                                        <div className="mb-4"></div>
                                        <Button onClick={search}>Cari</Button>{' '}
                                        <Button variant='success' onClick={handleShow}>Absen</Button>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>

                        <Table className="text-center" responsive>
                            <thead>
                                <tr>
                                    <th>Masuk</th>
                                    <th>Keluar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {absent.map((item, index) => (
                                    <tr key={ item.id }>
                                        <td>{ Moment(item.in).locale('Asia/Jakarta').format('DD-MM-YYYY HH:mm') }</td>
                                        <td>{ item.out ? Moment(item.out).locale('Asia/Jakarta').format('DD-MM-YYYY HH:mm') : 'Belum absen keluar' }</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
            <Modal
                show={show}
                close={handleClose}
                title={'Absen'}
                body={<>
                    <Button variant="success" onClick={attendaceIn}>Masuk</Button>{' '}
                    <Button variant="danger" onClick={attendaceOut}>Keluar</Button>
                </>}
                className={'text-center'}
            />
        </div>
    )
}

export default Absen