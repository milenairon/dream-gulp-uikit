import BurgerMenu from "./BurgerMenu.js";

const ismobile = document.documentElement.clientWidth <= 640;

async function CallbackFormInit() {
  let forms = document.querySelectorAll("form");

  if (forms.length > 0) {
    forms.forEach((form) => {
      let phoneInputs = form.querySelectorAll('input[name="tel"]');

      if (phoneInputs.length > 0) {
        phoneInputs.forEach((phoneInput) => {
          const phoneMask = new IMask(phoneInput, {
            mask: "+{7} (000) 000-00-00",
          });

          phoneInput.addEventListener("input", (event) => {
            event.preventDefault();

            if (!phoneMask.masked.isComplete) {
              phoneInput.classList.add("uk-form-danger");
              //   if (!phoneMask.masked.isComplete)
            } else {
              phoneInput.classList.remove("uk-form-danger");
            }
          });

          // БЛОКИРОВКА КНОПКИ САБМИТ
          const button = form.querySelector("button");

          //заблокировать кнопку
          function addButonInactive() {
            button.classList.add("contacts__button_disabled");
            button.setAttribute("disabled", "true");
          }

          //разблокировать кнопку
          function removeButonInactive() {
            button.classList.remove("contacts__button_disabled");
            button.removeAttribute("disabled"); //уберем disabled
          }

          const inputList = Array.from(form.querySelectorAll("input"));
          ///////////////////////////////////////////////////
          // добавлять/убирать checked у чекбокса
          function toggleCheckbox() {
            let checks = document.querySelectorAll('input[type="checkbox"]');

            checks.forEach((checkbox) => {
              checkbox.toggleAttribute("checked");
            });
          }
          const checkbox = form.querySelector('input[type="checkbox"]');
          checkbox.addEventListener("click", () => {
            toggleCheckbox();
          });

          //проверяет все ли поля формы валидны. Возвращает true или false
          function hasInvalidInput() {
            const checkbox = form.querySelector('input[type="checkbox"]');

            return inputList.some((inputElement) => {
              // заполнен ли инпут с телефоном
              if (
                phoneInput.classList.contains("uk-form-danger") ||
                checkbox.hasAttribute("checked") == false
              ) {
                // кнопка не активна если
                // номер не введен или чекбокс не нажат
                return true;
              } else {
                return !inputElement.validity.valid;
              }
            });
          }

          // разблокирует/заблокирует кнопку
          function toggleButtonState() {
            if (hasInvalidInput()) {
              addButonInactive();
            } else {
              removeButonInactive();
            }
          }

          //найдем все input в одной форме
          function setEventListeners() {
            toggleButtonState(); //проверка: надо ли разблокировать кнопку
            inputList.forEach((inputElement) => {
              inputElement.addEventListener("input", () => {
                toggleButtonState(); //проверка: надо ли разблокировать кнопку
              });
            });
          }
          setEventListeners();

          form.addEventListener("submit", (event) => {
            event.preventDefault();
            // отправить форму

            //   if (!phoneMask.masked.isComplete) {
            //     return;
            //   }

            //   let formData = {};
            //   let inputs = form.querySelectorAll(
            //     'input:not([type="submit"]), textarea'
            //   );
            //   if (inputs.length > 0) {
            //     inputs.forEach((input) => {
            //       formData[input.getAttribute("name")] = input.value;
            //     });
            //   }

            //   let successPopupNode = document.querySelector(
            //     "#callback-popup-success"
            //   );
            //   // Удалить в проде
            //   UIkit.modal(successPopupNode).show();
            //    //

            //     jQuery.ajax({
            //     	url: '/wp-admin/admin-ajax.php',
            //     	method: 'post',
            //     	data: {
            //     		action: 'sendForm',
            //     		data: JSON.stringify(formData)
            //     	},
            //     	success: function(data){
            //     		UIkit.modal(successPopupNode).show();
            //     	}
            //     });
          });
        });
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", (event) => {
  // ASYNC
  // InitCenteredSliders();      // Преключение класса центрального слайда при свайпах
  CallbackFormInit(); // Инцициализация всех форм (Маска тел. + ajax на submit)
  // EnableSubmitOnCheckbox();   // Активация submit только после согласия с политикой
  // InitLoadMorePosts();        // Инит кнопки "Загрузить еще" для постов, см. WP ExBlog.php, functions.php
  // END ASYNC

  // InitCityPopup();
  // InitCookieAgree();

  // InsertPostContents();    // Содержание статьи по заголовкам
  // LoadMapOnScroll();       // Прогрузка карты при скролле

  if (ismobile) {
    const burgerNode = document.querySelector(".burger");
    new BurgerMenu(burgerNode);
  }

  // Наложение партикла
  // particlesJS.load('particles-slider', 'static/ParticlesJSON/GreenHexagons.json');
});
