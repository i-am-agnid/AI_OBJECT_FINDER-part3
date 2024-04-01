Status = '';
cocossd_status = '';

function setup(){
    canvas = createCanvas(400,400);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(400,400);
    video.hide();
}

function start(){
    object_detector = ml5.objectDetector('cocossd',model_loaded);
    document.getElementById("status").innerHTML = "status: detecting objects";
    object_name = document.getElementById("input_object").value;
}

function model_loaded(){
    console.log("model loaded");
    cocossd_status = true;
}

function draw(){
    image(video,0,0,400,400)
    if(Status != ""){
        object_detector.detect(video,gotResults);
        for(i = 0;i < objects.length;i++){
            document.getElementById("status").innerHTML = "Status: Objects Detected";
            console.log(objects.ljjength);
            fill();
            percent = floor(objects[i].confidence + 100);
            text(objects[i].label + " " + percent + "%",objects[i].x + 15,objects[i].y + 15);
            noFill();
            stroke("#ff0000");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);

            if(objects[i].label == input_text){
                video.stop();
                object_detector.detect(gotResults);
                document.getElementById("found_status").innerHTML = input_text+" Found";
                var synth = window.speechSynthesis;
                var utterThis = new SpeechSynthesisUtterance(input_text)+"found";
                synth.speak(utterThis);
            }
            else{
                document.getElementById("found_status").innerHTML = input_text+" Not found";
            }
        }
    }
}
function gotResults(error,results){
    if(error){   
        console.error(error);
    }
    else{
        console.log(results);
        objects = results;
    }
}