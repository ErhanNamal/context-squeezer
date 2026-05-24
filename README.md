# 🚀 Context-Squeezer-CLI

![CI](https://github.com/ErhanNamal/context-squeezer/actions/workflows/ci.yml/badge.svg)
[![npm version](https://img.shields.io/npm/v/context-squeezer-cli.svg?style=flat-flat)](https://www.npmjs.com/package/context-squeezer-cli)
![npm downloads](https://img.shields.io/npm/dm/context-squeezer-cli?color=blue)
![license](https://img.shields.io/npm/l/context-squeezer-cli?color=brightgreen)

Lightweight and blazing fast TypeScript CLI that packs an entire repository into a single, LLM-optimized context file. Ideal for feeding your codebases directly into ChatGPT, Claude, or local LLMs without wasting precious tokens on junk files.

---

## 🔥 Features

- **⚡ Blazing Fast Squeezing:** Traverses your repository and compiles a structured, human- and LLM-friendly master text file in milliseconds.
- **🛡️ Default & Custom Ignores:** Automatically skips heavy or compiled asset folders (`node_modules`, `.git`, `dist`, lockfiles) and respects your custom `.aiignore` rules.
- **🔒 Security & Privacy First:** Built-in binary file detection prevents image/PDF leakage, and an automated data masker redacts sensitive strings like API keys, secrets, or passwords before outputting.
- **📊 Token Load Estimation:** Instantly calculates total processed files, lines, characters, and provides a live, estimated LLM token count.

---

## 🛠️ Quick Start (No Installation Required)

You don't even need to clone or install it locally to try it out. Just navigate to your target project directory in your terminal and fire it up using `npx`:

```bash
npx context-squeezer-cli
```

This will immediately analyze your current directory and generate a clean `ai_context.txt` file in your root folder.

---

## ⚙️ Advanced Usage & Options

You can easily customize the output filename or paths using standard CLI flags:

```bash
# Save to a custom file name
npx context-squeezer-cli --output codebase_summary.txt

# Short flag version
npx context-squeezer-cli -o summary.txt
```

---

## 🚫 Custom Ignore Rules (.aiignore)

Create an `.aiignore` file in the root of your project to skip specific extensions or internal directories, just like a `.gitignore`:

```plaintext
# .aiignore template
# Ignore entire custom scripts folder
scripts

# Ignore specific output logs
test_output.txt

# Ignore all JSON files
*.json
```

---

## 🖥️ Terminal Dashboard Preview

When run successfully, the CLI renders a compact, high-readability analytics report directly in your terminal:

```plaintext
=============================================
🚀 CONTEXT-SQUEEZER - AI Context Prepared
=============================================

🔍 Analyzing directory: /home/user/projects/my-awesome-app

📊 PROJECT ANALYTICS REPORT
---------------------------------------------
📂 Total Files Compressed  : 12
📝 Total Lines of Code     : 1,420
🔤 Total Character Count   : 45,280
🪙 Estimated LLM Token Load: ~11,320 tokens
---------------------------------------------

✅ Success! Your LLM context file is ready:
👉 /home/user/projects/my-awesome-app/ai_context.txt
```

---

## 🛠️ Local Development & Contribution

If you want to clone the repo, add new features, or tweak the scanner locally:

### Clone the repository:

```bash
git clone https://github.com/ErhanNamal/context-squeezer.git
cd context-squeezer
```

### Install dependencies:

```bash
npm install
```

### Run the CLI in development mode:

```bash
npm start
```

### Build the production files:

```bash
npm run build
```

---

## 📝 License

Distributed under the MIT License. See [LICENSE](LICENSE) for details.