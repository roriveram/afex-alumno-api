# AFEX Alumno API

Esta es una API para el CRUD y búsqueda de alumnos, desarrollada con NestJS y desplegada en AWS usando Serverless Framework.

## Requisitos previos

- Node.js (v14.x o superior)
- AWS CLI configurado con las credenciales adecuadas
- Serverless Framework instalado globalmente (`npm install -g serverless`)

## Configuración del proyecto

1. Clonar el repositorio:
   ```
   git clone https://github.com/roriveram/afex-alumno-api
   cd afex-alumno-api
   ```

2. Instalar las dependencias:
   ```
   npm install
   ```

3. Configurar las variables de entorno:
   Crear un archivo `.env` en la raíz del proyecto con el siguiente contenido:
   ```
   API_KEY=api_key_secreta
   ```

4. Configurar el parámetro SSM en AWS:
   ```
   aws ssm put-parameter --name "/afex-alumno-api/dev/api-key" --value "api_key_secreta" --type SecureString
   ```

## Desarrollo local

Para ejecutar la API localmente:

```
npm run start:dev
```

La API estará disponible en `http://localhost:3000`.

## Pruebas

Para ejecutar las pruebas unitarias:

```
npm run test
```

Para ejecutar las pruebas e2e:

```
npm run test:e2e
```

## Despliegue

Para desplegar la API en AWS:

```
npm run deploy
```

## Documentación de la API

La documentación de la API (Swagger) estará disponible en `/api` una vez que la aplicación esté en ejecución.

## Notas importantes

- No exponer las credenciales de AWS en el código o en el repositorio.
- La API utiliza una API Key para la autenticación. Incluir el header `x-api-key` en todas las solicitudes.

## Ejemplo Consultas Postman

## Crear un alumno

- Método: POST
- Endpoint: https://5lssl6iag2.execute-api.us-east-2.amazonaws.com/dev/alumnos
- Header:
   - Key: x-api-key
   - Value: AKIAXXXXXXXXXXXXXXXX
- Body:
   - raw (Tipo: JSON)
   - Json (ejemplo):

      {
         "nombre": "Jonathan",
         "apellido": "Miranda",
         "edad": 17,
         "curso": "4to B"
      }

- Respuesta esperada (ejemplo): 

      {
         "id": "f0afdd28-6c3f-4633-ba07-b60ef3ad05d8",
         "nombre": "Jonathan",
         "apellido": "Miranda",
         "edad": 17,
         "curso": "4to B"
      }

## Obtener todos los alumnos creados

- Método: GET
- Endpoint: https://5lssl6iag2.execute-api.us-east-2.amazonaws.com/dev/alumnos
- Header:
   - Key: x-api-key
   - Value: AKIAXXXXXXXXXXXXXXXX
- Body: None

- Respuesta esperada (ejemplo):

[
    {
        "nombre": "Juan",
        "apellido": "Pérez",
        "id": "309da1f1-7519-4813-add3-78ed430d64bc",
        "curso": "3ro A",
        "edad": 20
    },
    {
        "nombre": "Jonathan",
        "apellido": "Miranda",
        "id": "f0afdd28-6c3f-4633-ba07-b60ef3ad05d8",
        "curso": "4to B",
        "edad": 17
    },
    {
        "nombre": "Roberto",
        "apellido": "Rivera",
        "id": "1aeb4a88-4372-4552-a7d3-e62efc725194",
        "curso": "4to A",
        "edad": 18
    }
]

## Obtener un alumno

- Método: GET
- Endpoint URL: URL: https://5lssl6iag2.execute-api.us-east-2.amazonaws.com/dev/alumnos/{id}
- Endpoint Ejemplo: https://5lssl6iag2.execute-api.us-east-2.amazonaws.com/dev/alumnos/1aeb4a88-4372-4552-a7d3-e62efc725194

- Header:
   - Key: x-api-key
   - Value: AKIAXXXXXXXXXXXXXXXX
- Body: None

- Respuesta esperada (ejemplo):

{
    "nombre": "Roberto",
    "apellido": "Rivera",
    "id": "1aeb4a88-4372-4552-a7d3-e62efc725194",
    "curso": "4to A",
    "edad": 18
}

## Actualizar un alumno

- Método: PUT
- Endpoint URL: https://5lssl6iag2.execute-api.us-east-2.amazonaws.com/dev/alumnos/{id}
- Endpoint Ejemplo: https://5lssl6iag2.execute-api.us-east-2.amazonaws.com/dev/alumnos/309da1f1-7519-4813-add3-78ed430d64bc

- Header:
   - Key: x-api-key
   - Value: AKIAXXXXXXXXXXXXXXXX
- Body:
   - raw (Tipo: JSON)
   - Json (ejemplo):

      {
         "nombre": "Juan Carlos",
         "apellido": "Mardones",
         "edad": 18,
         "curso": "4to A"
      }

- Respuesta esperada (ejemplo): 

      {
         "nombre": "Juan Carlos",
         "apellido": "Mardones",
         "id": "309da1f1-7519-4813-add3-78ed430d64bc",
         "curso": "4to A",
         "edad": 18
      }

## Actualizar un alumno

- Método: DELETE
- Endpoint URL: https://5lssl6iag2.execute-api.us-east-2.amazonaws.com/dev/alumnos/{id}
- Endpoint Ejemplo: https://5lssl6iag2.execute-api.us-east-2.amazonaws.com/dev/alumnos/309da1f1-7519-4813-add3-78ed430d64bc

- Header:
   - Key: x-api-key
   - Value: AKIAXXXXXXXXXXXXXXXX
- Body: None

- Respuesta esperada (ejemplo): Status 200 (OK)
   - Consulte todos los alumnos para corroborar que el alumno ya no está