import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { api } from "../utils/Api";
import { Card } from "./Card";

export function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {
  // Hooks
  const currentUser = useContext(CurrentUserContext);

  // States
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api
      .getCards()
      .then((res) => {
        setCards(res);
      })
      .catch((error) => console.log(error));
  }, []);

  // Handlers
  const handleCardLike = (card) => {
    const hasMyLike = card.likes.some((like) => like._id === currentUser._id);

    api.toggleLike(card._id, hasMyLike).then((newCard) => {
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    });
  };

  const section = () => {
    if (cards.length > 0) {
      return cards.map((card) => (
        <Card
          card={card}
          onCardClick={onCardClick}
          onLikeClick={handleCardLike}
          key={`card${card._id}`}
        />
      ));
    }
  };

  return (
    <main className="content">
      <section className="title">
        <div className="title__image-container">
          <img src={currentUser.avatar} alt="Изображение профиля" className="title__image" />
          <div className="title__image-overlay" onClick={onEditAvatar}></div>
        </div>
        <div className="title__titles">
          <div className="title__name-wrapper">
            <h1 className="title__name">{currentUser.name}</h1>
            <button type="button" className="title__name-edit" onClick={onEditProfile}></button>
          </div>
          <p className="title__description">{currentUser.description}</p>
        </div>
        <button className="title__button" type="button" onClick={onAddPlace}></button>
      </section>

      <section className="places">
        <ul className="places__grid">{section()}</ul>
      </section>
    </main>
  );
}
