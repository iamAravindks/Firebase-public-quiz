const functions = require('firebase-functions');
const gcs = require('@google-cloud/storage')();
const { Storage } = require('@google-cloud/storage')
// const gcs = new Storage()
// const os = require('os');
// const path = require('path');

// // // Create and Deploy Your First Cloud Functions
// // // https://firebase.google.com/docs/functions/write-firebase-functions
// //
// exports.onFilechange = functions.storage.object().onFinalize(event => {
//     // console.log(event)

//    // const object = event.data
//     const bucket = event.bucket
//     const contentType = event.contentType
//     const filePath = event.name
//     console.log('file change detected ,funtion exection started')

//     if (path.basename(filePath).startsWith('renamed-')) {
//         console.log('we already renamed it')
//         return;
//     }

//     const destBucket = gcs.bucket(bucket)
//     const tmpFilePath = path.join(os.tmpdir(), path.basename(filePath))
//     const metadata = { contentType: contentType }
//     destBucket.file(filePath).download({
//         destination: tmpFilePath
//     }
    
//     ).then(() => {
//         destBucket.upload(tmpFilePath, {
//             destination: 'renamed-'+ path.basename(filePath),
//             metadata: metadata


//         })
//         return console.log('sucess')

//     })
//         .catch(err => { console.log(err) })




// });
