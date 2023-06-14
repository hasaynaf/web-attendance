import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { Navbar, Nav, Container, Card, Row, Col, Tabs, Tab } from 'react-bootstrap'
import Absent from './absent/Index'
import Profile from './profile/Index'
import Employee from './employee/Index'
import EmployeeAbsent from './employee/absent/Index'

function Home() {

    const roleId = localStorage.getItem('roleId')
    const navigate = useNavigate()

    useEffect(() => {
        if (!localStorage.getItem('token')) navigate('/')
        document.title = 'Absensi Karyawan - Beranda'
    }, [])
    
    const signout = () => {
        localStorage.clear()
        navigate('/')
    }
    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                <Navbar.Brand to="/home">Absensi Karyawan</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                        </Nav>
                        <Nav>
                            <Nav.Link onClick={signout}>
                                Sign Out
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Container className="mt-3">
                <Row>
                    <Col md="12">
                    {roleId == 1 ? (
                        <Tabs
                            defaultActiveKey="absent"
                            id="justify-tab-example"
                            className="mb-3"
                            justify
                        >
                            <Tab eventKey="profile" title="Profil">
                                <Profile/>
                            </Tab>
                            <Tab eventKey="absent" title="Absen">
                                <Absent/>
                            </Tab>
                            <Tab eventKey="employee" title="Data Karyawan">
                                <Employee/>
                            </Tab>
                            <Tab eventKey="employeeAbsent" title="Data Absen Karyawan">
                                <EmployeeAbsent/>
                            </Tab>
                        </Tabs>
                    ) : (
                        <Tabs
                            defaultActiveKey="absent"
                            id="justify-tab-example"
                            className="mb-3"
                            justify
                        >
                            <Tab eventKey="profile" title="Profil">
                                <Profile/>
                            </Tab>
                            <Tab eventKey="absent" title="Absen">
                                <Absent/>
                            </Tab>
                        </Tabs>
                    )}
                    </Col>
                </Row>
            </Container>
      </div>
    )
}

export default Home