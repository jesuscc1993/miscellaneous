var list = document.querySelectorAll('.label .icon');

for (var i = 0; i < list.length; i++) {
  var url = list[i].getAttribute('data-type');
  list[i].style.backgroundImage =
    "url('./assets/images/" + url + ".svg')";
}