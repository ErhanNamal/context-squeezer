# 🚀 Context-Squeezer

![CI](https://github.com/ErhanNamal/context-squeezer/actions/workflows/ci.yml/badge.svg)
![npm](https://img.shields.io/badge/npm-friendly-brightgreen)

Lightweight CLI that packs a repository into a single, LLM-optimized context file. Ideal for feeding projects to ChatGPT, Claude, or local LLMs without wasting tokens on irrelevant files.

---

## 🔥 Features

- **Smart Code Squeezing:** Produces a structured, human- and LLM-friendly summary of your codebase.
- **Automatic Ignore Detection:** Skips common heavy folders and files (`node_modules`, `.git`, `dist`, lockfiles, etc.).
- **Live Stats & Token Estimation:** Shows total files, lines, characters and an estimated LLM token count.
- **Custom Output:** Change the output filename or destination with a CLI flag.

---

## 🛠️ Installation

Clone and install dependencies:

```bash
git clone https://github.com/ErhanNamal/context-squeezer.git
cd context-squeezer
npm install
```

## 🚀 Usage

Squeeze the current project and write the default `ai_context.txt`:

```bash
npm start
```

Specify a custom output path:

```bash
npm start -- --output my_project_summary.txt
```

## 🖥️ Terminal Dashboard (example)

When run, the CLI prints a compact analytics dashboard similar to the example below:

```
=============================================
🚀 CONTEXT-SQUEEZER - AI Context Prepared
=============================================

🔍 Analyzing directory: D:\Koufc\Yazılım Çalışmaları\Karışık\context-squeezer

📊 PROJECT ANALYTICS REPORT
---------------------------------------------
📂 Total Files Compressed  : 5
📝 Total Lines of Code     : 155
🔤 Total Character Count   : 4940
🪙 Estimated LLM Token Load: ~1235 tokens
---------------------------------------------

✅ Success! Your LLM context file is ready:
👉 D:\Koufc\Yazılım Çalışmaları\Karışık\context-squeezer\ai_context.txt
```

## 🤝 Contributing

Contributions are welcome — open issues or pull requests for improvements. Add examples, edge-case handling, or CI workflows to help others use the tool.

## 📝 License

Distributed under the MIT License. See LICENSE for details.