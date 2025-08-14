import './Header.css';

export default function Header({ title, leftChild, rightChild }) {
    return (
        <header className="Header">
            <div>{leftChild}</div>
            <h2>{title}</h2>
            <div>{rightChild}</div>
        </header>
    );
}