import bodyParser = require('body-parser');
import * as express from 'express';
import * as Mongoose from 'mongoose';
import { getEnvironmentVariable } from './environments/env';
import UserRouter from './routers/usersRouters';

export class Server {
    public app: express.Application = express();
    constructor() {
        this.setConfigaration();
        this.setRoutes();
        this.error404Handler();
        this.handleErrors();
    }
    setConfigaration() {
        this.connectMongodb();
        this.configureBodyParser();
    }
    connectMongodb() {
        console.log(getEnvironmentVariable().db_url);
        Mongoose.connect(getEnvironmentVariable().db_url, {
            useUnifiedTopology: true, useNewUrlParser: true
        })
            .then(() => {
                console.log('MongoDB Connected');
            });
    }

    configureBodyParser() {
        this.app.use(bodyParser.urlencoded({extended: true}));
    }

    setRoutes() {
        this.app.use('/api/user', UserRouter);
    }
    error404Handler() {
        this.app.use((req, res) => {
            res.status(404).json({
                message: 'Not Found',
                status_code: 404
            })
        })
    }
    handleErrors() {
        this.app.use((error, req, res, next) => {
            const errorStatus = req.errorStatus || 500;
            res.status(errorStatus).json({
                message: error.message || 'Something went wrong, Please try again',
                status_code: errorStatus
            })
        })
    }
}