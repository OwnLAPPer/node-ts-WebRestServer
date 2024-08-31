
import { Request,Response } from "express";

const todos = [
    {id:1, text:'buy milk'   , createAt: new Date()},
    {id:2, text:'buy bread'   , createAt: null},
    {id:3, text:'buy butter'   , createAt: new Date()},
]


export class todosControllers{
    
    //*DI
    constructor(){

    }


    public getTodos = (req:Request,res:Response) =>{
        return res.json(todos);
    }

    public getTodoById= (req:Request,res:Response)=>{
        const id= +req.params.id;
        if (isNaN(id)) return res.status(400).json({error: ` ID argument is not a number`})
        const todo= todos.find(todo=> todo.id===id);
        
        //* si el todo existe que mande el todo, si no un bad req y error
        (todo)
          ? res.json(todo)
          : res.status(404).json({error:`TODO with id ${id} not found `})
    }

    public createTodo = (req:Request,res:Response)=>{
        // const body=req.body;
        const {text}= req.body;

        if(!text) return res.status(400).json({error: ` text is required`}); 

        const newTodo= {
            id: todos.length +1,
            text:text,
            createAt: null
        }

        todos.push(newTodo);

        res.json(newTodo);


    }

    public updateTodo= (req:Request,res:Response)=>{

        const id= +req.params.id;
        if (isNaN(id)) return res.status(400).json({error: ` ID argument is not a number`});

        const todo= todos.find(todo=> todo.id===id);
        if (!todo) return res.status(404).json({error: ` TODO not found`})
    
        const {text,createAt}=req.body;
        //if(!text) return res.status(400).json({error: ` text is required`});

        todo.text=text || todo.text;
        (createAt === 'null')
            ? todo.createAt = null
            : todo.createAt= new Date(createAt || todo.createAt);
        
        


        res.json(todo);
    }


    public deleteTodo= (req:Request,res:Response)=>{
        const id = +req.params.id;
        if (isNaN(id)) return res.status(400).json({error: ` ID argument is not a number`});

        const todo= todos.find(todo=> todo.id===id);
        if (!todo) return res.status(404).json({error: ` TODO not found`})

        const deleteTodos= todos.splice(todos.indexOf(todo),1);
    

        res.json(deleteTodos);


    }
















    
}