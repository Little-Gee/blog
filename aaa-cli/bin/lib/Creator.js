const chalk = require('chalk');
const execa = require('execa');
const EventEmitter = require('events');
const { clearConsole } = require('./util/clearConsole');
const download = require('download-git-repo');

const { logWithSpinner, stopSpinner } = require('./util/spinner');

const { hasGit, hasProjectGit } = require('./util/env.js');

module.exports = class Creator extends EventEmitter {
    constructor(name, context) {
        super();
        this.name = name;
        this.context = context;
        this.run = this.run.bind(this);
    }

    async create() {
        const { run } = this;

        // 清屏，显示版本号
        await clearConsole();

        // 拉取项目仓库文件
        await new Promise((resolve, reject) => {
            logWithSpinner(
                `✨`,
                `Creating project in ${chalk.yellow(this.context)}. Please wait...`
            );

            download(
                'https://github.com:GreenHandLittleWhite/ui-start',
                this.name,
                { clone: true },
                err => {
                    if (err) {
                        stopSpinner();
                        console.log(chalk.red(err));
                        return reject(err);
                    }
                    stopSpinner();
                    console.log();
                    console.log(`🎉  Successfully created project ${chalk.yellow(this.name)}.`);
                    resolve();
                }
            );
        });

        // git初始化
        const shouldInitGit = this.shouldInitGit();
        let gitCommitFailed = false;
        if (shouldInitGit) {
            logWithSpinner(`🗃`, `Initializing git repository...`);
            await run('git init');
            await run('git add -A');

            try {
                await run('git', ['commit', '-m', 'init']);
            } catch (e) {
                gitCommitFailed = true;
            }
        }

        stopSpinner();

        console.log();

        if (gitCommitFailed) {
            warn(`Git init failed, you will need to perform the initial commit yourself.`);
        }
    }

    run(command, args) {
        if (!args) {
            [command, ...args] = command.split(/\s+/);
        }
        return execa(command, args, { cwd: this.context });
    }

    shouldInitGit() {
        if (!hasGit()) {
            return false;
        }
        // 默认值: true 除非已经有git仓库了
        return !hasProjectGit(this.context);
    }
};
