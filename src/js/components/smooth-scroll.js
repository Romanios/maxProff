
/*
Для прокрутки по клику создается ссылка (кнопка) указывающая на id элемента до которого нужно прокрутить страницу:
<a class="btn btn_header" href="#bottom">Get started</a>
Сам элемент должен иметь соответствующий id:
<p id="bottom" class="promo__text">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>

*/


// Найти все ссылки начинающиеся на #
const anchors = document.querySelectorAll('a[href^="#"]')

// Цикл по всем ссылкам
for(let anchor of anchors) {
  anchor.addEventListener("click", function(e) {
    e.preventDefault() // Предотвратить стандартное поведение ссылок
    // Атрибут href у ссылки, если его нет то перейти к body (наверх не плавно)
    const goto = anchor.hasAttribute('href') ? anchor.getAttribute('href') : 'body'
    // Плавная прокрутка до элемента с id = href у ссылки
    document.querySelector(goto).scrollIntoView({
      behavior: "smooth",
      block: "start"
    })
  })
}