var avy = document.getElementById('youtuber-container').children;
for (var i = 0; i < avy.length; i++) {
    avy[i].onclick = selectAvy;
}
function selectAvy() {
    for (var i = 0; i < avy.length; i++) {
        avy[i].className = '';
    }
    this.className = 'active';
}