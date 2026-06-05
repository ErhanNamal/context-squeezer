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
- **🎨 Enhanced Terminal UI:** Beautiful colored output with improved readability and detailed analytics breakdown.
- **📈 Detailed File Statistics:** File count by extension, largest files report, and comprehensive project metrics.
- **📋 JSON Output Mode:** Export statistics in JSON format for programmatic access and automation.

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

# Export statistics in JSON format (v1.1.0+)
npx context-squeezer-cli --json

# Combine options
npx context-squeezer-cli -o summary.txt --json
```

### Available Options:

| Option | Description | Example |
|--------|-------------|---------|
| `-h, --help` | Show help message | `context-squeezer -h` |
| `-o, --output <file>` | Custom output filename | `context-squeezer -o my_context.txt` |
| `--json` | Export stats in JSON format | `context-squeezer --json` |

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
═════════════════════════════════════════════════════════
  🚀 CONTEXT-SQUEEZER v1.1.0 - AI Context Generator
═════════════════════════════════════════════════════════

🔍 Analyzing directory: /home/user/projects/my-awesome-app


📊 PROJECT ANALYTICS REPORT
───────────────────────────────────────────────────────
📂 Total Files Compressed   : 13
📝 Total Lines of Code      : 1,420
🔤 Total Characters         : 45,280
💾 Output File Size         : 45.28 KB
🪙 Estimated LLM Token Load : ~11,320 tokens
───────────────────────────────────────────────────────

📁 FILES BY EXTENSION:
  .ts: 4 files
  .js: 3 files
  .json: 2 files
  .md: 1 file
  .yml: 1 file
  .env: 1 file

🏆 TOP 5 LARGEST FILES:
  1. src/main.ts (287 lines)
  2. src/utils/helpers.ts (156 lines)
  3. README.md (123 lines)
  4. src/api/routes.ts (98 lines)
  5. src/services/auth.ts (87 lines)

✅ Success! Your LLM context file is ready:
👉 /home/user/projects/my-awesome-app/ai_context.txt
```

### JSON Output Mode (v1.1.0+)

```bash
$ npx context-squeezer-cli --json
```

```json
{
  "success": true,
  "version": "1.1.0",
  "timestamp": "2026-06-05T08:09:15.898Z",
  "outputFile": "/home/user/projects/my-awesome-app/ai_context.txt",
  "stats": {
    "totalFiles": 13,
    "totalLines": 1420,
    "totalChars": 45280,
    "fileSize": "45.28 KB",
    "estimatedTokens": 11320
  }
}
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