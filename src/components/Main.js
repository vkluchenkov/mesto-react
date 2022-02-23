import { useEffect, useState } from "react";
import avatarImg from "../images/Ava.jpg";
import { api } from "../utils/Api";
import { Card } from "./Card";

export function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {
  const [userName, setUserName] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [userAvatar, setUserAvatar] = useState(avatarImg);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api
      .getMe()
      .then((res) => {
        setUserName(res.name);
        setUserDescription(res.about);
        setUserAvatar(res.avatar);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    api
      .getCards()
      .then((res) => {
        setCards(res);
      })
      .catch((error) => console.log(error));
  }, []);

  const section = () => {
    if (cards.length > 0) {
      return cards.map((card) => (
        <Card card={card} onCardClick={onCardClick} key={`card${card._id}`} />
      ));
    }
  };

  return (
    <main className="content">
      <section className="title">
        <div className="title__image-container">
          <img src={userAvatar} alt="Изображение профиля" className="title__image" />
          <div className="title__image-overlay" onClick={onEditAvatar}></div>
        </div>
        <div className="title__titles">
          <div className="title__name-wrapper">
            <h1 className="title__name">{userName}</h1>
            <button type="button" className="title__name-edit" onClick={onEditProfile}></button>
          </div>
          <p className="title__description">{userDescription}</p>
        </div>
        <button className="title__button" type="button" onClick={onAddPlace}></button>
      </section>

      <section className="places">
        <ul className="places__grid">{section()}</ul>
      </section>
    </main>
  );
}
