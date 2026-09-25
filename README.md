# Productos China

App colaborativa para ideas, comparativas, compras, inventario, ventas y balances. El código está temporalmente en `Robrivers95/ConexionFood`; el sitio Firebase Hosting `productoschinagarcia` no depende del nombre del repositorio.

## Disponible

- Correo y contraseña de Firebase Authentication, acceso con Google, verificación del correo y restablecimiento de contraseña.
- Equipo privado con invitaciones por correo y roles administrador, compras, ventas, almacén y socio.
- Fichas de producto, referencias manuales por tienda, votos, compras con recepción, inventario y movimientos.
- Venta real por canal y vendedor, costos, comisión elegida por venta y descuento atómico del stock.
- Resumen, ventas y balances por mes; CSV y PDF de ventas, productos, compras, ideas, balances y movimientos; hoja de compartir del dispositivo.
- Borrador revisable para Facebook Marketplace. La publicación y carga de fotos se hacen manualmente en Facebook.

**No incluidas todavía:** investigación automática con IA, fotos subidas a Storage, envío directo de email y comisiones globales por canal o producto. No pegues claves de IA en el navegador.

## Ejecutar localmente

`npm ci && npm run dev`. Copia `.env.example` a `.env.local` y completa la configuración pública de la app web desde Firebase Console. La API key web de Firebase no da acceso administrativo: los permisos dependen de las reglas de Firestore. Una vez en Hosting, la app lee `/__/firebase/init.json` automáticamente.

## Publicar

1. Confirma que el ID del proyecto y del sitio Firebase Hosting son `productoschinagarcia`.
2. Activa **Correo/contraseña** en Authentication y autoriza el dominio `productoschinagarcia.web.app`.
3. Firestore usa `firestore.rules`. Realtime Database permanece cerrada con `database.rules.json`, pues esta app utiliza Firestore.
4. Crea una cuenta de servicio dedicada al despliegue en Google Cloud con los roles **Firebase Hosting Admin** (`roles/firebasehosting.admin`) y **API Keys Viewer** (`roles/serviceusage.apiKeysViewer`). Genera una clave JSON para esa cuenta y guárdala en el secreto Actions `FIREBASE_SERVICE_ACCOUNT_PRODUCTOSCHINAGARCIA` de este repositorio. Nunca uses la clave de **Firebase Admin SDK** para el workflow ni subas el JSON al repositorio.
5. Las reglas de Firestore y Realtime Database deben publicarse por separado tras revisar la política de acceso. Cada push a `main` compila y despliega solo Hosting. También puedes iniciar el workflow **Build and deploy Firebase** manualmente. URL: https://productoschinagarcia.web.app/.

La integración oficial desde una PC con acceso administrativo se inicia con `npx firebase-tools login` y `npx firebase-tools init hosting:github`; selecciona este repositorio y proyecto. Ese asistente puede generar un secreto de nombre distinto: ajústalo en el workflow si es necesario.

Las invitaciones se guardan con el correo exacto del destinatario y se comparte el enlace del equipo; la app no envía el correo automáticamente. Las ventas son inmutables para conservar su cálculo original y evitar un segundo descuento de inventario.
