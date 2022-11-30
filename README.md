![HenryLogo](https://d31uz8lwfmyn8g.cloudfront.net/Assets/logo-henry-white-lg.png)

# Individual Project - Henry Dogs

<img height="200" src="./dog.png" />

En mi cursada en el Bootcamp de Soy Henry tuve que realizar un proyecto individual en un período de 3 semanas, el cual finalizado el período de tiempo tuve que presentarlo en vivo, defenderlo y realizar cambios en el código en el momento.

## Objetivos del Proyecto

- Construir una App utlizando React, Redux, Node y Sequelize.
- Afirmar y conectar los conceptos aprendidos en la carrera.
- Aprender mejores prácticas.
- Aprender y practicar el workflow de GIT.

#### Tecnologías utilizadas

- [ ] React
- [ ] CSS Modules
- [ ] Redux
- [ ] Express
- [ ] Sequelize - Postgres

Versiones:

- __react__: 17.0.1
- __react-dom__: 17.0.1
- __react-router-dom__: 5.2.0
- __redux__: 4.0.5
- __react-redux__: 7.2.3
- __pg__: 8.7.3
- __sequelize__: 6.3.5
- __express__: 4.17.1
- __axios__: 0.27.2
## .env

En `api` crear un archivo llamado: `.env` que tenga la siguiente forma:

```env
DB_USER=usuarioDePostgres
DB_PASSWORD=passwordDePostgres
API_KEY=tuApiKey
DB_HOST=localhost
DB_NAME='dogs'
PORT='3001'
```

Reemplazar `usuarioDePostgres` y `passwordDePostgres` y  con tus propias credenciales para conectarte a postgres. Para poder utilizar la API externa es necesario crearse una cuenta en [the dog api](https://thedogapi.com/) para obtener una API Key y reemplazar `tuApiKey` con tu clave.

Adicionalmente será necesario que creen desde psql una base de datos llamada `dogs`

## Enunciado

La idea general era crear una aplicación en la cual se puedan ver distintas razas de perro junto con información relevante de las mismas utilizando la api externa [the dog api](https://thedogapi.com/) y a partir de ella poder, entre otras cosas:

- Buscar perros
- Filtrarlos / Ordenarlos
- Agregar nuevos perros

__IMPORTANTE__: Para las funcionalidades de filtrado y ordenamiento NO se podían utilizar los endpoints de la API externa que ya devuelven los resultados filtrados u ordenados sino que debía realizar uno mismo.

## Frontend

Se debía desarrollar una aplicación de React/Redux que contenga las siguientes pantallas/rutas.

__Pagina inicial__: una landing page con

- [ ] Alguna imagen de fondo representativa al proyecto
- [ ] Botón para ingresar al home (`Ruta principal`)

__Ruta principal__: debía contener

- [ ] Input de búsqueda para encontrar razas de perros por nombre
- [ ] Área donde se verá el listado de razas de perros. Deberá mostrar su:
  - Imagen
  - Nombre
  - Temperamento
  - Peso
- [ ] Botones/Opciones para filtrar por:
  - Temperamento
  - Raza existente (es decir las que vienen de la API) o agregada por nosotros (creadas mediante el form)
- [ ] Botones/Opciones para ordenar tanto ascendentemente como descendentemente las razas de perro por:
  - Orden alfabético
  - Peso
- [ ] Paginado para ir buscando y mostrando las siguientes razas, mostrando 8 razas por página.

__IMPORTANTE__: Dentro de la Ruta Principal se debía mostrar tanto las razas de perros traidas desde la API como así también las de la base de datos, pero NO estaba permitido almacenar en la base de datos las razas de perros de la API sino que solamente se podían guardar aquellas creadas desde el form.

__Ruta de detalle de raza de perro__: debía contener

- [ ] Los campos mostrados en la ruta principal para cada raza (imagen, nombre y temperamento)
- [ ] Altura
- [ ] Peso
- [ ] Años de vida

__Ruta de creación de raza de perro__: debía contener

- [ ] Un formulario __controlado con JavaScript__ con los siguientes campos:
  - Nombre
  - Altura (Diferenciar entre altura mínima y máxima)
  - Peso (Diferenciar entre peso mínimo y máximo)
  - Años de vida
- [ ] Posibilidad de seleccionar/agregar uno o más temperamentos
- [ ] Botón/Opción para crear una nueva raza de perro
## Base de datos

El modelo de la base de datos debía tener las siguientes entidades:

- [ ] Raza con las siguientes propiedades:
  - ID 
  - Nombre 
  - Altura 
  - Peso 
  - Años de vida
- [ ] Temperamento con las siguientes propiedades:
  - ID
  - Nombre

## Backend

Se debe desarrollar un servidor en Node/Express con las siguientes rutas:

- [ ] __GET /dogs__:
  - Obtener un listado de las razas de perro
  - Debe devolver solo los datos necesarios para la ruta principal
- [ ] __GET /dogs?name="..."__:
  - Obtener un listado de las razas de perro que contengan la palabra ingresada como query parameter
  - Si no existe ninguna raza de perro mostrar un mensaje adecuado
- [ ] __GET /dogs/{idRaza}__:
  - Obtener el detalle de una raza de perro en particular
  - Debe traer solo los datos pedidos en la ruta de detalle de raza de perro
  - Incluir los temperamentos asociados
- [ ] __POST /dogs__:
  - Recibe los datos recolectados desde el formulario controlado de la ruta de creación de raza de perro por body
  - Crea una raza de perro en la base de datos relacionada con sus temperamentos
- [ ] __GET /temperaments__:
  - Obtener todos los temperamentos posibles
  - En una primera instancia deberán obtenerlos desde la API externa y guardarlos en su propia base de datos y luego ya utilizarlos desde allí

  ### Únicos Endpoints/Flags que pueden utilizar

- GET <https://api.thedogapi.com/v1/breeds>
- GET <https://api.thedogapi.com/v1/breeds/search?q={raza_perro}>

__IMPORTANTE__: No estaba permitido utilizar los filtrados, ordenamientos y paginados brindados por la API externa, todas estas funcionalidades fueron implementadas por mí mismo.