function Validation() {
    this.validMaId = true;
    this.validEmpty = true;
    this.validLenght = true;
    this.validString = true;
    this.validEmail = true;
    this.validPhone = true;
    this.validSelectBox = true;

    this.kiemTraMsNV = function (arrList, iputId, spanId, message) {
        console.log(arrList)

        $(iputId).keyup(() => {
            if (this.validLenght) {
                var text = $(iputId).val();
                if (arrList != []) {
                    var check = !arrList.some((item) => {
                        return item.TaiKhoan === text
                    })
                }
                if (check) {

                    this.validMaId = true;
                } else {
                    $(spanId).html(message);
                    $(spanId).css({
                        "display": "block",
                        "color": "#dc3545",
                        "font-size": ".8em",
                        'position': 'unset',
                        'top': '0%',
                        'transform': 'translateY(0%)',
                        'padding-right': '0px',
                    })
                    $(iputId).css({
                        "border-color": "#dc3545",
                    })
                    this.validMaId = false;
                }
            }
        })

    }

    this.kiemTraRong = function (iputId, spanId, message) {
        var text = $(iputId).val()
        if (text === "") {
            $(spanId).html(message);
            $(spanId).css({
                "display": "block",
                "color": "#dc3545",
                "font-size": ".8em",
                'position': 'unset',
                'top': '0%',
                'transform': 'translateY(0%)',
                'padding-right': '0px',
            })
            $(iputId).css({
                "border-color": "#dc3545",
            })
            this.validEmpty = false;
        }

    };

    this.kiemTraSelectBox = function (ele, spanId, message) {
        if ($(ele).selectedIndex != 0) {
            $(spanId).html(`<i class="fa fa-check"></i>`);
            $(spanId).css({
                "display": "block",
                "color": "#00fe5a",
                'position': 'absolute',
                'top': '50%',
                'right': '0',
                'transform': 'translateY(-50%)',
                'padding-right': '10px',
                'font-size': '20px',
            })
            $(iputId).css({
                "border-color": "#00fe5a",
            })
            this.validSelectBox = true;
        }
        $(spanId).html(message);
        $(spanId).css({
            "display": "block",
            "color": "#dc3545",
            "font-size": ".8em",
            'position': 'unset',
            'top': '0%',
            'transform': 'translateY(0%)',
            'padding-right': '0px',
        })
        $(iputId).css({
            "border-color": "#dc3545",
        })
        this.validSelectBox = false;
    };

    this.kiemTraDoDai = function (iputId, spanId, message, min, max) {
        $(iputId).keyup(() => {
            var text = $(iputId).val()
            if (text === '') {
                this.kiemTraRong(iputId, spanId, 'Không được để trống')
            } else {
                this.validEmpty = true;
                if (text.length >= min && text.length <= max) {
                    $(spanId).html(`<i class="fa fa-check"></i>`);
                    $(spanId).css({
                        "display": "block",
                        "color": "#00fe5a",
                        'position': 'absolute',
                        'top': '50%',
                        'right': '0',
                        'transform': 'translateY(-50%)',
                        'padding-right': '10px',
                        'font-size': '20px',
                    })
                    $(iputId).css({
                        "border-color": "#00fe5a",
                    })
                    this.validLenght = true;
                } else {
                    $(spanId).html(message);
                    $(spanId).css({
                        "display": "block",
                        "color": "#dc3545",
                        "font-size": ".8em",
                        'position': 'unset',
                        'top': '0%',
                        'transform': 'translateY(0%)',
                        'padding-right': '0px',
                    })
                    $(iputId).css({
                        "border-color": "#dc3545",
                    })
                    this.validLenght = false;
                }
            }

        })

    };

    this.kiemTraChuoi = function (iputId, spanId, message) {
        $(iputId).keyup(() => {
            if (this.validLenght) {
                var text = $(iputId).val()
                var pattern = new RegExp(
                    "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
                    "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
                    "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$"
                );
                if (pattern.test(text)) {

                    this.validString = true;
                } else {
                    $(spanId).html(message);
                    $(spanId).css({
                        "display": "block",
                        "color": "#dc3545",
                        "font-size": ".8em",
                        'position': 'unset',
                        'top': '0%',
                        'transform': 'translateY(0%)',
                        'padding-right': '0px',
                    })
                    $(iputId).css({
                        "border-color": "#dc3545",
                    })
                    this.validString = false;
                }
            }
        })
    };

    this.kiemTraEmail = function (iputId, spanId, message) {
        $(iputId).keyup(() => {
            var text = $(iputId).val()
            if (text === '') {
                this.kiemTraRong(iputId, spanId, 'Không được để trống')
            } else {
                this.validEmpty = true;
                var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                if (text.match(mailformat)) {
                    $(spanId).html(`<i class="fa fa-check"></i>`);
                    $(spanId).css({
                        "display": "block",
                        "color": "#00fe5a",
                        'position': 'absolute',
                        'top': '50%',
                        'right': '0',
                        'transform': 'translateY(-50%)',
                        'padding-right': '10px',
                        'font-size': '20px',
                    })
                    $(iputId).css({
                        "border-color": "#00fe5a",
                    })
                    this.validEmail = true;
                } else {
                    $(spanId).html(message);
                    $(spanId).css({
                        "display": "block",
                        "color": "#dc3545",
                        "font-size": ".8em",
                        'position': 'unset',
                        'top': '0%',
                        'transform': 'translateY(0%)',
                        'padding-right': '0px',
                    })
                    $(iputId).css({
                        "border-color": "#dc3545",
                    })
                    this.validEmail = false;
                }
            }
        })
    };

    this.kiemTraSoDienThoai = function (iputId, spanId, message) {

        $(iputId).keyup(() => {
            var text = $(iputId).val()
            if (text === '') {
                this.kiemTraRong(iputId, spanId, 'Không được để trống')
            } else {
                this.validEmpty = true;
                var phone_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
                if (phone_regex.test(text) == false) {
                    $(spanId).html(message);
                    $(spanId).css({
                        "display": "block",
                        "color": "#dc3545",
                        "font-size": ".8em",
                        'top': '0%',
                        'position': 'unset',
                        'top': '0%',
                        'transform': 'translateY(0%)',
                        'padding-right': '0px',
                    })
                    $(iputId).css({
                        "border-color": "#dc3545",
                    })
                    this.validPhone = false;
                } else {
                    $(spanId).html(`<i class="fa fa-check"></i>`);
                    $(spanId).css({
                        "display": "block",
                        "color": "#00fe5a",
                        'position': 'absolute',
                        'top': '50%',
                        'right': '0',
                        'transform': 'translateY(-50%)',
                        'padding-right': '10px',
                        'font-size': '20px',
                    })
                    $(iputId).css({
                        "border-color": "#00fe5a",
                    })
                    this.validPhone = true;
                }
            }
        })

    }
}