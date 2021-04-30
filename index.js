// const math=require('./math.js')


// console.log(math);

// console.log(math.add(1,2));
// console.log(math.sub(1,2));
// console.log(math.mult(1,2));
// console.log(math.div(1,2));
// console.log(math.div(1,0));
// ------------Manejar info del sistema operativo--------------------
// const os=require('os');
// console.log(os.platform())
// console.log(os.release())
// console.log('memoria libre:', os.freemem(), 'bytes')
// console.log('memoria total:', os.totalmem(), 'bytes')


// ------------Manejar archivos --------------------
// const fs=require('fs');

// fs.writeFile('./texto.txt', 'contenido linea uno', function(err){
//       if (err) {
//             console.log(err); 
//       } else {
//             console.log('archivo creado');
//       }
// });

// console.log('ultima linea de codigo')

// fs.readFile('./texto.txt', function(err, data){
//       if (err) {
//             console.log(err)
//       } else {   
//             console.log(data.toString())
//       }
// })

// -----------Crear servidores----------------

const http=require('http');//crear servidores

const colors=require('colors');//Agregar color a nuestro mensaje en consola. Modulo de otro a travez de npm.

// http.createServer(function(req,res){
//       res.writeHead(200, {'content-type': 'text/html'})
//       res.write('<h1>Hola mundo desde nodejs, otra vez</h1>');
//       res.end();
// }).listen(3000);

const handleServer=function(req,res){
            res.writeHead(200, {'content-type': 'text/html'})
            res.write('<h1>Hola mundo desde nodejs, otra vez</h1>');
            res.end();
      };

const server=http.createServer(handleServer);

server.listen(3000, function (){
      console.log('server on port 3000'.green);
});


