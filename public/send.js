
async function sendv(streamerid){
console.log(streamerid);
const peer1=new Peer(streamerid); 
var MediaStream;
var MediaStream1;   
var streamf=document.getElementById("streamf");
var streamc=document.getElementById("streamc");
streamf.addEventListener("click", ()=>{on1(peer1);});  
streamc.addEventListener("click", ()=>{on(peer1)})  
}   
          
 async function startCapture(displayMediaOptions,peer1) {
          let stream = null;
        
          try {
          stream = await  navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
          var v1=document.getElementById("video-send");
           v1.srcObject=stream;
           MediaStream1 = stream.getTracks();
         
     
    
           v1.play();
          
          // var encrypted =  CryptoJS.AES.encrypt(JSON.stringify({ stream }),key);
           peer1.on('connection', (conn) => {
           conn.on('open', (data) => {
            // when a listener connects, call them!
            var message="hello";
            peer1.call(
              conn.peer,
              stream
            )
          });
        });
          } catch(err) {
            console.error("Error: " + err);
          }
          return stream;
        }



       
       


       async  function Startstreamcam(displayMediaOptions,peer1){
        navigator.getUserMedia = navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia;

if (navigator.getUserMedia) {
  try {
    navigator.getUserMedia({ audio: true, video: { width: 6000, height:1000 } },
      function(stream) {
      
      var video = document.getElementById('video-send');
      video.srcObject = stream;
      MediaStream = stream.getTracks();
      peer1.on('connection', (conn) => {
        console.log("connect");
        conn.on('open', (data) => {
           console.log("send data");
         // when a listener connects, call them!
     
         peer1.call(
           conn.peer,
           stream
         )
       });
     });
      video.onloadedmetadata = function(e) {
      video.play();
      };
      },
      function(err) {
      console.log("L'erreur suivante s'est produite : " + err.name);
      }
      );
   
    
    } catch(err) {
      console.error("Error: " + err);
    }
   
  




} else {
console.log("getUserMedia n'est pas pris en charge");
}

}



function on(peer1){
  if(streamc.innerText=="Stop streaming"){
    try{
     // peer1.close();
      }catch(err){
        console.log("err",err)
      }

      var v1=document.getElementById("video-send");
      v1.srcObject=null;
      streamf.setAttribute("style","display:inline;");
      streamc.innerText="Stream cam";
      MediaStream.forEach(MediaStream => MediaStream.stop());
     
  }else{
  Startstreamcam({audio:true,video:{mediaSource: "screen"}},peer1);
  streamf.setAttribute("style","display:none;");
  streamc.innerText="Stop streaming";

}
}

function on1(peer1){
  if(streamf.innerText=="Stop streaming"){
    try{
     // peer1.close();
      }catch(err){
        console.log("err",err)
      }

      var v1=document.getElementById("video-send");
      v1.srcObject=null;
      streamc.setAttribute("style","display:inline;");
      streamf.innerText="Stream Screen";
      MediaStream1.forEach(MediaStream1 => MediaStream1.stop());
     
  }else{
    startCapture({audio:true,video:{mediaSource: "screen"}},peer1);
    streamc.setAttribute("style","display:none;");
    streamf.innerText="Stop streaming";

}
}




