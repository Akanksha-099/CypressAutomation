
const reporter = require('k6-html-reporter');

const options = {
        jsonFile: 'summary/summary.json', //path to json output file
        output: 'summary', //path to the output file
    };

reporter.generateSummaryReport(options);
//to execute, run the following command: node k6-reporter-config.js  