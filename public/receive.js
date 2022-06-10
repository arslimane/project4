function startv(streamerid){
const peer2 = new Peer();
const v2 = document.getElementById("video-recived");



peer2.on("call", (call) => {
  call.on("stream", (remoteStream) => {
    v2.srcObject = remoteStream;
  
    v2.onloadedmetadata = function(e) {
      v2.play();
    };
  })
  call.answer(null);
});

peer2.on('open', () => {
  var con=peer2.connect(streamerid);
});

}
