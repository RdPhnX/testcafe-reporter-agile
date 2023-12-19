import fs from 'fs';
import path from 'path';
const util = require('util');

export default function () {
    return {
        noColors: true,
        xrayReport: {
            info: {},
            tests: []
        },
        tests: [],
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
            this.currentTest.testKey = getTestKey(meta);
            this.currentTest.start = new Date();
            this.tests.push(this.currentTest);
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


            this.currentTest.evidence = collectEvidence(testRunInfo, this.currentTest.evidence);
        },

        async reportTaskDone(endTime, passed, warnings, result) {
            this.xrayReport.tests = this.tests;
            // NOTE: Replace the next line with your code
            this.write(JSON.stringify(this.xrayReport)).newline();
        }
    };
}

function getTestKey(meta) {
    return meta?.id ?? '';
}

function toBase64(filePath) {
    const img = fs.readFileSync(filePath);

    return Buffer.from(img).toString('base64');
}

function collectEvidence(testRunInfo) {
    const evidences = [];

    for (const screenshot of testRunInfo.screenshots) {
        const evidence = {
            data: toBase64(testRunInfo.screenshots.screenshotPath),
            filename: `screenshot-${evidences.length}${screenshot.takenOnFail ? '-on-fail' : ''}${path.extname(testRunInfo.screenshotPath)}`,
            contentType: `image/${path.extname(testRunInfo.screenshots.screenshotPath).substring(1)}`
        };

        evidences.push(evidence);
    }

    return evidences;
}
