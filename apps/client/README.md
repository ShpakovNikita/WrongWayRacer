# 💻 Client | @splash/client

- `client` - client application for lobby and wrong way racer game

This is a client application for test task assessment, it requires backend app running in order for game to work.

This app using:

- `Next.js`- React-based web applications with server-side rendering and generating static websites
- `React` - Library for client side DOM rendering
- `MUI` + `Tailwind CSS` - Styling solution
- `MobX` - State management react library
- `Pixi JS` - 2D Web GL canvas rendering library

### ▶️ Run (Short Summary)

At first, create `.env` file for this project, using:

```angular2html
cp .env.example .env
```

Then, proceed with building and running app:

```angular2html
rushx dev
```

### 🛠 Build

To build this repo package, run following command:

```
rush build --to @splash/client
```

Sometimes, if something goes wrong, you may try to run

```angular2html
rushx clean
rushx rebuild
```

### ⚙️ Run develop

```angular2html
rushx dev
```
