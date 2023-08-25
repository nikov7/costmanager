import Button from 'react-bootstrap/Button';
import "../App.css"

function GenericButton({onClick, buttonText}){
    return (
        <div className="button-gr"><Button variant="primary" onClick={onClick}>{buttonText}</Button></div>
    );
}

export default GenericButton;