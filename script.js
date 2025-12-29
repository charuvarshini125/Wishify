/* INTRO */
const startBtn = document.getElementById("startBtn");
const intro = document.getElementById("intro");

startBtn.addEventListener("click", () => {
  intro.classList.add("hidden");
});

/* STEPS */
const steps = document.querySelectorAll(".step");
const nextButtons = document.querySelectorAll(".next");

let currentStep = 0;

nextButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    steps[currentStep].classList.remove("active");
    currentStep++;
    steps[currentStep].classList.add("active");
  });
});

/* CAKE SELECTION */
const cakeOptions = document.querySelectorAll(".cake-option");
const selectedCake = document.getElementById("selectedCake");

cakeOptions.forEach(cake => {
  cake.addEventListener("click", () => {
    cakeOptions.forEach(c => c.classList.remove("active"));
    cake.classList.add("active");
    selectedCake.src = cake.src;
  });
});

/* INPUTS */
const toInput = document.getElementById("toInput");
const messageInput = document.getElementById("messageInput");
const fromInput = document.getElementById("fromInput");

const toText = document.getElementById("toText");
const messageText = document.getElementById("messageText");
const fromText = document.getElementById("fromText");

toInput.addEventListener("input", () => {
  toText.textContent = toInput.value || "Someone Special";
});

messageInput.addEventListener("input", () => {
  messageText.textContent =
    messageInput.value || "Your birthday card will appear here ✨";
});

fromInput.addEventListener("input", () => {
  fromText.textContent = fromInput.value || "— You";
});

/* 🎂 CARD PNG GENERATION (FIXED & RELIABLE) */
function generateCardPNG() {
  const card = document.getElementById("card");

  return html2canvas(card, {
    scale: 2,              // crisp quality
    useCORS: true,         // VERY IMPORTANT for images
    backgroundColor: null // keeps beige background clean
  }).then(canvas => {
    return canvas.toDataURL("image/png");
  });
}

/* DOWNLOAD PNG */
document.getElementById("downloadBtn").addEventListener("click", async () => {
  const pngData = await generateCardPNG();

  const link = document.createElement("a");
  link.href = pngData;
  link.download = "wishify-birthday-card.png";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});

/* SHARE PNG (IMAGE-BASED SHARE) */
document.getElementById("shareBtn").addEventListener("click", async () => {
  const pngData = await generateCardPNG();

  try {
    const blob = await (await fetch(pngData)).blob();
    const file = new File([blob], "wishify-card.png", { type: "image/png" });

    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({
        files: [file],
        title: "Wishify Birthday Card",
        text: "I made this for you 🎂"
      });
    } else {
      await navigator.clipboard.writeText(pngData);
      alert("PNG copied! Paste it anywhere to share 💌");
    }
  } catch (err) {
    alert("Sharing failed, but download works 💗");
  }
});
