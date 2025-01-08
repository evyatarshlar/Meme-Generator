'use strict'

let gElCanvas
let gCtx

var gImgs = [{ id: 1, url: 'img/1.jpg', keywords: ['funny', 'cat'] }]

var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }


function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
}

function renderMeme(meme) {
    console.log('meme', meme)
    // const meme = getMeme()
    // gElCanvas.height = (img.naturalHeight / img.naturalWidth) * gElCanvas.width
    gCtx.drawImage(meme, 0, 0, gElCanvas.width, gElCanvas.height)
}

function onSelectMeme(elmeme) {
    renderMeme(elmeme)
}
