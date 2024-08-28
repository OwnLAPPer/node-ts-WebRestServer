import http from 'node:http';
import fs from 'node:fs';

const server = http.createServer((req,res)=>{

    console.log(req.url);

    // res.writeHead(200,{'Content-Type': 'text/html'});
    // res.write('<h1>Hola mundo</h1>');
    // res.end();
    // const data = {name:'jhon Doe',age:10,city:'new york'};
    // res.writeHead(200,{'Content-Type': 'application/json'});
    // res.end(JSON.stringify(data));

    //servir contenido estatico con css y scripts
    //servimos el index
    if (req.url==='/') {
        const htmlFile=fs.readFileSync('./public/index.html','utf-8');
        res.writeHead(200,{'Content-Type':'text/html'});
        res.end(htmlFile);
        return;
    }
    //cuando llame a los scripts va a mandar la req
    if (req.url?.endsWith('.js')) {
        res.writeHead(200,{'Content-Type':'application/javascript'});
    }else if (req.url?.endsWith('.css')) {
        res.writeHead(200,{'Content-Type':'text/css'})
    }
    //cuando llame al css mandara el req del css
    const responseContent= fs.readFileSync(`./public${req.url}`,'utf-8');
    res.end(responseContent);
    

});


server.listen(8080,()=>{
    console.log('server running on port 8080');
});