import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { Card, Container, Row, Col , Button } from 'react-bootstrap'
import Axios from 'axios'

function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [validation, setValidation] = useState([])

    const token = localStorage.getItem("token")
    const navigate = useNavigate()

    useEffect(() => {
        if (token) navigate('/home')
        document.title = 'Absensi Karyawan - Sign In'
    }, [])
    
    const handler = async (e) => {
        e.preventDefault()

        const payload = {
            email : email,
            password : password
        }

        await Axios.post(`http://localhost:3000/api/auth/signin`, payload)
        .then((response) => {
            localStorage.setItem('roleId', response.data.data.roleId)
            localStorage.setItem('token', response.data.data.token)
            navigate('/home')
        })
        .catch((error) => {
            setValidation(error.response.data)
        })
    }

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md="4">
                    <Card className="border-0 rounded shadow-sm">
                        <Card.Body>
                            <h4 className="fw-bold text-center">Absensi Karyawan</h4>
                            <hr/>
                            {
                                validation.message && (
                                    <div className="alert alert-danger">
                                        {validation.message}
                                    </div>
                                )
                            }
                            <form onSubmit={handler}>
                                <div className="mb-3">
                                    <label className="form-label">EMAIL</label>
                                    <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Masukkan Alamat Email"/>
                                </div>
                                {
                                    validation.email && (
                                        <div className="alert alert-danger">
                                            {validation.email}
                                        </div>
                                    )
                                }
                                <div className="mb-3">
                                    <label className="form-label">PASSWORD</label>
                                    <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Masukkan Password"/>
                                </div>
                                {
                                    validation.password && (
                                        <div className="alert alert-danger">
                                            {validation.password}
                                        </div>
                                    )
                                }
                                <div className="d-grid gap-2">
                                    <Button type="submit" className="btn btn-primary">SIGN IN</Button>
                                </div>
                            </form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Login