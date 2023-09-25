# Instrucciones para la puesta en marcha del programa:

1. Debe tener instalado typescript de manera global en su computador, en caso de no tenerlo instalado ejecute 
   en una terminal el siguiente comando:
    - npm i typescript -g

2. Para asegurarnos que todas las dependencias que utiliza el proyecto estén trabajando sin ningún tipo de problema 
   nos ubicamos en la ruta de la carpeta backendMS Y Server y en cada carpeta ejecutamos la siguiente
   sentencia:
   - npm install     

3. Asegurarse que el archivo package.json, tenga definido el inicio de la siguiente forma:
    - "ts-node-dev index.ts && tsc"

4. Tener Docker desktop corriendo sin ningún problema.

5. Ubicados en la rutas de cada carpeta mencionada procedemos a ejecutar el siguiente comando:
   - docker build . -t name ("name" es el nombre que deseamos poner, puede ser cualquiera)

   La finalidad de ejecutar este comando es para construir la imagen del proyecto, la cual nos va a permitir correr 
   el proyecto mediante docker. En el comando.

6. Después de crear la imagen deberemos regresar a la ruta de la carpeta principal "Backend" desde la 
   terminal.

8. Ya en la ruta antes mencionada vamos a ejecutar el archivo "docker-compose.yml", para ello ejecutamos el siguiente
   comando:
   - docker-compose up --build
   
   Este comando nos permitirá crear un Docker (contenedor) para nuestro proyecto, en donde se trasladará nuestro 
   microservicio y la base de datos de nuestro proyecto. Con esto podemos correr el proyecto desde un Docker.


