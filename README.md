# Anthracite Browser

The Open Source "Do It For Me" Browser.

Anthracite is a desktop browser that replaces the URL bar with a Command Bar. Instead of navigating yourself, you tell the Agent what to do, and it drives the browser for you.

## Features

- **Command Bar Interface**: Deeply integrated into the browser chrome.
- **Persistent Sessions**: Log in once, and the agent remembers you.
- **Stealth Mode**: Uses `browser-use` to mimic human behavior.
- **Local Privacy**: Your session data stays on your machine.
- **Customizable Themes**: Light, Dark, and System modes.

## Tech Stack

- **Frontend**: Electron, React, TypeScript, TailwindCSS
- **Backend**: Python, FastAPI, `browser-use` library

## Getting Started

### Prerequisites

- Node.js (v18+)
- Python (v3.11+)

### Installation

1.  **Install Node dependencies**:
    ```bash
    npm install
    ```

2.  **Setup Python environment**:
    ```bash
    python3 -m venv venv
    source venv/bin/activate
    pip install -r backend/requirements.txt
    playwright install
    ```

3.  **Configure Environment**:
    Create a `.env` file in the root directory and add your keys:
    ```
    OPENAI_API_KEY=your_key_here
    ```

4.  **Run the Application**:
    ```bash
    npm run dev
    ```

## Project Structure

```
anthracite/
├── src/                # Electron Main & Renderer process code
│   ├── main/           # Main process (Node.js)
│   └── renderer/       # Renderer process (React)
├── backend/            # Python backend (FastAPI + browser-use)
├── .github/            # GitHub templates and workflows
├── CONTRIBUTING.md     # Contribution guidelines
└── CODE_OF_CONDUCT.md  # Community standards
```

## Community & Contributing

We welcome contributions from the community!

- **Contributing**: See [CONTRIBUTING.md](CONTRIBUTING.md) for how to get started.
- **Code of Conduct**: See [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) for our community standards.
- **Issues**: Found a bug or have a feature request? Open an [issue](https://github.com/Antigravity/anthracite/issues).

## License

MIT © Anthracite
