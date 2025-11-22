const COOKIE_SENDINGTIME = "sendingTime";
const SENDING_INTERVAL_MESSAGE =
  "Слишком частая отправка комментариев запрещена.\n Пожалуйста, подождите некоторое время.";
const CAPTCHA_ERR_MESSAGE =
  "Антиспам-проверка не пройдена (ошибка в ответе). Попробуйте еще раз.";
const LINKS_MESSAGE =
  "Публикация ссылок в комментариях запрещена. Если ссылок в сообщении нет - пожалуйста, скорректируйте пунктуацию текста.";

const CHOOSE_APP =
  "Необходимо выбрать продукт в окне, которое появляется при нажатии на поле";

let page = getPageName();
const num_comments = 5;
const page_size = 5;
const start_comment_default = 0;
const end_comment_default = 5;
const scrollAmount = 32;
const commnet_list = document.querySelector("#comments-list");
const url_get_comments = "./comments.php";
var maxDataId = -Infinity;
function ajax(url,formData, beforeCallback, successCallback, errorCallback, completeCallback) {   
  $.ajax({
    url: url,
    type: 'POST',
    data: formData,
    processData: false,
    contentType: false,
    beforeSend: beforeCallback,
    success: successCallback,
    error: errorCallback,
    complete: completeCallback,
    enctype:'multipart/form-data'
  });
}


function addLeadingZero(number) {
    return number < 10 ? "0" + number : number;
}

function dateFormat(date_format) {
    let date = addLeadingZero(date_format.getDate());
    let month = addLeadingZero(date_format.getMonth() + 1);
    let year = date_format.getFullYear();
    let hours = date_format.getHours();
    let minutes = addLeadingZero(date_format.getMinutes());
    let seconds = addLeadingZero(date_format.getSeconds());
  
    return `${date}.${month}.${year} ${hours}:${minutes}:${seconds}`;
  }

    // Открыть модальное окно при клике на кнопку


function detectIE() {
  var ua = window.navigator.userAgent;

  var msie = ua.indexOf("MSIE ");
  if (msie > 0) {
    // IE 10 or older
    return parseInt(ua.substring(msie + 5, ua.indexOf(".", msie)), 10);
  }

  var trident = ua.indexOf("Trident/");
  if (trident > 0) {
    // IE 11
    var rv = ua.indexOf("rv:");
    return parseInt(ua.substring(rv + 3, ua.indexOf(".", rv)), 10);
  }

  var edge = ua.indexOf("Edge/");
  if (edge > 0) {
    // Edge (IE 12+)
    return parseInt(ua.substring(edge + 5, ua.indexOf(".", edge)), 10);
  }
  // other browser
  return false;
}

function getPageName() {
  let pageName = document.location.pathname;
  if (pageName === "/") pageName = "index";
  // pageName = pageName.match(/\/?(\w+)(?:\/|\.php|\.html?)?$/)[1];
  else pageName = pageName.match(/\/?([^\/]+?)(?:\.\w+|\/)?$/)[1];
  return pageName;
}

function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    '(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function sendXHR(url, data, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", url);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      callback(JSON.parse(xhr.responseText));
    }
  };
  xhr.send(JSON.stringify(data));
}

function sendXHR_text(url, data, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", url);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      callback(xhr.responseText);
    }
  };
  xhr.send(JSON.stringify(data));
}

function checkSendInterval(e, type) {

  let form = document.forms.commentsform;
  if (type == "answer") {
    form = document.querySelector('#answer-form');
  }
  
  let result = ((Date.now() - getCookie(COOKIE_SENDINGTIME)) / 1000 < SENDING_INTERVAL) == false;
  if (e && !result) {
    if (detectIE())
      alert(SENDING_INTERVAL_MESSAGE);
    else {
      e.submitter.setCustomValidity(SENDING_INTERVAL_MESSAGE);
      form.reportValidity();
    }
  }
  else {
      e.submitter.setCustomValidity('');
  }
      
  return result;
}

function updateTextLength() {
  document.getElementById('comments-input-len').innerHTML = document.getElementById('comments-form-textarea').value.length;
}

function init(role) {
  $('.a-comment-loader').each(function () {
    $(this).off('click');
    $(this).on('click', function () {

      let text = $(this).find('.a-comment-loader__text').text()
      let textHide = 'Скрыть следующие ответы'
      let textShow = 'Показать следующие ответы'

      if (text === textShow) {
          $(this).find('.a-comment-loader__text').text(textHide)
          $(this).addClass('is-open')
          $(this).prevAll('.a-answer').find('.a-answer-section').show()
      } else {
          $(this).find('.a-comment-loader__text').text(textShow)
          $(this).removeClass('is-open')
          $(this).prevAll('.a-answer').find('.a-answer-section').hide()
        }
      })
  })

  $('.answer-form-textarea').each(function () {
      $(this).off('input change');
      $(this).on('input change', function () {
          let value = $(this).val().length
          $(this).closest('.answer-form').find('.answer-form-action__counter span').text(value)
      })
  })
  $(document).off('input change');
  $(document).on('input change', '.answer-form-textarea' , function () {
      let value = $(this).val().length
      $(this).closest('.answer-form').find('.answer-form-action__counter span').text(value)
  })
  $('textarea').off('input');
  $('textarea').on('input' , function () {
    let value = $(this).val().length
    $('#comments-input-len').text(value)
  })

  $('#comments-form-main textarea').on('input', function () {
    this.setCustomValidity(''); // Сбрасываем кастомную валидацию
  });
  
  $('.a-comment-more_answer_button').each(function () {

    if (!$(this).data('hasClickHandler')) {
      $(this).on('click', function () {
          
        $(this).closest('.a-comment').nextAll('.a-answer-section').toggle()
        $(this).toggleClass('is-active')
      })

      $(this).data('hasClickHandler', true);
    }
 
  })

  if (!$(document).data('hasClickHandler')) {
    $(document).on('click', '.a-comment-create_answer_button', function () {
    
      $('.a-comment-create_answer_button').removeClass('is-active')
      $(this).toggleClass('is-active')
      //$('#answer-form ~ .thanks').remove();
      removeFormComment ();
      $(this).closest('.a-comment').after(createFormComment($(this).attr('data-id'), role));
      $('.answer-form-textarea').on('input', function () {
        this.setCustomValidity(''); // Сбрасываем кастомную валидацию
      });
      
      
    })

    setTimeout(function () {
      $(document).on('click', '.a-comment-create_answer_button.is-active', function () {
          $('.a-comment-create_answer_button').removeClass('is-active')
          removeFormComment()
      })
    
  }, 100)
  }



  $(document).data('hasClickHandler', true);
}

function createFormComment (comment_id, role) {
  $('.thanks').remove();

  return `
      <form class="answer-form" id="answer-form" name="" onsubmit="sendDataComment(this, event);" data-answer-id="${comment_id}" data-role="${role}">
          <div class="answer-form-top">
              <label class="answer-form-label">
                  <input class="answer-form-input" name="answerName" type="text" placeholder="Ваше имя" required="" minlength="3" maxlength="64">
              </label>
          </div>
          <div class="answer-form-bottom">
              <label class="answer-form-label">
                  <textarea class="answer-form-textarea" name="answerText" placeholder="Ваш комментарий" required="" minlength="3" maxlength="1000"></textarea>
              </label>
              <div class="answer-form-action">
                  <div class="answer-form-action__counter">Введено символов: <span>0</span> из 1000</div>
                  <button  class="answer-form-action__submit" type="submit">Отправить</button>
              </div>
          </div>
         
      </form>
       <div class = "thanks" style = "display:none"> 
          <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M10.5038 1.31787C15.577 1.31787 19.6914 5.43219 19.6914 10.5055C19.6914 15.5788 15.577 19.6931 10.5038 19.6931C5.43048 19.6931 1.31616 15.5788 1.31616 10.5055C1.31616 5.43219 5.43048 1.31787 10.5038 1.31787ZM8.59584 13.4897L6.34649 11.2385C5.96328 10.855 5.9632 10.2297 6.34649 9.84638C6.72986 9.46309 7.35792 9.46549 7.7385 9.84638L9.32428 11.4334L13.2692 7.48852C13.6525 7.10515 14.2779 7.10515 14.6612 7.48852C15.0445 7.87181 15.044 8.4977 14.6612 8.88053L10.0192 13.5225C9.63634 13.9054 9.01044 13.9059 8.62715 13.5225C8.61638 13.5118 8.60599 13.5008 8.59584 13.4897Z" fill="#10c237" />
          </svg>
          Спасибо, ваш комментарий отправлен на модерацию 
      </div>
   `;
}

function removeFormComment () {
  if ($("#answer-form").length ) {
    

    $("#answer-form").remove(); 
  }
}

  
function set_comment(type, html_answer) {
  if (type == "answer") {
      let form = document.forms["answer-form"];
      const parent_id = form.getAttribute("data-answer-id");
  
      //updateCommentsCount("comments-count");
      let answer_list = form.nextElementSibling.nextElementSibling;
      if (form.dataset.role == "admin") {
        $(answer_list).prepend(html_answer);
      } else {
        $('#answer-form ~ .thanks').show();
      }
     
     
      form.answerText.value = "";
      document.cookie = COOKIE_SENDINGTIME + "=" + Date.now();
     // $("#answer-form .answer-form-top").remove(); 
      //$("#answer-form .answer-form-bottom").remove(); 
      removeFormComment ();
      $('.a-comment-create_answer_button').removeClass('is-active');
     
      $(answer_list).find(":first-child").show();
      //$(answer_list).next().show();

      // let el =  $(answer_list).next().find('.a-comment-loader__text');
      // let text = el.text();
      // let textHide = 'Скрыть следующие ответы';
      // let textShow = 'Показать следующие ответы';

      // if (text === textShow) {
      //   el.text(textHide);
      // } else {
      //   el.text(textShow);
      // }

     // $('#comments-count').text(+$('#comments-count').text() + 1)
    } 

  if (type == "comment") {
    $('#comments-form-textarea').val('');
    $('#comments-form ~ .thanks').show();
    //$("#comments-list").append(html_answer);
   // $('#comments-count').text(+$('#comments-count').text() + 1)
  }
}


function sendDataComment(elem_form, e) {
  let type = elem_form.id == "comments-form" ? "comment" : "answer";
  let user_role = elem_form.getAttribute("data-role");

  let objSend = {
    "admin" : () => sendComment_admin(e, user_role),
    "user" : () =>  sendComment(e, type),
  }

  objSend[user_role]()

}

function get_form_data(role, type) {
  
  let act = "write";

  let status_flag = role == "admin" ? 1: 0;
  let admin_flag = role == "admin" ? "admin" : "";
  let formData;
  let visible_flag = 2;
  if (type == "answer") {
    let form = document.forms["answer-form"];

    const parent_id = form.getAttribute("data-answer-id");
    let adreessee = document.querySelector( `[data-id="${parent_id}"] .a-comment-author`).innerText;
   
    if (role == "admin") {
      visible_flag = 0;
    }

    formData = {
      page: page,
      act: act,
      commentAuthor: form.answerName.value,
      commentEmail: '',
      application: '',
      commentText: form.answerText.value,
      captcha : false,
      parent_id: parent_id,
      status_flag: status_flag,
      parent_flag : 0,
      adreessee,
      admin_flag: admin_flag,
      format:type ,
      visible_flag
    }
  }

  if (type == "comment") {
    let form = document.forms.commentsform;

    formData = {
      page: page,
      act: act,
      commentAuthor : form.commentName.value,
      commentEmail : '',
      application: '',
      commentText: form.commentText.value,
      captcha: '',
      parent_id: 0,
      status_flag: 0,
      parent_flag: 1, 
      adreessee: false, 
      format:type,
      visible_flag  
    }
    
  }
  return formData;
}