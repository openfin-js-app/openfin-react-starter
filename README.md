# Openfin react starter
[![version][version-badge]][CHANGELOG] [![license][license-badge]][LICENSE]

Openfin react starer in ts

* Based on create-react-app structure
* Integrate Jest and Enzyme test framework
* Integrate Material-UI@ 1.5.0
* Support basic frameless window features: move, minimize, maximize, close and resize
* Support general sidebar
* Support general primary/success/error/info/warning snackbar
* Support spawn a child window
* Version tag injected via dotenv
* Support general app config

```text
.
├── CHANGELOG.md
├── config
│   ├── env.js
│   ├── jest
│   │   ├── babelTransform.js
│   │   ├── cssTransform.js
│   │   ├── fileTransform.js
│   │   ├── graphqlTransform.js
│   │   └── setupTests.js
│   ├── paths.js
│   ├── polyfills.js
│   ├── webpack.config.dev.js
│   ├── webpack.config.prod.js
│   └── webpackDevServer.config.js
├── LICENSE.md
├── openfin
│   ├── app.development.json
│   └── app.production.json
├── package.json
├── public
│   ├── android-chrome-192x192.png
│   ├── android-chrome-512x512.png
│   ├── apple-touch-icon.png
│   ├── favicon-16x16.png
│   ├── favicon-32x32.png
│   ├── favicon.ico
│   ├── img
│   │   └── sidebar-1.jpg
│   ├── index.html
│   ├── manifest.json
│   ├── mstile-144x144.png
│   ├── mstile-150x150.png
│   ├── mstile-310x150.png
│   ├── mstile-310x310.png
│   ├── mstile-70x70.png
│   └── safari-pinned-tab.svg
├── README.md
├── scripts
│   ├── build.js
│   ├── server.js
│   ├── server.openfin.js
│   ├── start.js
│   ├── start.openfin.js
│   └── test.js
├── src
│   ├── App.tsx
│   ├── assets
│   │   ├── css
│   │   │   └── main.css
│   │   ├── jss
│   │   │   ├── openfin-starter
│   │   │   │   ├── comp
│   │   │   │   │   ├── buttonStyle.ts
│   │   │   │   │   ├── configFieldCompStyle.ts
│   │   │   │   │   ├── headerCompStyle.ts
│   │   │   │   │   ├── headerLinksCompStyle.ts
│   │   │   │   │   ├── sidebarCompStyle.ts
│   │   │   │   │   └── snackbarContentCompStyle.ts
│   │   │   │   ├── index.ts
│   │   │   │   ├── layout
│   │   │   │   │   ├── dashboardLayoutStyle.ts
│   │   │   │   │   └── launchBarLayoutStyle.ts
│   │   │   │   └── view
│   │   │   │       ├── configViewStyle.ts
│   │   │   │       └── reportViewStyle.ts
│   │   │   └── openfin-starter-constant.ts
│   │   └── svg
│   │       ├── app.svg
│   │       ├── company.svg
│   │       ├── other
│   │       │   ├── google-search.svg
│   │       │   ├── list-checked-dark.svg
│   │       │   ├── number-1.svg
│   │       │   └── number-2.svg
│   │       └── support
│   │           ├── controls_dark.svg
│   │           └── controls.svg
│   ├── components
│   │   ├── ConfigComp
│   │   │   └── ConfigField.tsx
│   │   ├── Header
│   │   │   ├── HeaderLinks.tsx
│   │   │   └── Header.tsx
│   │   ├── index.ts
│   │   ├── Sidebar
│   │   │   └── Sidebar.tsx
│   │   └── Snackbar
│   │       └── MySnackbarContent.tsx
│   ├── index.tsx
│   ├── layouts
│   │   ├── ChildWindow
│   │   │   └── ChildWindow.tsx
│   │   ├── Dashboard
│   │   │   └── Dashboard.tsx
│   │   ├── LaunchBar
│   │   │   ├── LaunchBarData.tsx
│   │   │   └── LaunchBar.tsx
│   │   └── Loading
│   │       └── Loading.tsx
│   ├── redux
│   │   ├── application
│   │   │   ├── actions.ts
│   │   │   ├── reducer.ts
│   │   │   └── types.ts
│   │   ├── config
│   │   │   ├── actions.ts
│   │   │   ├── constant.tsx
│   │   │   ├── reducer.ts
│   │   │   └── types.ts
│   │   ├── index.ts
│   │   └── sagas
│   │       ├── application.ts
│   │       ├── config.ts
│   │       └── index.ts
│   ├── routes
│   │   ├── Base.ts
│   │   ├── ChildWindow.ts
│   │   ├── Dashboard.ts
│   │   └── index.ts
│   ├── serviceWorker.d.ts
│   ├── serviceWorker.js
│   ├── utils
│   │   ├── configureStore.ts
│   │   ├── history.ts
│   │   ├── noop.ts
│   │   └── setPlatformClass.ts
│   └── views
│       ├── Accessibility
│       │   ├── Accessibility.spec.tsx
│       │   └── Accessibility.tsx
│       ├── ConfigView
│       │   ├── ConfigJson.tsx
│       │   └── ConfigView.tsx
│       ├── ReportView
│       │   └── ReportView.tsx
│       ├── ViewOne
│       │   └── ViewOne.tsx
│       └── ViewTwo
│           └── ViewTwo.tsx
├── tsconfig.json
└── tslint.json

39 directories, 103 files

```

[LICENSE]: ./LICENSE.md
[CHANGELOG]: ./CHANGELOG.md

[version-badge]: https://img.shields.io/badge/version-0.10.6-blue.svg
[license-badge]: https://img.shields.io/badge/license-MIT-blue.svg