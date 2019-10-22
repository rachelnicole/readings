let classifier;
let video;
let resultsP;
let label = '';
let imageModel = './my_model/model.json';

function preload() {
  video = createCapture(VIDEO);
  video.size(320, 240);
  video.hide();
  classifier = ml5.imageClassifier(imageModel); 
}

function setup() {
  createCanvas(320, 240);
  resultsP = createP('waiting');
  classifyVideo();
}

function draw() {
  image(video, 0,0);
  
  if (label == '0') {
    fill(255, 0, 0);
    ellipse(100, 100, 50);
  }
}

// Get a prediction for the current video frame
function classifyVideo() {
  classifier.classify(video, gotResult);
}

// When we get a result
function gotResult(err, results) {
  // The results are in an array ordered by confidence.
  console.log(results[0]);
  label = results[0].label;
  resultsP.html(label);
  classifyVideo();
}
