document.addEventListener("DOMContentLoaded", () => {
    const textEl = document.getElementById("typeText")
    const button = document.getElementById("startBtn")
    const song = document.getElementById("song")

    const text = "¡Felices 6 meses!"

    song.volume = 0.1
    song.loop = true

    let i = 0

    function typeWriter() {
        if (i < text.length) {
            const char = text.charAt(i)
            textEl.innerHTML += char === " " ? "&nbsp;" : char
            i++
            setTimeout(typeWriter, 120)
        } else {
            setTimeout(() => {
                button.classList.add("show")
            }, 500)
        }
    }


    typeWriter()

    button.addEventListener("click", () => {
        song.play().catch(() => { })
        document.getElementById("intro").classList.add("hide")
    })
})
