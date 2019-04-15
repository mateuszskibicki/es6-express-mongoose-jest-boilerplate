# ES6 - Babel - Node.js - Express - REST API - MongoDB - Mongoose - Jest - Boilerplate

This is ready to use boilerplate, easy to maintain and change. Features inside:

- ES6/ES7 ---> import/export async/await syntax powered by babel compiler
- Node.js with Express ready setup
- MongoDB with Mongoose ---> Promise based ready to use setup (just add your url URI conntection inside .env file)
- ESLint/Prettier Airbnb syntax
- Ready jwt/passport/bcrypt/User model ---> auth example
- isAuth middleware to crearte protected routes
- APIresponses small helper
- Jest/supertest testing setup (just add testing collection URI to .env file)
- Enabled detailed API logging in dev env via express-winston
- body-parser / cookie-parser / helmet / method-override / compression /

### Installation

```sh
$ git clone https://github.com/mateuszskibicki/es6-express-mongoose-jest-boilerplate.git my-project
$ cd my-project
$ npm i
$ npm run dev
```

### Build and production

```sh
$ npm run build
$ npm run start
```

### Jest testing

```sh
$ npm run test
// or
$ npm run test-watch
```

### index.route.js

```js
import express from 'express';
import userRoutes from './user/user.route';
import authRoutes from './auth/auth.route';
import isAuth from './middleware/is-auth';
import { APIsuccess } from './helpers/API-responses';

const router = express.Router(); // eslint-disable-line new-cap

// Testing routes /api/test && /api/test-auth
router.get('/test', (req, res) =>
  res.status(200).json(APIsuccess(200, { message: 'Hey it works!' }))
);
router.get('/test-auth', isAuth(), (req, res) => res.status(200).json(APIsuccess(200, req.user)));

// Auth routes /api/auth
router.use('/auth', authRoutes);

// Users routes /api/users
router.use('/users', userRoutes);

export default router;
```

## License

MIT

**HAVE FUN!**
