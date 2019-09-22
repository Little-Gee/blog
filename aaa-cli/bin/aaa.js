#!/usr/bin/env node
// 文件最上方添加代码 #!/usr/bin/env node，表明这是一个可执行的应用

// 给终端的字体加上颜色
const chalk = require('chalk');
// 语义化版本号
const semver = require('semver');
// node需要版本
const requiredVersion = require('../package.json').engines.node;

// 检查node版本
function checkNodeVersion(wanted, id) {
    console.log('check node version');
    if (!semver.satisfies(process.version, wanted)) {
        console.log(
            chalk.red(
                `You are using Node ${process.version},
                but this version of ${id} requires Node ${wanted}.
                Please upgrade your Node version.`
            )
        );
        process.exit(1);
    }
}

checkNodeVersion(requiredVersion, 'aaa-cli');

// node低版本提醒
if (semver.satisfies(process.version, '9.x')) {
    console.log(
        chalk.red(
            `You are using Node ${process.version}.\n` +
                `Node.js 9.x has already reached end-of-life and will not be supported in future major releases.\n` +
                `It's strongly recommended to use an active LTS version instead.`
        )
    );
} else {
    console.log(chalk.green('pass'));
}

// 用于解析用户输入的命令和参数
const program = require('commander');

// 启动命令 node bin/aaa.js create <app-name>
program
    .version(require('../package.json').version)
    .command('create <app-name>')
    .description('create a new project powered by aaa-cli-service')
    .action(name => {
        console.log('name:', name);
        require('./lib/create')(name);
    });

program.parse(process.argv);
