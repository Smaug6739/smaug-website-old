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

            res.status(200).json(checkAndChange({
                auth: {
                    auth: true,
                    token: token,
                    client_id: result.id
                },
                user: result
            }))
        })
        .catch(error => res.json(checkAndChange(error)))
}