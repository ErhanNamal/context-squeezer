import * as fs from 'fs';
import * as path from 'path';

// Yapay zekaya gönderilmesi hiç gerekmeyen varsayılan klasör ve dosyalar
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

export function shouldIgnore(filePath: string, baseDir: string): boolean {
    const relativePath = path.relative(baseDir, filePath);
    const parts = relativePath.split(path.sep);

    // Eğer yolun herhangi bir yerinde engellenen klasörlerden biri varsa es geç
    return parts.some(part => DEFAULT_IGNORES.includes(part));
}