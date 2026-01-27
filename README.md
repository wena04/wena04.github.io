# 🌐 Personal portfolio site

Live at `https://wena04.github.io`.

If you have any suggestions, feel free to [reach out](mailto:wena04@uw.edu)!

## Project structure

This repo is a Vite + React single-page portfolio, deployed to GitHub Pages.

### Top-level

- **`.github/workflows/deploy.yml`**: GitHub Actions workflow for building + deploying the site
- **`index.html`**: Vite HTML entry point (mounts the React app)
- **`public/`**: Static assets served as-is (e.g. icons)
- **`src/`**: All application code (React components, styles, Three.js scene)
- **`package.json` / `package-lock.json`**: Dependencies + scripts
- **`vite.config.js`**: Vite build/dev configuration
- **`eslint.config.js`**: ESLint configuration

### `src/` layout

- **`main.jsx`**: React entry (renders `<App />` into `#root`)
- **`App.jsx`**: Top-level page composition (which sections render, global layout)
- **`sections/`**: Page sections used in the single-page layout
  - **`Hero.jsx`**: Homepage/hero section (Three.js canvas mount point)
  - **`About.jsx`**, **`Projects.jsx`**, **`Contact.jsx`**: Main content sections
- **`components/`**: Reusable UI components (navigation, footer, etc.)
  - **`Navbar.jsx`**: Scroll-to-section navbar for `#hero/#about/#projects/#contact`
  - **`Footer.jsx`**: Footer links + social/contact
  - **`VerticalNav.jsx`** + `experiences/` + `Education.jsx`: Alternate/older section components not currently wired into `App.jsx`
- **`three/`**: Three.js scene code used by the hero
  - **`scene.js`**: Scene/camera/renderer setup + starfield
  - **`lights.js`**: Lighting rig
  - **`controls.js`**: Orbit controls configuration
  - **`planet.js`**: “Planet” shader/object construction + animation
- **`styles/`**: Component/section CSS (hero/navbar/footer/sections)
- **`index.css` / `App.css`**: Base/global styles (some styles also duplicated under `styles/`)
- **`constants.js`**: Centralized data/constants (personal info, nav items, project metadata, config)
