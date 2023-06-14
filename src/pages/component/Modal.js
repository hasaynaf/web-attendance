import { Modal, Button } from 'react-bootstrap'

function ComponentModal({show, close, title, body, btnSave, className}) {
    return (
        <>
            <Modal show={show} onHide={close}>
                <Modal.Header closeButton>
                    <Modal.Title>{ title }</Modal.Title>
                </Modal.Header>
                <Modal.Body className={ className }>
                    { body }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={close}>
                        Tutup
                    </Button>
                    { btnSave }
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ComponentModal