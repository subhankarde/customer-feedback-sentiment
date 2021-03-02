import AWS from 'aws-sdk';
import { v4 as uuid } from 'uuid';
const comprehend = new AWS.Comprehend();
const dynamoDBClient = new AWS.DynamoDB.DocumentClient()

async function computeSentiment(event, context) {

    const listOftext = event.processRecords.map((record) => record.text)

    const sentimentParams = {
        LanguageCode: event.languageCode,
        TextList: listOftext
    };

    //Analyze the sentiment
    const { ErrorList, ResultList } = await comprehend.batchDetectSentiment(sentimentParams).promise()
    let results = [];
    if (ErrorList.length === 0) {
        results = ResultList.map((res, index) => {
            return {
                date: event.processRecords[index].date,
                accountNumber: event.processRecords[index].account_number,
                feedback: event.processRecords[index].text,
                sentiment: res.Sentiment
            }
        })
    }

    results.forEach(function (result) {
        const params = {
            TableName: process.env.CUSTOMER_FEEDBACK_TABLE,
            Item: {
                id: uuid(),
                date: result.date,
                accountNumber: result.accountNumber,
                feedback: result.feedback,
                sentiment: result.sentiment,
                languageCode: event.languageCode
            }
        };
        dynamoDBClient.put(params, function (err, data) {
            if (err) {
                console.error("Unable to add movie", result.accountNumber, ". Error JSON:", JSON.stringify(err, null, 2));
            } else {
                console.log("PutItem succeeded:", result.accountNumber);
            }
        });
    });

    return {
        statusCode: 201,
        body: JSON.stringify({ message: 'Feedback updated in DynamoDB' }),
    };
}

export const handler = computeSentiment;