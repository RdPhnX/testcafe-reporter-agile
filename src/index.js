import fs from 'fs';
import path from 'path';
const util = require('util');

export default function () {
    return {
        noColors: true,
        xrayReport: {},
        currentTest: {},

        async reportTaskStart(startTime, userAgents, testCount) {
            this.xrayReport.info = {
                summary: 'TestCafe automated test execution',
                description: userAgents,
                startDate: startTime
            };
        },

        async reportFixtureStart(name, path, meta) {
            // NOTE: Replace the next line with your code
            this.write(util.inspect({ name, path, meta })).newline();
        },

        async reportTestStart(name, meta) {
            this.currentTest.name = name;
            this.currentTest.testKey = meta?.id ?? '';
            this.currentTest.start = new Date();
        },

        async reportTestDone(name, testRunInfo, meta) {
            const errs = testRunInfo.errs.map(err => this.formatError(err));

            if (testRunInfo.skipped)
                this.currentTest.status = 'BLOCKED';
            else if (errs.length === 0)
                this.currentTest.status = 'PASSED';
            else
                this.currentTest.status = 'FAILED';
            this.currentTest.finish = this.moment(this.currentTest.start)
                .add(testRunInfo.durationMs, 'ms');
            this.currentTest.comment = errs.join('\n');
            this.currentTest.evidence.data = toBase64(testRunInfo.screenshots.screenshotPath);
            this.currentTest.evidence.filename = path.basename(testRunInfo.screenshots.screenshotPath);
            this.currentTest.evidence.contentType = `image/${path.extname(testRunInfo.screenshots.screenshotPath)}`;
        },

        async reportTaskDone(endTime, passed, warnings, result) {
            // NOTE: Replace the next line with your code
            this.write(util.inspect({ endTime, passed, warnings, result })).newline();
        }
    };
}

function toBase64(filePath) {
    const img = fs.readFileSync(filePath);

    return Buffer.from(img).toString('base64');
}