# @splash test assessment monorepo

This monorepo serves different applications from @splash ecosystem for wrong-way-racer assessment.

- `client` - client application for lobby and wrong way racer game
- `server` - backend application for our client app

For proper application work, you need to start both of the apps simultaneously

The main purpose on using monorepo for this task was easily managing shared packages for types between node js and next js app and sharing main game logic in one package, so we can run the same code on server and on client (using server's event as source of truth, fetching the most critical and necessary data on server, and running the same code on client for filling the gaps between packets sending, aka game logic prediction, providing the smooth gaming experience)

Also, it's quite easy to setup whole environment and proceed with some Kubernetes or Docker Compose file for running everything anywhere using small subset of commands.

There is also known assumptions in current implementation of the game, most of them marked as TODO, and not optimal monorepo organization (not using rigs, utilizing heft properly, not properly configured lint (and multiple warnings as result), etc.), which should be fine for given time

## General monorepo info

### ⚙️ Installation

For this monorepo we are using [rushstack](https://rushstack.io) tech
Install rush:

```
npm install -g @microsoft/rush
```

Install pnpm

```
npm install -g pnpm
```

Then run this to update rush monorepo (and run this set of commands each time you'll update the dependencies of some project):

```
 $ rush update
 $ rush install
```

### ▶️ Run (Short Summary)

For now, it requires two terminals to run clent and server separately.

At first, create `.env` files for each project, using:

```angular2html
cp .env.example .env
```

Then, proceed with building and running apps:

```angular2html
rush update
rush build
cd apps/client
rushx dev
```

And in another terminal:

```angular2html
cd ../server
rushx dev
```

### 🛠 Build

To build this monorepo packages run following command:

```
rush build
```

Sometimes, if something goes wrong, you may try to run

```angular2html
rush clean
rush rebuild
```

### 🧪 Testing

At first, build rush dependencies.
Then run tests for all packages and apps:

```angular2html
rush test
```

## ❕ Basic projects info

All projects placed in `apps/` folder. More info about specific project could be found in their `README.md` file. Here are some general knowledge:

### ⚙️ Run develop

```angular2html
cd apps/project_name
rushx dev
```

### 📄 Environment

Each project has it's own environment. In `.env.example` you may find example keys that are used by the project. Just copy it to `.env` and fill with the corresponding values.

```angular2html
cp .env.example .env
```
