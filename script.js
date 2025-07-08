document.addEventListener('DOMContentLoaded', () => {
    const quoteText = document.querySelector('.quote')
    const quoteBtn = document.querySelector('button')
    const authorName = document.querySelector('.author .name')
    const soundBtn = document.querySelector('.sound')
    const copyBtn = document.querySelector('.copy')
    const facebookBtn = document.querySelector('.facebook')

    quoteBtn.addEventListener('click', () => {
        quoteBtn.classList.add("loading")
        quoteBtn.innerText = "Loading Quote..."
        fetch('https://quotes-api-self.vercel.app/quote')
        .then(response => response.json())
        .then(result => {
            console.log(result)
            quoteText.innerText = result.quote
            authorName.innerText = result.author
            quoteBtn.classList.remove("loading")

        })
        .catch(error => {
            console.error('Error:', error)
            quoteText.innerText = "Failed to load quote"
        })
        .finally(() => {
            quoteBtn.innerText = "New Quote"
        })
    })

    soundBtn.addEventListener('click', () => {
        let utterance = new SpeechSynthesisUtterance(`${quoteText.innerText} by ${authorName.innerText}`)
        speechSynthesis.speak(utterance)
    })

    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(quoteText.innerText)
    })

    facebookBtn.addEventListener('click', () => {
        const facebookURL = "https://www.facebook.com/"
        window.open(facebookURL, "_blank")
    })

    console.log("Quote of the day loaded!")
})