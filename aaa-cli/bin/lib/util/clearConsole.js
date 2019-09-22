const chalk = require('chalk');
const readline = require('readline');

const clearConsole = title => {
    // 判断 Node.js 是否在 TTY(文本终端) 上下文中运行
    if (process.stdout.isTTY) {
        const blank = '\n'.repeat(process.stdout.rows);
        console.log(blank);
        // 将光标移动到给定的 TTY 流中的指定位置, 参数(stream, x, y[, callback])
        readline.cursorTo(process.stdout, 0, 0);
        // 从光标的当前位置向下清除给定的 TTY 流
        readline.clearScreenDown(process.stdout);
        if (title) {
            console.log(title);
        }
    }
};

exports.generateTitle = async function() {
    const current = require(`../../../package.json`).version;
    let title = chalk.bold.blue(`AAA CLI v${current}`);
    return title;
};

exports.clearConsole = async function clearConsoleWithTitle() {
    const title = await exports.generateTitle();
    clearConsole(title);
};