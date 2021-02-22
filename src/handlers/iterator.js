import AWS from 'aws-sdk';
function iterator(event, context, callback) {
    console.log(JSON.stringify(event, null, 2));
    //console.log(JSON.stringify(event.iterator, null, 2));

    let length = event.records.length
    let count = event.counter;
    let records = event.records
    let processRecords = [];
    let contStep = true;
    if (length === 0) {
        contStep = false;
    }
    else if (length > 10) {
        processRecords = records.slice(0, 10);
        records = records.slice(count, length)
        count = length - 10;
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