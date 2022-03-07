import React, { useState, useEffect } from "react";
import "../index.css";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Main } from "./Main";
import { PopupWithForm } from "./PopupWithForm";
import { ImagePopup } from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { api } from "../utils/Api";

function App() {
  // States
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  // Effects
  useEffect(() => {
    api
      .getMe()
      .then((res) => setCurrentUser(res))
      .catch((error) => console.log(error));
  }, []);

  // Handlers
  const handleEditAvatarClick = () => setIsEditAvatarPopupOpen(true);
  const handleEditProfileClick = () => setIsEditProfilePopupOpen(true);
  const handleAddPlaceClick = () => setIsAddPlacePopupOpen(true);
  const handleCardClick = (card) => setSelectedCard(card);

  const closeAllPopups = (e) => {
    if (
      e.type === "keydown" ||
      e.target.classList.contains("popup_opened") ||
      e.target.classList.contains("popup__close-button")
    ) {
      setIsAddPlacePopupOpen(false);
      setIsEditAvatarPopupOpen(false);
      setIsEditProfilePopupOpen(false);
      setSelectedCard(null);
    }
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header />
      <Main
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onCardClick={handleCardClick}
      />
      <Footer />
      <PopupWithForm
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        title="Редактировать профиль"
        name="edit_profile"
        children={
          <>
            <div className="popup__field-wrapper">
              <input
                type="text"
                className="popup__input"
                id="input-name"
                name="newName"
                placeholder="Имя"
                required
                minLength="2"
                maxLength="40"
              />
              <p className="popup__error input-name-error"></p>
            </div>
            <div className="popup__field-wrapper">
              <input
                type="text"
                className="popup__input"
                id="input-about"
                name="newAbout"
                placeholder="Профессия"
                required
                minLength="2"
                maxLength="200"
              />
              <p className="popup__error input-about-error"></p>
            </div>
          </>
        }
      />

      <PopupWithForm
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        title="Добавить место"
        name="add_place"
        children={
          <>
            <div className="popup__field-wrapper">
              <input
                type="text"
                className="popup__input"
                id="place-name"
                name="placeName"
                placeholder="Название"
                required
                minLength="2"
                maxLength="30"
              />
              <p className="popup__error place-name-error"></p>
            </div>
            <div className="popup__field-wrapper">
              <input
                className="popup__input"
                id="place-link"
                name="placeLink"
                placeholder="Ссылка на картинку"
                type="url"
                required
              />
              <p className="popup__error place-link-error"></p>
            </div>
          </>
        }
      />

      <PopupWithForm
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        title="Обновить аватар"
        name="new_avatar_form"
        children={
          <>
            <div className="popup__field-wrapper">
              <input
                className="popup__input"
                id="avatar-link"
                name="avatarLink"
                placeholder="Ссылка на картинку"
                type="url"
                required
              />
              <p className="popup__error avatar-link-error"></p>
            </div>
          </>
        }
      />
      <ImagePopup onClose={closeAllPopups} card={selectedCard} />
    </CurrentUserContext.Provider>
  );
}

export default App;
