import $ from "jquery";
import $clamp from 'clamp-js';
$(document).ready(function(){
  $("#case-btn").on("mouseenter", function (e) {
    $(".header-nav-second").fadeIn(300);
    $(this).find(".iconshangla1").hide();
    $(this).find(".iconDown").show();
  });
  $("#case-btn").on("mouseleave", function (e) {
    $(".header-nav-second").fadeOut(300);
    $(this).find(".iconshangla1").show();
    $(this).find(".iconDown").hide();
  });
  [].forEach.call(document.querySelectorAll('.clampLine_6'),function(node){
    $clamp(node,{clamp:6,useNativeClamp:false});
  });
  [].forEach.call(document.querySelectorAll('.clamp_3'),function(node){
    $clamp(node,{clamp:3,useNativeClamp:false})
  });
  [].forEach.call(document.querySelectorAll('.clamp_2'),function(node){
    $clamp(node,{clamp:'49px',useNativeClamp:false})
  })
  Math.easeout = function (A, B, rate, callback) {
    if (A == B || typeof A != "number") {
      return;
    }
    B = B || 0;
    rate = rate || 2;

    var step = function () {
      A = A + (B - A) / rate;

      if (A < 1) {
        callback(B, true);
        return;
      }
      callback(A, false);
      requestAnimationFrame(step);
    };
    step();
  };
  $("body").on("scroll", function (e) {
    var scrollHeight = $("body").scrollTop();
    if (scrollHeight > 800) {
      $(".back_top").fadeIn(300);
    } else {
      $(".back_top").fadeOut(300);
    }
  });
  $(".back_top").on("click", function () {
    var doc = document.body.scrollTop
      ? document.body
      : document.documentElement;
    Math.easeout(doc.scrollTop, 0, 4, function (value) {
      doc.scrollTop = value;
    });
  });
})
