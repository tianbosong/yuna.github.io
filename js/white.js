//下面这一段全部来自于hexo-theme-nexmoe的部分源码，感谢大佬，指路: https://github.com/theme-nexmoe/hexo-theme-nexmoe
const getRealPath = (pathname, desc = false) => {
  if (!pathname) {
    pathname = window.location.pathname;
  }
  let names = pathname.split("/");
  if (desc === false) {
    for (let i = names.length - 1; i >= 0; --i) {
      let name = names[i].trim();
      if (name.length > 0 && name !== "/" && name !== "index.html") {
        return name;
      }
    }
  } else {
    for (let i = 0; i < names.length; ++i) {
      let name = names[i].trim();
      if (name.length > 0 && name !== "/" && name !== "index.html") {
        return name;
      }
    }
  }
  return "/";
};

let links = document.querySelectorAll(".nav-link");
let rootRealPath = getRealPath(window.location.pathname, true);
for (let link of links) {
  let linkPath = link.getAttribute("href");
  if (linkPath && getRealPath(linkPath, true) === rootRealPath) {
    link.className = "active-link nav-link";
  }
}
// mobile-nav-link
let mlinks = document.querySelectorAll(".mobile-nav-link");
let mrootRealPath = getRealPath(window.location.pathname, true);
for (let mlink of mlinks) {
  let mlinkPath = mlink.getAttribute("href");
  if (mlinkPath && getRealPath(mlinkPath, true) === mrootRealPath) {
    mlink.className = "moibile-active-link mobile-nav-link";
  }
}

//设置收起的menu点击的效果
var mmenu = document.getElementById("mobile-menu");
var mmain = document.getElementById("mobile-main");
var mclose = document.getElementById("mobile-close");

mmenu.onclick = function () {
  mmain.style.display = "block";
}
mclose.onclick = function () {
  mmain.style.display = "none";
}


///////////////////////////////////////////////////////////////////////////////////

//设置sort的子目录隐藏显示效果
if (document.getElementById("sort")) {
  var sort = document.getElementById("sort");
  var sortdiv = document.getElementById("sort-div");

  sort.onmouseover = function () {
    sortdiv.style.display = "block";
  }
  sort.onmouseout = function () {
    sortdiv.onmouseover = function () {
      console.log("wuhu");
    }
    sortdiv.onmouseout = function () {
      sortdiv.style.display = "none";
    }
  }
}

//图片懒加载
var imgs = document.querySelectorAll('img');
var imgdivs = document.querySelectorAll('.lazyload-img-span');


//用来判断bound.top<=clientHeight的函数，返回一个bool值
function isIn(el) {
  var bound = el.getBoundingClientRect();
  var clientHeight = window.innerHeight;
  return bound.top <= clientHeight;
}
//检查图片是否在可视区内，如果在，则加载
function check() {
  for (let p = 0; p < imgs.length; p++) {
    if (isIn(imgs[p])) {
      loadImg(imgs[p]);
      imgs[p].onload = function () {
        let y = Number(p);
        changeClass(y);
      }
    }
  }
}
function changeClass(num) {
  let tempse = Number(num);
  imgdivs[tempse].className = "lazyload-img-span img-masks";
}
function loadImg(el) {
  if (!el.src) {
    var source = el.dataset.src;
    el.src = source;
  }
}

window.onload = window.onscroll = function () { //onscroll()在滚动条滚动的时候触发
  check();
}

const audio = document.getElementById('audio');
const playButton = document.getElementById('play');
const nextButton = document.getElementById('next');
const cover = document.getElementById('cover');
const name = document.getElementById('name');
const artist = document.getElementById('artist');
const progress = document.getElementById('progress'); // 获取进度条的引用

playButton.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    playButton.innerHTML = '<i class="ri-pause-line"></i>'; // 播放时显示暂停图标
  } else {
    audio.pause();
    playButton.innerHTML = '<i class="ri-play-fill"></i>'; // 暂停时显示播放图标
  }
});

nextButton.addEventListener('click', () => {
  fetchMusic();
});
audio.addEventListener('play', () => {
  cover.classList.add('rotating');
});

audio.addEventListener('play', () => {
  cover.style.animationPlayState = 'running';
});

audio.addEventListener('pause', () => {
  cover.style.animationPlayState = 'paused';
});

audio.addEventListener('timeupdate', () => {
  progress.value = (audio.currentTime / audio.duration) * 100; // 更新进度条的值
});


function fetchMusic() {
  fetch('https://api.uomg.com/api/rand.music?mid=2791573169&format=json')
    .then(response => response.json())
    .then(data => {
      audio.src = data.data.url + '.mp3';
      cover.src = data.data.picurl;
      name.textContent = data.data.name;
      artist.textContent = data.data.artistsname;
      audio.play();
    });
}

fetchMusic();