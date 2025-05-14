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
    permissions: {
      location: {
        title: "Доступ до геолокації",
        foregroundMessage:
          "Дозвольте TempoRun використовувати вашу локацію для відстеження бігу.",
        backgroundMessage:
          "Дозвольте TempoRun використовувати вашу локацію для відстеження бігу навіть коли додаток неактивний.",
        error: "Помилка запиту доступу до геолокації",
      },
    },
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
        confirmationModal: {
          title: "Підтвердження",
          description: "Ви впевнені, що хочете продовжити?",
          cancel: "Відмінити",
          confirm: "Підтвердити",
        },
        inputModal: {
          errors: {
            invalidEmail: "Неправильна електронна пошта",
            passwordTooShort: "Пароль має бути не менше 8 символів",
            passwordsDoNotMatch: "Паролі не співпадають",
            saveFailed: "Помилка при збереженні змін",
          },
          title: {
            email: "Введіть нову електронну пошту",
            password: "Введіть новий пароль",
          },
          description: {
            email: "Введіть нову електронну пошту",
            password: "Введіть новий пароль",
          },
          placeholder: {
            email: "Нова електронна пошта",
            password: "Новий пароль",
            repeatPassword: "Повторіть новий пароль",
          },
          save: "Зберегти",
          cancel: "Відмінити",
        },
        changeEmail: "Змінити електронну пошту",
        changePassword: "Змінити пароль",
        disconnectSpotify: "Відключити Spotify",
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
