import { Router } from "express";
import { DataSource } from "typeorm";

export default () => {
    const router = Router();
    const userRepo = DataSource.getRepository(User);
    router.post('/signup', (request, response) => {
        const {firstName, lastName, password, email} = request.body; //Take items from the body and put them into the const
        const newUser = userRepo.create({
            firstName,
            lastName,
            email,
            password: pwd
        });
        userRepo.save(newUser).then(() => {
            response.send();
        });
    });
    return router;
}