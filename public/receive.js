function startv(streamerid){
const peer2 = new Peer();
const v2 = document.getElementById("video-recived");
var b=document.getElementById("play");
console.log(streamerid);
console.log(b);

peer2.on("call", (call) => {
  call.on("stream", (remoteStream) => {
    console.log("in");
    v2.srcObject = remoteStream;
    b.addEventListener("click", function(){v2.play()});
    v2.onloadedmetadata = function(e) {
      v2.play();
    };
  })
  call.answer(null);
});

peer2.on('open', () => {
  console.log("connect");
  peer2.connect(streamerid);
});

}
