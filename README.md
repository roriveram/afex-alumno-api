# AFEX Alumno API

Esta es una API para el CRUD y búsqueda de alumnos, desarrollada con NestJS y desplegada en AWS usando Serverless Framework.

## Requisitos previos

- Node.js (v14.x o superior)
- AWS CLI configurado con las credenciales adecuadas
- Serverless Framework instalado globalmente (`npm install -g serverless`)

## Configuración del proyecto

1. Clonar el repositorio:
   ```
   git clone <URL_DEL_REPOSITORIO>
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
   aws ssm put-parameter --name "/afex-alumno-api/dev/api-key" --value "tu_api_key_secreta" --type SecureString
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

- Asegúrate de no exponer las credenciales de AWS en el código o en el repositorio.
- La API utiliza una API Key para la autenticación. Incluir el header `x-api-key` en todas las solicitudes.