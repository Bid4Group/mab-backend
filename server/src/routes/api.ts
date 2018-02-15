/************
 * API Routes
 ************/
/**
 * This rounter handler manages all routes incoming from the web browser to the API.
 */
import { IWhereFilter } from '../databases/engine/filter/WhereFilter';

import * as jwt from 'express-jwt';
import * as winston from "winston";

import config from '../config/config';{}
import { Router, Request, Response, NextFunction } from 'express';

import { logger } from '../services/LoggerService';
import UsersService from '../services/UsersService';

export class ApiRouter {
    router: Router;

    // Config Parameters
    quotesRoute: string;
    usersRoute: string;

    constructor() {
        this.router = Router();
        
        // Config Parameters
        this.usersRoute = config.api.routes[0];

        this.initRoutes();
    }
    
    /**
     *  Test route
     *  sends HTTP status 200 to show server is working OK.
     *  @return an HTTP status 200
     */
    public getTest(req: Request, res: Response, next: NextFunction) {
        res.header('Access-Control-Allow-Origin', '*');
        res.status(200).json({ "started": "Api is up and running..." });
    }

    ///////////////////////////////// QUOTES /////////////////////////////////
    
    /** Get all quotes */
    public postUser(req: Request, res: Response, next: NextFunction) {
        res.header('Access-Control-Allow-Origin', '*');
        // or like this -> let quotes: Quote = <Quote>req.body;
        UsersService.saveUser().then(quotes => {
            logger.debug(JSON.stringify(quotes, null, 2));
            res.status(200).json(quotes);
        });
    }

    ///////////////////////////////// Configuration /////////////////////////////////

    initRoutes() {
        // Authentication middleware provided by express-jwt.
        // This middleware will check incoming requests for a valid
        // JWT on any routes that it is applied to.
        let authCheck = jwt({
            secret: new Buffer(config.oauth.secret, 'base64'),
            audience: config.oauth.client
        });

        this.router.get("/", this.getTest);

        this.router.post(`/${this.usersRoute}`, this.postUser);
    }

}

///////////////////////////////// AUTHORS /////////////////////////////////

///////////////////////////////// TOPICS /////////////////////////////////

const apiRouter = new ApiRouter();
apiRouter.initRoutes();

export default apiRouter.router;