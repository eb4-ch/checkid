//to implements
const Rekognition = require('node-rekognition')
var FileReader = require('filereader');
var fs = require("fs"); 
 // Set your AWS credentials
const AWSParameters = {
    "accessKeyId": "",
    "secretAccessKey": "",
    "region": "eu-west-1",
    //"bucket": "arn:aws:s3:::checkid",
    "bucket": "checkid",
    //"ACL": "XXX" // optional
}
 const rekognition = new Rekognition(AWSParameters)
 exports.f = async function (req, res) {
    // start real code
    // var images = req.files;
    var images = new Array(req.files.length);
    req.files.forEach(file => {
        images.push(getBase64(file));
    });
    // console.log('------ first test -------');
    // console.log(images);
    // console.log('------ second test -------');
    // console.log(images[0]);
    // console.log('------ finish test -------');
    if (images !== undefined && images.length == 2) {
        const idImage = await rekognition.detectFaces(images[0])
        .catch(function (err) {
            console.log(err);
        });
        if (idImage.FaceDetails !== undefined && idImage.FaceDetails.length === 1) {
            const selfieImage = await rekognition.detectFaces(images[1]);
            if (idImage.FaceDetails !== undefined && idImage.FaceDetails.length === 1) {
                const faceMatches = await rekognition.compareFaces(sourceImage, targetImage, threshold);
                console.log('Face: ' + faceMatches);
                return res.status(200).send([{result: faceMatches}]);
            }
        } else {
            console.log('Second image not have human face or it is undefined');
            return res.status(400).send({});
        }
    } else {
        console.log('First image not have human face or it is undefined');
        return res.status(400).send({});
    }
    //end real code
    
    
    // return res.status(400).send({});    
};

function getBase64(file) {
    var reader = new FileReader();
    var result = {};
    reader.readAsDataURL(file);
    reader.onload = function () {
      console.log('base64 converted: ', reader.result);
      result = reader.result;
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
    return result;
 }