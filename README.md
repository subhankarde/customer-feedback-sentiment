## Customer feedback sentiment analysis using AWS Comprehend, Lambda orchestrated by Step Function build with Serverless Framework. The results are stored in DynamoDB

- The user uploads a CSV file with the feedback to S3
- There are two language EN & ES in which the customer had given their feedback
- S3 triggers a Lambda to read the file
- Step Function does batch processing of the feedback by language using AWS Comprehend
- This application inspects a batch of documents and returns an inference of the prevailing sentiment, POSITIVE, NEUTRAL, MIXED, or NEGATIVE, in each one
- The processed files are copied to another S3 bucket
- The number of documents in the request has a limit of 25

### Sample CSV file

datetime,account_number,language_code,text

- 2/12/01,333,en,you are awesome
- 2/13/01,375,es,Eres asombroso

![image](https://user-images.githubusercontent.com/14083152/109671867-74a59a00-7b42-11eb-84e0-61890c6c0d8a.png)

## Future enhancement

- Generate customer sentiment from the call recording with the IVR
- Use AWS Transcribe to convert it into text and then use the above flow
