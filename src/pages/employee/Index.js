import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { Card, Container, Row, Col , Table, Button} from 'react-bootstrap'
import Axios from 'axios'

import Modal from '../component/Modal'

function Employee() {

    const token = localStorage.getItem("token")
    Axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    
    const navigate = useNavigate()
    
    const [employee, setEmployee] = useState([]);
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")
    const [role, setRole] = useState("")

    const [user, setUser] = useState()
    const [name1, setName1] = useState("")
    const [email1, setEmail1] = useState("")
    const [password1, setPassword1] = useState("")
    const [phone1, setPhone1] = useState("")
    const [role1, setRole1] = useState("")
    const [oldPassword, setOldPassword] = useState("")

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [show1, setShow1] = useState(false);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);
    
    useEffect(() => {
        if (!token) navigate('/')
        else getData()
    }, [])

    const getData = async () => {
        await Axios.get(`http://localhost:3000/api/employee/all`)
        .then((response) => {
            setEmployee(response.data.data)
        })
        .catch((error) => {
            alert(error.response.data.message)
        })
    }

    const refresh = () => {
        getData()
    }

    const handler = async (e) => {
        e.preventDefault()

        const payload = {
            name: name,
            email: email,
            password: password,
            phone: phone,
            roleId: role
        }

        await Axios.post(`http://localhost:3000/api/employee/create`, payload)
        .then((response) => {
            alert(response.data.message)
            handleClose()
            getData()
        })
        .catch((error) => {
            alert(error.response.data.message)
        })
    }

    const update = async (id) => {
        const response = await Axios.get(`http://localhost:3000/api/employee/byId?method=update&id=${id}`)
        setUser(response.data.data)
        setName1(response.data.data?.name)
        setEmail1(response.data.data?.email)
        setOldPassword(response.data.data?.password)
        setPhone1(response.data.data.phone ? response.data.data.phone : "")
        setRole1(response.data.data?.roleId)
        handleShow1()
    }

    const handlerUpdate = async (e) => {
        e.preventDefault()

        const payload = {
            name: name1,
            email: email1,
            password: password1,
            oldPassword: oldPassword,
            phone: phone1,
            roleId: role1
        }

        await Axios.put(`http://localhost:3000/api/employee/update?id=${user.id}`, payload)
        .then((response) => {
            alert(response.data.message)
            getData()
        })
        .catch((error) => {
            alert(error.response.data.message)
        })
    }

    const destroy = async (id) => {
        if (window.confirm('Apakah anda yakin hapus karyawan ini?')) {
            await Axios.delete(`http://localhost:3000/api/employee/delete?id=${id}`)
            .then((response) => {
                alert(response.data.message)
                getData()
            })
            .catch((error) => {
                alert(error.response.data.message)
            })
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
                                    </Col>
                                    <Col md="4">
                                    </Col>
                                    <Col md="3">
                                        <Button variant='warning' onClick={refresh}>Refresh</Button>{' '}
                                        <Button onClick={handleShow}>Tambah </Button>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>

                        <Table className="text-center" responsive>
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Nama Karyawan</th>
                                    <th>Email</th>
                                    <th>Telepon</th>
                                    <th>#</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employee.map((item, index) => (
                                    <tr key={ item.id }>
                                        <td>{ index+1 }</td>
                                        <td>{ item.name }</td>
                                        <td>{ item.email }</td>
                                        <td>{ item.phone }</td>
                                        <td>
                                            <Button variant='warning' onClick={() => update(item.id)}>Ubah</Button>{' '}
                                            <Button variant='danger' onClick={() => destroy(item.id)}>Hapus</Button>
                                        </td>
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
                title={'Tambah Karyawan'}
                body={<>
                        <form onSubmit={handler}>
                            <div className="mb-3">
                                <label className="form-label">Nama</label>
                                <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} placeholder="Masukan Nama"/>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input type="emaii" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Masukan Email"/>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Password</label>
                                <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Masukan Password"/>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Telepon</label>
                                <input type="number" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Masukan Telepon"/>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Sebagai</label>
                                <select className="form-control" value={role} onChange={(e) => setRole(e.target.value)}>
                                    <option value={''}>--Pilih--</option>
                                    <option value={1}>Admin HR</option>
                                    <option value={2}>Karyawan</option>
                                </select>
                            </div>
                            <div className="d-grid gap-2">
                                <Button type="submit" className="btn btn-primary">Simpan</Button>
                            </div>
                        </form>
                </>}
            />

            <Modal
                show={show1}
                close={handleClose1}
                title={'Ubah Karyawan'}
                body={<>
                        <form onSubmit={handlerUpdate}>
                            <div className="mb-3">
                                <label className="form-label">Nama</label>
                                <input type="text" className="form-control" value={name1} onChange={(e) => setName1(e.target.value)} placeholder="Masukan Nama"/>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input type="emaii" className="form-control" value={email1} onChange={(e) => setEmail1(e.target.value)} placeholder="Masukan Email"/>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Telepon</label>
                                <input type="number" className="form-control" value={phone1} onChange={(e) => setPhone1(e.target.value)} placeholder="Masukan Telepon"/>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Sebagai</label>
                                <select className="form-control" value={role1} onChange={(e) => setRole1(e.target.value)}>
                                    <option value={''}>--Pilih--</option>
                                    <option value={1}>Admin HR</option>
                                    <option value={2}>Karyawan</option>
                                </select>
                            </div>
                            <div className="d-grid gap-2">
                                <Button type="submit" className="btn btn-primary">Ubah</Button>
                            </div>
                        </form>
                </>}
            />
        </div>
    )
}

export default Employee