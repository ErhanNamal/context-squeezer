import * as fs from 'fs';
import * as path from 'path';
import { shouldIgnore } from './ignorer.js';

export interface ProjectStats {
    totalFiles: number;
    totalLines: number;
    totalChars: number;
    estimatedTokens: number;
}

const MAX_FILE_SIZE_BYTES = 500 * 1024;

function isBinaryFile(filePath: string): boolean {
    const buffer = Buffer.alloc(512);
    let fd: number | null = null;
    
    try {
        fd = fs.openSync(filePath, 'r');
        const bytesRead = fs.readSync(fd, buffer, 0, 512, 0);
        
        for (let i = 0; i < bytesRead; i++) {
            if (buffer[i] === 0) {
                return true;
            }
        }
        return false;
    } catch (err) {
        return true;
    } finally {
        if (fd !== null) {
            fs.closeSync(fd);
        }
    }
}

function maskSensitiveData(content: string): string {
    const sensitivePatterns = [
        /(secret[-_]?key|api[-_]?key|password|passwd|auth[-_]?token|client[-_]?secret)\s*[:=]\s*['"`][^'"`]{4,200}['"`]/gi,
        /AIzaSy[A-Za-z0-9-_]{33}/g,
        /sk-[a-zA-Z0-9]{48}/g
    ];

    let maskedContent = content;
    for (const pattern of sensitivePatterns) {
        maskedContent = maskedContent.replace(pattern, (match) => {
            if (match.includes('=') || match.includes(':')) {
                const separator = match.includes('=') ? '=' : ':';
                const parts = match.split(separator);
                return `${parts[0]}${separator} "[REDACTED BY CONTEXT-SQUEEZER]"`;
            }
            return "[REDACTED BY CONTEXT-SQUEEZER]";
        });
    }
    return maskedContent;
}

export function packProject(dirPath: string): { combinedContent: string; stats: ProjectStats } {
    let combinedContent = '';
    const stats: ProjectStats = {
        totalFiles: 0,
        totalLines: 0,
        totalChars: 0,
        estimatedTokens: 0
    };

    function scan(currentDir: string) {
        const files = fs.readdirSync(currentDir);

        for (const file of files) {
            const fullPath = path.join(currentDir, file);
            const stat = fs.statSync(fullPath);

            if (shouldIgnore(fullPath, dirPath)) {
                continue;
            }

            if (stat.isDirectory()) {
                scan(fullPath);
            } else if (stat.isFile()) {
                const relativePath = path.relative(dirPath, fullPath);
                
                if (stat.size > MAX_FILE_SIZE_BYTES) {
                    console.warn(`⚠️ Skipped large file (over 500KB): ${relativePath}`);
                    continue;
                }

                if (isBinaryFile(fullPath)) {
                    continue;
                }

                try {
                    const content = fs.readFileSync(fullPath, 'utf-8');
                    const safeContent = maskSensitiveData(content);
                    
                    stats.totalFiles += 1;
                    stats.totalLines += safeContent.split('\n').length;
                    stats.totalChars += safeContent.length;

                    combinedContent += `\n--- START OF FILE: ${relativePath} ---\n`;
                    combinedContent += safeContent;
                    combinedContent += `\n--- END OF FILE: ${relativePath} ---\n`;
                } catch (e) {
                    // Hata durumunda es geç
                }
            }
        }
    }

    scan(dirPath);
    stats.estimatedTokens = Math.ceil(stats.totalChars / 4);

    return { combinedContent, stats };
}