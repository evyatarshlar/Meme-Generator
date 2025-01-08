'use strict'

var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 30,
            color: 'red',
            lineColor: 'black'
        }
    ]
}

function getMeme() {
    return gMeme
}

function setLineTxt(txt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt
}

function addLine() {
    var line = _createLine()
    gMeme.lines.push(line)
    gMeme.selectedLineIdx++
    // _saveCarsToStorage()
    return line
}

function _createLine(){
    return {
        txt: 'aaa',
        size: 30,
        color: 'blue',
        lineColor: 'green'
    }
}

function swichLine(){
     if (gMeme.selectedLineIdx === gMeme.lines.length-1){
        gMeme.selectedLineIdx = 0
     }else{
        gMeme.selectedLineIdx++
     }
}

///from gallery controller

function setImg(img) {
    renderMeme(img) ////controller?
}
