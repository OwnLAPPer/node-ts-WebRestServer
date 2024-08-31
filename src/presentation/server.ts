import express, { Router } from 'express';
import path from 'path';

interface Options{
    port: number;
    public_path?:string;
    routes: Router;
}

export class Server{
    //*ATRIBUTOS DE LA CLASE
    private app= express(); //*servidor de express
    private readonly port: number;
    private readonly publicPath:string;
    private readonly routes: Router;

    
    constructor(options:Options){
        const  {port,public_path='public', routes}=options;
        this.routes= routes
        this.port=port;
        this.publicPath=public_path;
    }







    //* metodo para correr el servidor
    async start(){
        
        //* Middlewares
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended:true}));

        //* public folder
        this.app.use(express.static(this.publicPath))

        //*routes
        this.app.use(this.routes);

       


        //* SPA-singel page application
        this.app.get('*',(req,res)=>{
            const indexPath= path.join(__dirname+`../../../${this.publicPath}/index.html`);
            res.sendFile(indexPath);
        });



        this.app.listen(this.port,()=>{
            console.log('server running on port 3000');
        });

    }
}