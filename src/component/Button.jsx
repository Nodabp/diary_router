import './Button.css';

export function Button({ text, type = "", onClick = () => {} }) {
    return (
        <button className={`Button ${type}`} onClick={onClick}>
            {text}
        </button>
    );
}