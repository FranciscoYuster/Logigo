# Frontend - Control de Stock

Este proyecto es el frontend de una aplicación de control de stock, desarrollado con React y Vite.

## Características
- Interfaz moderna y responsiva
- Gestión de productos, clientes, proveedores, ventas, compras y reportes
- Integración con backend Flask
- Autenticación y control de sesiones

## Requisitos previos
- Node.js >= 18
- npm o yarn

## Instalación
1. Clona el repositorio:
   ```bash
   git clone <URL_DEL_REPO>
   cd frontend
   ```
2. Instala las dependencias:
   ```bash
   npm install
   # o
   yarn install
   ```

## Desarrollo local
Inicia el servidor de desarrollo:
```bash
npm run dev
# o
yarn dev
```
La aplicación estará disponible en [http://localhost:5173](http://localhost:5173).

## Variables de entorno
Crea un archivo `.env` en la raíz del proyecto y define la URL del backend:
```
VITE_API_URL=http://localhost:5000
```

## Construcción para producción
Genera la carpeta `dist` lista para desplegar:
```bash
npm run build
# o
yarn build
```

## Despliegue en Vercel
1. Sube el repositorio a GitHub, GitLab o Bitbucket.
2. Conecta el repo a [Vercel](https://vercel.com/).
3. Vercel detectará automáticamente Vite y desplegará la app.

## Estructura de carpetas
- `src/` - Código fuente principal
- `public/` - Archivos estáticos
- `components/` - Componentes reutilizables
- `views/` - Vistas principales de la app

## Créditos
Desarrollado por [Tu Nombre].

---
Este frontend se conecta con el backend Flask desplegado en AWS EC2 y utiliza una base de datos en Amazon RDS (Free Tier).
