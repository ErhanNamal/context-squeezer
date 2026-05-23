import { exec } from 'child_process';
import { promises as fs } from 'fs';
import * as path from 'path';

const cwd = process.cwd();
const outputFile = path.join(cwd, 'test_output.txt');

function run(cmd) {
  return new Promise((resolve, reject) => {
    exec(cmd, { cwd }, (err, stdout, stderr) => {
      if (err) return reject({ err, stdout, stderr });
      resolve({ stdout, stderr });
    });
  });
}

(async () => {
  try {
    // clean
    await fs.rm(outputFile).catch(() => {});

    // run CLI to produce test_output.txt
    console.log('Running CLI to generate test_output.txt');
    await run('npm start -- --output test_output.txt');

    const exists = await fs.stat(outputFile).then(() => true).catch(() => false);
    if (!exists) throw new Error('Output file was not created');

    const content = await fs.readFile(outputFile, 'utf-8');
    if (!content.includes('START OF FILE')) throw new Error('Output content looks invalid');

    console.log('All tests passed');
    process.exit(0);
  } catch (e) {
    console.error('Tests failed:', e instanceof Error ? e.message : e);
    process.exit(1);
  }
})();
