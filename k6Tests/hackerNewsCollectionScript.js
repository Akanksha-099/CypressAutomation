// Auto-generated by the postman-to-k6 converter

import "./libs/shim/core.js";
import { group } from "k6";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";


export let options = { maxRedirects: 4 };

const Request = Symbol.for("request");
postman[Symbol.for("initial")]({
  options
});

export default function() {
  group("Items", function() {
    postman[Request]({
      name: "Story",
      id: "54f4c84b-edd8-4129-baf0-2b2cf5118d04",
      method: "GET",
      address:
        "https://hacker-news.firebaseio.com/v0/item/8863.json?print=pretty",
      data: {
        but: "this",
        is: "going",
        to: "be",
        urle: "encodeded asda asd"
      }
    });

    postman[Request]({
      name: "Comment",
      id: "e864c3f2-5639-4258-a749-478272587305",
      method: "GET",
      address:
        "https://hacker-news.firebaseio.com/v0/item/2921983.json?print=pretty",
      data: {
        but: "this",
        is: "going",
        to: "be",
        urle: "encodeded asda asd"
      }
    });

    postman[Request]({
      name: "Poll",
      id: "68d448fb-9a57-4d8f-ab8e-f07e2ce2487d",
      method: "GET",
      address:
        "https://hacker-news.firebaseio.com/v0/item/126809.json?print=pretty",
      data: {
        but: "this",
        is: "going",
        to: "be",
        urle: "encodeded asda asd"
      }
    });

    postman[Request]({
      name: "Poll option",
      id: "2e45aca5-e200-46e9-a4cd-63eaa5c98926",
      method: "COPY",
      address:
        "https://hacker-news.firebaseio.com/v0/item/160705.json?print=pretty",
      data: {
        question: "unknown",
        answer: "42"
      }
    });
  });

  group("Live data", function() {
    postman[Request]({
      name: "Max Item ID",
      id: "f482409f-08a3-4751-9d57-d78c56f3c4ff",
      method: "GET",
      address:
        "https://hacker-news.firebaseio.com/v0/maxitem.json?print=pretty",
      data: {}
    });

    postman[Request]({
      name: "Item and profile changes",
      id: "0e21596f-8256-478c-af52-1875e18bf64d",
      method: "GET",
      address:
        "https://hacker-news.firebaseio.com/v0/updates.json?print=pretty",
      data: {}
    });

    postman[Request]({
      name: "Current top 100 stories",
      id: "b6147cf1-8852-4715-a527-912ad29ad571",
      method: "GET",
      address:
        "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty",
      data: {}
    });
  });

  group("Users", function() {
    postman[Request]({
      name: "User",
      id: "d6624400-b2c9-4fd8-9162-7eb0492c0db1",
      method: "GET",
      address:
        "https://hacker-news.firebaseio.com/v0/user/jl.json?print=pretty",
      data: {
        but: "this",
        is: "going",
        to: "be",
        urle: "encodeded asda asd"
      }
    });
  });
}

export function handleSummary(data) {
  return {
    "summary/result.html": htmlReport(data),
    stdout: textSummary(data, { indent: " ", enableColors: true }),
    'summary/summary.json': JSON.stringify(data)
  };
}