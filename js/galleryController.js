'use strict'

function renderGallery() {
    var strHtmls = []
    for (let i = 0; i < 17; i++) {
        strHtmls[i] = `<img src="meme-imgs/meme-imgs(square)/${i+1}.jpg" alt="" onclick="onImgSelect(${i+1})">`
    }
    strHtmls.push(' <input type="file" class="file-input btn" name="image" onchange="onImgInput(event)" />')
    document.querySelector('.gallery').innerHTML = strHtmls.join('')
}

function onImgSelect(idx) {
    setImg(idx)
}