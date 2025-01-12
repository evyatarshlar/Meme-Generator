'use strict'

function renderGallery() {
    var strHtmls = []
    for (let i = 0; i < 17; i++) {
        strHtmls[i] = `<img src="meme-imgs/meme-imgs(square)/${i+1}.jpg" alt="" onclick="onImgSelect(this,${i+1})">`
    }
    strHtmls.unshift(' <input type="file" class="file-input" id="file-upload" name="image" onchange="onImgInput(event)" /><label for="file-upload" class="file  flex align-center color-btn">Upload</label>')
    document.querySelector('.gallery').innerHTML = strHtmls.join('')
}

function onImgSelect(elimg,idx) {
    gcurrImg = elimg
    openEditor()
    setImg(elimg,idx)
}

function openEditor(){
    const elEditor = document.querySelector('.edit-meme-layout')
    elEditor.style.display ='grid'
    const elGallery = document.querySelector('.gallery')
    elGallery.style.display = 'none'
    const elSaved = document.querySelector('.saved-memes')
    elSaved.style.display = 'none'
    resizeCanvas()
}