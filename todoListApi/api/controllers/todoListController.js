//to implements

const Rekognition = require('node-rekognition')
var fs = require("fs"); 

// Set your AWS credentials
const AWSParameters = {
    "accessKeyId": "AKIAJN3JZQKPQ4FJRAYA",
    "secretAccessKey": "CnYeZ6W+GLHvtnx9bOZzYxlWQ20tkrWhS0lKWnsJ",
    "region": "eu-west-1",
    //"bucket": "arn:aws:s3:::checkid",
    "bucket": "checkid",
    //"ACL": "XXX" // optional
}




const rekognition = new Rekognition(AWSParameters)

exports.f = async function (req, res, next) {
    var encodeImage = req.body;
    console.log('body is: ' + encodeImage);
    const result = await rekognition.detectFaces(encodeImage)
    .catch(function (err) {
        console.log(err);
    });
    if (result.FaceDetails !== undefined && result.FaceDetails.length === 1) {
        console.log('There is only a person in the picture');
        const result2 = await rekognition.indexFaces('test', encodeImage);
        return res.status(200).send([{result: result}, {result2: result2}]);
    }
    
    return res.status(200).send({result: result});
};

// exports.f =  function (req, res, next) {
//     fs.readFile('image/test2.jpg', async function(err, data) {
//         if (err) throw  err;
//         var encodeImage = new Buffer(data, 'binary');
//         // const imageFaces = await rekognition.detectFaces(encodeImage);
//         //const result = await rekognition.indexFaces('test', encodeImage);
//         //const result = await rekognition.listFaces('test');
//         const result = await rekognition.detectFaces(encodeImage)
//         .catch(function (err) {
//             console.log(err);
//         });
//         if (result.FaceDetails !== undefined && result.FaceDetails.length === 1) {
//             console.log('There is only a person in the picture');
//             const result2 = await rekognition.indexFaces('test', encodeImage);
//             return res.status(200).send([{result: result}, {result2: result2}]);
//         }
        
//         return res.status(200).send({result: result});
//     }) 
// };
