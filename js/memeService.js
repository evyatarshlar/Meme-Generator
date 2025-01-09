'use strict'

var gMeme = {
    selectedImgId: null,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'Enter text',
            size: 30,
            color: 'red',
            lineColor: 'black',
            pos: { x: 200, y: 30 },
            rotate: 0,
            font: 'impact',
        }
    ]
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
        size: 30,
        color: 'blue',
        lineColor: 'green',
        pos: { x: gElCanvas.width / 2, y: gElCanvas.height / 2 },
        rotate: 0,
        font: 'impact',
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
