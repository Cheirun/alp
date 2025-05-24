
async function capture() {
  const canvas = document.createElement("canvas");
  const video = document.getElementById("video");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext("2d").drawImage(video, 0, 0);
  const image = canvas.toDataURL("image/jpeg");

  const res = await fetch('/api/emotion', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ image })
  });

  const data = await res.json();
  document.getElementById("feedback").innerText = `Detected Emotion: ${data.emotion}`;
}
navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => document.getElementById("video").srcObject = stream);
