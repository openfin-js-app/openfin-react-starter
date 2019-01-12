# Openfin react starter
[![version][version-badge]][CHANGELOG] [![license][license-badge]][LICENSE]

Openfin react starer in ts

* Based on create-react-app structure
* Integrate Jest and Enzyme test framework
* Integrate Material-UI@3.5.1
* Support basic frameless window features: move, minimize, maximize, close and resize
* Support general sidebar
* Support general primary/success/error/info/warning snackbar
* Support spawn a child window
* Version tag injected via dotenv
* Support general app config
* Support cross window redux-action communication
* Support IndexDB based client side config

```text
.
├── CHANGELOG.md
├── config
│   ├── env.js
│   ├── jest
│   │   ├── babelTransform.js
│   │   ├── cssTransform.js
│   │   ├── fileTransform.js
│   │   └── setupTests.js
│   ├── paths.js
│   ├── polyfills.js
│   ├── webpack.config.dev.js
│   ├── webpack.config.prod.js
│   └── webpackDevServer.config.js
├── custom.d.ts
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
│   ├── App.spec.tsx
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
│   │   ├── client
│   │   │   └── ClientCounter.tsx
│   │   ├── ConfigComp
│   │   │   ├── ConfigField.spec.tsx
│   │   │   ├── ConfigField.tsx
│   │   │   └── __snapshots__
│   │   │       └── ConfigField.spec.tsx.snap
│   │   ├── Header
│   │   │   ├── HeaderLinks.spec.tsx
│   │   │   ├── HeaderLinks.tsx
│   │   │   ├── Header.spec.tsx
│   │   │   ├── Header.tsx
│   │   │   └── __snapshots__
│   │   │       ├── HeaderLinks.spec.tsx.snap
│   │   │       └── Header.spec.tsx.snap
│   │   ├── index.ts
│   │   ├── Sidebar
│   │   │   ├── Sidebar.spec.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── __snapshots__
│   │   │       └── Sidebar.spec.tsx.snap
│   │   └── Snackbar
│   │       ├── MySnackbarContent.spec.tsx
│   │       ├── MySnackbarContent.tsx
│   │       └── __snapshots__
│   │           └── MySnackbarContent.spec.tsx.snap
│   ├── dexie
│   │   ├── configDao.spec.ts
│   │   ├── configDao.ts
│   │   ├── db.spec.ts
│   │   ├── db.ts
│   │   ├── __mocks__
│   │   │   └── db.ts
│   │   └── __snapshots__
│   │       └── configDao.spec.ts.snap
│   ├── index.tsx
│   ├── layouts
│   │   ├── ChildWindow
│   │   │   ├── ChildWindow.spec.tsx
│   │   │   ├── ChildWindow.tsx
│   │   │   └── __snapshots__
│   │   │       └── ChildWindow.spec.tsx.snap
│   │   ├── Dashboard
│   │   │   ├── Dashboard.spec.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   └── __snapshots__
│   │   │       └── Dashboard.spec.tsx.snap
│   │   ├── LaunchBar
│   │   │   ├── LaunchBarData.tsx
│   │   │   ├── LaunchBar.spec.tsx
│   │   │   ├── LaunchBar.tsx
│   │   │   └── __snapshots__
│   │   │       └── LaunchBar.spec.tsx.snap
│   │   └── Loading
│   │       ├── Loading.spec.tsx
│   │       └── Loading.tsx
│   ├── redux
│   │   ├── application
│   │   │   ├── actions.ts
│   │   │   ├── reducer.ts
│   │   │   └── types.ts
│   │   ├── client
│   │   │   ├── actions.ts
│   │   │   ├── reducer.ts
│   │   │   └── types.ts
│   │   ├── config
│   │   │   ├── actions.ts
│   │   │   ├── constant.tsx
│   │   │   ├── reducer.ts
│   │   │   └── types.ts
│   │   ├── index.ts
│   │   ├── sagas
│   │   │   ├── application.ts
│   │   │   ├── client.ts
│   │   │   ├── config.ts
│   │   │   └── index.ts
│   │   └── __tests__
│   │       ├── application.actions.ts
│   │       ├── application.reducer.ts
│   │       ├── application.saga.ts
│   │       ├── client.saga.ts
│   │       ├── config.actions.ts
│   │       ├── config.reducer.ts
│   │       ├── config.saga.ts
│   │       ├── index.saga.ts
│   │       └── __snapshots__
│   │           ├── application.actions.ts.snap
│   │           ├── application.reducer.ts.snap
│   │           ├── config.actions.ts.snap
│   │           └── config.reducer.ts.snap
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
│   │   ├── setPlatformClass.ts
│   │   └── __tests__
│   │       ├── configureStore.spec.ts
│   │       ├── noop.spec.ts
│   │       └── setPlatformClass.spec.ts
│   └── views
│       ├── Accessibility
│       │   ├── Accessibility.spec.tsx
│       │   └── Accessibility.tsx
│       ├── ConfigView
│       │   ├── ConfigJson.spec.tsx
│       │   ├── ConfigJson.tsx
│       │   ├── ConfigView.spec.tsx
│       │   └── ConfigView.tsx
│       ├── ReportView
│       │   ├── ReportView.spec.tsx
│       │   └── ReportView.tsx
│       ├── ViewOne
│       │   ├── __snapshots__
│       │   │   └── ViewOne.spec.tsx.snap
│       │   ├── ViewOne.spec.tsx
│       │   └── ViewOne.tsx
│       └── ViewTwo
│           ├── __snapshots__
│           │   └── ViewTwo.spec.tsx.snap
│           ├── ViewTwo.spec.tsx
│           └── ViewTwo.tsx
├── tsconfig.json
└── tslint.json

56 directories, 153 files

```

[LICENSE]: ./LICENSE.md
[CHANGELOG]: ./CHANGELOG.md

[version-badge]: https://img.shields.io/badge/version-0.35.10-blue.svg
[license-badge]: https://img.shields.io/badge/license-MIT-blue.svg