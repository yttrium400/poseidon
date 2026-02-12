# Contributing to Anthracite

First off, thanks for taking the time to contribute! 🎉

The following is a set of **strict guidelines** for contributing to Anthracite. These rules are in place to keep the codebase clean, maintainable, and stable.

## 🛑 Prerequisites

Before checking out the code, please Ensure:
1.  **Node.js v20+** is installed.
2.  **Python 3.12+** is installed.
3.  You have an **OpenAI API Key** (for agent features).

## 🌳 Branching Strategy

We follow a strict branching model:

-   **`main`**: Production-ready code. DO NOT push directly to main.
-   **Feature Branches**: `feat/description-of-feature`
-   **Bug Fixes**: `fix/description-of-bug`
-   **Chore/Docs**: `chore/description` or `docs/description`

**Example:**
```bash
git checkout -b feat/command-palette
git checkout -b fix/sidebar-crash
```

## 📝 Commit Messages

We enforce **Conventional Commits**. This is automated and required for our release pipeline.

**Format:** `<type>(<scope>): <description>`

**Types:**
-   `feat`: A new feature
-   `fix`: A bug fix
-   `docs`: Documentation only changes
-   `style`: Changes that do not affect the meaning of the code (white-space, formatting, etc)
-   `refactor`: A code change that neither fixes a bug nor adds a feature
-   `perf`: A code change that improves performance
-   `test`: Adding missing tests or correcting existing tests
-   `chore`: Changes to the build process or auxiliary tools

**Examples:**
-   `feat(sidebar): add collapsible toggle button`
-   `fix(agent): handle network timeout gracefully`
-   `docs(readme): update installation instructions`

**❌ Bad Examples:**
-   `fixed bug`
-   `wip`
-   `added cool feature`

## 🚀 Pull Request Process

1.  **Draft Early**: Open a Draft PR if you want early feedback.
2.  **Fill the Template**: Do not delete the PR template. Fill every section.
3.  **One PR per Feature**: Do not bundle multiple unrelated changes.
4.  **Self-Review**: Review your own code before requesting a review.
5.  **Tests**: If you add code, add tests. If you fix a bug, add a regression test.
6.  **Linting**: Ensure `npm run lint` passes.

## 💻 Development Setup

1.  **Install Node.js dependencies**:
    ```bash
    npm install
    ```

2.  **Setup Python environment**:
    ```bash
    python3 -m venv venv
    source venv/bin/activate  # Windows: venv\Scripts\activate
    pip install -r backend/requirements.txt
    playwright install
    ```

3.  **Configure Environment Variables**:
    Create a `.env` file in the root directory:
    ```
    OPENAI_API_KEY=your_key_here
    ```

4.  **Run the application**:
    ```bash
    npm run dev
    ```

## 🎨 Style Guides

-   **TypeScript**: We use ESLint and Prettier. Run `npm run lint` before committing.
-   **Python**: Follow PEP 8.
-   **Components**: Use Functional Components with Hooks. atomic design principles.

Thank you for contributing to Anthracite!
