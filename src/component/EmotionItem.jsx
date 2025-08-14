import './EmotionItem.css';

export default function EmotionItem({ id, img, name, onClick, isSelected }) {
    const handleClick = () => {
        if (typeof onClick === 'function') {
            onClick(id);
        }
    };

    const className = [
        'EmotionItem',
        isSelected ? `EmotionItem_on EmotionItem_on${id}` : `EmotionItem_off EmotionItem_off${id}`
    ].join(' ');

    return (
        <div className={className} onClick={handleClick} title={name}>
            <img src={img} alt={`emotion-${id}`} />
            <span>{name}</span>
        </div>
    );
}