import csv from 'csvtojson';
import AWS from 'aws-sdk';

const s3 = new AWS.S3();
async function readFeedback(event, context) {
    console.log(event);
    const params = {
        Bucket: event.bucketName,
        Key: event.fileName
    };
    const stream = s3.getObject(params).createReadStream();
    const json = await csv().fromStream(stream);
    return json;
}

export const handler = readFeedback;