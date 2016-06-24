var avy = document.getElementById('youtuber-container').children;
var emotionContainer = document.getElementById('youtuber-emotion-container');
var happyBar = document.getElementById('happiness');
var plan = document.getElementById('plan');
var planTXT = document.getElementById('planTXT');
var edit = document.getElementById('edit');
var editTXT = document.getElementById('editTXT');
var film = document.getElementById('film');
var filmTXT = document.getElementById('filmTXT');
var release = document.getElementById('release');
var videos = document.getElementById('videos');
var allViews = document.getElementById('allViews');
var allSubs = document.getElementById('allSubs');
var allMoney = document.getElementById('allMoney');
var happiness = 50;
var folder = '';
var imgName = '';
var planVal = 0;
var editVal = 0;
var filmVal = 0;
var money = 0;
var subs = 0;
var views = 0;
var numVids = 0;
var videoContainer = [];
for (var i = 0; i < avy.length; i++) {
    avy[i].onclick = selectAvy;
}
emotionContainer.onclick = emotionClick;
plan.onclick = planClick;
edit.onclick = editClick;
film.onclick = filmClick;
release.onclick = releaseClick;
avy[0].click();
setInterval(update, 1000);

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
function updateProduction() {
    filmTXT.innerHTML = filmVal;
    editTXT.innerHTML = editVal;
    planTXT.innerHTML = planVal;
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
function releaseClick() {
    var pval = planVal;
    var eval = editVal;
    var fval = filmVal;
    if (addVideo(pval, eval, fval)) {
        planVal = 0;
        editVal = 0;
        filmVal = 0;
        updateProduction();
    }
}
function addVideo(pval, eval, fval) {
    if (videoContainer.length < 3 && pval > 0 && eval > 0 && fval > 0) {
        videoContainer.push(new video(pval, eval, fval));
        return true;
    } else {
        return false;
    }
}
function video(pval, eval, fval) {
    var self = this;
    self.newViews = (pval + eval + fval) + Math.floor(subs / 10);
    self.newSubs = Math.floor(views / 100) + Math.floor((Math.random() * 10) + 1);
    self.newMoney = Math.floor(views / 1000);
    var html =
            '<div class="video">'
            + '<div class="img">'
            + ++numVids
            + '</div>'
            + '<div class="stat">'
            + '<p>Views: <span class="viewSpan">0</span></p>'
            + '<p>Subscribers: <span class="subSpan">0</span></p>'
            + '<p>Money: $<span class="moneySpan">0</span></p>'
            + '</div>'
            + '</div>';
    var div = document.createElement('div');
    div.innerHTML = html;
    var elements = div.children[0];
    self.viewSpan = elements.getElementsByClassName('viewSpan')[0];
    self.subSpan = elements.getElementsByClassName('subSpan')[0];
    self.moneySpan = elements.getElementsByClassName('moneySpan')[0];
    self.video = videos.appendChild(elements);
    self.life = 10;
    self.tick = function () {
        if (--self.life < 1) {
            videos.removeChild(self.video);
            return false;
        } else {
            console.log(self.viewSpan);
            var nv = Math.floor(self.newViews / self.life);
            var ns = Math.floor(self.newSubs / self.life);
            self.viewSpan.innerHTML = Math.floor(self.newViews / self.life);
            self.subSpan.innerHTML = Math.floor(self.newSubs / self.life);
            self.moneySpan.innerHTML = Math.floor(self.newMoney / self.life);
            views += self.newViews;
            subs += self.newSubs;
            money += self.newMoney;
            return true;
        }
    };
}
function update() {
    if (videoContainer.length > 0) {
        var newContainer = [];
        videoContainer.forEach(function (item, index) {
            if (item.tick()) {
                newContainer.push(item);
            }
        });
        statUpdate();
        videoContainer = newContainer;
    }
}
function statUpdate() {
    allViews.innerHTML = views;
    allMoney.innerHTML = money;
    allSubs.innerHTML = subs;
}