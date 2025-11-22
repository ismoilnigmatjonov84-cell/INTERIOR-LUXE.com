
let waiting = false;
let role = "user";
$(function () {

  init(role)

})


  function sendComment(e, type) {
    e.preventDefault();
    if (!checkSendInterval(e, type) || !checkForLinks(type) || waiting) return;

    let formData = get_form_data("user", type );
  
    ajax(
      "./comments.php", 
      JSON.stringify(formData), 
      () => {console.log('Request is being sent...');},
      (response) => {
        // Событие при успешном получении ответа
        let insert_param = type == "answer" ? "afterend": "afterbegin";
        set_comment(type, response, insert_param);
      },
  
      (status) => {
        if (status == 403) {
          alert('Ошибка отправки комментария')
        }
        waiting = false;
      },
      () => {}
  
    )

    waiting = true;
  }


  function checkForLinks(type) {

    let textarea = document.querySelector('.answer-form-textarea');
    if (type == "comment") {
        textarea = document.querySelector('#comments-form-textarea');
    }


    let linkDetected = /\.[a-z0-9]/gim.test(textarea.value);
    if (linkDetected) {
      if (detectIE()) alert(LINKS_MESSAGE);
      else {
        textarea.setCustomValidity(LINKS_MESSAGE);
        textarea.reportValidity();
      }
    }
    return !linkDetected;
  }
  
  function getCookieValue(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

