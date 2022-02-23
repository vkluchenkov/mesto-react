export function Card({ card, onCardClick }) {
  const handleClick = () => {
    onCardClick(card);
  };

  return (
    <li className="place">
      <img className="place__image" alt={card.name} src={card.link} onClick={handleClick} />
      <div className="place__info">
        <h2 className="place__name">{card.name}</h2>
        <div className="place__like_container">
          <button className="place__like" type="button"></button>
          <p className="place__like_counter">{card.likes.length}</p>
        </div>
        <button className="place__trash" type="button"></button>
      </div>
    </li>
  );
}
