# Portafolio profesional — Diana Tibisay Pacheco Moreno

Portafolio estático preparado para publicarse gratuitamente con GitHub Pages.

## Estructura

```text
portfolio_diana_pacheco/
├── index.html
├── styles.css
├── script.js
└── assets/
    ├── images/
    │   └── placeholder-proyecto.svg
    └── docs/
        └── CV_Diana_Pacheco.pdf
```

## Antes de publicar

1. Copia tu CV a `assets/docs/CV_Diana_Pacheco.pdf`.
2. Reemplaza `assets/images/placeholder-proyecto.svg` por un pantallazo real.
3. En `index.html`, cambia `#` en LinkedIn por tu URL real.
4. Revisa el correo, textos y enlaces.
5. Abre `index.html` localmente para verificar el sitio.

## Publicar con GitHub Pages

### Opción recomendada

Crea un repositorio llamado:

```text
BREINHZ.github.io
```

Luego:

```bash
git init
git add .
git commit -m "Crear portafolio profesional"
git branch -M main
git remote add origin https://github.com/BREINHZ/BREINHZ.github.io.git
git push -u origin main
```

Después ve a:

`Settings > Pages > Build and deployment`

Selecciona:

- Source: `Deploy from a branch`
- Branch: `main`
- Folder: `/ (root)`

La URL esperada será:

```text
https://BREINHZ.github.io
```

## Añadir más proyectos

Duplica el bloque `<article class="project-card">...</article>` dentro de la sección `#proyectos`
y cambia imagen, descripción, tecnologías y enlaces.

## Recomendación

No publiques archivos `.env`, credenciales, contraseñas, tokens o secretos en GitHub.
