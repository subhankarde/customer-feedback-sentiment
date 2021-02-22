import AWS from 'aws-sdk';
const comprehend = new AWS.Comprehend();
async function computeSentiment(event, context) {
    //Date, Account Number
    const listOftext = event.processRecords.map((record) => record.text)
    console.log(event)
    const sentimentParams = {
        LanguageCode: 'en',
        TextList: listOftext
    };

    console.log(sentimentParams);

    //Analyze the sentiment
    const { ErrorList, ResultList } = await comprehend.batchDetectSentiment(sentimentParams).promise()
    let result = [];
    if (ErrorList.length === 0) {
        result = ResultList.map((res, index) => {
            return {
                accountNumber: event.processRecords[index].account_number,
                feedback: event.processRecords[index].text,
                sentiment: res.Sentiment
            }
        })
    }

    console.log(result);

    return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Hello from CIAO World!' }),
    };
}

export const handler = computeSentiment;