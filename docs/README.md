# SearchMind App para VTEX IO

SearchMind es una solución avanzada de búsqueda desarrollada para integrarse fácilmente con tiendas VTEX IO. Proporciona sugerencias inteligentes en tiempo real, autocompletado, resultados contextuales y una experiencia optimizada para usuarios.

---

## 📦 Instalación

Para instalar el `SearchMind App` en tu tienda VTEX, añade la siguiente dependencia en el `manifest.json` de tu **store theme**:

```json
"dependencies": {
  "tramontinacl.searchmindai": "0.x"
}
```

Luego ejecuta:

```bash
vtex install tramontinacl.searchmindai
```

---

## 🔍 Cómo usar el Buscador Inteligente

Para utilizar el componente de buscador en tu tienda, simplemente agrégalo en un bloque del theme:

```json
"store.search-bar": {
  "blocks": ["searchmind-search-bar"]
}
```

También puedes declararlo directamente en una región como:

```json
"header.full": {
  "children": [
    "searchmind-search-bar"
  ]
}
```

Este componente incluye:

- Entrada de búsqueda con autocompletado
- Resultados inmediatos (hasta 10 productos)
- Acción al presionar enter o clic en el botón
- Indicador "Powered by SearchMindAI"

---

## 📄 Cómo usar la Página de Resultados de Búsqueda

Para personalizar la página de resultados con nuestro motor, configura tu ruta `/searchmind` en `routes.json` o usa directamente el componente:

```json
"store.search": {
  "blocks": ["searchmind-search-result"]
}
```

Este bloque renderiza una lista de resultados optimizada, que se puede usar como reemplazo del `search-result` nativo de VTEX.

---

## ⚙️ Configuración

Algunas opciones pueden ser personalizadas vía `props` en el Admin VTEX. Ejemplo:

```json
{
  "searchmind-search-bar": {
    "props": {
      "placeholder": "¿Qué estás buscando hoy?",
      "minSearchLength": 3
    }
  }
}
```

---

## 🧪 Desarrollo local

Clona este repositorio y linkea el app:

```bash
git clone https://github.com/zeluizr/searchmind.app.git
cd searchmind.app
vtex link
```

---

## 📬 Soporte

¿Tienes dudas o necesitas ayuda? Escríbenos a [soporte@searchmindai.com](mailto:soporte@searchmindai.com)

---

## 📝 Licencia

Este proyecto está licenciado bajo la [Licencia MIT](LICENSE).
