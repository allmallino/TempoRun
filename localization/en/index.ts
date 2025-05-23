export default {
  auth: {
    login: {
      email: "Email",
      password: "Password",
      logIn: "Log In",
      signUp: "Sign Up",
      logInWith: "Log in with",
    },

    register: {
      name: "Your name",
      signUp: "Sign Up",
    },
    error: {
      invalidCredential: "Invalid email or password",
      invalidEmail: "Invalid email address",
      invalidPassword: "Invalid password",
      userNotFound: "User not found",
      wrongPassword: "Wrong password",
      emailAlreadyInUse: "Email already in use",
      smallPassword: "Password must be at least 6 characters long",
      error: "An error occurred",
      inProgress:
        "Please wait. The Google authentication is still in progress.",
      playServicesNotAvailable:
        "Google authentification is not working. There are no Google Play services available on your system.",
      signInCancelled: "Google authentification was canceled.",
    },
  },

  app: {
    tabs: {
      stats: "Stats",
      mode: "Mode",
      menu: "Menu",
      playlists: "Playlists",
      settings: "Settings",
    },
    noInternetModal: {
      title: "No internet connection",
      description:
        "Please check your internet connection and try again. The app will exit.",
    },
    menu: {
      mode: "Mode",
      run: "Run",
      activePlaylist: "Active playlist",
      noActivePlaylist: "Not selected",
      mods: {
        timer: "Timer",
        map: "Map",
        length: "Length",
        pace: "Pace",
      },
      infoModal: {
        title: "Error",
        noActivePlaylist:
          "No active playlist was found. Please select a playlist to continue.",
        noSongs:
          "No songs were found in the active playlist. Please add some songs to the playlist.",
        noOptions:
          "No options were found for the selected mode. Please add some options to the table on the mode page.",
        noToken:
          "No integrated Spotify account was found. Please connect your Spotify account to the app.",
        noDevices:
          "Active Spotify client was not found. Please start Spotify on your device and try again.",
        noForegroundPermissions:
          "No foreground permissions. Please grant foreground permissions to the app.",
        noBackgroundPermissions:
          "No background permissions. Please grant background permissions to the app.",
        close: "Ok",
      },
    },

    settings: {
      title: "Settings",
      appSettings: {
        title: "App",
        theme: "Theme: ",
        language: "Language: English",
      },
      accountSettings: {
        title: "Account",
        changeInfo: "Change account info",
        logout: "Log out",
      },
      accountLinkage: {
        title: "Linked account",
        link: "Link: ",
        error: {
          title: "Error",
          description:
            "Failed to link account, please try again. Error message: ",
        },
      },

      theme: {
        dark: "Dark",
        light: "Light",
      },
      account: {
        title: "Account settings",
        deleteAccount: "Delete account",
        confirmationModal: {
          title: "Confirmation",
          description: "Are you sure you want to proceed?",
          cancel: "Cancel",
          confirm: "Confirm",
        },
        inputModal: {
          errors: {
            invalidEmail: "Invalid email address",
            passwordTooShort: "Password must be at least 8 characters long",
            passwordsDoNotMatch: "Passwords do not match",
            saveFailed: "Failed to save changes",
          },
          title: {
            email: "Enter new email",
            password: "Enter new password",
          },
          description: {
            email: "Enter new email",
            password: "Enter new password",
          },
          placeholder: {
            email: "New email",
            password: "New password",
            repeatPassword: "Repeat new password",
          },
          cancel: "Cancel",
          save: "Save",
        },
        changeEmail: "Change email",
        changePassword: "Change password",
        disconnectSpotify: "Disconnect Spotify",
      },
    },

    playlists: {
      title: "Playlists",
      import: "Import playlist",
      delete: "Delete",
      noPlaylistsToActivate: "No playlists to activate",
      noPlaylistsToImport: "No playlists to import",
      noTracks: "No music tracks to manage",
      noAccounts: "No accounts to import from",
    },

    mode: {
      title: "Music mode",
      mods: {
        timer: "Timer",
        map: "Map",
        length: "Length",
        pace: "Pace",
      },
      addingModal: {
        selectTime: "Select Time",
        selectLength: "Select Length",
        minutes: "Minutes",
        seconds: "Seconds",
        kilometers: "Kilometers",
        meters: "Meters",
        cancel: "Cancel",
        ok: "OK",
      },
      table: {
        addOption: "Add Option",
        header: {
          time: "Time",
          tempo: "Tempo",
          point: "Point",
          length: "Length",
          pace: "Pace",
        },
        tempo: {
          low: "Low",
          medium: "Medium",
          high: "High",
        },
      },
      paceSlider: {
        title: "Slider for the running pace",
      },
    },

    running: {
      distance: "Distance",
      timer: "Timer",
      pace: "Pace",
    },

    results: {
      wellDone: "Well done!",
      distance: "Distance",
      time: "Time",
      pace: "Pace",
      goBack: "Go back",
      checkpoints: "Completed options",
    },
  },
};
