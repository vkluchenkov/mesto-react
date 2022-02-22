import logo from "./images/mesto_logo.svg";
import "./index.css";

function App() {
  return (
    <>
      <header className="header">
        <img src={logo} alt="Место Россия" className="header__logo" />
      </header>
      <main className="content">
        <section className="title">
          <div className="title__image-container">
            <img
              src="<%=require('./images/Ava.jpg')%>"
              alt="Изображение профиля"
              className="title__image"
            />
            <div className="title__image-overlay"></div>
          </div>
          <div className="title__titles">
            <div className="title__name-wrapper">
              <h1 className="title__name">Жак-Ив Кусто</h1>
              <button type="button" className="title__name-edit"></button>
            </div>
            <p className="title__description">Исследователь океана</p>
          </div>
          <button className="title__button" type="button"></button>
        </section>

        <section className="places">
          <ul className="places__grid"></ul>
        </section>
      </main>

      <footer className="footer">
        <p className="footer__copyright">&copy; 2020. Mesto Russia</p>
      </footer>

      <div className="popup popup_form" id="edit_profile">
        <div className="popup__container">
          <h2 className="popup__title">Редактировать профиль</h2>
          <form id="profile_form" className="popup__form" novalidate>
            <div className="popup__field-wrapper">
              <input
                type="text"
                className="popup__input"
                id="input-name"
                name="newName"
                placeholder="Имя"
                required
                minlength="2"
                maxlength="40"
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
                minlength="2"
                maxlength="200"
              />
              <p className="popup__error input-about-error"></p>
            </div>
            <button className="popup__submit-button" type="submit">
              Сохранить
            </button>
          </form>
          <button className="popup__close-button" type="button" id="submit-profile"></button>
        </div>
      </div>

      <div className="popup popup_form" id="add_place">
        <div className="popup__container">
          <h2 className="popup__title">Добавить место</h2>
          <form id="add_place_form" className="popup__form" novalidate>
            <div className="popup__field-wrapper">
              <input
                type="text"
                className="popup__input"
                id="place-name"
                name="placeName"
                placeholder="Название"
                required
                minlength="2"
                maxlength="30"
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
            <button className="popup__submit-button" type="submit">
              Сохранить
            </button>
          </form>
          <button className="popup__close-button" type="button"></button>
        </div>
      </div>

      <div className="popup popup_form" id="new_avatar">
        <div className="popup__container">
          <h2 className="popup__title">Обновить аватар</h2>
          <form id="new_avatar_form" className="popup__form" novalidate>
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
            <button className="popup__submit-button" type="submit">
              Сохранить
            </button>
          </form>
          <button className="popup__close-button" type="button"></button>
        </div>
      </div>

      <div className="popup popup_form" id="modal">
        <div className="popup__container">
          <h2 className="popup__title popup__title_modal">Вы уверены?</h2>
          <button className="popup__submit-button popup__submit-button_modal" type="button">
            Да
          </button>
          <button className="popup__close-button" type="button"></button>
        </div>
      </div>

      <div className="popup popup_image" id="image_popup">
        <figure className="popup__image-container">
          <img className="popup__image" src="#" />
          <figcaption className="popup__image-caption"></figcaption>
          <button className="popup__close-button" type="button"></button>
        </figure>
      </div>

      <template id="card-template">
        <li className="place" id="">
          <img className="place__image" />
          <div className="place__info">
            <h2 className="place__name"></h2>
            <div className="place__like_container">
              <button className="place__like" type="button"></button>
              <p className="place__like_counter">1</p>
            </div>
            <button className="place__trash" type="button"></button>
          </div>
        </li>
      </template>
    </>
  );
}

export default App;
