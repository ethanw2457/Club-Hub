$(document).ready(function () {
  $("#resp-menu").click(function () {
    $(".menu").show();
    $(".biz_header_overlay").show();
    $(".menu_close").show();
  });
  $(".menu_close").click(function () {
    $(".menu").hide();
    $(".biz_header_overlay").hide();
  });
  $(".biz_header_overlay").click(function () {
    $(".menu").hide();
    $(".menu_close").hide();
    $(".biz_header_overlay").hide();
  });
});
