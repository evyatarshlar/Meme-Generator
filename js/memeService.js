'use strict'

var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 50,
            color: 'red',
            lineColor : 'black'
        }
    ]
}

function getMeme() {
    return gMeme
}

function setLineTxt(txt) {
    gMeme.lines[0].txt = txt
    renderMeme()
}

function setImg(img){
    renderMeme(img)
}