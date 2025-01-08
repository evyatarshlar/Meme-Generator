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
    renderGallery()
}

function renderMeme(elImg) {
    if (elImg) return renderImg(elImg)
    const meme = getMeme()
    const { txt, size,color ,lineColor } = meme.lines[0]
    const img = new Image()
    img.src = `meme-imgs/meme-imgs(square)/${meme.selectedImgId}.jpg`
    img.onload = () => {
        renderImg(img)
        drawText(txt, size, color, lineColor, gElCanvas.width / 2, gElCanvas.height / 2)
    }
}

function renderImg(img) {
    gElCanvas.height = (img.naturalHeight / img.naturalWidth) * gElCanvas.width
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
}

function onTxtInput(txt) {
    setLineTxt(txt)
}

function drawText(text, size, color, line, x, y) {
    gCtx.beginPath()
    gCtx.lineWidth = 1
    gCtx.strokeStyle = line
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

function onDownloadImg(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}


function onSetFillColor(color){
    const meme = getMeme()
    meme.lines[0].color = color
    renderMeme()
}

function onSetLineColor(color){
    const meme = getMeme()
    meme.lines[0].lineColor = color
    renderMeme()
}

function onFontSize(size){
    const meme = getMeme()
    meme.lines[0].size += size
    renderMeme()
}