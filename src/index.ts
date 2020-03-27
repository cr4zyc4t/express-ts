import createError from 'http-errors';
import express, { NextFunction, Response, Request } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logMiddleware from 'morgan';
import http from 'http';
import normalizePort from './helpers/normalizePort';
import logger from './helpers/logger';

import homeRouter from './routes';
import userRouter from './routes/users';
import { createErrorHandler } from './helpers/server';

const app = express();

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logMiddleware('dev'));

app.use(express.json());
app.use(express.urlencoded({
	extended: false
}));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, '../public')));

app.use('/', homeRouter);
app.use('/users', userRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err: ErrorException, req: Request<any>, res: Response<any>, next: NextFunction) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);
server.on('error', createErrorHandler(port));
server.on('listening', () => {
	const addr = server.address();
	const bind = typeof addr === 'string'
		? 'pipe ' + addr
		: 'http://localhost:' + addr?.port ?? 80;
	logger.info('Listening on ' + bind);
});

server.listen(port);