import { MemberClass } from '../assets/classes/member';
import { IObject } from '../types';
import { checkAndChange } from '../utils/functions';
import { sign } from 'jsonwebtoken';
import { config } from '../config';
const Members = new MemberClass();

export function auth(req: IObject, res: IObject): void {
    Members.auth(req.body.username, req.body.password)
        .then(result => {
            const token = sign({
                exp: Math.floor(Math.floor(Date.now() / 1000) + (6 * 60 * 60)),
                expiresIn: 20000,
                userId: result.id,
                userPermissions: result.permissions
            }, config.secret)
            res.cookie('user_token', `${token}`, { maxAge: 3600000, httpOnly: true, domain: "smaug-6739.com", secure: process.env.NODE_ENV == 'production' ? true : false, sameSite: process.env.NODE_ENV == 'production' ? 'None' : 'Lax' })
            res.cookie('user_id', `${result.id}`, { maxAge: 3600000, httpOnly: true, domain: "smaug-6739.com", secure: process.env.NODE_ENV == 'production' ? true : false, sameSite: process.env.NODE_ENV == 'production' ? 'None' : 'Lax' })
            res.cookie('user_auth', `true`, { maxAge: 3600000, httpOnly: false, domain: "smaug-6739.com", secure: process.env.NODE_ENV == 'production' ? true : false, sameSite: process.env.NODE_ENV == 'production' ? 'None' : 'Lax' })
            res.status(200).json(checkAndChange({
                auth: {
                    auth: true,
                    //token: token,
                    //client_id: result.id
                },
                //user: result
            }))
        })
        .catch(error => res.json(checkAndChange(error)))

}
export function disconnection(req: IObject, res: IObject): void {
    res.clearCookie('user_auth')
    res.clearCookie('user_id')
    res.clearCookie('user_token')
    res.status(200).json(checkAndChange('success'))
}