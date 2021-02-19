import AWS from 'aws-sdk';
const comprehend = new AWS.Comprehend();
async function computeSentiment(event, context) {
    //Date, Account Number
    //const listOftext = event.map((a) => a.Text)
    console.log(event)
    // const sentimentParams = {
    //     LanguageCode: 'en',
    //     TextList: listOftext
    // };

    // Analyze the sentiment
    //const sentiment = await comprehend.batchDetectSentiment(sentimentParams).promise()
    //const { ResultList } = sentiment;
    //console.log(ResultList[0]);

    return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Hello from CIAO World!' }),
    };
}

export const handler = computeSentiment;