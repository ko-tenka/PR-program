const router = require('express').Router();
const userRouter = require('./userRouter');
const taskRouter = require('./taskRouter');

module.exports = router.use('/users', userRouter);
module.exports = router.use('/task', taskRouter);
