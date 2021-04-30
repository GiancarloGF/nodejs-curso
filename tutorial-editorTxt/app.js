const readline=require('readline');//El módulo readline proporciona una interfaz para leer datos de una secuencia legible (como process.stdin) una línea a la vez.
const Messages=require('./messages');
const Document=require('./document');
const Directory=require('./directory');
const { createInflate } = require('zlib');


// ---------------------------------------------------------------------------------------------------------------
// VARIABLES
// ---------------------------------------------------------------------------------------------------------------

//Guardamos en una constante una instancia del objeto Directory, en el cual creamos nuestro directorio base>>directory.js.
const dir=new Directory();

// Guardamos en una variable, el metodo que me crea una interfaz de 'pregunta y respuesta'.
let interface=readline.createInterface(process.stdin, process.stdout);

// Guardamos en una constante un string con la guia de comandos para tratar nuestros archivos.
const tools=`Comandos:  :q=salir, :sa=guardar como, :s=guardar
---------------------------------------------------------------`;

// Guardamos en una constante un string con la guia de comandos para crear o abrir un documento.
const pantalla=`
                   ===============
                   Editor de texto.\n
                   ===============
                   Elige una opcion:\n
                   1 Crear nuevo documento
                   2 Abrir documento
                   3 Cerrar editor\n>`;


// ---------------------------------------------------------------------------------------------------------------
// FUNCION: MAINSCREEN
// ---------------------------------------------------------------------------------------------------------------
// Llamamos a la funcion.
mainScreen();

// Definimos la funcion mainScreen.>>Limpiara la pantalla y nos dara una interfaz con el string de la constante 'pantalla' (la pregunta) y segun nuestra respuesta llamaremos a otras funciones.
function mainScreen(){
      process.stdout.write('\033c');

      interface.question(pantalla, res=>{
            switch(res.trim()){
                  case '1': 
                        createFile();
                  break;

                  case '2': 
                        openFileInterface();
                  break;

                  case '3': 
                        interface.close();
                  break;

                  default:
                        mainScreen();
            }
      });
}
// DEFINIMOS LAS SUBFUNCIONES DENTRO DE MAINSCREEN
// Definimos la funcion para crear un archivo-----------------------------------------------------------------
function createFile() {
      let file= new Document(dir.getPath());//Nos devuelve una instancia del objeto Document y como parametro le pasamos el nombre del directorio en el cual nos encontramos.

      renderInterface(file);//Imprime la interfas con las opciones de guardar y salir.
      readCommands(file);//Crea un evento en cada linea para manejar lo que escribimos segun las opciones.
}

// Definimos la funcion para renderizar en pantalla.
function renderInterface(files, mensaje) {
      process.stdout.write('\033c');
      (files.getName()=='')?console.log(`|Untitled|`):console.log(`|${files.getName()}`)//Se renderiza si esta con titulo o no
      console.log(tools);//Se renderizan las opciones de guardar y salir.
      
      if (mensaje!=null) console.log(mensaje);//Si hay un mensaje, lo renderizamos. Ejm:'El archivo no existe'
      
      console.log(files.getContent());//Renderizamos el contenido escrito en el archivo.
}

// Definimos funcion para leer y procesar lo que escribimos en cada linea, creando un evento en cada linea.
function readCommands(files) {
      interface.on('line', input=>{
            switch(input.trim()){
                  case ':sa':
                        saveas(files);
                        break;
                        
                        case ':q':
                              interface.removeAllListeners('line');//Removemos todos los eventos.
                              mainScreen();//Volvemos al la pantalla principal.
                              break;
                              
                              case ':s':
                                    save(files);
                              break;
                                    
                              default:
                                    files.append(input.trim());//Cada vez que hacemos un entrer, lo que hayamos escrito se adjunta en el contenido de nuestro archivo.
                  }
            })
      }
      
      // Definimos una funcion para guardar por primera vez nuestro archivo o para renombrarlo.
      function saveas(files) {
            // Realizamos una pregunta, y tomamos la respuesta 'name' para validar si existe otro archivo con ese nombre o no.
            interface.question(Messages.requestFileName, name=>{
                  if (files.exists(name)) {
                        // El archivo ya existe
                        console.log(Messages.fileExists);
                        // Realizamos otra pregunta, si queremos renombrar el archivo o no.
                        interface.question(Messages.replaceFile, confirm=>{
                              if (confirm='y') {
                                    files.saveas(name);
                                    renderInterface(files,Messages.fileSaved +'\n');
                              }else{
                                    renderInterface(files, Messages.fileNotSaved +'\n');
                              }
                        })
                  }else{
                        // El archivo no existe por lo que se tiene que crear.
                        files.saveas(name);
                        renderInterface(files, Messages.fileSaved+'\n');
                  }
            })
      }
      
      function save(files) {
            if (files.hasName()) {
                  files.save();
                  renderInterface(files, Messages.fileSaved+'\n');
            } else {
                  saveas(files);
            }
      }

// -------------------------------------------------------------------------------------------------------

// Definimos la funcion para abrir los archivos que estan en el directorio----------------------------------------
function openFileInterface() {
      let file= new Document(dir.getPath());//Nos devuelve una instancia del objeto Document y como parametro le pasamos el nombre del directorio en el cual nos encontramos.
      dir.getFilesInDir();

      interface.question(Messages.requestFileName, name=>{
            if (file.exists(name)) {
                  openFile(file, name);
            } else {
                  console.log(Messages.fileNotFound);
                  setTimeout(()=>{
                        interface.removeAllListeners('line');
                        mainScreen();
                  }, 2000)
            }
      })
}

function openFile(files, name) {
      files.open(name);
      renderInterface(files);
      readCommands(files);
}