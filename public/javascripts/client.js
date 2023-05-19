var loadFile = function (event) {
  var output = document.getElementById("output");
  output.src = URL.createObjectURL(event.target.files[0]);
  output.onload = function () {
    URL.revokeObjectURL(output.src); // free memory
  };
};
$("#showToastPlacement").click(function (e) {
  e.preventDefault();
  $(".toast").addClass("show");
});
$(document).ready(function () {
  $(".icon").on("click", function (event) {
    if ($(".icon > i").hasClass("bx-minus")) {
      $(".icon > i").removeClass("bx-minus").addClass("bx-plus");
    } else {
      $(".icon > i").removeClass("bx-plus").addClass("bx-minus");
    }
  });
});
