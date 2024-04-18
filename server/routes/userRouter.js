const userRouter = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../db/models');
const isUser = require('../middlewares/isUser');

userRouter.post('/registration', async (req, res) => {
  const { login, password, email } = req.body;
  console.log(req.body);
  try {
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ login, email, password: hash });
    console.log(user);

    const clearedUser = {
      id: user.id,
      login: user.login,
      email: user.email,
    };

    req.session.user = clearedUser;

    res.json(clearedUser);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

userRouter.post('/login', async (req, res) => {
  console.log(req.body, 'req.body');
  const { login, password } = req.body;
  try {
    const user = await User.findOne({ where: { login } });
    if (!user) {
      res.sendStatus(400);
    } else {
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        res.status(400).json({ message: 'Неверный пароль' });
      } if (passwordCompare) {
        const clearedUser = {
          id: user.id,
          login: user.login,
          email: user.email,
        };
        req.session.user = clearedUser;
        res.json(clearedUser);
      } else {
        res.sendStatus(400);
      }
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

userRouter.get('/logout', isUser, async (req, res) => {
  try {
    req.session.destroy(() => {
      res.clearCookie('reactCookies');
      res.sendStatus(200);
    });
  } catch (error) {
    console.log('Ошибка: ', error);
  }
});

module.exports = userRouter;
