song1_status="";
song2_status="";
song1="";
song2="";

leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;

scoreRightWrist=0;
scoreLeftWrist=0;

function preload(){
    song1=loadSound("musichp.mp3");
    song2=loadSound("music2pp.mp3");
}
function setup(){
    canvas=createCanvas(600, 500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function modelLoaded(){
    console.log("Model has been loaded!")
}
function gotPoses(results){
if(results.length>0){
    console.log(results);
    leftWristX=results[0].pose.leftWrist.x;
    leftWristY=results[0].pose.leftWrist.y;

    rightWristX=results[0].pose.rightWrist.x;
    rightWristY=results[0].pose.rightWrist.y;

    scoreLeftWrist=results[0].pose.keypoints[9].score;
    scoreRightWrist=results[0].pose.keypoints[10].score;

}
}
function draw(){
    image(video, 0, 0, 600, 500);
    fill("#FF0000");
    stroke("#FF0000");
    
    song1_status=song1.isPlaying();
    song2_status=song2.isPlaying();

    if(scoreLeftWrist >0.2)
    {
        circle(leftWristX, leftWristY, 20);
        song2.stop();

        if(song1_status==false){
            song1.play();

            document.getElementById("song").innerHTML="Harry Potter";
        }
    }
    

    if(scoreRightWrist >0.2)
    {
        circle(rightWristX, rightWristY, 20);
        song1.stop();

        if(song2_status==false){
            song2.play();

            document.getElementById("song").innerHTML="Peter Pan";

        }
    }
}
function play(){
    song1.play();
    song1.setVolume(1);
    song1.rate();
}