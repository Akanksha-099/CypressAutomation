
import http from "k6/http";
import { sleep, group } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";


export let options = {
  stages: [
    { duration: '30s', target: 10 }, // Ramp-up to 10 virtual users in 30 seconds
    { duration: '1m', target: 10 },  // Stay at 10 virtual users for 1 minute
    { duration: '30s', target: 0 },  // Ramp-down to 0 virtual users in 30 seconds
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // Set a performance threshold for 95th percentile response time
  },
};

export default function () {
  group('Homepage', function () {
    let response = http.get('https://www.saucedemo.com'); // Replace with the URL of your homepage
    // Add additional assertions or actions with the homepage response if needed
  });
  sleep(1); // Add a sleep between iterations to control the rate of requests per VU (e.g., 1 request per second)
}


export function handleSummary(data) {
    return {
      "summary/result.html": htmlReport(data),
      stdout: textSummary(data, { indent: " ", enableColors: true }),
      'summary/summary.json': JSON.stringify(data)
    };
  }
