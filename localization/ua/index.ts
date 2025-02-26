export default {
  auth: {
    login: {
      email: "Електронна пошта",
      password: "Пароль",
      logIn: "Увійти",
      signUp: "Зареєструватися",
      logInWith: "Увійти з",
    },
    register: {
      name: "Твоє ім'я",
      signUp: "Зареєструватися",
    },

    error: {
      invalidCredential: "Неправильна електронна пошта або пароль",
      invalidEmail: "Неправильна електронна пошта",
      invalidPassword: "Неправильний пароль",
      userNotFound: "Користувач не знайдений",
      wrongPassword: "Неправильний пароль",
      emailAlreadyInUse: "Ця електронна пошта вже використовується",
      smallPassword: "Пароль має бути не менше 6 символів",
      error: "Сталася помилка",
      inProgress:
        "Будь ласка, зачекайте. Авторизація через Google все ще триває.",
      playServicesNotAvailable:
        "Авторизація через Google не працює. На вашій системі відсутні Google Play services.",
      signInCancelled: "Авторизація через Google була відмінена.",
    },
  },

  app: {
    tabs: {
      stats: "Статистика",
      mode: "Режим",
      menu: "Меню",
      playlists: "Плейлисти",
      settings: "Опції",
    },

    menu: {
      mode: "Режим",
      run: "Побігли",
      activePlaylist: "Активний плейлист",
      noActivePlaylist: "Не обрано",
      mods: {
        timer: "Таймер",
        map: "Карта",
        length: "Відстань",
        pace: "Темп",
      },
    },

    settings: {
      title: "Опції",
      appSettings: {
        title: "Додаток",
        theme: "Тема: ",
        language: "Мова: Українська",
      },
      accountSettings: {
        title: "Обліковий запис",
        changeInfo: "Змінити персональну інформацію",
        logout: "Вийти",
      },
      accountLinkage: {
        title: "Прив'язані облікові записи",
        link: "Прив'язати: ",
      },
      theme: {
        dark: "Темна",
        light: "Світла",
      },
    },

    playlists: {
      title: "Плейлисти",
      import: "Імпорт плейлистів",
      delete: "Видалити",
      noPlaylists: "Немає плейлистів для імпорту",
      noTracks: "Немає пісень для керування",
    },

    mode: {
      title: "Режим підбору пісень",
      mods: {
        timer: "Таймер",
        map: "Карта",
        length: "Відстань",
        pace: "Темп",
      },
      addingModal: {
        selectTime: "Обрати час",
        minutes: "Хвилини",
        seconds: "Секунди",
        cancel: "Відмінити",
        ok: "Прийняти",
      },
      table: {
        addOption: "Додати опцію",
        header: {
          time: "Час",
          tempo: "Темп",
        },
        tempo: {
          low: "Малий",
          medium: "Середній",
          high: "Великий",
        },
      },
    },

    stats: {
      title: "Статистика",
    },
  },
};
