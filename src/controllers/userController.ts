export class UserController {
    static login(req, res, next) {
        res.send(req.body);
    }
}