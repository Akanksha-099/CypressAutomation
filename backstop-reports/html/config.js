report({
  "testSuite": "BackstopJS",
  "tests": [
    {
      "pair": {
        "reference": "../bitmaps_reference/backstop_default_BackstopJS_Homepage_0_document_0_phone.png",
        "test": "../bitmaps_test/20240919-104516/backstop_default_BackstopJS_Homepage_0_document_0_phone.png",
        "selector": "document",
        "fileName": "backstop_default_BackstopJS_Homepage_0_document_0_phone.png",
        "label": "BackstopJS Homepage",
        "requireSameDimensions": true,
        "misMatchThreshold": 0.1,
        "url": "https://garris.github.io/BackstopJS/",
        "referenceUrl": "",
        "expect": 0,
        "viewportLabel": "phone",
        "diff": {
          "isSameDimensions": true,
          "dimensionDifference": {
            "width": 0,
            "height": 0
          },
          "misMatchPercentage": "0.00"
        }
      },
      "status": "pass"
    },
    {
      "pair": {
        "reference": "../bitmaps_reference/backstop_default_BackstopJS_Homepage_0_document_1_tablet.png",
        "test": "../bitmaps_test/20240919-104516/backstop_default_BackstopJS_Homepage_0_document_1_tablet.png",
        "selector": "document",
        "fileName": "backstop_default_BackstopJS_Homepage_0_document_1_tablet.png",
        "label": "BackstopJS Homepage",
        "requireSameDimensions": true,
        "misMatchThreshold": 0.1,
        "url": "https://garris.github.io/BackstopJS/",
        "referenceUrl": "",
        "expect": 0,
        "viewportLabel": "tablet",
        "diff": {
          "isSameDimensions": true,
          "dimensionDifference": {
            "width": 0,
            "height": 0
          },
          "misMatchPercentage": "0.00"
        }
      },
      "status": "pass"
    },
    {
      "pair": {
        "reference": "../bitmaps_reference/backstop_default_Google_Homepage_0_document_0_phone.png",
        "test": "../bitmaps_test/20240919-104516/backstop_default_Google_Homepage_0_document_0_phone.png",
        "selector": "document",
        "fileName": "backstop_default_Google_Homepage_0_document_0_phone.png",
        "label": "Google Homepage",
        "requireSameDimensions": true,
        "misMatchThreshold": 0.1,
        "url": "https://www.automationexercise.com/",
        "referenceUrl": "",
        "expect": 0,
        "viewportLabel": "phone",
        "diff": {
          "isSameDimensions": false,
          "dimensionDifference": {
            "width": 109,
            "height": -22395
          },
          "rawMisMatchPercentage": 1.0428141540610978,
          "misMatchPercentage": "1.04",
          "analysisTime": 132
        },
        "diffImage": "../bitmaps_test/20240919-104516/failed_diff_backstop_default_Google_Homepage_0_document_0_phone.png"
      },
      "status": "fail"
    },
    {
      "pair": {
        "reference": "../bitmaps_reference/backstop_default_Google_Homepage_0_document_1_tablet.png",
        "test": "../bitmaps_test/20240919-104516/backstop_default_Google_Homepage_0_document_1_tablet.png",
        "selector": "document",
        "fileName": "backstop_default_Google_Homepage_0_document_1_tablet.png",
        "label": "Google Homepage",
        "requireSameDimensions": true,
        "misMatchThreshold": 0.1,
        "url": "https://www.automationexercise.com/",
        "referenceUrl": "",
        "expect": 0,
        "viewportLabel": "tablet",
        "diff": {
          "isSameDimensions": false,
          "dimensionDifference": {
            "width": 0,
            "height": -8891
          },
          "rawMisMatchPercentage": 2.075258502432964,
          "misMatchPercentage": "2.08",
          "analysisTime": 154
        },
        "diffImage": "../bitmaps_test/20240919-104516/failed_diff_backstop_default_Google_Homepage_0_document_1_tablet.png"
      },
      "status": "fail"
    }
  ],
  "id": "backstop_default"
});