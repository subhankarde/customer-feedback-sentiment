import csv from 'csvtojson';
import AWS from 'aws-sdk';
import _ from 'lodash'

const s3 = new AWS.S3();
const oldSuffix = '.csv';
async function readFeedback(event, context) {
    
    const params = {
        Bucket: event.bucketName,
        Key: event.fileName
    };
    const stream = s3.getObject(params).createReadStream();
    const json = await csv().fromStream(stream);
    const groupedData = _.groupBy(json, f => { return f.language_code });
    const newSuffix = '_' + Date.now() + '.csv';

    const destiantionBucket = 'sentiment-analysis-serverless-destination';
    const destinationBucketParams = {
        Bucket: destiantionBucket,
        CopySource: event.bucketName + '/' + event.fileName,
        Key: event.fileName.replace(oldSuffix, newSuffix)
    }

    await s3.copyObject(destinationBucketParams).promise();

    return groupedData;
}

export const handler = readFeedback;