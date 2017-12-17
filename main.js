function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
(function ($) {
    $(document).ready(function () {
        $("#createATask").click(function () {
            $('#task').empty();
            $('#help').text('');
            $('#task').append('<div class="container" style="text-align: center;font-size: 25px; color: cadetblue"><div id="numbers"><input id="number1"   style="color: cadetblue;width: 23px;border: none;background-color: white" disabled>+<input id="number2" style="color: cadetblue;width: 23px;border: none;background-color: white" disabled>=<input id="sum" value="?" style="color: cadetblue;width: 23px;border: none;background-color: white" disabled></div></div>');
            $('#number1').val(getRandomInt(6, 9));
            var sum = getRandomInt(11, 14);
            $('#number2').val(sum - (+$('#number1').val()));
            $('#task').append('<div class="container" id="inputs" style="text-align: left;margin-top: 5px;height: 22px"></div>');
            $('#task').append('<div class="container" style="text-align: center;"><canvas id="canvas" width="875" height="22" "></canvas><img id="lineImg" src="sprite.png" style="position: relative;top: -20px;z-index: -10000;"></div>');
            var canvas = document.getElementById('canvas');
                if (canvas.getContext) {
                var context = canvas.getContext('2d');
                var end = 43.4 * $('#number1').val() + 5 * (8 - $('#number1').val());
                var marginStart = ($('.container').width() - 875) / 2 + 15;
                var margin = 43.4 * $('#number1').val() / 2 + marginStart;
                $('#inputs').append('<input id="firstNum" style="position: relative; left: ' + margin + 'px;font-size: 15px;width: 17px;border: none">');
                setTimeout(function(){
                    context.moveTo(35, 20);
                    context.quadraticCurveTo(21.5 * $('#number1').val(), 0, end, 20);
                    context.lineTo(end - 17, 15);
                    context.moveTo(end, 20);
                    context.lineTo(end - 20, 20);
                    context.lineWidth = 2;
                    context.strokeStyle = "cadetblue";
                    context.stroke();
                    $('#firstNum').css({"border": ""});
                }, 1000);
                   }
            $('#firstNum').change(function () {
                if ($('#firstNum').val() != $('#number1').val()) {
                    $('#firstNum').css({"color": "red"});
                    $('#number1').css({"background-color": "#FFDB7B"});
                    $('#help').text('Введи 1 число и посмотри куда указывает стрелка на числовой оси!');
                }
                else {
                    $('#help').text('');
                    $('#firstNum').css({"color": "black", "border": "none", "background-color": "white"});
                    $('#firstNum').prop('disabled', true);
                    $('#number1').css({"background-color": "white"});
                    context.moveTo(end, 20);
                    var end2 = 43.4 * sum + 5 * (8 - sum);
                    context.quadraticCurveTo(end + 21.5 * $('#number2').val(), 0, end2, 20);
                    context.lineTo(end2 - 17, 11);
                    context.moveTo(end2, 20);
                    context.lineTo(end2 - 20, 20);
                    context.lineWidth = 2;
                    context.stroke();
                    var margin2 = end2 + marginStart - 30 - 21.5 * $('#number2').val();
                    $('#inputs').append('<input id="secondNum" style="position: relative; left: ' + margin2 + 'px;font-size: 15px;width: 17px;">');
                    $('#secondNum').change(function () {
                        if ($('#secondNum').val() != $('#number2').val()) {
                            $('#secondNum').css({"color": "red"});
                            $('#number2').css({"background-color": "#FFDB7B"});
                            $('#help').text('Введи 2 число и посчитай, сколько измерений прошла вторая стрелка на числовой оси!');
                        }
                        else {
                            $('#help').text('');
                            $('#secondNum').css({"color": "black", "border": "none", "background-color": "white"});
                            $('#secondNum').prop('disabled', true);
                            $('#number2').css({"background-color": "white"});
                            $('#sum').css({"border": '', "width": '3%'});
                            $('#sum').prop('disabled', false);
                            $('#sum').val('');
                            $('#sum').change(function () {
                                if ($('#sum').val() != sum) {
                                    $('#help').text('Введи сумму и посмотри куда указывает стрелка на числовой оси!');
                                    $('#sum').css({"color": "red"});
                                }
                                else {
                                    $('#help').text('Молодец! Начни новое задание, нажав кнопку вверху!');
                                    $('#sum').css({"color": "cadetblue", "border": "none", "background-color": "white"});
                                    $('#sum').prop('disabled', true);
                                }
                            })
                        }
                    });
                }
            })

        })
    })
})(jQuery);
