'use strict'

let gElCanvas
let gCtx

var gImgs = [{ id: 1, url: 'img/1.jpg', keywords: ['funny', 'cat'] }]

var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }


function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
    renderMeme()
}

function renderMeme() {
    const meme = getMeme()
    const img = new Image()
    img.src = `meme-imgs/meme-imgs(square)/${meme.selectedImgId}.jpg`
    img.onload = () => {
        renderImg(img)
        drawText(meme.lines[0].txt, meme.lines[0].size, meme.lines[0].color ,gElCanvas.width / 2, gElCanvas.height / 2)
    }
}

function renderImg(img) {
    gElCanvas.height = (img.naturalHeight / img.naturalWidth) * gElCanvas.width
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
}

function onSelectMeme(elmeme) {
    renderImg(elmeme)
}

function onTxtInput(txt){
    setLineTxt(txt)
}

function drawText(text, size, color, x, y) {
    gCtx.beginPath()
    gCtx.lineWidth = 1
    gCtx.strokeStyle = 'brown'
    gCtx.fillStyle = color
    gCtx.font = `${size}px Arial`
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'

    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)

    // gCtx.strokeStyle = 'black'
    // gCtx.strokeRect(x * 0.76, y * 0.87, text.length * 22, 50)
    gCtx.closePath()
}