import { IObject } from '../types';
import { verify } from 'jsonwebtoken';
import { config } from '../config';
import { error } from '../utils/functions';

export default (req: IObject, res: IObject, next: any) => {
    try {
        var cookies = req.headers.cookie;

        if (cookies) {
            req.cookies = cookies.split(";").reduce((obj: Array<string>, c: string) => {
                var n: any = c.split("=")[0]
                console.log(n);

                obj[n] = n[1].trim();
                return obj
            }, {})
        }
        console.log(req.cookies);
        throw 'dev test';
        // if (!req.cookies) throw 'Missing cookies'
        // if (!req.cookies.userToken) throw 'Missing token cookie.'
        // if (!req.cookies.userID) throw 'Missing token cookie.'
        // const decoded: any = verify(req.cookies.userToken, config.secret);
        // if (req.cookies.userID != decoded.userId) throw 'Bad user';
        next()
    } catch (err) {
        console.log(err)
        return res.status(401).json(error('Requete non authentifiée'));
    }
}

