import * as fs from 'fs';
import * as path from 'path';
import { packProject } from './packager.js';

function printHelp() {
    console.log(`
Context-Squeezer - usage

Options:
  -h, --help          Show this help message
  -o, --output <file> Write output to <file> (default: ai_context.txt)

Examples:
  npm start -- --output my_context.txt
`);
}

function main() {
    const args = process.argv.slice(2);

    if (args.includes('-h') || args.includes('--help')) {
        printHelp();
        return;
    }

    let outputFileName = 'ai_context.txt';
    const oIndex = args.findIndex(a => a === '-o' || a === '--output');
    if (oIndex !== -1 && args[oIndex + 1]) {
        outputFileName = args[oIndex + 1];
    }

    const targetDir = process.cwd();

    console.log('\n=============================================');
    console.log('🚀 CONTEXT-SQUEEZER - AI Context Prepared');
    console.log('=============================================\n');
    console.log(`🔍 Analyzing directory: ${targetDir}`);

    try {
        const { combinedContent, stats } = packProject(targetDir);

        const outputPath = path.isAbsolute(outputFileName)
            ? outputFileName
            : path.join(targetDir, outputFileName);

        fs.writeFileSync(outputPath, combinedContent, 'utf-8');

        console.log('\n📊 PROJECT ANALYTICS REPORT');
        console.log('---------------------------------------------');
        console.log(`📂 Total Files Compressed  : ${stats.totalFiles}`);
        console.log(`📝 Total Lines of Code     : ${stats.totalLines}`);
        console.log(`🔤 Total Character Count   : ${stats.totalChars}`);
        console.log(`🪙 Estimated LLM Token Load: ~${stats.estimatedTokens} tokens`);
        console.log('---------------------------------------------');
        console.log(`\n✅ Success! Your LLM context file is ready:`);
        console.log(`👉 ${outputPath}\n`);
    } catch (err) {
        console.error('❌ An error occurred while building the context file:');
        console.error(err instanceof Error ? err.message : String(err));
        process.exit(1);
    }
}

main();