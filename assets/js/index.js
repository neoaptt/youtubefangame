var avy = document.getElementById('youtuber-container').children;
var emotionContainer = document.getElementById('youtuber-emotion-container');
var happyBar = document.getElementById('happiness');
var happiness = 50;
for (var i = 0; i < avy.length; i++) {
    avy[i].onclick = selectAvy;
}
emotionContainer.onclick = emotionClick;
function selectAvy() {
    for (var i = 0; i < avy.length; i++) {
        avy[i].className = '';
    }
    this.className = 'active';
}
function emotionClick() {
    if (happiness <= 100) {
        happiness++;
    }
    happyBar.style.width = happiness + "%"
}