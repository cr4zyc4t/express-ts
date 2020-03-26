import { Router } from 'express';

const userRouter = Router();

/* GET home page. */
userRouter.get('/', function (req, res, next) {
	res.send('respond with a resource');
});

export default userRouter;
