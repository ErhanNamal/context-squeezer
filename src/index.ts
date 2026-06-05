import * as fs from 'fs';
import * as path from 'path';
import { packProject } from './packager.js';
import { success, error, warning, info, section, dim, highlight } from './colors.js';

function formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

function printBanner() {
    console.log(section('═════════════════════════════════════════════════════════'));
    console.log(highlight('  🚀 CONTEXT-SQUEEZER v1.1.0 - AI Context Generator'));
    console.log(section('═════════════════════════════════════════════════════════'));
}

function printHelp() {
    console.log(`
${highlight('Context-Squeezer')} - usage

${info('Options:')}
  -h, --help            Show this help message
  -o, --output <file>   Write output to <file> (default: ai_context.txt)
  --json                Export stats in JSON format

${info('Examples:')}
  npx context-squeezer-cli
  npx context-squeezer-cli --output my_context.txt
  npx context-squeezer-cli --json
`);
}

function main() {
    const args = process.argv.slice(2);

    if (args.includes('-h') || args.includes('--help')) {
        printHelp();
        return;
    }

    const useJson = args.includes('--json');
    let outputFileName = 'ai_context.txt';
    const oIndex = args.findIndex(a => a === '-o' || a === '--output');
    if (oIndex !== -1 && args[oIndex + 1]) {
        outputFileName = args[oIndex + 1];
    }

    const targetDir = process.cwd();

    if (!useJson) {
        printBanner();
        console.log(info(`\n🔍 Analyzing directory: ${targetDir}`));
    }

    try {
        const { combinedContent, stats } = packProject(targetDir);

        const outputPath = path.isAbsolute(outputFileName)
            ? outputFileName
            : path.join(targetDir, outputFileName);

        fs.writeFileSync(outputPath, combinedContent, 'utf-8');
        const fileSize = formatFileSize(fs.statSync(outputPath).size);

        if (useJson) {
            console.log(JSON.stringify({
                success: true,
                version: '1.1.0',
                timestamp: new Date().toISOString(),
                outputFile: outputPath,
                stats: {
                    totalFiles: stats.totalFiles,
                    totalLines: stats.totalLines,
                    totalChars: stats.totalChars,
                    fileSize: fileSize,
                    estimatedTokens: stats.estimatedTokens
                }
            }, null, 2));
        } else {
            console.log(section('\n📊 PROJECT ANALYTICS REPORT'));
            console.log(dim('─'.repeat(55)));
            console.log(`📂 Total Files Compressed   : ${highlight(String(stats.totalFiles))}`);
            console.log(`📝 Total Lines of Code      : ${highlight(String(stats.totalLines))}`);
            console.log(`🔤 Total Characters         : ${highlight(String(stats.totalChars))}`);
            console.log(`💾 Output File Size         : ${highlight(fileSize)}`);
            console.log(`🪙 Estimated LLM Token Load : ${highlight('~' + String(stats.estimatedTokens) + ' tokens')}`);
            console.log(dim('─'.repeat(55)));
            
            // File extensions breakdown
            if (Object.keys(stats.extensionBreakdown).length > 0) {
                console.log(section('\n📁 FILES BY EXTENSION:'));
                const sortedExt = Object.entries(stats.extensionBreakdown)
                    .sort((a, b) => b[1] - a[1]);
                for (const [ext, count] of sortedExt) {
                    console.log(`  ${highlight(ext || 'no-ext')}: ${count} file${count > 1 ? 's' : ''}`);
                }
            }
            
            // Largest files
            if (stats.largestFiles.length > 0) {
                console.log(section('\n🏆 TOP 5 LARGEST FILES:'));
                stats.largestFiles.forEach((file, idx) => {
                    console.log(`  ${idx + 1}. ${highlight(file.path)} (${file.lines} lines)`);
                });
            }
            
            console.log(`\n${success('✅ Success!')} Your LLM context file is ready:`);
            console.log(`${info('👉')} ${highlight(outputPath)}\n`);
        }
    } catch (err) {
        if (useJson) {
            console.log(JSON.stringify({
                success: false,
                error: err instanceof Error ? err.message : String(err)
            }, null, 2));
        } else {
            console.error(error(`\n❌ Error: An error occurred while building the context file:`));
            console.error(error(err instanceof Error ? err.message : String(err)));
        }
        process.exit(1);
    }
}

main();