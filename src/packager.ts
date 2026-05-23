import * as fs from 'fs';
import * as path from 'path';
import { shouldIgnore } from './ignorer.js';

// İstatistikler için bir tip tanımlayalım
export interface ProjectStats {
    totalFiles: number;
    totalLines: number;
    totalChars: number;
    estimatedTokens: number;
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
                
                // ai_context.txt veya kodlarim.txt gibi kendi ürettiğimiz çıktıları taramasın
                if (file.endsWith('.txt') && (file === 'ai_context.txt' || file === 'kodlarim.txt')) {
                    continue;
                }

                const content = fs.readFileSync(fullPath, 'utf-8');
                
                // İstatistikleri hesapla
                stats.totalFiles += 1;
                stats.totalLines += content.split('\n').length;
                stats.totalChars += content.length;

                combinedContent += `\n--- START OF FILE: ${relativePath} ---\n`;
                combinedContent += content;
                combinedContent += `\n--- END OF FILE: ${relativePath} ---\n`;
            }
        }
    }

    scan(dirPath);

    // Ortalama olarak 1 token ~ 4 karakter veya 0.75 kelime kabul edilir (LLM standartları)
    stats.estimatedTokens = Math.ceil(stats.totalChars / 4);

    return { combinedContent, stats };
}