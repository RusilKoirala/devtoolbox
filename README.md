# DevToolBox


![GitHub release (latest by date)](https://img.shields.io/github/v/release/rusilkoirala/devtoolbox?style=flat-square)
![GitHub issues](https://img.shields.io/github/issues/rusilkoirala/devtoolbox?style=flat-square)
![GitHub pull requests](https://img.shields.io/github/issues-pr/rusilkoirala/devtoolbox?style=flat-square)
![GitHub](https://img.shields.io/github/license/rusilkoirala/devtoolbox?style=flat-square)

A modern, installable desktop-style PWA and native app for developers. Includes essential tools: JSON Formatter, JWT Decoder, Regex Tester, UUID Generator, Base64 Encoder/Decoder, and Markdown Previewer. Built with Vite, React, Tailwind CSS, and Electron.

---

## 🚀 v1.0.0 Released!
- First public release. Open to contributions and feedback!

---

## ✨ Features
- **Desktop app UI**: Fixed sidebar, no top nav, VS Code/Postman feel
- **Dark mode**: Default, with responsive design
- **PWA**: Installable, offline support, splash screen, theme color
- **Native app**: Electron packaging for Windows, Mac, Linux
- **Modular**: Each tool is a standalone React component
- **Keyboard shortcuts**: Power-user friendly

---

## 🛠️ Tools

### JSON Formatter
- Syntax-highlighted input/output
- JSON validation, inline errors
- Templates/snippets
- Pretty-print, copy, clear
- **Shortcuts**: Format (Ctrl+Enter), Copy (Ctrl+C), Clear (Ctrl+L)

### JWT Decoder
- Decode JWT header/payload
- Syntax highlight, validation
- Copy, clear
- **Shortcuts**: Decode (Ctrl+Enter), Copy (Ctrl+C), Clear (Ctrl+L)

### Regex Tester
- Pattern/flags input, test string
- Live match highlighting, group display
- Copy, clear
- **Shortcuts**: Test (Ctrl+Enter), Copy (Ctrl+C), Clear (Ctrl+L)

### UUID Generator
- Generate v1/v4 UUIDs
- Copy, clear, format explanation
- **Shortcuts**: Generate (Ctrl+Enter), Copy (Ctrl+C), Clear (Ctrl+L)

### Base64 Encoder/Decoder
- Text/image input, encode/decode
- Image preview, copy, clear
- **Shortcuts**: Convert (Ctrl+Enter), Copy (Ctrl+C), Clear (Ctrl+L)

### Markdown Previewer
- Markdown textarea, live preview
- Code blocks, lists, links, images
- Copy, clear
- **Shortcuts**: Copy (Ctrl+C), Clear (Ctrl+L)

---

## 🚀 Usage

1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Start the app (web):**
   ```sh
   npm run dev
   ```
3. **Build for production:**
   ```sh
   npm run build
   ```
4. **Run as native app (Electron):**
   ```sh
   npx electron .
   ```
5. **Build native installer:**
   ```sh
   npm run electron:build
   ```
6. **Install as PWA:**
   - Open in browser, click install icon or "Add to desktop".

---

## 🖥️ Keyboard Shortcuts
- **Ctrl+Enter**: Main action (format, decode, test, generate, convert)
- **Ctrl+C**: Copy output (when output focused)
- **Ctrl+L**: Clear all fields

---

## 🧑‍💻 Contributing
We welcome all contributions! Please:
- Fork the repo and create a feature branch
- Add new tools in `src/tools/`
- Keep UI consistent and modular
- Add tests if possible
- Open a pull request with a clear description
- Discuss ideas in [issues](https://github.com/yourusername/devtoolbox/issues)

---

## 📦 Tech Stack
- [Vite](https://vitejs.dev/)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [vite-plugin-pwa](https://vite-pwa-org.netlify.app/)
- [Electron](https://www.electronjs.org/)

---

## 📄 License
MIT
