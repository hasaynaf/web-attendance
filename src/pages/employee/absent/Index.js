import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { Card, Container, Row, Col , Table, Button} from 'react-bootstrap'
import Axios from 'axios'
import Moment from 'moment/moment'

function EmployeeAbsent() {

    const token = localStorage.getItem("token");
    Axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    
    const navigate = useNavigate()
    
    const [absentEmployee, setAbsentEmployee] = useState([]);
    const [from, setFrom] = useState();
    const [to, setTo] = useState();
    
    useEffect(() => {
        if (!token) navigate('/')
        getData()
    }, [])

    const getData = async () => {
        await Axios.get(`http://localhost:3000/api/attendance/all`)
        .then((response) => {
            setAbsentEmployee(response.data.data)
        })
        .catch((error) => {
            alert(error.response.data.message)
        })
    }

    const search = () => {
        if (from !== undefined && to !== undefined) {
            if (absentEmployee.length == 0) getData()
            
            let filtered = absentEmployee.filter((item) => {
                const date = Moment(item.in).format('YYYY-MM-DD')
                return (date >= from && date <= to)
            })

            setAbsentEmployee(filtered)
        } else {
            alert('Silahkan pilih tanggal dari dan ke terlebih dahulu!')
        }
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
                                    <Col md="6">
                                        <label className="form-label">Ke Tanggal</label>
                                        <input type="date" className="form-control" onChange={(e) => setTo(e.target.value)}/>
                                    </Col>
                                    <Col md="1">
                                        <div className="mb-4"></div>
                                        <Button onClick={search}>Cari</Button>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>

                        <Table className="text-center" responsive>
                            <thead>
                                <tr>
                                    <th>Nama Karyawan</th>
                                    <th>Masuk</th>
                                    <th>Keluar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {absentEmployee.map((item, index) => (
                                    <tr key={ item.id }>
                                        <td>{ item.employees.name }</td>
                                        <td>{ Moment(item.in).locale('Asia/Jakarta').format('DD-MM-YYYY HH:mm') }</td>
                                        <td>{ item.out ? Moment(item.out).locale('Asia/Jakarta').format('DD-MM-YYYY HH:mm') : 'Belum absen keluar' }</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default EmployeeAbsent