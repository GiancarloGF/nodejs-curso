const fs=require('fs');//El módulo fs permite interactuar con el sistema de archivos de una manera modelada en funciones POSIX estándar.

const path=require('path');//El módulo path proporciona utilidades para trabajar con rutas de archivos y directorios.

class Directory{
      constructor(){
            this._dir= 'docs';
            this._path= __dirname; //Esto me dara el nombre de la ruta en la que nos encontramos.
            this.createDocsDir();
      }


      // Validamos la creacion de nuestro directorio en donde se van a guardar nuestros archivos.
      createDocsDir(){
            this._path=path.join(this._path, this._dir);
            if(!fs.existsSync(this._dir)){
                  fs.mkdirSync(this._dir);
            }
      }

      getPath(){
            return this._path;
      }

      // Creamos un nombre de ruta corto de la url en la que nos encontramos
      getShortPath(){
            const paths=path.parse(this._path);
            let delimiter='/';

            if(paths.dir.indexOf(delimiter)<0){
                  delimiter='\\';
            }

            return `${paths.root}...${delimiter}${paths.name}`;
      }

      // La interfaz en donde mostramos los archivos que hay dentro de nuestra carpeta.
      getFilesInDir(){
            const files=fs.readdirSync(this._path);
            let n=0;

            console.log(`
=======================
Ubicación: ${this.getShortPath()}
========================`);

            files.forEach(file=>{
                  if(file!='.DS_Store'){
                        console.log(`     ${file}`);
                        n++;
                  }
            })
      }
};

module.exports=Directory;

