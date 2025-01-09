'use strict'


var gMeme = {
    selectedImgId: null,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'Enter text',
            size: 50,
            color: 'red',
            lineColor: 'black',
            pos: { x: 200, y: 30 },
            rotate: 0,
            font: 'impact',
            isTaken : false,
        }
    ]
}

const STORAGE_KEY = 'memeDB'

function saveToStorage(key, val) {
    const strVal = JSON.stringify(val)
    localStorage.setItem(key, strVal)
}

function loadFromStorage(key) {
    var val = localStorage.getItem(key)
    return JSON.parse(val)
}

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
    // _saveCarsToStorage()
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
        isTaken : false,
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

function setImg(idx) {
    gMeme.selectedImgId = idx
    renderMeme() ////controller?
}

function removLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
    gMeme.selectedLineIdx = 0
}


/////////////////////////////////////////////////////////

var gPics = loadFromStorage(STORAGE_KEY) || []

function getPics() {
    return gPics
}

function removePic(picId) {
    const picIdx = gPics.findIndex(pic => picId === pic.id)
    gPics.splice(picIdx, 1)
    _saveCarsToStorage()
}

function addPic(data) {
    var pic = _createPic(data)
    gPics.unshift(pic)

    _saveCarsToStorage()
    return pic
}

function getPicById(picId) {
    return gPics.find(pic => picId === pic.id)
}

function _createPic(data) {
    return {
        id: makeId(),
        pic : data,
    }
}

function _saveCarsToStorage() {
    saveToStorage(STORAGE_KEY, gPics)
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