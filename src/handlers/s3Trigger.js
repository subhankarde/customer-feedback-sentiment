import AWS from 'aws-sdk';
import util from 'util';

const s3 = new AWS.S3();
const stepFunctions = new AWS.StepFunctions();

async function s3Trigger(event, context, callback) {

  // Read options from the event parameter.
  console.log("Reading options from event:\n", util.inspect(event, { depth: 5 }));
  const srcBucket = event.Records[0].s3.bucket.name;
  // Object key may have spaces or unicode non-ASCII characters.
  const srcKey = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, " "));
  console.log(`Bucket ${srcBucket} : FileName ${srcKey}`);

  const fileObject = {
    fileName: srcKey,
    bucketName: srcBucket
  };

  let params = {
    stateMachineArn: process.env.statemachine_arn,
    input: JSON.stringify(fileObject)
  }

  const request = await stepFunctions.startExecution(params).promise();
  request.executionArn
}

export const handler = s3Trigger;