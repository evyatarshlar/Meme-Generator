'use strict'

let gElCanvas
let gCtx

var gImgs = [{ id: 1, url: 'img/1.jpg', keywords: ['funny', 'cat'] }]

var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }


function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
    resizeCanvas()
    renderMeme()
    renderGallery()
    renderPics()
}

function renderMeme() {
    const meme = getMeme()
    const img = new Image()
    img.src = `meme-imgs/meme-imgs(square)/${meme.selectedImgId}.jpg`
    img.onload = () => {
        renderImg(img)
        meme.lines.forEach(line => {
            const { txt, size, color, lineColor, pos, rotate, font } = line
            drawText(txt, size, color, lineColor, pos.x, pos.y, rotate, font)
        })
        selectedLineFram()
    }
}

function renderImg(img) {
    gElCanvas.height = (img.naturalHeight / img.naturalWidth) * gElCanvas.width
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
}

function drawText(text, size, color, line, x, y, r, font) {
    gCtx.beginPath()
    gCtx.lineWidth = 1
    gCtx.strokeStyle = line
    gCtx.fillStyle = color
    gCtx.font = `${size}px ${font}`
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'
    rotation(x, y, r)
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
    gCtx.setTransform(1, 0, 0, 1, 0, 0)
    gCtx.closePath()
}

function selectedLineFram() {
    const meme = getMeme()
    if (meme.lines.length === 0) return
    const { txt, size, pos, rotate, font } = meme.lines[meme.selectedLineIdx]
    gCtx.beginPath()
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'black'
    gCtx.font = `${size}px ${font}`
    const posX = (gCtx.measureText(txt).width) + 10
    const posY = size + 10
    rotation(pos.x, pos.y, rotate)
    gCtx.strokeRect(pos.x - (posX / 2), pos.y - (posY / 2), posX, posY)
    gCtx.setTransform(1, 0, 0, 1, 0, 0)
    gCtx.closePath()
}

function rotation(x, y, r = 0) {
    gCtx.translate(x, y)
    gCtx.rotate(r * Math.PI / 180)
    gCtx.translate(-x, -y)
}

function onRotate(r) {
    setRotate(r)
    renderMeme()
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

function onSetFont(font) {
    setFont(font)
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
        gCtx.font = `${line.size}px Arial`
        const txtWidth = (gCtx.measureText(line.txt).width)
        return clickedPos.x > line.pos.x - (txtWidth / 2) &&
            clickedPos.x < line.pos.x + (txtWidth / 2) &&
            clickedPos.y > line.pos.y - (line.size / 2) &&
            clickedPos.y < line.pos.y + (line.size / 2)
    })
    if (!lineClikced) return
    else meme.selectedLineIdx = meme.lines.findIndex(line => lineClikced.pos === line.pos)
    renderMeme()
}

function onDrow(ev) {

}
function onUp() {

}

function onRemovLine() {
    removLine()
    renderMeme()
}

function onSelectImuji(imuji) {
    addLine(imuji)
    renderMeme()
}

function onGallery() {
    const elGallery = document.querySelector('.gallery')
    elGallery.style.display = 'grid'
    const elEditor = document.querySelector('.edit-meme-layout')
    elEditor.style.display = 'none'
    const elSaved = document.querySelector('.saved-memes')
    elSaved.style.display = 'none'
}

function onSaved() {
    const elSaved = document.querySelector('.saved-memes')
    elSaved.style.display = 'grid'
    const elGallery = document.querySelector('.gallery')
    elGallery.style.display = 'none'
    const elEditor = document.querySelector('.edit-meme-layout')
    elEditor.style.display = 'none'
}

function onPositioningArrow(step) {
    const meme = getMeme()
    meme.lines[meme.selectedLineIdx].pos.y += step
    renderMeme()
}

///////////////////////////////////////////////
function onImgInput(ev) {
    loadImageFromInput(ev, renderImg)
}

function loadImageFromInput(ev, onImageReady) {
    // document.querySelector('.share-container').innerHTML = ''
    const reader = new FileReader()

    reader.onload = function (event) {
        const img = new Image()
        img.onload = () => {
            onImageReady(img)
        }
        img.src = event.target.result
    }
    reader.readAsDataURL(ev.target.files[0])
}

///////////////////////////////////////////

function onUploadImg(ev) {
    ev.preventDefault()
    const canvasData = gElCanvas.toDataURL('image/jpeg')

    // After a succesful upload, allow the user to share on Facebook
    function onSuccess(uploadedImgUrl) {
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        console.log('encodedUploadedImgUrl:', encodedUploadedImgUrl)
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}`)

        // document.querySelector('.share-container').innerHTML = `
        // <a href="${uploadedImgUrl}">Uploaded picture</a>
        // <p>Image url: ${uploadedImgUrl}</p>
        // <button class="btn-facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}')">
        //    Share on Facebook  
        // </button>`
    }

    uploadImg(canvasData, onSuccess)
}

async function uploadImg(imgData, onSuccess) {
    const CLOUD_NAME = 'webify'
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
    const formData = new FormData()
    formData.append('file', imgData)
    formData.append('upload_preset', 'webify')
    try {
        const res = await fetch(UPLOAD_URL, {
            method: 'POST',
            body: formData
        })
        const data = await res.json()
        console.log('Cloudinary response:', data)
        onSuccess(data.secure_url)

    } catch (err) {
        console.log(err)
    }
}

///////////////////////////////////////

function onResize() {
    resizeCanvas()
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.clientWidth
    renderMeme()
}


// function onDown(ev) {
//     const pos = getEvPos(ev)
//     gIsMouseDown = true
//     document.querySelector('canvas').style.cursor = 'grabbing'
// }

// function onDrow(ev) {
//     //swich case
//     if (!gIsMouseDown) return
//     const pos = getEvPos(ev)
//     if (gBrush.shape === 'square') drawRect(pos.x, pos.y)
//     else if (gBrush.shape === 'circle') drawArc(pos.x, pos.y)
//     else drawImg(pos.x, pos.y, gBrush.shape)
// }

// function onUp() {
//     gIsMouseDown = false
//     document.querySelector('canvas').style.cursor = 'grab'
// }

function renderPics() {
    var pics = getPics()
    ///shold save all "line" object too
    var strHtmls = pics.map(pic => `
  <img src="${pic.pic}" alt="" onclick="onSelectPic(this)">
  <button class="btn" onclick="onRemovePic('${pic.id}')">x</button>
`)
    document.querySelector('.saved-memes').innerHTML = strHtmls.join('')
}

function onSavePic() {
    ///shold save all "line" object too
    const imgContent = gElCanvas.toDataURL('image/jpeg')
    addPic(imgContent)
    renderPics()
    onSaved()
}

function onRemovePic(picId) {
    removePic(picId)
    renderPics()
}

function onSelectPic(elImg) {
    ///shold save all "line" object too {renderMeme()}
    renderImg(elImg)
}



