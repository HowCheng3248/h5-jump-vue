   var step = 1;
   var currentOrder = 0;
   var startBottom = 2.3;
   var startLeft = 1.12;
   var direction = "transform:rotateY(180deg)";
   var startTime;
   var t2, tPoint;
   var currentScale = 1;
   var allowJump = false;
   var evt;
   var pos = [
       [0.09, 0.3],
       [0.18, 0.6],
       [0.27, 0.9],
       [0.36, 1.2],
       [0.45, 1.5],
       [0.55, 1.7],
       [0.64, 1.6],
       [0.73, 1.4],
       [0.82, 1.2],
       [0.91, 1],
       [1, 1],
       [1, 1],
   ];
   var stepLength = [
       [3.02, 1.9],
       [3.02, 2.04],
       [-3.02, 1.9],
       [3.02, 2],
       [3.02, 2],
       [-3.02, 2.04],
       [3.02, 2.1],
       [-1, 1] //最后一步移动方向判定
   ];
   var tips = [
       '“四连冠”，（文明城市）',
       '突破七千亿，（GDP）',
       '出货3.56亿台，（智能手机）',
       '新建767.8公里，（截污管网）',
       '新增6.8万个，（随迁子女学位）',
       '出口8821万件，（国际小包）',
       ''
   ]
   var background;
   var imglist = [
       'sannuo.png',
       'e1.png',
       'c3.png',
       'coverbox.png',
       'n.png',
       'c2.png',
       'r3.png',
       'nline.png',
       'c1.png',
       'r_bg.png',
       'c8.png',
       'logo.png',
       'c4.png',
       'share_tips.png',
       'c7.png',
       'c5.png',
       'c9.png',
       'ico.png',
       'c6.png'
   ];
   var pressvoice, landvoice;
   var playing;
   //(function (window) {
   //    var audio = new Audio();
   //    window.wxAudio = audio;
   //})(window);
   $(function () {
       //rem定义
       var innerWidth = window.innerWidth > 750 ? 750 : window.innerWidth;
       document.documentElement.style.fontSize = innerWidth / 7.5 + 'px';
       FastClick.attach(document.body);
       background = document.getElementById("tap");
       var load_ani = setInterval(function () {
           loadingChess();
       }, 2000);
       playing = new Audio();
       //   pressvoice = document.getElementById("press");
       //    landvoice = document.getElementById("land");
       document.addEventListener("WeixinJSBridgeReady", function () {
           // alert("wxb loaded!");
           pressvoice = new Audio();
           pressvoice.src = "voice/press2.mp3";
           pressvoice.load();
           landvoice = new Audio();
           landvoice.src = "voice/land2.mp3";
           landvoice.load();
           playing = new Audio();
           // pressvoice.play();
       }, false);
       preload(function () {
           $(".start").fadeIn(300);
           $(".start").one("click", function () {
               //pressvoice = new Audio();
               //pressvoice.src = "voice/press2.mp3";
               //pressvoice.oncanplaythrough = function () {
               //    alert("loaded!");
               //};
               clearInterval(load_ani);
               $("#tap").show();
               $(".cover").fadeOut(300);
               allowJump = true;
               evt = window.event;
               background.addEventListener("touchstart", tStart, false);
               $(".listContent").find("li").each(function () {
                   $(this).click(function () {
                       //log("li clicked!");
                       $(".detail").find("div[data-list]").hide();
                       $(".detail").find("div[data-list='" + $(this).data(
                           "order") + "']").show();
                       $(".detail").find("div[data-list='" + $(this).data(
                               "order") + "']").find(".border").find("h3")
                           .html("   ");
                       $(".detail").find("div[data-list='" + $(this).data(
                           "order") + "']").find(".border").find("p").html(
                           "请点击关键词查看亮点");
                       $(".detail").fadeIn(300);
                   });
               });
               $(".list7").click(function () {
                   log("展望2018");
                   $(".detail").find("div[data-list]").hide();
                   $(".detail").find("div[data-list='8']").show();
                   $(".detail").find("div[data-list='8']").find("li").addClass(
                       "li_in");
                   $(".detail").fadeIn(300);
               });
               $(".list8").click(function () {
                   log("十件实事");
                   $(".detail").find("div[data-list]").hide();
                   $(".detail").find("div[data-list='7']").show();
                   $(".detail").find("div[data-list='7']").find("li").addClass(
                       "li_in");
                   $(".detail").fadeIn(300);

               });

               $(".keyword").click(function () {
                   $(this).parent("div").find(".border").find("h3").html($(this).find(
                       ".pointer_title").html());
                   $(this).parent("div").find(".border").find("p").html($(this).data(
                       "text"));
               });
               $(".close").click(function () {
                   $(this).parents(".detail").fadeOut(300);
               });
               $(".restart").click(function () {
                   reset();
               });
           });
       });



       console.warn("程序员の警告:");
       console.error("慢慢改吧,反正还有大把时光");
   })
   //调试
   function log(t) {
       //  return;
       console.log(t);
   }


   function tStart() {
       evt.preventDefault();
       //     return false;
       //  $("<div/>", { "class": "tap" }).appendTo("body");
       background.addEventListener("contextmenu", function (e) {
           e.preventDefault();
       });
       background.addEventListener("touchmove", function (e) {
           e.preventDefault();
           e.stopepropagation();
       }, false);
       background.addEventListener("touchend", jump, false);
       if (!allowJump) {
           return false;
       } else {
           pressVoice(1);
           var box = $(".g" + (currentOrder + 1));
           //    var shadow = $(".g" + (currentOrder + 1)).find(".shadow");
           t2 = setInterval(function () {
               currentScale -= 0.01;
               currentScale = currentScale < 0.9 ? 0.9 : currentScale;
               box.css("transform", "scaleY(" + currentScale + ")");
               //     shadow.css("transform", "scaleY(" + currentScale + ")");
               $(".chess").css({
                   "transform": "translateY(" + (1 - currentScale) * 50 + "px) scaleY(" +
                       currentScale + ") scaleX(" + (1 + (1 - currentScale) / 3) + ")",
                   "-webkit-transform": "translateY(" + (1 - currentScale) * 50 + "px) scaleY(" +
                       currentScale + ") scaleX(" + (1 + (1 - currentScale) / 3) + ")"
               });
           }, 30);
           $(".chess").html("");
           for (var i = 0; i < 8; i++) {
               point();
           }
           tPoint = setInterval(function () {
               point();
           }, 120);
       }
   }

   function jump() {
       //  return false;
       if (allowJump) {
           allowJump = false;
           clearInterval(t2);
           clearInterval(tPoint);
           $(".chess").html("");
           var stepWidth = stepLength[currentOrder][0];
           var stepHeight = stepLength[currentOrder][1];
           pressVoice(0);
           if (stepWidth < 0) {
               direction = "rotateY(180deg)";
           } else {
               direction = "rotateY(0deg)";
           }

           var box = $(".g" + (currentOrder + 1)); //.find(".box");
           //   var shadow = $(".g" + (currentOrder + 1)).find(".shadow");
           var pressedScale = currentScale;
           currentScale = 1;
           var t3 = setInterval(function () {
               pressedScale += 0.01;
               if (pressedScale >= 1) {
                   clearInterval(t3);
               }
               box.css("transform", "scaleY(" + currentScale + ")");
               //   shadow.css("transform", "scaleY(" + currentScale + ")")
           }, 60);

           landVoice();
           var t1 = setInterval(function () {
               $(".chess").css({
                  //  "background-position": -step * 2.76 + "rem 0rem",
                   "left": startLeft + pos[step][0] * stepWidth + "rem",
                   "bottom": startBottom + pos[step][1] * stepHeight + "rem",
                   "transform": direction,
                   "-webkit-transform": direction
               });

               if (step == 11) {
                   if (stepWidth < 0) {
                       //    log("turn direction");
                       $(".chess").css({
                           "background-position": -step * 2.76 + "rem 0rem",
                           "left": startLeft + pos[step][0] * stepWidth + "rem",
                           "bottom": startBottom + pos[step][1] * stepHeight + "rem",
                           "transform": "rotateY(0deg)",
                           "-webkit-transform": "rotateY(0deg)"
                       });
                   }
                   $(".ring").css({
                       "bottom": $(".chess").css("bottom").replace("px", "") - 20 * innerWidth /
                           750,
                       "left": $(".chess").css("left").replace("px", "") - 54 * innerWidth / 750
                   });
                   $(".ring").addClass("ring_in");
                   var currentBottom = $(".background").css("bottom").replace("px", "");
                   var currentLeft = $(".background").css("left").replace("px", "");
                   var moveLeft = currentLeft;
                   if (stepLength[currentOrder][0] * stepLength[currentOrder + 1][0] < 0) { //转向时，横向不移动;
                   } else {
                       moveLeft = currentLeft - stepLength[currentOrder][0] * innerWidth / 7.5;
                   }
                   $(".background").animate({
                       bottom: currentBottom - stepLength[currentOrder][1] * innerWidth / 7.5 +
                           "px",
                       left: moveLeft + "px",
                   }, 600);
                   if (tips[currentOrder] != '') {
                       showTips();
                   } else {
                       log("last box,no message");
                   }


                   setTimeout(function () {
                       $(".ring").removeClass("ring_in");
                   }, 500);
                   $(".g" + (parseInt(currentOrder) + 3)).find(".box").addClass("box_in");
                   $(".g" + (parseInt(currentOrder) + 3)).find(".shadow").addClass("shadow_in");
                   step = 1;
                   startLeft += stepLength[currentOrder][0];
                   startBottom += stepLength[currentOrder][1];
                   currentOrder += 1;
                   $(".number").find("img").attr("src", "img/" + currentOrder + ".png");
                   clearInterval(t1);
                   setTimeout(function () {
                       allowJump = true;
                   }, 500);

               } else {
                   step++;
               }

           }, 30);
           if (currentOrder == 6) {
               background.removeEventListener("touchstart", tStart, false);
               background.removeEventListener("touchend", jump, false);
               setTimeout(function () {
                   $(".listBox").addClass("listBox_in");
                   $("#tap").hide();
                   listFadeIn();
               }, 1000);

           }
       } else {

       }
   }

   function listFadeIn() {
       $(".listContent").find("li").each(function () {
           $(this).css({
               "animation-delay": $(this).data("order") * 200 + "ms",
               "-webkit-animation-delay": $(this).data("order") * 200 + "ms"
           });
           $(this).addClass("list_in");
       });
       $(".list7").addClass("btn_in");
       $(".list8").addClass("btn_in");
       $(".share").addClass("share_in");
       $(".share").click(function () {
           $(".sharebox").fadeIn(300).click(function () {
               $(this).fadeOut(300);
           });
       });
       $(".restart2").click(function () {
           reset2();
       });
   }



   function point() {
       var rdnStartTop = parseInt(Math.random() * 100);
       var rdnStartLeft = parseInt(Math.random() * 100);
       var color = ["#a6f4af", "#ffffff"];
       color = color[parseInt(Math.random() * 2)];
       var width = parseInt(Math.random() * 2) + 8;
       var fixedPosition1 = parseInt(Math.random() * 40);
       fixedPosition1 = fixedPosition1 % 2 == 0 ? fixedPosition1 : -fixedPosition1;
       fixedPosition2 = fixedPosition2 % 2 == 0 ? fixedPosition2 : -fixedPosition2;
       var fixedPosition2 = parseInt(Math.random() * 20);
       rdnStartTop = rdnStartTop % 2 == 0 ? rdnStartTop + 100 : 350 - rdnStartTop;
       rdnStartLeft = rdnStartLeft % 2 == 0 ? rdnStartLeft : 200 - rdnStartLeft;
       var rdnDurationTime = parseInt(Math.random() * 1000 + 1000);
       $("<div/>", {
           'class': 'point',
           'style': 'top:' + rdnStartTop / 100 + 'rem;left:' + rdnStartLeft / 100 +
               'rem;background-color:' + color + ';width:' + width / 100 + "rem;height:" + width / 100 +
               "rem"
       }).appendTo($(".chess")).animate({
           top: (2 + fixedPosition1 / 100) + 'rem',
           left: (1.3 + fixedPosition2 / 100) + 'rem'
       }, rdnDurationTime, 'swing', function () {
           $(this).remove();
       });
   }

   function showTips() {
       var code = "<p>" + tips[currentOrder].replace("，", "</p><p>") + "</p>";
       var oTips = $("<div/>", {
           "class": "tips tips_in"
       }).html(code).appendTo($(".chess"));
       log(tips[currentOrder]);
   }


   function loadingChess() {
       var o = 0;
       var h = 0;
       var stu = 1;
       var count = 0;
       var t_cover = setInterval(function () {
           o++;
           h += 0.2 * stu;
           if (h > 1) {
               stu = -1
           };
           o = o > 11 ? 0 : o;
           $(".cover_chess").css({
               "background-position": -o * 2.76 + "rem 0rem",
               "bottom": (4.8 + h) + "rem"
           });
           if (count++ > 10) {
               clearInterval(t_cover);
           }
       }, 40);
   }

   function reset() {
       $(".background").css({
           "bottom": 0,
           "left": 0
       });
       step = 1;
       currentOrder = 0;
       startBottom = 2.3;
       startLeft = 1.12;
       allowJump = true;
       $(".chess").css({
           "bottom": "2.3rem",
           "left": "1.12rem"
       }).html("");
       $(".box").removeClass("box_in");
       $(".shadow").removeClass("shadow_in");
       $(".number").find("img").attr("src", "img/" + currentOrder + ".png");
   }

   function reset2() {
       reset();
       background.addEventListener("touchstart", tStart, false);
       background.addEventListener("touchend", jump, false);
       $(".listBox").removeClass("listBox_in");
       $("#tap").show();
   }





   function preload(cb) { //图片预加载
       var tmpList = imglist;
       var t1 = setInterval(function () {
           var loadedCount = 0;
           var loopCount = 0;
           for (var i = 0; i < tmpList.length; i++) {
               loopCount++;
               var img = new Image();
               img.src = "img/" + tmpList[i];
               if (img.complete) {
                   loadedCount++;
                   log("图片:" + img.src + "加载完成");
                   tmpList.pop(tmpList[i]);
                   log("剩余数量:" + tmpList.length);
               } else {}
           }
           if (loadedCount == loopCount) {
               log("大图加载完成");
               //  var v1 = new Audio();
               //pressvoice = new Audio();
               //pressvoice.src = "voice/press2.mp3";
               //pressvoice.oncanplaythrough = function () {
               //    alert("loaded!");
               //};
               //v1.src = "voice/press2.mp3";
               //v1.canplay = function () {
               //    alert("v1 loaded");
               //    var v2 = new Audio();
               //    v2.src = "voice/land2.mp3";
               //    v2.canplay = function () {
               //        alert("v2 loaded");

               //    }
               //}

               cb();

               clearInterval(t1);
           }
       }, 500);
   }


   function pressVoice(controlType) {
      /*  playing.src = "voice/press2.mp3";
       playing.load();
       if (controlType == 0) { //停止
           if (playing.play()) {
               playing.pause();
               log("stop");
           }
       } else {
           //  if (!pressvoice.play()) {
           playing.currentTime = 0.0;
           log("play");
           playing.play();
           //    }
       } */

   }

   function landVoice() {
      /*  playing.src = "voice/land2.mp3";
       playing.load();
       if (playing.play()) {
           playing.pause();
           playing.currentTime = 0.0;
           playing.play();
       } else {
           playing.currentTime = 0.0;
           playing.play();
       } */
       //alert("landed!");
   }