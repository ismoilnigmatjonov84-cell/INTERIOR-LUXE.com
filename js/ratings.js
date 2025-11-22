/* jshint esversion: 6 */

const URL_SENDVOTE    = 'ratings.php';
const PARAMS_SENDVOTE = '?act=vote&val=#r_val#&page=#r_page#&out=json';

//-----------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', onDomLoaded);

//-----------------------------------------------------------------------------

function onDomLoaded(e) {
  setEventListeners(!!getCookie('cookies_allowed') && !readVoteFromCookie());
}

function setEventListeners(enabled) {
  let ratingBlockEl = document.getElementById('page-rating-block');
  let imgEls = document.querySelectorAll('.rating-img');
  if (enabled) {
    ratingBlockEl.addEventListener('click', onRatingBlockClick);
    ratingBlockEl.addEventListener('mouseover', onRatingBlockMouseOver);
    ratingBlockEl.addEventListener('mouseout', onRatingBlockMouseOut);
    for (let i = 0; i < imgEls.length; i++)
      imgEls[i].classList.remove('nocursor');
  } else {
    ratingBlockEl.removeEventListener('click', onRatingBlockClick);
    ratingBlockEl.removeEventListener('mouseover', onRatingBlockMouseOver);
    ratingBlockEl.removeEventListener('mouseout', onRatingBlockMouseOut);
    for (let i = 0; i < imgEls.length; i++) {
      imgEls[i].classList.add('nocursor');
      imgEls[i].classList.remove('hover');
    }
  }
}

function onRatingBlockClick(e) {
  if (e.target.classList.contains('rating-img')) {
    let voteVal = getImgNumberFromId(e.target.id);
    sendVote(voteVal);
  }
}

function onRatingBlockMouseOver(e) {
  if (e.target.classList.contains('rating-img')) {
    let imgN   = getImgNumberFromId(e.target.id);
    let imgEls = document.querySelectorAll('.rating-img');
    for (let i=0; i < imgEls.length; i++) {
      if (getImgNumberFromId(imgEls[i].id) <= imgN)
        imgEls[i].classList.add('hover');
    }
  }
  // fixme show tooltip (statistics)
}

function onRatingBlockMouseOut(e) {
  let imgEls = document.querySelectorAll('.rating-img');
  for (let i=0; i < imgEls.length; i++) {
    imgEls[i].classList.remove('hover');
  }
}

function readVoteFromCookie() {
  let cookie = getCookie('voting');
  if (!cookie)
    return;
  cookie = JSON.parse(cookie);
  return cookie[getPageName()];
}

function getImgNumberFromId(idStr) {
  return idStr.slice(-1);
}

function sendVote(voteVal) {
  let pageName = getPageName();
  let sendParams = PARAMS_SENDVOTE.replace('#r_val#', voteVal);
  sendParams = sendParams.replace('#r_page#', pageName);
    // console.log('sendParams=' + sendParams);
  let xhr = new XMLHttpRequest();
  xhr.open('GET', URL_SENDVOTE + sendParams, true);
  xhr.onreadystatechange = function () {
    if (this.readyState === 4)
      onVoteResponse(this.response);
  };
  // xhr.overrideMimeType('application/json');
  xhr.send();
}

function onVoteResponse(response) {
  let resp = JSON.parse(response);
  if (resp.hasOwnProperty('votesCount'))
    document.getElementById('page-rating-count').innerHTML = resp.votesCount;
  if (resp.hasOwnProperty('ratingValue'))
    document.getElementById('page-rating-value').innerHTML = resp.ratingValue;
  //
  let ratingImgEl, buf;
  for (let i = 1; i <= 5; i++) {
    ratingImgEl = document.getElementById('rate' + i);
    buf = resp.ratingValue - (i - 1);
    if (buf >= 1.0)
      ratingImgEl.src = URL_IMGRATING_FULL;
    else if (buf >= 0.5)
      ratingImgEl.src = URL_IMGRATING_HALF;
    else
      ratingImgEl.src = URL_IMGRATING_EMPTY;
  }
  //
  let userVoteVal = readVoteFromCookie();
  if (userVoteVal) {
    setEventListeners(false);
    let userVoteEl = document.querySelector('#page-rating-uservalue #val');
    userVoteEl.innerHTML = userVoteVal;
    document.getElementById('page-rating-uservalue').classList.remove('hidden');
  }
}

function getPageName() {
  let pageName = document.location.pathname;
  if (pageName === '/')
    pageName = 'index';
  else
    pageName = pageName.match(/\/?([^\/]+?)(?:\.\w+|\/)?$/)[1];
  return pageName;
}

// возвращает cookie с именем name, если есть. если нет, то undefined
function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    '(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
