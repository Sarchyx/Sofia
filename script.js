const startDate = new Date("2025-08-01T00:00:00"); // Change this to your real start date

function updateTimer() {
  const now = new Date();
  let diff = now - startDate;

  const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
  diff -= years * 1000 * 60 * 60 * 24 * 365;

  const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30.44));
  diff -= months * 1000 * 60 * 60 * 24 * 30.44;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  diff -= days * 1000 * 60 * 60 * 24;

  const hours = Math.floor(diff / (1000 * 60 * 60));
  diff -= hours * 1000 * 60 * 60;

  const minutes = Math.floor(diff / (1000 * 60));
  diff -= minutes * 1000 * 60;

  const seconds = Math.floor(diff / 1000);

  function format(num) {
    return num === 0 ? "—" : String(num).padStart(2, "0");
  }

  document.getElementById("years").textContent = format(years);
  document.getElementById("months").textContent = format(months);
  document.getElementById("days").textContent = format(days);
  document.getElementById("hours").textContent = format(hours);
  document.getElementById("minutes").textContent = format(minutes);
  document.getElementById("seconds").textContent = format(seconds);
}

setInterval(updateTimer, 1000);
updateTimer();

// ❤️ "I love you" language changer
const loveText = document.getElementById("loveText");
const translations = [
  "Te amo",
  "I love you",
  "Je t’aime",
  "Ich liebe dich",
  "Ti amo",
  "Eu te amo",
  "愛してる",
  "사랑해",
  "Я тебя люблю",
  "Te iubesc",
  "Σ’ αγαπώ",
  "Ik hou van je"
];

let index = 0;
setInterval(() => {
  loveText.style.opacity = 0;
  setTimeout(() => {
    index = (index + 1) % translations.length;
    loveText.textContent = translations[index];
    loveText.style.opacity = 1;
  }, 1000);
}, 4000);

const images = document.querySelectorAll('.memory-gallery img');
images.forEach((img, i) => {
  img.style.opacity = 0;
  setTimeout(() => {
    img.style.transition = "opacity 1s ease";
    img.style.opacity = 1;
  }, 300 * i);
});

// Subtle fade & zoom slideshow
const memoryImages = document.querySelectorAll(".memory-frame img");
let currentPhoto = 0;

setInterval(() => {
  memoryImages[currentPhoto].classList.remove("active");
  currentPhoto = (currentPhoto + 1) % memoryImages.length;
  memoryImages[currentPhoto].classList.add("active");
}, 6000);

const digits = document.querySelectorAll('.digit');

digits.forEach((input, index) => {
  input.addEventListener('input', (e) => {
    const value = e.target.value;
    // Solo permite números
    if (!/^[0-9]$/.test(value)) {
      e.target.value = '';
      return;
    }
    // Pasa al siguiente campo automáticamente
    if (value && index < digits.length - 1) {
      digits[index + 1].focus();
    }
  });

  input.addEventListener('keydown', (e) => {
    // Retrocede si borras y el campo está vacío
    if (e.key === 'Backspace' && !input.value && index > 0) {
      digits[index - 1].focus();
    }
  });
});
