'use strict'

var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 30,
            color: 'red',
            lineColor: 'black',
            pos: { x: 200, y: 30 }
        }
    ]
}

function getMeme() {
    return gMeme
}

function setLineTxt(txt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt
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
        size: 30,
        color: 'blue',
        lineColor: 'green',
        pos: { x: gElCanvas.width / 2, y: gElCanvas.height / 2 }
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
