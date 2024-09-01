
import { Request,Response } from "express";
import { prisma } from '../../data/postgres/index';
import { CreateTodoDto } from "../../domain/dtos";
import { UpdateTodoDto } from '../../domain/dtos/todos/update.todo.dto';





const todos = [
    {id:1, text:'buy milk'   , createAt: new Date()},
    {id:2, text:'buy bread'   , createAt: null},
    {id:3, text:'buy butter'   , createAt: new Date()},
]


export class todosControllers{
    
    //*DI
    constructor(){

    }


    public getTodos = async (req:Request,res:Response) =>{
       
            const todos= await prisma.todo.findMany()
          
            return res.json({todos});
    }

    public getTodoById= async (req:Request,res:Response)=>{
        const id= +req.params.id;
        if (isNaN(id)) return res.status(400).json({error: ` ID argument is not a number`})

        const todo= await prisma.todo.findUnique({
            where:{id :id}
        });

        //* si el todo existe que mande el todo, si no un bad req y error
        (todo)
          ? res.json(todo)
          : res.status(404).json({error:`TODO with id ${id} not found `})
    }

    public createTodo = async (req:Request,res:Response)=>{
        const [error,createTodoDto]= CreateTodoDto.create(req.body);
        if (error) return res.status(400).json({error});

        // const body=req.body;
        const {text}= req.body;

        if(!text) return res.status(400).json({error: ` text is required`}); 

        const todo = await prisma.todo.create({
            data:createTodoDto!
        })

        res.json(todo);


    }

    public updateTodo= async (req:Request,res:Response)=>{

        const id= +req.params.id;
        const [error,updateTodoDto]= UpdateTodoDto.create({...req.body,id})
        if(error) return res.status(400).json({error});

        const verificar = await prisma.todo.findFirst({
            where:{id:id}
        });

        if (!verificar) return res.status(404).json({error: ` TODO not found`})
            
        const todoUpdate= await prisma.todo.update({
            where:{id:id},
            data: updateTodoDto!.values
            

        });
        
    
        res.json(todoUpdate);
    }


    public deleteTodo= async (req:Request,res:Response)=>{
        const id = +req.params.id;
        if (isNaN(id)) return res.status(400).json({error: ` ID argument is not a number`});
        const verificar = await prisma.todo.findFirst({
            where:{id:id}
        });

        if (!verificar) return res.status(404).json({error: ` TODO not found`})

        const todo= await prisma.todo.delete({
            where:{id:id}
        })
        

        res.json(todo);


    }
















    
}