import * as express from 'express';
import * as Mongoose  from 'mongoose';
import { getEnvironmentVariable } from './environments/env';
import UserRouter from './routers/usersRouters';

export class Server {
    public app: express.Application = express();
    constructor() {
        this.setConfigaration();
        this.setRoutes();
    }
    setConfigaration() {
        this.connectMongodb();
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
    setRoutes() {
        this.app.use('/api/user', UserRouter);
    }
}