// frontend/script.js
const video = document.getElementById("video");
const result = document.getElementById("result");

// Start webcam
navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
  video.srcObject = stream;
});

// Capture image every 3 seconds and send to backend
setInterval(async () => {
  const canvas = document.createElement("canvas");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext("2d").drawImage(video, 0, 0);
  
  const dataURL = canvas.toDataURL("image/jpeg");
  
  const res = await fetch("http://localhost:8000/predict", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ image: dataURL })
  });

  const json = await res.json();
  result.innerText = `😊 Emotion: ${json.prediction}`;
}, 3000);
