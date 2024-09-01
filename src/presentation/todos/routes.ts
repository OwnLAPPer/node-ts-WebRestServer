import { Router } from "express";
import { todosControllers } from "./controller";





export class TodoRoutes{


    static get routes(): Router{
        const router= Router();
        const todoController= new todosControllers();




        router.get('/',todoController.getTodos);
        router.get('/:id',todoController.getTodoById);

        router.post('/',todoController.createTodo);
        router.put('/:id',todoController.updateTodo);
        router.delete('/:id',todoController.deleteTodo);



        return router;
    }

}