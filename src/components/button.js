import Button from 'react-bootstrap/Button';
import "../App.css"

// GenericButton component renders a generic button.
// It accepts two props: `onClick` (a function to be called when the button is clicked)
// and `buttonText` (the text to be displayed on the button).
function GenericButton({ onClick, buttonText }) {
    return (
        <div className="button-gr">
            {/* Render a Bootstrap button with the provided variant (primary) and onClick function */}
            <Button variant="primary" onClick={onClick}>
                {/* Display the provided text as the button label */}
                {buttonText}
            </Button>
        </div>
    );
}

export default GenericButton;
