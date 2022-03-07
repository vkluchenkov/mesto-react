import React, { useState, useEffect } from "react";
import "../index.css";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Main } from "./Main";
import { PopupWithForm } from "./PopupWithForm";
import { ImagePopup } from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { api } from "../utils/Api";
import { EditProfilePopup } from "./EditProfilePopup";
import { EditAvatarPopup } from "./EditAvatarPopup";

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

  const handleUserUpdate = (user) =>
    api
      .patchMe(user)
      .then((res) => setCurrentUser(res))
      .then(() => setIsEditProfilePopupOpen(false))
      .catch((err) => console.log(err));

  const handleAvatarUpdate = ({ avatar }) =>
    api
      .patchAvatar(avatar)
      .then((user) => setCurrentUser(user))
      .then(() => setIsEditAvatarPopupOpen(false))
      .catch((err) => console.log(err));

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
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUserUpdate={handleUserUpdate}
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

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onAvatarUpdate={handleAvatarUpdate}
      />

      <ImagePopup onClose={closeAllPopups} card={selectedCard} />
    </CurrentUserContext.Provider>
  );
}

export default App;
