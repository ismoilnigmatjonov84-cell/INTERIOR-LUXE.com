let paginationTimeOut = null;
var k = document.querySelectorAll("body > div.wrapper > div.blog.blue-circles > div > div.blog-grid > a");
k.forEach(e => {
  e.href = "#";
});
var ks = document.querySelectorAll("body > div.wrapper > footer > div > div > nav:nth-child(2) > a");
ks.forEach(e => {
  e.href = "#";
});
document.querySelector(".header-logo").href = "index.html";
document.querySelector(".header-action__button").href = "#";
document.querySelector("body > div.wrapper > footer > div > div > div > a > font > font").innerHTML = "info@E24A.com";
document.querySelector("body > div.wrapper > header > div > div > div > nav > a:nth-child(1)").style = "cursor: pointer;";
document.querySelector("body > div.wrapper > header > div > div > div > nav > a:nth-child(1)").onclick="alert('IN PROCESS!!!')";


function get_penult_data_elem() {
  const children = document.querySelector(".page_block").childNodes;
  const penultimateElement =
    children[children.length - 2].getAttribute("data-elem");
  return penultimateElement;
}

function open_page(elem) {
  clearTimeout(paginationTimeOut);

  let active_item = document.querySelector(".pagination_page_active");
  const last_visible_right = elem.getAttribute("data-visible-right");
  const last_visible_left = elem.getAttribute("data-visible-left");
  let data_elem_new = +elem.getAttribute("data-elem");

  active_item.className = "pagination_page";
  elem.className = "pagination_page_active";

  if (elem != active_item) {
    if (last_visible_right == "last_visible_right") {
      slide(scrollAmount, "smooth", elem);
    }

    if (last_visible_left == "last_visible_left") {
      slide(-scrollAmount, "smooth", elem);
    }

    let page_num = +data_elem_new;
    let filter_array = [];
    let start = page_num == 1 ? page_num - 1 : (page_num - 1) * num_comments;
    //end = page_num == 1 ? start + num_comments : start + num_comments;
    const data = { params: filter_array, start: start, act:"pagination", page : page };

    get_page_content(data);
    
  }
}

function slide_right() {
  let next_elem_id =
    +document
      .querySelector(".pagination_page_active")
      .getAttribute("data-elem") + 1;
  const selector = '[data-elem="' + next_elem_id + '"]';
  elem = document.querySelector(selector);

  if (
    elem ==
    document.querySelector(".page_block .pagination_page:nth-last-child(2)")
  ) {
    if (document.querySelector("#block_page_hidden")) {
      document.querySelector("#block_page_hidden").style.display = "none";
    }
    
  }

  if (elem) {
    open_page(elem);
  }
}

function slide_left() {
  let next_elem_id =
    +document
      .querySelector(".pagination_page_active")
      .getAttribute("data-elem") - 1;
  const selector = '[data-elem="' + next_elem_id + '"]';

  elem = document.querySelector(selector);

  if (elem) {
    open_page(elem);
  }
}

function get_page_content(data_page) {
  paginationTimeOut = setTimeout(() => {
    ajax(
      url_get_comments, 
      JSON.stringify(data_page) , () => {}, 
      (response) => {
        if (response) {
          document.querySelector("#comments-list").innerHTML = response;
          init(role);
        }
      }, 
      () => {},
      () => {}
      
    );
   
  }, 700);

  commnet_list.innerHTML =
    "<div style='width:100%; display: flex; justify-content: center;'><div class= 'loader_image'> </div></div>";

 
}

function open_first_page(elem) {
  let active_item = document.querySelector(".pagination_page_active");
  if (elem != active_item) {
    active_item.className = "pagination_page";
    elem.className = "pagination_page_active";
    slide(-10000, "auto", elem);
    let filter_array = [];
    const data = { params: filter_array, start: 0, act: 'pagination', page : page };
   // document.querySelector("#first_page_hidden").style.display = "none";
   // document.querySelector("#block_page_hidden").style.display = "block";
    get_page_content(data);
  }
}

function open_last_page(elem) {
  let active_item = document.querySelector(".pagination_page_active");
  if (elem != active_item) {
    active_item.className = "pagination_page";
    let data_elem_new = +elem.getAttribute("data-elem");
    elem.className = "pagination_page_active";

    slide(10000, "auto", elem);
    let filter_array = [];
    
    const data = { params: filter_array, start: (data_elem_new - 1) * num_comments, act: 'pagination', page : page };
    get_page_content(data);
    //document.querySelector("#first_page_hidden").style.display = "block";
    //document.querySelector("#block_page_hidden").style.display = "none";
  }
}

function open_all_pages() {
  //slide(scrollAmountNextPages);
}

function isElementVisible(el, container) {
  let containerRect = container.getBoundingClientRect();
  let containerTop = containerRect.top;
  let containerLeft = containerRect.left;
  let elementRect = el.getBoundingClientRect();
  let elementTop = elementRect.top - containerTop;
  let elementLeft = elementRect.left - containerLeft;
  let elementBottom = elementTop + elementRect.height;
  let elementRight = elementLeft + elementRect.width;

  let isElementVisible =
    elementTop >= -10 &&
    elementLeft >= -10 &&
    elementBottom <= containerRect.height &&
    elementRight <= containerRect.width;

  return isElementVisible;
}

function slide(amount, behavior_mode, element) {
  if (document.querySelector(".page_block").childElementCount > 9) {
    const last_right_elem = document.querySelector(
      '[data-visible-right = "last_visible_right"]'
    );
    const last_left_elem = document.querySelector(
      '[data-visible-left = "last_visible_left"]'
    );
    const page_block = document.querySelector(".page_block");
    const pagi_content = document.querySelector(".pagination_comment");
    let last_page_id = +document
      .querySelector("#last_page")
      .getAttribute("data-elem");
    let active_item_id = +element.getAttribute("data-elem");

    // let  = +element.getAttribute('data-elem');

    if (
      last_right_elem != page_block.lastElementChild ||
      last_left_elem != page_block.firstElementChild
    ) {
      page_block.scrollBy({
        left: amount,
        behavior: behavior_mode,
      });

      if (amount > 0) {
        //last_right_elem.nextElementSibling.setAttribute("data-visible-right", "last_visible_right");

        last_right_elem.setAttribute("data-visible-right", "");
        last_left_elem.setAttribute("data-visible-left", "");

        let slide_pages_left = element.id == "last_page" ? 5 : 3;
        let new_last_visible_left_elem = active_item_id - slide_pages_left;

        let slide_pages_right = element.id == "last_page" ? 0 : 1;
        let new_last_visible_right_elem = active_item_id + slide_pages_right;

        let new_last_left_elem = pagi_content.querySelector(
          '[data-elem = "' + new_last_visible_left_elem + '"]'
        );
        new_last_left_elem.setAttribute(
          "data-visible-left",
          "last_visible_left"
        );

        let new_last_right_elem = pagi_content.querySelector(
          '[data-elem = "' + new_last_visible_right_elem + '"]'
        );
        new_last_right_elem.setAttribute(
          "data-visible-right",
          "last_visible_right"
        );

        if (active_item_id < 4) {
          document.querySelector("#first_page_hidden").style.display = "none";
        }

        document.querySelector("#first_page_hidden").style.display = "block";

        if (last_page_id - active_item_id < 3) {
          document.querySelector("#block_page_hidden").style.display = "none";
        }
      } else {
        //last_left_elem.previousElementSibling.setAttribute("data-visible-left", "last_visible_left");
        last_left_elem.setAttribute("data-visible-left", "");
        last_right_elem.setAttribute("data-visible-right", "");

        let slide_pages_left = element.id == "first_page" ? 0 : 1;
        let new_last_visible_left_elem = active_item_id - slide_pages_left;

        let slide_pages_right = element.id == "first_page" ? 5 : 3;
        let new_last_visible_right_elem = active_item_id + slide_pages_right;

        let new_last_left_elem = pagi_content.querySelector(
          '[data-elem = "' + new_last_visible_left_elem + '"]'
        );
        new_last_left_elem.setAttribute(
          "data-visible-left",
          "last_visible_left"
        );

        let new_last_right_elem = pagi_content.querySelector(
          '[data-elem = "' + new_last_visible_right_elem + '"]'
        );
        new_last_right_elem.setAttribute(
          "data-visible-right",
          "last_visible_right"
        );

        if (active_item_id < 4) {
          document.querySelector("#first_page_hidden").style.display = "none";
        }

        document.querySelector("#block_page_hidden").style.display = "block";
      }
    }
  }
}

/*
$(function () {

  setInterval(function () {

    if ($('.pagination_move_left').next().hasClass('pagination_page_active') && !$('.pagination_move_left').hasClass('is-disabled')) {
      $('.pagination_move_left').addClass('is-disabled')
      $('.pagination_move_right').removeClass('is-disabled')
    }

    if (!$('.pagination_move_left').next().hasClass('pagination_page_active')){
      $('.pagination_move_left').removeClass('is-disabled')
    }

  }, 100)

  setInterval(function () {

    if ($('.pagination_move_right').prev().hasClass('pagination_page_active') && !$('.pagination_move_right').hasClass('is-disabled')) {
      $('.pagination_move_right').addClass('is-disabled')
      $('.pagination_move_left').removeClass('is-disabled')
    }

    if (!$('.pagination_move_right').prev().hasClass('pagination_page_active')) {
      $('.pagination_move_right').removeClass('is-disabled')
    }

  }, 100)

})
*/

$(function () {

  $(document).on('click', '.pagination_move_left, .pagination_move_right, .pagination_page, .pagination_page_active', function () {

    if ($('.pagination_move_left').next().hasClass('pagination_page_active') && !$('.pagination_move_left').hasClass('is-disabled')) {
      $('.pagination_move_left').addClass('is-disabled')
      $('.pagination_move_right').removeClass('is-disabled')
    }

    if (!$('.pagination_move_left').next().hasClass('pagination_page_active')){
      $('.pagination_move_left').removeClass('is-disabled')
    }

    if ($('.pagination_move_right').prev().hasClass('pagination_page_active') && !$('.pagination_move_right').hasClass('is-disabled')) {
      $('.pagination_move_right').addClass('is-disabled')
      $('.pagination_move_left').removeClass('is-disabled')
    }

    if (!$('.pagination_move_right').prev().hasClass('pagination_page_active')) {
      $('.pagination_move_right').removeClass('is-disabled')
    }

  })

})

$(window).on('load', function () {
  $('.pagination_move_left').addClass('is-disabled')
})
