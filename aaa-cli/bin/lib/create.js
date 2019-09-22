const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
// inquirer.js: 用户与命令行交互的工具
const inquirer = require('inquirer');
const Creator = require('./Creator');
const { clearConsole } = require('./util/clearConsole');
const validateProjectName = require('validate-npm-package-name');

async function create(projectName) {
    console.log('create');
    // 返回 Node.js 进程的当前工作目录
    const cwd = process.cwd();
    const inCurrent = projectName === '.';
    const name = inCurrent ? path.relative('../', cwd) : projectName;
    const targetDir = path.resolve(cwd, projectName || '.');

    // 判断输入的名字是否能作为npm包的名字
    const result = validateProjectName(name);
    if (!result.validForNewPackages) {
        console.error(chalk.red(`Invalid project name: "${name}"`));
        result.errors &&
            result.errors.forEach(err => {
                console.error(chalk.red.dim('Error: ' + err));
            });
        result.warnings &&
            result.warnings.forEach(warn => {
                console.error(chalk.red.dim('Warning: ' + warn));
            });
        exit(1);
    }

    // 验证路径是否存在
    if (fs.existsSync(targetDir)) {
        await clearConsole();
        if (inCurrent) {
            const { ok } = await inquirer.prompt([
                {
                    name: 'ok',
                    type: 'confirm',
                    message: `Generate project in current directory?`
                }
            ]);
            if (!ok) {
                return;
            }
        } else {
            const { action } = await inquirer.prompt([
                {
                    name: 'action',
                    type: 'list',
                    message: `Target directory ${chalk.cyan(
                        targetDir
                    )} already exists. Pick an action:`,
                    choices: [
                        {
                            name: 'Overwrite',
                            value: 'overwrite'
                        },
                        {
                            name: 'Merge',
                            value: 'merge'
                        },
                        {
                            name: 'Cancel',
                            value: false
                        }
                    ]
                }
            ]);
            if (!action) {
                return;
            } else if (action === 'overwrite') {
                // 移除原来的文件
                console.log(`\nRemoving ${chalk.cyan(targetDir)}...`);
                await fs.remove(targetDir);
            }
        }
    }
    const creator = new Creator(name, targetDir);
    await creator.create();
}

module.exports = (...args) => {
    return create(...args).catch(err => {
        console.log('err:', err);
        process.exit(1);
    });
};
