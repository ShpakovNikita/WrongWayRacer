# 🛠 Server | @splash/server

- `server` - backend application for our client app

This is a backend application for test assessment, it creates Socket io server that establishes connection between client and server, creates GameArena and runs main game logic.

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
rush build --to @splash/server
```

Sometimes, if something goes wrong, you may try to run

```angular2html
rushx clean
rushx rebuild
```

### 🧪 Testing

At first, build rush dependencies.
Then run tests for all packages and apps:

```angular2html
rushx test
```

### ⚙️ Run develop

```angular2html
rushx dev
```
