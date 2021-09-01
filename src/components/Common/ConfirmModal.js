import { Button, Modal } from 'react-bootstrap'
import HTMLReactParser from 'html-react-parser'
import { MODAL_ACTION_CLOSE, MODAL_ACTION_CONFIRM } from '../../untilities/constants'


function ConfirmModal(props) {
  const { title, content, show, onAction } =props

  return (
  // eslint-disable-next-line react/react-in-jsx-scope
    <Modal
      show={show}
      onHide={() => onAction(MODAL_ACTION_CLOSE)}
      backdrop="static"
      keyboard={false}
      animation={false}
    >
      {/* eslint-disable-next-line react/react-in-jsx-scope */}
      <Modal.Header closeButton>
        {/* eslint-disable-next-line react/react-in-jsx-scope */}
        <Modal.Title className="h5">{HTMLReactParser(title)}</Modal.Title>
      </Modal.Header>
      {/* eslint-disable-next-line react/react-in-jsx-scope */}
      <Modal.Body>{HTMLReactParser(content)}</Modal.Body>
      {/* eslint-disable-next-line react/react-in-jsx-scope */}
      <Modal.Footer>
        {/* eslint-disable-next-line react/react-in-jsx-scope */}
        <Button variant="secondary" onClick={() => onAction(MODAL_ACTION_CLOSE)}>
                        Close
        </Button>
        {/* eslint-disable-next-line react/react-in-jsx-scope */}
        <Button variant="primary" onClick={() => onAction(MODAL_ACTION_CONFIRM)}>
                        Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ConfirmModal
