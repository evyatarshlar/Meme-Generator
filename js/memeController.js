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

    const img = new Image()
    img.src = `meme-imgs/meme-imgs(square)/${meme.selectedImgId}.jpg`
    img.onload = () => {
        renderImg(img)
        meme.lines.forEach(line => {
            const { txt, size, color, lineColor, pos } = line
            drawText(txt, size, color, lineColor, pos.x, pos.y)
        })
        selectedLineFram()
    }
}

function renderImg(img) {
    gElCanvas.height = (img.naturalHeight / img.naturalWidth) * gElCanvas.width
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
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
    gCtx.closePath()
}

function selectedLineFram() {
    const meme = getMeme()
    if (meme.lines.length === 0) return
    const { txt, size, pos } = meme.lines[meme.selectedLineIdx]
    gCtx.beginPath()
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'black'
    const posX =  (gCtx.measureText(txt).width) + 10 
    const posY = size + 10
    gCtx.strokeRect(pos.x - (posX / 2), pos.y - (posY / 2), posX, posY)
    gCtx.closePath()
}

function onTxtInput(txt) {
    setLineTxt(txt)
    renderMeme()
}

function onSetFillColor(color) {
    const meme = getMeme()
    meme.lines[meme.selectedLineIdx].color = color
    renderMeme()
}

function onSetLineColor(color) {
    const meme = getMeme()
    meme.lines[meme.selectedLineIdx].lineColor = color
    renderMeme()
}

function onFontSize(size) {
    const meme = getMeme()
    meme.lines[meme.selectedLineIdx].size += size
    renderMeme()
}

function onDownloadImg(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}

function onAddLine() {
    addLine()
    renderMeme()
}

function onSwichLine() {
    swichLine()
    renderMeme()
}


function getEvPos(ev) {
    const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }

    if (TOUCH_EVS.includes(ev.type)) {
        // Prevent triggering the mouse ev
        ev.preventDefault()
        // Gets the first touch point
        ev = ev.changedTouches[0]
        // Calc the right pos according to the touch screen
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
        }
    }
    return pos
}

function onDown(ev) {
    const clickedPos = getEvPos(ev)
    // const { offsetX, offsetY, clientX, clientY } = ev
    const meme = getMeme()
    const lineClikced = meme.lines.find(line => {
        const txtWidth = (gCtx.measureText(line.txt).width)
        return clickedPos.x > line.pos.x - (txtWidth / 2) &&
            clickedPos.x < line.pos.x + (txtWidth / 2) &&
            clickedPos.y > line.pos.y - (line.size / 2) &&
            clickedPos.y < line.pos.y + (line.size / 2)
    })
    if (!lineClikced) return
    else    meme.selectedLineIdx = meme.lines.findIndex(line => lineClikced.pos === line.pos)
  renderMeme()
}

function onDrow(ev) {

}
function onUp() {

}

function onRemovLine(){
    removLine()
    renderMeme()
}

function onGallery(){
    const elgallery = document.querySelector('gallery')
    elgallery.removeAttribute('hidden')
}