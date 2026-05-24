import * as fs from 'fs';
import * as path from 'path';

const DEFAULT_IGNORES = [
    'node_modules',
    '.git',
    'package-lock.json',
    'yarn.lock',
    'pnpm-lock.yaml',
    'dist',
    'build',
    '.DS_Store'
];


let cachedCustomRules: string[] | null = null;

/**
 * Projenin kök dizinindeki .aiignore dosyasını sadece bir kez okuyarak belleğe alır.
 * @param projectRoot Projenin ana çalışma dizini
 */
function loadCustomIgnoreRules(projectRoot: string): string[] {
    if (cachedCustomRules !== null) {
        return cachedCustomRules;
    }

    const aiIgnorePath = path.join(projectRoot, '.aiignore');
    
    if (!fs.existsSync(aiIgnorePath)) {
        cachedCustomRules = [];
        return cachedCustomRules;
    }

    try {
        const content = fs.readFileSync(aiIgnorePath, 'utf-8');
        cachedCustomRules = content
            .split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0 && !line.startsWith('#'));
    } catch (err) {
        cachedCustomRules = [];
    }

    return cachedCustomRules;
}

/**
 * Belirtilen dosya yolunun engellenip engellenmeyeceğini kontrol eder.
 * @param filePath Denetlenecek dosyanın tam yolu
 * @param projectRoot Projenin ana çalışma dizini
 */
export function shouldIgnore(filePath: string, projectRoot: string): boolean {
    const relativePath = path.relative(projectRoot, filePath).replace(/\\/g, '/');
    const parts = relativePath.split('/');

    const file = path.basename(filePath);
    if (file.endsWith('.txt') && (file === 'ai_context.txt' || file === 'kodlarim.txt' || file === 'test_output.txt')) {
        return true;
    }

    if (parts.some(part => DEFAULT_IGNORES.includes(part))) {
        return true;
    }

    const customRules = loadCustomIgnoreRules(projectRoot);
    for (const rule of customRules) {
        const normalizedRule = rule.replace(/\\/g, '/');

        if (normalizedRule.startsWith('*.')) {
            const ext = normalizedRule.slice(1); 
            if (filePath.endsWith(ext)) return true;
        } 
        else if (
            relativePath === normalizedRule || 
            parts.includes(normalizedRule) ||
            relativePath.startsWith(normalizedRule + '/')
        ) {
            return true;
        }
    }

    return false;
}