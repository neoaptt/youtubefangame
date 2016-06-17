var avy = document.getElementById('youtuber-container').children;
var emotionContainer = document.getElementById('youtuber-emotion-container');
var happyBar = document.getElementById('happiness');
var plan = document.getElementById('plan');
var planTXT = document.getElementById('planTXT');
var edit = document.getElementById('edit');
var editTXT = document.getElementById('editTXT');
var film = document.getElementById('film');
var filmTXT = document.getElementById('filmTXT');
var happiness = 50;
var folder = '';
var imgName = '';
var planVal = 0;
var editVal = 0;
var filmVal = 0;
for (var i = 0; i < avy.length; i++) {
    avy[i].onclick = selectAvy;
}
emotionContainer.onclick = emotionClick;
plan.onclick = planClick;
edit.onclick = editClick;
film.onclick = filmClick;
avy[0].click();
function selectAvy() {
    for (var i = 0; i < avy.length; i++) {
        avy[i].className = '';
    }
    this.className = 'active';
    var name = this.getAttribute('data-name');
    imgName = this.getAttribute('data-image-name');
    changeBackground(true);
}
function emotionClick() {
    if (happiness <= 100) {
        happiness++;
        happyBar.style.width = happiness + "%";
        changeBackground();
    }
}
function planClick() {
    if (happiness > 0) {
        happiness--;
        planVal += multiplier;
        planTXT.innerHTML = planVal;
        happyBar.style.width = happiness + "%";
        changeBackground();
    }
}
function editClick() {
    if (happiness > 0) {
        happiness--;
        editVal += multiplier;
        editTXT.innerHTML = editVal;
        happyBar.style.width = happiness + "%";
        changeBackground();
    }
}
function filmClick() {
    if (happiness > 0) {
        happiness--;
        filmVal += multiplier;
        filmTXT.innerHTML = filmVal;
        happyBar.style.width = happiness + "%";
        changeBackground();
    }
}
function changeBackground(force) {
    var bfolder = folder;
    if (happiness > 66) {
        multiplier = 3;
        folder = 'happy';
    } else if (happiness > 33) {
        multiplier = 2;
        folder = 'neutral';
    } else {
        multiplier = 1;
        folder = 'sad';
    }
    if (bfolder !== folder || force === true) {
        emotionContainer.style.background = "url('assets/img/emotion/" + folder + "/" + imgName + ".jpg') no-repeat center";
    }
}