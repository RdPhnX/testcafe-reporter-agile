const util = require('util');

export default function () {
    return {
        noColors: true,
        xrayReport: {},
        currentTest: {},

        async reportTaskStart(startTime, userAgents, testCount) {
            this.xrayReport.info = { startTime, userAgents, testCount};
        },

        async reportFixtureStart(name, path, meta) {
            // NOTE: Replace the next line with your code
            this.write(util.inspect({ name, path, meta })).newline();
        },

        async reportTestStart(name, meta) {
            this.currentTest.name = name;
            this.currentTest.testKey = meta?.id ?? '';
        },

        async reportTestDone(name, testRunInfo, meta) {
            // NOTE: Replace the next line with your code
            this.write(util.inspect({ name, testRunInfo, meta })).newline();
        },

        async reportTaskDone(endTime, passed, warnings, result) {
            // NOTE: Replace the next line with your code
            this.write(util.inspect({ endTime, passed, warnings, result })).newline();
        }
    };
}
