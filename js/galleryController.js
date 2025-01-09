'use strict'

function renderGallery() {
    var strHtmls = []
    for (let i = 0; i < 17; i++) {
        strHtmls[i] = `<img src="meme-imgs/meme-imgs(square)/${i+1}.jpg" alt="" onclick="onImgSelect(${i+1})">`
    }
    strHtmls.unshift(' <input type="file" class="file-input btn" name="image" onchange="onImgInput(event)" />')
    document.querySelector('.gallery').innerHTML = strHtmls.join('')
}

function onImgSelect(idx) {
    const elEditor = document.querySelector('.edit-meme-layout')
    elEditor.style.display ='grid'
    const elGallery = document.querySelector('.gallery')
    elGallery.style.display = 'none'
    const elSaved = document.querySelector('.saved-memes')
    elSaved.style.display = 'none'
    resizeCanvas()
    setImg(idx)
}