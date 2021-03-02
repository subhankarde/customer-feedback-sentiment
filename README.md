## Customer feedback sentiment analysis using AWS Comprehend, Lambda orchestrated by Step Function build with Serverless Framework. The results are stored in DynamoDB

- The user uploads a CSV file with the feedback to S3
- There are two language EN & ES in which the customer had given their feedback
- S3 triggers a Lambda to read the file
- Step Function does batch processing of the feedback by language using AWS Comprehend
- This application inspects a batch of documents and returns an inference of the prevailing sentiment, POSITIVE, NEUTRAL, MIXED, or NEGATIVE, in each one
- The processed files are copied to another S3 bucket
- The number of documents in the request has a limit of 25

## Future enhancement

- Generate customer sentiment from the call recording with the IVR
- Use AWS Transcribe to convert it into text and then use the above flow
