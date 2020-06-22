$(() => {
    var month_id = 0;
    var fprise_1 = new Array();
    var fprise_2 = new Array();
    var mprise_1;
    var mprise_2;
    var tmprise_1;
    var tmprise_2;
    var exprise_1;
    var exprise_2;
    var total = 0;
    var getprisenum = 0;

    $.ajax({
        url: "https://cors-anywhere.herokuapp.com/http://invoice.etax.nat.gov.tw/invoice.xml",
        method: "GET",
        dataType: "xml"
    }).done(function(data) {
        var month_1 = data.getElementsByTagName("title")[1];
        var month_2 = data.getElementsByTagName("title")[2];
        $('#m_btn1').html(month_1);
        $('#m_btn2').html(month_2);
        //切割字串取出第一組頭獎及增開六獎
        var split_string = data.getElementsByTagName("description")[1].firstChild.nodeValue.split("<p>");
        for (i = 0; i < split_string[3].split('、').length; i++) {
            fprise_1[i] = split_string[3].split('、')[i].replace(/[^0-9]/ig, "");
        }
        exprise_1 = split_string[4].replace(/[^0-9]/ig, "");
        tmprise_1 = split_string[1].replace(/[^0-9]/ig, "");
        mprise_1 = split_string[2].replace(/[^0-9]/ig, "");
        //切割字串取出第二組頭獎及增開六獎
        split_string = data.getElementsByTagName("description")[2].firstChild.nodeValue.split("<p>");
        for (i = 0; i < split_string[3].split('、').length; i++) {
            fprise_2[i] = split_string[3].split('、')[i].replace(/[^0-9]/ig, "");
        }
        exprise_2 = split_string[4].replace(/[^0-9]/ig, "");
        tmprise_2 = split_string[1].replace(/[^0-9]/ig, "");
        mprise_2 = split_string[2].replace(/[^0-9]/ig, "");
    });
    $('#m_btn1').click(function() {
        $('#month_btn').hide();
        $('#check_area').show();
        month_id = 0;
        total = 0;
        getprisenum = 0;
        getlist(month_id);
        $('#count').html("已對張數:" + total + ";中獎張數:" + getprisenum);
    });
    $('#m_btn2').click(function() {
        $('#month_btn').hide();
        $('#check_area').show();
        month_id = 1;
        total = 0;
        getprisenum = 0;
        getlist(month_id);
        $('#count').html("已對張數:" + total + ";中獎張數:" + getprisenum);
    });
    $('#num_enter').keyup(function() {
        var entertext = $('#num_enter').val();
        if (entertext.length > 2) {
            check(month_id, entertext)
            $('#num_enter').val(null);
        }
    });
    $('#btn0').click(function() {
        numbtn("0");
    });
    $('#btn1').click(function() {
        numbtn("1")
    });
    $('#btn2').click(function() {
        numbtn("2")
    });
    $('#btn3').click(function() {
        numbtn("3")
    });
    $('#btn4').click(function() {
        numbtn("4")
    });
    $('#btn5').click(function() {
        numbtn("5")
    });
    $('#btn6').click(function() {
        numbtn("6")
    });
    $('#btn7').click(function() {
        numbtn("7")
    });
    $('#btn8').click(function() {
        numbtn("8")
    });
    $('#btn9').click(function() {
        numbtn("9")
    });
    $('#btn_clear').click(function() {
        $('#num_enter').val(null);
    });
    $('#btn_back').click(function() {
        $('#check_area').hide();
        $('#month_btn').show();
    });

    function getlist(num) {
        if (num == 0) {
            $('#tmprise').html("特別獎:" + tmprise_1);
            $('#mprise').html("特獎:" + mprise_1);
            $('#fprise').html("頭獎:" + fprise_1);
            $('#exprise').html("增開六獎:" + exprise_1);
        } else {
            $('#tmprise').html("特別獎:" + tmprise_2);
            $('#mprise').html("特獎:" + mprise_2);
            $('#fprise').html("頭獎:" + fprise_2);
            $('#exprise').html("增開六獎:" + exprise_2);
        }
    }

    function check(i, entertext) {
        var num = parseInt(entertext, 10);
        var getornot = false;
        if (i == 0) {
            for (j = 0; j < fprise_1.length; j++) {
                if (num == parseInt(fprise_1[j], 10) % 1000) {
                    getornot = true;
                    break;
                }
            }
            if (getornot == false) {
                if (num == parseInt(exprise_1, 10) % 1000) {
                    getornot = true;
                }
            }
            getprise(getornot);
        } else {
            for (j = 0; j < fprise_2.length; j++) {
                if (num == parseInt(fprise_2[j], 10) % 1000) {
                    getornot = true;
                    break;
                }
            }
            if (getornot == false) {
                if (num == parseInt(exprise_2, 10) % 1000) {
                    getornot = true;
                }
            }
            getprise(getornot);
        }
        check_sprise(month_id, num);
    }

    function check_sprise(month_id, num) {
        if (month_id == 0) {
            if (num == parseInt(tmprise_1, 10) % 1000) {
                alert("注意特別獎");
            } else if (num == parseInt(mprise_1, 10) % 1000) {
                alert("注意特獎");
            }
        } else {
            if (num == parseInt(tmprise_2, 10) % 1000) {
                alert("注意特別獎");
            } else if (num == parseInt(mprise_2, 10) % 1000) {
                alert("注意特獎");
            }
        }
    }

    function getprise(getornot) {
        if (getornot == true) {
            total = total + 1;
            getprisenum = getprisenum + 1;
            alert("恭喜中獎!");
        } else {
            total = total + 1;
        }
        $('#count').html("已對張數:" + total + ";中獎張數:" + getprisenum);
    }

    function numbtn(num) {
        var textnow = $('#num_enter').val();
        $('#num_enter').val(textnow + num);
        if ((textnow + num).length > 2) {
            check(month_id, textnow + num)
            $('#num_enter').val(null);
        }
    }
})