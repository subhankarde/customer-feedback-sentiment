import AWS from 'aws-sdk';
function iterator(event, context, callback) {
    //console.log(JSON.stringify(event, null, 2));

    let length = event.records.length
    let count = event.counter;
    let records = event.records
    let processRecords = [];
    let contStep = true;
    const recordsToProcess = process.env.NUMBER_OF_RECORDS_TO_PROCESS

    if (length === 0) {
        contStep = false;
    }
    else if (length > recordsToProcess) {
        processRecords = records.slice(0, recordsToProcess);
        records = records.slice(count, length)
        count = length - recordsToProcess;
    } else {
        processRecords = records;
        records = [];
    }
    callback(null, {
        processRecords,
        counter: count,
        records,
        languageCode: event.languageCode,
        continue: contStep
    })
}

export const handler = iterator;