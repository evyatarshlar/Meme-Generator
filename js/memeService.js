'use strict'

// dbdefoult+nsme,data img+ data gmem

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'Enter text',
            font: 'impact',
            size: 50,
            color: 'red',
            lineColor: 'black',
            rotate: 0,
            pos: { x: 200, y: 30 },
        }
    ]
}

function saveToStorage(key, val) {
    const strVal = JSON.stringify(val)
    localStorage.setItem(key, strVal)
}

function loadFromStorage(key) {
    var val = localStorage.getItem(key)
    return JSON.parse(val)
}
const STORAGE_MEME_KEY = 'memeDB'
const STORAGE_IMG_DATA_KEY = 'imgdataDB'

var gPics = loadFromStorage(STORAGE_IMG_DATA_KEY) || []
var gMemes = loadFromStorage(STORAGE_MEME_KEY) || []



function getMeme() {
    return gMeme
}

function setLineTxt(txt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt
}

function setRotate(r) {
    gMeme.lines[gMeme.selectedLineIdx].rotate = r
}

function setFont(clickedFont) {
    let currMeme = gMeme.lines[gMeme.selectedLineIdx]
    switch (clickedFont) {
        case 'IMPACT':
            currMeme.font = 'impact'
            break
        case 'ARIAL':
            currMeme.font = 'arial'
            break
        case 'TIME NEW':
            currMeme.font = 'Times New Roman'
            break
        case 'LECKERLI':
            currMeme.font = 'leckerli'
            break
        case 'GARAMOND':
            currMeme.font = 'garamondB'
            break
    }
}

function addLine(imuji) {
    var line = _createLine(imuji)
    gMeme.lines.push(line)
    if (gMeme.lines.length !== 1) gMeme.selectedLineIdx++
    _saveMemeToStorage()
    return line
}

function _createLine(imuji = 'Enter text') {
    return {
        txt: imuji,
        size: 50,
        color: 'blue',
        lineColor: 'green',
        pos: { x: gElCanvas.width / 2, y: gElCanvas.height / 2 },
        rotate: 0,
        font: 'impact',
        isTaken: false,
    }
}

function swichLine() {
    if (gMeme.selectedLineIdx === gMeme.lines.length - 1) {
        gMeme.selectedLineIdx = 0
    } else {
        gMeme.selectedLineIdx++
    }
}

///from gallery controller

function setImg(elimg ,idx = makeId()) {
    gMeme.selectedImgId = idx
    renderMeme(elimg) ////controller?
}

function removLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
    gMeme.selectedLineIdx = 0
}


/////////////////////////////////////////////////////////


function getPics() {
    return gPics
}

function removePic(picId) {
    const picIdx = gPics.findIndex(pic => picId === pic.id)
    gPics.splice(picIdx, 1)
    const memeIdx = gMemes.findIndex(meme => picId === meme.selectedImgId)
    gMemes.splice(memeIdx,1)
    _saveDataToStorage()
}

function addPic(data) {
    var pic = _createPic(data)
    gPics.unshift(pic)
    gMeme.srcImg = gImgs[gMeme.selectedImgId-1].url
    gMeme.selectedImgId = pic.id
    gMemes.push(gMeme)
    _saveDataToStorage()
    _saveMemeToStorage()
    return pic
}

function _createPic(data) {
    return {
        id: makeId(),
        pic: data,
    }
}
function getPicById(picId) {
    return gPics.find(pic => picId === pic.id)
}

function _saveMemeToStorage() {
    saveToStorage(STORAGE_MEME_KEY, gMemes)
}

function _saveDataToStorage() {
    saveToStorage(STORAGE_IMG_DATA_KEY, gPics)
}

function makeId(length = 6) {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    var id = ''

    for (var i = 0; i < length; i++) {
        id += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return id
}

function moveText(dx, dy) {
    gMeme.lines[gMeme.selectedLineIdx].pos.x += dx
    gMeme.lines[gMeme.selectedLineIdx].pos.y += dy
}