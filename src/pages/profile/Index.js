import { useNavigate } from 'react-router'
import React, { useState, useEffect } from 'react'
import { Card, Container, Row, Col, Button } from 'react-bootstrap'
import Axios from 'axios';

function Index() {
    
    const token = localStorage.getItem("token");
    Axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

    const navigate = useNavigate()

    const [user, setUser] = useState()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [oldPassword, setOldPassword] = useState("")
    const [phone, setPhone] = useState("")
    const [photo, setPhoto] = useState("")

    useEffect(() => {
        getUser()
    }, [])

    const getUser = async () => {
        const response = await Axios.get(`http://localhost:3000/api/employee/byId`)
        setUser(response.data.data)
        setName(response.data.data?.name)
        setEmail(response.data.data?.email)
        setOldPassword(response.data.data?.password)
        setPhone(response.data.data?.phone)
    }

    const handler = async (e) => {
        e.preventDefault()

        const payload = {
            name: name,
            email: email,
            password: password,
            oldPassword: oldPassword,
            phone: phone
        }

        await Axios.put(`http://localhost:3000/api/employee/update?id=${user.id}`, payload)
        .then((response) => {
            alert(response.data.message)
            getUser()
            if (password !== "") {
                localStorage.clear()
                navigate('/')
            }
        })
        .catch((error) => {
            alert(error.response.data.message)
        })
    }
    return (
        <Container className="mt-3">
            <Row>
                <Col md="12">
                    <Card className="border-0 rounded shadow-sm">
                        <Card.Body>
                            <form onSubmit={handler}>
                                <div className="mb-3">
                                    <label className="form-label">Nama</label>
                                    <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nama"/>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input type="emaii" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"/>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Password</label>
                                    <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Isi jika ingin ubah password"/>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Telepon</label>
                                    <input type="number" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone"/>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Foto</label>
                                    <input type="file" className="form-control"/>
                                </div>
                                <div className="d-grid gap-2">
                                    <Button type="submit" className="btn btn-primary">Ubah</Button>
                                </div>
                            </form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Index