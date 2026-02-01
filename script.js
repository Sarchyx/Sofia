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

document.addEventListener("DOMContentLoaded", () => {
  const inputs = document.querySelectorAll(".digit")
  const lock = document.querySelector(".lock")
  const unlockBtn = document.querySelector(".unlock-btn")
  const flashCircle = document.getElementById("flash-circle")
  const unlockSound = document.getElementById("unlock-sound")
  unlockSound.volume = .1

  const correctCode = "0627"

  // ─────────────────────────────
  // CONFIGURACIÓN INICIAL
  // ─────────────────────────────
  inputs.forEach((input, index) => {
    input.value = ""
    input.disabled = index !== 0
    input.inputMode = "numeric"
  })

  updateGlow()

  // ─────────────────────────────
  // INPUTS: SOLO NÚMEROS + AUTOFOCUS
  // ─────────────────────────────
  inputs.forEach((input, index) => {

    input.addEventListener("input", () => {
      input.value = input.value.replace(/[^0-9]/g, "")

      if (input.value && index < inputs.length - 1) {
        inputs[index + 1].disabled = false
        inputs[index + 1].focus()
      }

      updateGlow()
    })

    input.addEventListener("keydown", (e) => {
      if (e.key === "Backspace" && !input.value && index > 0) {
        inputs[index - 1].value = ""
        inputs[index - 1].focus()
        inputs[index].disabled = true
        updateGlow()
      }
    })
  })

  function fadeOutAudio(audio, duration = 1000) {
    const step = audio.volume / (duration / 50)

    const fade = setInterval(() => {
      audio.volume = Math.max(0, audio.volume - step)
      if (audio.volume <= 0) {
        clearInterval(fade)
        audio.pause()
      }
    }, 50)
  }


  // ─────────────────────────────
  // EFECTO DE BRILLO PROGRESIVO
  // ─────────────────────────────
  function updateGlow() {
    lock.classList.remove("glow-1", "glow-2", "glow-3", "glow-4")

    const filled = [...inputs].filter(i => i.value).length
    if (filled > 0) lock.classList.add(`glow-${filled}`)
  }

  // ─────────────────────────────
  // BOTÓN UNLOCK → WOW SEQUENCE
  // ─────────────────────────────

  unlockBtn.addEventListener("click", () => {
    const enteredCode = [...inputs].map(i => i.value).join("")
    if (enteredCode !== correctCode) return

    // SOUND


    // SHAKE
    lock.classList.add("open")

    setTimeout(() => {
      // POSICIÓN EXACTA DEL CANDADO
      const rect = lock.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      flashCircle.style.left = `${centerX}px`
      flashCircle.style.top = `${centerY}px`

      // TAMAÑO GIGANTE (IMPOSSIBLE DE FALLAR)
      const maxSize = Math.max(window.innerWidth, window.innerHeight) * 3

      flashCircle.style.width = `${maxSize}px`
      flashCircle.style.height = `${maxSize}px`

      unlockSound.currentTime = 0
      unlockSound.play()
      setTimeout(() => {
        fadeOutAudio(unlockSound, 1200)
      }, 1200)

      // REDIRECCIÓN
      setTimeout(() => {
        window.location.href = "secret.html"
      }, 2400)

    }, 1500)
  })


})
