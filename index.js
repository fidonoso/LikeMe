const http = require ( "http" );
const fs=require('fs');
const {insertar, consultar, likes}=require('./consultas.js');

http.createServer(async (req, res) => {
// ruta para cargar la pagina HTML en localhost:3000/
    if (req.url == "/" && req.method === "GET" ) {
        res.setHeader( "content-type" , "text/html" );
        res.end(fs.readFileSync( "index.html" , "utf8" ));
    }

//ruta para insertar en la base de datos
    if((req.url=='/post' && req.method === "POST")){
        let body=''
        req.on('data',(chunk) => {
            body+=chunk
        });
        req.on('end', async()=>{ 
            const datos = Object.values(JSON.parse(body));
            await insertar(datos);
            res.end();
        })
    }
// ruta para leer todos desde la base de datos y pintar en HTML
    if((req.url=='/posts' && req.method === "GET")){
        res.setHeader( "content-type" , "application/json" );
        const registros = await consultar();
        res.end(JSON.stringify(registros));    
    }

//ruta para agregar un like al id de la imagen
    if (req.url.startsWith("/post?id=") && req.method == "PUT" ) {
        res.setHeader( "content-type" , "application/json" );
        let datos=req.url.slice(9)
        await likes(datos);
        res.end()
    };


}).listen( 3000, ()=>{ console.log(`Servidor escuchando en el puerto 3000 con PID: ${process.pid}`)} );