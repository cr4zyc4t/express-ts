import { Router } from 'express';

const homeRouter = Router();

/* GET home page. */
homeRouter.get('/', function (req, res, next) {
	res.render('index', { title: 'Express' });
});

export default homeRouter;
