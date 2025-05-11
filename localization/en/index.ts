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
      },

      theme: {
        dark: "Dark",
        light: "Light",
      },
      account: {
        title: "Account settings",
        deleteAccount: "Delete account",
        deleteAccountModal: {
          title: "Delete account",
          description: "Are you sure you want to delete your account?",
          cancel: "Cancel",
          delete: "Delete",
        },
        changeEmail: "Change email",
        changePassword: "Change password",
        disconnectSpotify: "Disconnect Spotify",
        newEmail: "New email",
        enterNewEmail: "Enter new email",
        newPassword: "New password",
        enterNewPassword: "Enter new password",
        success: "Success",
        error: "Error",
        emailUpdated: "Email updated",
        passwordUpdated: "Password updated",
        spotifyDisconnected: "Spotify disconnected",
        spotifyDisconnectError: "Error disconnecting Spotify",
      },
    },

    playlists: {
      title: "Playlists",
      import: "Import playlist",
      delete: "Delete",
      noPlaylists: "No playlists to import",
      noTracks: "No music tracks to manage",
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
