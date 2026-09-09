# Contributing to VELOURA

Thank you for considering contributing to **VELOURA — Spatial Thought Network & Slow Social Architecture**. 

As a slow social platform designed to prioritize human connection over engagement loops, we welcome contributions that enhance user experience, code quality, accessibility, performance, and documentation.

---

## 📜 Code of Conduct

All contributors are expected to adhere to our [Code of Conduct](CODE_OF_CONDUCT.md). Please read it before getting started.

---

## 🛠️ Development Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/shouryaupadhyay2029/fo_comp.git
   cd fo_comp
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start Local Development Server**:
   ```bash
   npm run dev
   ```

4. **Lint and Type Check**:
   ```bash
   npm run lint
   ```

5. **Test Production Build**:
   ```bash
   npm run build
   ```

---

## 🎨 Coding Standards & Guidelines

- **React 19 & Hooks**: Always use functional components and custom hooks (`src/hooks/`). Ensure all hooks adhere strictly to React's Rules of Hooks.
- **Prop Validation**: All React components receiving props must define explicit `PropTypes` at the bottom of the component file.
- **JSDoc Documentation**: Write comprehensive `@param`, `@returns`, and `@component` JSDoc annotations for all components, utilities, and hooks.
- **Styling**: Maintain vanilla CSS design tokens in `src/index.css` and component-specific stylesheets under `src/styles/components/` or `src/styles/pages/`. Avoid inline `<style>` JSX tags.
- **Accessibility (a11y)**: Ensure interactive elements are keyboard navigable (`tabIndex={0}`, `onKeyDown`), provide `aria-label` attributes, and include appropriate semantic HTML tags (`<nav>`, `<header>`, `<main>`, `<footer>`, `<section>`).

---

## 🔀 Pull Request Process

1. **Branch Naming**: Use descriptive branch names:
   - `feature/your-feature-name`
   - `fix/issue-description`
   - `docs/documentation-update`

2. **Commit Messages**: Follow standard conventional commits:
   - `feat(component): add new feature`
   - `fix(audio): resolve web audio autoplay restriction`
   - `docs(readme): expand API reference table`

3. **Submitting PR**:
   - Ensure `npm run lint` and `npm run build` pass without warnings or errors.
   - Describe what changed and include screenshots or recordings for visual changes.

---

## 📄 License

By contributing, you agree that your contributions will be licensed under the project's [MIT License](LICENSE).
