// const createSurveyForm1 = {};

// const createSurveyForm2 = {};

export const surveyJSON = [
  {
    id: 1,
    title: "Product Satisfactory Survey - VB10X.co",
    description: "Managed by OKR Portal Team, Valuebound",
    logoPosition: "right",
    completedHtml:
      "<h3>Thank you for your feedback.</h3><h5>Your thoughts and ideas will help us to create a great product!</h5>",
    completedHtmlOnCondition: [
      {
        expression: "{nps_score} > 8",
        html: "<h3>Thank you for your feedback.</h3><h5>We glad that you love our product. Your ideas and suggestions will help us to make our product even better!</h5>",
      },
      {
        expression: "{nps_score} < 7",
        html: "<h3>Thank you for your feedback.</h3><h5> We are glad that you share with us your ideas.We highly value all suggestions from our customers. We do our best to improve the product and reach your expectation.</h5><br />",
      },
    ],
    pages: [
      {
        name: "page1",
        description: "Internal Survey - Product Feedback",
        elements: [
          {
            type: "rating",
            name: "nps_score",
            title:
              "On a scale of zero to ten, how likely are you to recommend our product to a friend or colleague?",
            isRequired: true,
            rateMin: 0,
            rateMax: 10,
            minRateDescription: "(Most unlikely)",
            maxRateDescription: "(Most likely)",
          },
          {
            type: "checkbox",
            name: "promoter_features",
            visible: true,
            visibleIf: "{nps_score} >= 9",
            title: "Which features do you value the most?",
            isRequired: true,
            validators: [
              {
                type: "answercount",
                text: "Please select two features maximum.",
                maxCount: 2,
              },
            ],
            choices: [
              "Performance",
              "Stability",
              "User Interface",
              "Complete Functionality",
            ],
            hasOther: true,
            otherText: "Other feature:",
            colCount: 2,
          },
          {
            type: "comment",
            name: "passive_experience",
            visible: true,
            visibleIf: "{nps_score} > 6  and {nps_score} < 9",
            title: "What do you like about our product?",
          },
          {
            type: "comment",
            name: "disappointed_experience",
            visible: true,
            visibleIf: "{nps_score} notempty",
            title:
              "What do you miss or find disappointing in your experience with our products?",
          },
        ],
      },
    ],
    showQuestionNumbers: "on",
  },
  {
    id: 2,
    title: "Product Feedback Survey - VB10X.co",
    description: "Managed by OKR Portal Team, Valuebound",
    pages: [
      {
        description: "Internal Survey - Product Feedback",
        elements: [
          {
            type: "matrix",
            name: "Quality",
            title:
              "Please indicate if you agree or disagree with the following statements",
            columns: [
              {
                value: 1,
                text: "Strongly Disagree",
              },
              {
                value: 2,
                text: "Disagree",
              },
              {
                value: 3,
                text: "Neutral",
              },
              {
                value: 4,
                text: "Agree",
              },
              {
                value: 5,
                text: "Strongly Agree",
              },
            ],
            rows: [
              {
                value: "affordable",
                text: "Product is affordable",
              },
              {
                value: "does what it claims",
                text: "Product does what it claims",
              },
              {
                value: "better then others",
                text: "Product is better than other products on the market",
              },
              {
                value: "easy to use",
                text: "Product is easy to use",
              },
            ],
          },
          {
            type: "rating",
            name: "satisfaction",
            title: "How satisfied are you with the Product?",
            isRequired: true,
            mininumRateDescription: "Not Satisfied",
            maximumRateDescription: "Completely satisfied",
          },
          {
            type: "rating",
            name: "recommend friends",
            visibleIf: "{satisfaction} > 3",
            title:
              "How likely are you to recommend the Product to a friend or co-worker?",
            mininumRateDescription: "Will not recommend",
            maximumRateDescription: "I will recommend",
          },
          {
            type: "comment",
            name: "suggestions",
            title: "What would make you more satisfied with the Product?",
          },
        ],
      },
      {
        elements: [
          {
            type: "radiogroup",
            name: "price to competitors",
            title: "Compared to our competitors, do you feel the Product is",
            choices: [
              "Less expensive",
              "Priced about the same",
              "More expensive",
              "Not sure",
            ],
          },
          {
            type: "radiogroup",
            name: "price",
            title: "Do you feel our current price is merited by our product?",
            choices: [
              "correct|Yes, the price is about right",
              "low|No, the price is too low for your product",
              "high|No, the price is too high for your product",
            ],
          },
          {
            type: "multipletext",
            name: "pricelimit",
            title: "What is the... ",
            items: [
              {
                name: "mostamount",
                title:
                  "Most amount you would every pay for a product like ours",
              },
              {
                name: "leastamount",
                title: "The least amount you would feel comfortable paying",
              },
            ],
          },
        ],
      },
      {
        elements: [
          {
            type: "text",
            name: "email",
            title:
              "Thank you for taking our survey. Your survey is almost complete, please enter your email address in the box below if you wish to participate in our drawing, then press the 'Submit' button.",
          },
        ],
      },
    ],
  },
];

// export const surveyJSON = { createSurveyForm };
