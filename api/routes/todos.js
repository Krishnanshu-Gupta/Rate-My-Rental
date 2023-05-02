import { Router } from 'express';
import { ToDo } from '../entities/todo';
import isAuthenticated from '../middleware/isAuthenticated';

export default (DataSource) => {
    const router = Router();
    const todoResource = DataSource.getRepository(ToDo);

    //make all requests for this to be authenticate
    router.use(isAuthenticated);

    router.get('/todos', (request, response) => {
        todoResource.find({where: {
            user: request.user
        }}).then(
            (todos) => {
                response.send({todos})
            }, 
            () => response.send({todos: []})
        );
    })

    router.post('/todos', (request, response) => {
        const { task } = request.body;
        const toDo = todoResource.create({
            task, user: request.user
        });
        todoResource.save(toDo).then((result) => {
            response.send(result);
        });
    });

    router.param('id', (req, res, next, id) => {
        const toDo = todoResource.findOne({
            where: {
                id,
                user: req.user
            }
        }).then((toDo) => {
            if (toDo) {
                req.toDo = toDo;
                next();
            } else {
                res.send(404);
            }
        });
    });

    router.put('/todos/:id', (req, res) => {
        const { task, done } = req.body;
        todoResource.save({ ...req.toDo, task, done }).then((result) => {
            res.send(result);
        });
    });

    router.delete('/todos/:id', (req, res) => {
        todoResource.delete(req.toDo.id).then((result) => {
            res.send(result);
        });
    });

    return router;
}