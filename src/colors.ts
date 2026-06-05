/**
 * Terminal renkleri ve stil formatı için yardımcı fonksiyonlar
 */

export const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    dim: '\x1b[2m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m',
    gray: '\x1b[90m',
    bgRed: '\x1b[41m',
    bgGreen: '\x1b[42m',
    bgBlue: '\x1b[44m',
};

export function success(text: string): string {
    return `${colors.green}${colors.bright}${text}${colors.reset}`;
}

export function error(text: string): string {
    return `${colors.red}${colors.bright}${text}${colors.reset}`;
}

export function warning(text: string): string {
    return `${colors.yellow}${colors.bright}${text}${colors.reset}`;
}

export function info(text: string): string {
    return `${colors.cyan}${text}${colors.reset}`;
}

export function dim(text: string): string {
    return `${colors.gray}${text}${colors.reset}`;
}

export function highlight(text: string): string {
    return `${colors.bright}${colors.blue}${text}${colors.reset}`;
}

export function section(title: string): string {
    return `\n${colors.bright}${colors.magenta}${title}${colors.reset}`;
}
