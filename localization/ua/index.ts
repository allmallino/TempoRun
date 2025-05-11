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
        title: "Прив'язаний обліковий запис",
        link: "Прив'язати: ",
      },
      theme: {
        dark: "Темна",
        light: "Світла",
      },
      account: {
        title: "Налаштування облікового запису",
        deleteAccount: "Видалити обліковий запис",
        deleteAccountModal: {
          title: "Видалити обліковий запис",
          description: "Ви впевнені, що хочете видалити свій обліковий запис?",
          cancel: "Відмінити",
          delete: "Видалити",
        },
        changeEmail: "Змінити електронну пошту",
        changePassword: "Змінити пароль",
        disconnectSpotify: "Відключити Spotify",
        newEmail: "Нова електронна пошта",
        enterNewEmail: "Введіть нову електронну пошту",
        newPassword: "Новий пароль",
        enterNewPassword: "Введіть новий пароль",
        success: "Успішно",
        error: "Помилка",
        emailUpdated: "Електронна пошта оновлена",
        passwordUpdated: "Пароль оновлено",
        spotifyDisconnected: "Spotify відключено",
        spotifyDisconnectError: "Помилка при відключенні Spotify",
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
        selectLength: "Обрати відстань",
        minutes: "Хвилини",
        seconds: "Секунди",
        kilometers: "Кілометри",
        meters: "Метри",
        cancel: "Відмінити",
        ok: "Прийняти",
      },
      table: {
        addOption: "Додати опцію",
        header: {
          time: "Час",
          tempo: "Темп",
          point: "Точка",
          length: "Відстань",
          pace: "Темп",
        },
        tempo: {
          low: "Малий",
          medium: "Середній",
          high: "Великий",
        },
      },
    },

    running: {
      distance: "Відстань",
      timer: "Таймер",
      pace: "Темп",
    },

    results: {
      wellDone: "Відмінно!",
      distance: "Відстань",
      time: "Час",
      pace: "Темп",
      checkpoints: "Пройдено опцій",
      goBack: "Повернутися",
    },
  },
};
