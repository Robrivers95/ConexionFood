# Productos China — MVP

Primera versión funcional del centro operativo para un equipo que importa productos y los vende principalmente mediante Facebook Marketplace.

**Demo visual:** toda la información inicial es de ejemplo y cualquier cambio se pierde al recargar. La IA y las compras todavía no están conectadas; no captures datos reales ni claves.

## Incluido en este MVP
- Dashboard de operación.
- Catálogo e inventario con costo real/landed cost.
- Comparativas por producto, con referencias manuales y punto de integración para búsqueda IA bajo demanda.
- Fuentes distintas por producto (Amazon, Mercado Libre, Soriana, Walmart, etc.).
- Ideas de inversión y votación del equipo.
- Compras/importación (vista inicial).
- Preparación de publicación de Facebook Marketplace con revisión manual antes de abrir Marketplace.
- Registro de ventas con precio real, vendedor, canal, flete, comisión de plataforma y otros costos.
- Cálculo de utilidad real, comisión del vendedor y utilidad del negocio.
- Balance por persona: ventas, utilidad generada y monto que le corresponde.
- Configuración modular de proveedor de IA (UI inicial; backend seguro pendiente).
- PWA básica y diseño responsive para PC, Android y iPhone.

## Ejecutar
No requiere dependencias en esta versión; el build copia los archivos a `dist/`.

```bash
python3 -m http.server 8080
```

Abrir http://localhost:8080

## Importante sobre API keys
La interfaz ya contempla proveedor/modelo/API key, pero la key **no debe almacenarse en el frontend**. La integración real se hará mediante backend (Cloud Functions / Cloud Run) y Secret Manager.

## Siguiente iteración técnica
1. Migrar persistencia demo a Firebase Authentication + Firestore + Storage.
2. Roles y permisos por usuario.
3. Implementar `AIProvider` y búsqueda web bajo demanda para similares.
4. Cargar fotos reales y preparar contenido de Marketplace.
5. Ledger de inventario, aportaciones, gastos, pagos y balances.
6. Auditoría de cambios y notificaciones.

## Build y deploy automático con GitHub Pages
El repositorio incluye `.github/workflows/deploy-pages.yml`. El README original de ConexionFood se conserva sin cambios.

Cada push a `main` ejecuta:

1. Checkout del repositorio.
2. `npm run build` para generar `dist/`.
3. Empaquetado del artefacto de GitHub Pages.
4. Deploy automático a GitHub Pages.

La URL actual esperada es `https://robrivers95.github.io/ConexionFood/`.
Al renombrar el repositorio a `ProductosChina`, la URL del proyecto cambiará a `https://robrivers95.github.io/ProductosChina/`.

En GitHub, configurar una sola vez **Settings → Pages → Build and deployment → Source: GitHub Actions**.
