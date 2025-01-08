'use strict'

function renderGallery() {
    var strHtmls = []
    for (let i = 0; i < 17; i++) {
        strHtmls[i] = `<img src="meme-imgs/meme-imgs(square)/${i+1}.jpg" alt="" onclick="onImgSelect(this)">`
    }
    document.querySelector('.gallery').innerHTML = strHtmls.join('')
}

function onImgSelect(elImg) {
    setImg(elImg)
}