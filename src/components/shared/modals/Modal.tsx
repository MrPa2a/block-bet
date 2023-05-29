import "./Modal.scss";
import Button from './../button/Button';

interface ModalProps {
    isOpen: boolean
}
 
const Modal: React.FC<ModalProps> = ({
    isOpen = false
}) => {
    console.log(isOpen)

    return ( 
        <div className="modal">
            <div className="modal-header">
                <h1 className="title">
                    Dice
                </h1>
            </div>
            <div className="modal-content">
                <div className="result">
                    YOU WON
                </div>
                <div className="result-inputs">
                    <div className="result-wager">
                        Wager : 142
                    </div>
                    <div className="result-multiplier">
                        Multiplier : 2.94x
                    </div>
                </div>
                <div className="result-output">
                    +50 BBC
                </div>
            </div>
            <div className="modal-footer">
                <Button label="Close" onClick={() => {}} />
            </div>
        </div>    
    );
}
 
export default Modal;