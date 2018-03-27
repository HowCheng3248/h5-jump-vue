var //HOST = '/apis',
    HOST = 'http://zc57h.ruosi.wang',
    GETBASEINFO = '/wx/getBaseInfo',
    UPLOAD = '/wx/report';

var step = 1;
var currentOrder = 0;
var startBottom = 2.8;
var startLeft = 4.8;
var direction = "transform:rotateY(180deg)";
var score = 0;
var t2,
    tPoint;
var currentScale = 1;
var allowJump = false;
var evt;
var questionTime = 500,
    jumpTime = 1000,
    isFirstTouch = true;
var pos = [
    [
        0.09, 0.3
    ],
    [
        0.18, 0.6
    ],
    [
        0.27, 0.9
    ],
    [
        0.36, 1.2
    ],
    [
        0.45, 1.5
    ],
    [
        0.55, 1.7
    ],
    [
        0.64, 1.6
    ],
    [
        0.73, 1.4
    ],
    [
        0.82, 1.2
    ],
    [
        0.91, 1
    ],
    [
        1, 1
    ],
    [1, 1]
];
var stepLength = [
    [-3.02, 1.9],
    [
        3.02, 2.04
    ],
    [-3.02, 1.9],
    [
        3.02, 2
    ],
    [-3.02, 2],
    [
        3.02, 2.04
    ],
    [-3.02, 2.1],
    [
        3.02, 2.1
    ],
    [-1, 1] //最后一步移动方向判定
];
var question = [{
    text: '1991年，2002年',
    answer: 1
}, {
    text: '糖尿病，高血压',
    answer: 0
}, {
    text: '长沙 ，北京',
    answer: 0
}, {
    text: '2012年 ，2015年',
    answer: 0
}, {
    text: '蓝色，红色',
    answer: 1
}, {
    text: 'you ，love',
    answer: 1
}, {
    text: '安稳+ ，安准+',
    answer: 0
}, {
    text: '28，18',
    answer: 0
}, {
    text: '135个，105个',
    answer: 0
}];
var background;
var imglist = [
    'sannuo.png',
    'c3.png',
    'c2.png',
    'c1.png',
    'c8.png',
    'c4.png',
    'c7.png',
    'c5.png',
    'c9.png',
    'c6.png',
    'p2-3.png',
    'p2-2.png',
    'p2-1.png',
    'p2-8.png',
    'p2-4.png',
    'p2-7.png',
    'p2-5.png',
    'p2-9.png',
    'p2-6.png',
    'p2-btn-lg.png',
    'p2-btn-sl.png',
    '30.png',
    '20.png',
    '10.png',
    '80.png',
    '40.png',
    '70.png',
    '50.png',
    '90.png',
    '60.png',
    '00.png',
    '30p.png',
    '20p.png',
    '10p.png',
    '80p.png',
    '40p.png',
    '70p.png',
    '50p.png',
    '90p.png',
    '60p.png',
    '00p.png',
    'bg-1.jpg',
    'p4-1.png',
    'p4-2.png',
    'p4-3.png',
    'p4-4.png',
    'back-btn.png',
    'again.png',
    'anwser.png',
    'share.png',
    'share-tips.png',
    '1gif.png',
    '2gif.png',
    '3gif.png',
    'wrong.png',
    'right.png'
];
$(function () {
    //rem定义
    var innerWidth = window.innerWidth > 750 ?
        750 :
        window.innerWidth;
    document.documentElement.style.fontSize = innerWidth / 7.5 + 'px';
    FastClick.attach(document.body);
    background = document.getElementById("tap");

    var soundBtn = document.getElementsByClassName('sound')[0];
    var soundFile = document.getElementById('soundFile');
    document.addEventListener("WeixinJSBridgeReady", function () { //微信
        soundFile.play();
    }, false);
    document.addEventListener('YixinJSBridgeReady', function () { //易信
        soundFile.play();
    }, false);
    soundBtn.addEventListener("touchstart", function () {
        if ($(this).hasClass('run')) {
            $(this).removeClass('run');
            soundFile.pause();
        } else {
            $(this).addClass('run');
            soundFile.play();
        }
    }, false);

    preload(function () {
        $(".start").fadeIn(300);
        $("#background").show();
        $(".start").one("click", function () {
            $("#tap").show();
            $(".cover").fadeOut(300);
            allowJump = true;
            evt = window.event;
            background.addEventListener("touchend", tStart, false);
            $('.again-btn').click(function () { //再来一次
                reset();
                uploadData('again', 0);
            });
            $('.anwser-btn').click(function () { //查看答案
                $('.anwser-container').show();
                $('.sound').hide();
            });
            $('.back-btn').click(function () { //返回查看分数
                $('.anwser-container').hide();
                $('.sound').show();
            });
            $('.share-btn').click(function () { //分享提示
                uploadData('share', 0);
                var $mask = $(".mask");
                $mask
                    .css('z-index', 16)
                    .show();
                $(".sharebox").show();
                $mask.click(function () {
                    $mask.css('z-index', 12);
                    $(".sharebox").hide();
                    $mask.unbind('click');
                });
            });

        });
    });

})

function tStart() {
    evt.preventDefault();
    isFirstTouch = false;
    if (!isFirstTouch) {
        background.removeEventListener("touchend", tStart, false);
    }
    //开始问题
    showQuestion(jump);
    if (!allowJump) {
        return false;
    } else {
        var box = $(".g" + (currentOrder + 1));
        t2 = setInterval(function () {
            currentScale -= 0.01;
            currentScale = currentScale < 0.9 ?
                0.9 :
                currentScale;
            box.css("transform", "scaleY(" + currentScale + ")");

            $(".chess").css({
                "transform": "translateY(" + (1 - currentScale) * 50 + "px) scaleY(" + currentScale + ") scaleX(" + (1 + (1 - currentScale) / 3) + ")",
                "-webkit-transform": "translateY(" + (1 - currentScale) * 50 + "px) scaleY(" + currentScale + ") scaleX(" + (1 + (1 - currentScale) / 3) + ")"
            });
        }, 30);
        $(".chess").html("");
        for (var i = 0; i < 9; i++) {
            point();
        }
        tPoint = setInterval(function () {
            point();
        }, 120);
    }
}

function jump() {
    if (allowJump) {
        allowJump = false;
        clearInterval(t2);
        clearInterval(tPoint);
        $(".chess").html("");
        var stepWidth = stepLength[currentOrder][0];
        var stepHeight = stepLength[currentOrder][1];
        if (stepWidth < 0) {
            direction = "rotateY(180deg)";
        } else {
            direction = "rotateY(0deg)";
        }

        var box = $(".g" + (currentOrder + 1));
        var pressedScale = currentScale;
        currentScale = 1;
        var t3 = setInterval(function () {
            pressedScale += 0.01;
            if (pressedScale >= 1) {
                clearInterval(t3);
            }
            box.css("transform", "scaleY(" + currentScale + ")");
        }, 60);

        var t1 = setInterval(function () {
            $(".chess").css({
                "left": startLeft + pos[step][0] * stepWidth + "rem",
                "bottom": startBottom + pos[step][1] * stepHeight + "rem",
                "transform": direction,
                "-webkit-transform": direction
            });

            if (step === 11) {
                if (stepWidth < 0) {
                    $(".chess").css({
                        "left": startLeft + pos[step][0] * stepWidth + "rem",
                        "bottom": startBottom + pos[step][1] * stepHeight + "rem",
                        "transform": "rotateY(0deg)",
                        "-webkit-transform": "rotateY(0deg)"
                    });
                }
                $(".ring").css({
                    "bottom": $(".chess")
                        .css("bottom")
                        .replace("px", "") - 71 * innerWidth / 750,
                    "left": $(".chess")
                        .css("left")
                        .replace("px", "") - 114 * innerWidth / 750
                });
                $(".ring").addClass("ring_in");
                var currentBottom = $(".background")
                    .css("bottom")
                    .replace("px", "");
                var currentLeft = $(".background")
                    .css("left")
                    .replace("px", "");
                var moveLeft = currentLeft;
                if (stepLength[currentOrder][0] * stepLength[currentOrder + 1][0] < 0) { //转向时，横向不移动;
                } else {
                    moveLeft = currentLeft - stepLength[currentOrder][0] * innerWidth / 7.5;
                }
                $(".background").animate({
                    bottom: currentBottom - stepLength[currentOrder][1] * innerWidth / 7.5 + "px",
                    left: moveLeft + "px"
                }, 600);

                setTimeout(function () {
                    $(".ring").removeClass("ring_in");
                }, 500);

                $(".g" + (parseInt(currentOrder) + 3))
                    .find(".box")
                    .addClass("box_in");
                step = 1;
                startLeft += stepLength[currentOrder][0];
                startBottom += stepLength[currentOrder][1];
                currentOrder += 1;
                $(".number")
                    .find("img")
                    .attr("src", "img/" + currentOrder + ".png");
                clearInterval(t1);
                if (currentOrder === 8) {
                    jumpTime = 700;
                }
                setTimeout(function () {
                    allowJump = true;
                    showQuestion(jump);
                }, jumpTime);
            } else {
                step++;
            }

        }, 30);
    } else {}
}

function point() {
    var rdnStartTop = parseInt(Math.random() * 100);
    var rdnStartLeft = parseInt(Math.random() * 100);
    var color = ["#a6f4af", "#ffffff"];
    color = color[parseInt(Math.random() * 2)];
    var width = parseInt(Math.random() * 2) + 8;
    var fixedPosition1 = parseInt(Math.random() * 40);
    fixedPosition1 = fixedPosition1 % 2 === 0 ?
        fixedPosition1 :
        -fixedPosition1;
    fixedPosition2 = fixedPosition2 % 2 === 0 ?
        fixedPosition2 :
        -fixedPosition2;
    var fixedPosition2 = parseInt(Math.random() * 20);
    rdnStartTop = rdnStartTop % 2 === 0 ?
        rdnStartTop + 100 :
        350 - rdnStartTop;
    rdnStartLeft = rdnStartLeft % 2 === 0 ?
        rdnStartLeft :
        200 - rdnStartLeft;
    var rdnDurationTime = parseInt(Math.random() * 1000 + 1000);
    $("<div/>", {
            'class': 'point',
            'style': 'top:' + rdnStartTop / 100 + 'rem;left:' + rdnStartLeft / 100 + 'rem;background-color:' + color + ';width:' + width / 100 + "rem;height:" + width / 100 + "rem"
        })
        .appendTo($(".chess"))
        .animate({
            top: (2 + fixedPosition1 / 100) + 'rem',
            left: (1.3 + fixedPosition2 / 100) + 'rem'
        }, rdnDurationTime, 'swing', function () {
            $(this).remove();
        });
}

/****答题部分*****/
function showQuestion(cb) {
    $('.question').remove();
    var code,
        text = question[currentOrder]
        .text
        .split("，");
    var code = '<a class="btn btn-A"><span>A</span>' + text[0] + '</a><a class="btn btn-B"><span>B</span>' + text[1] + '</a>';
    var oquestion = $("<div/>", {
            "class": "question question_in p" + (currentOrder + 1)
        })
        .html(code)
        .appendTo($("body"));
    $(".mask").show();

    //第7题选项需要改变
    if (currentOrder === 6) {
        $(".mask")
            .find('.btn')
            .addClass('.p7');
    } else {
        $(".mask")
            .find('.btn')
            .remove('.p7');
    }

    $(".question_in")
        .on('click', '.btn', function () {
            // alert('被点击了');
            $(".mask").css('z-index', 12);
            if ($(this).index() === question[currentOrder].answer) {
                $("#right").show();
                score++;
                $('.number').attr('class', 'number score' + score);
            } else {
                $("#wrong").show();
            }
            setTimeout(function () {

                $(".mask")
                    .css('z-index', 11)
                    .hide();
                $("#right,#wrong").hide();
                $('.question').remove();
                if (currentOrder === 8) { //最后一步
                    allowJump = false;
                    uploadData('score', parseInt(score + '0'));
                    var $scoreBox = $('.score-box'),
                        git = '';
                    gif = score > 6 ? 'gif1' : score > 2 ? 'gif2' : 'gif3';
                    $scoreBox
                        .addClass(gif)
                        .show();
                    $scoreBox
                        .find('.scoreCon')
                        .attr('class', 'scoreCon p' + score);
                    $(".mask")
                        .css('z-index', 12)
                        .show();
                } else {
                    cb();
                }
            }, questionTime);
        });
}

function reset() {

    $(".background").css({
        "bottom": 0,
        "left": 0
    });
    step = 1;
    $('.number').attr('class', 'number score0');
    $('.question').remove();
    $('.score-box').hide();
    $(".mask")
        .css('z-index', 11)
        .hide();
    score = 0;
    currentOrder = 0;
    startBottom = 2.8;
    startLeft = 4.8;
    jumpTime = 1000;
    allowJump = true;
    background.addEventListener("touchend", tStart, false);
    $(".chess")
        .css({
            "bottom": "2.8rem",
            "left": "4.8rem"
        })
        .html("");
    $(".box").removeClass("box_in");
    $(".number")
        .find("img")
        .attr("src", "img/" + currentOrder + ".png");
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
            $("#imgArr").append(img);
            img.onload = function () {
                loadedCount++;
                tmpList.pop(tmpList[i]);
            };
            if (img.complete) {} else {}
        }
        if (loadedCount == loopCount) {
            console.log("大图加载完成");
            cb();
            clearInterval(t1);
            JSON.parse
        }
    }, 500);
}

/**上报数据
 * @param {String} type 事件 score,again,share
 * @param {Number} value 分数值 有就传值，没有传0
 */
function uploadData(type, value) {
    var successCb = function (data) {
        console.log(data);
        console.log('成功了！');
    };
    var errorCb = function (data) {};
    var config = {
        url: UPLOAD,
        type: 'POST',
        data: {
            type: type,
            value: value
        },
        success: successCb,
        error: errorCb
    };
    getAjax(config);
}

function getAjax(data) {
    data.url = HOST + data.url;
    $.ajax(data);
}