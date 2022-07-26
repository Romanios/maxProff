
/*Данный переключатель вешается на кнопку и переключает изначальный класс на новый и обратно по нажатию на кнопку.
У кнопки должна срабатывать функция по клику:
<button onclick="myFunction()">Try it</button>

*/

function myFunction() {
  var element = document.getElementById("classname");
  element.classList.toggle("classname-new");
}