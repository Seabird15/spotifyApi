# Proyecto Tipo Spotify

Esta aplicación permite a los usuarios ver las canciones que más escuchan y obtener recomendaciones, utilizando la API de Spotify.

## Requisitos previos

Para usar esta aplicación, necesitas obtener un `Client ID` y un `Secret ID` desde el portal de desarrolladores de Spotify. Aquí están los pasos para obtenerlos.

### 1. Crear una Cuenta de Desarrollador en Spotify

Si aún no tienes una cuenta de desarrollador en Spotify, ve a [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/login) e inicia sesión con tu cuenta de Spotify o regístrate para crear una nueva.

### 2. Crear una Aplicación en Spotify

1. Una vez que hayas iniciado sesión en el [Dashboard de Spotify](https://developer.spotify.com/dashboard/applications), haz clic en el botón **"Create an App"**.
2. Llena los campos de **App name** y **App description** con información sobre tu proyecto.
3. Acepta los términos de uso y haz clic en **Create**.
4. Dentro de la aplicación creada, encontrarás el **Client ID** y el **Client Secret** que usarás en esta app.

### 3. Configura el URI de Redirección

En la configuración de tu aplicación en el Dashboard de Spotify, desplázate hacia abajo hasta la sección **Redirect URIs** y añade `http://localhost:3000/callback` (o el URI que tu aplicación utilice para autenticación). Esto es importante para que Spotify pueda redirigir al usuario de vuelta a tu aplicación después de autenticarse.

### 4. Guardar tus Credenciales

Guarda el `Client ID` y `Client Secret`
