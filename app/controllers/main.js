$(document).ready(function () {
    var danhSachNguoiDung = new DanhSachNguoiDung();
    var validation = new Validation();
    var mangNguoiDung = []

    // Khai Bao DOM
    var TaiKhoan = $('#TaiKhoan')
    var HoTen = $('#HoTen')
    var MatKhau = $('#MatKhau')
    var Email = $('#Email')
    var SoDienThoai = $('#SoDienThoai')
    var MaLoaiNguoiDung = $('#loaiNguoiDung')

    // Load Danh Sách Ngươi Dung
    getlistUsers();

    function getlistUsers() {
        danhSachNguoiDung.getlistUsers()

            .done(function (data) {
                console.log(data)
                localStorage.setItem(
                    "DanhSachUsers",
                    JSON.stringify(data)
                );
                mangNguoiDung = data
                listNguoiDung(mangNguoiDung)
                validate()
            })
            .fail(function (error) {
                console.log(error)
            });

          // validate
        
    }

    function listNguoiDung(mangND) {
        var Tbody = $('#tblDanhSachNguoiDung');
        var html = ``;

        mangND.map((item, index) => {
            html += `
                <tr>
                  
                    <td>${index+1}</td>
                    <td>${item.TaiKhoan }</td>
                    <td>${item.MatKhau } </td>
                    <td>${item.HoTen } </td>
                    <td>${item.Email } </td>
                    <td>${item.TenLoaiNguoiDung} </td>
                    <td>${item.SoDT } </td>
                    <td>
                        <button class="btn btn-primary btnSua" data-toggle="modal" data-target="#myModal" data-taikhoan="${item.TaiKhoan}" >Sửa</button>
                        <button data-taikhoan="${item.TaiKhoan}" class="btn btn-danger btnDelete" >Xóa</button>
                    </td>
                </tr>
        `
        });
        Tbody.html(html)
    }
    // nut them
    $('#btnThemNguoiDung').click(function () {
        editTitle("Thêm Người Dùng", 'btnAdd', 'Thêm Mới', false)

        TaiKhoan.val('')
        TaiKhoan.attr('disabled', false)
        HoTen.val('')
        MatKhau.val('')
        Email.val('')
        SoDienThoai.val('')
        MaLoaiNguoiDung.val('GV')

    })

    // Validation

    function validate() {
        // kiem tra input tai khoan
        // Xếp theo thứ tự yêu tiên  Rỗng > Độ Dài > KiemTraMa
        validation.kiemTraDoDai('#TaiKhoan', "#tbTaiKhoan", "(*) Độ dài ký tự từ 5-12", 5, 12)
        validation.kiemTraMsNV(mangNguoiDung, '#TaiKhoan', "#tbTaiKhoan", "(*) Tài Khoản Đã Tồn Tại")

        // kiem tra input Tên Người Dùng
        validation.kiemTraDoDai('#HoTen', "#tbHoTen", "(*) Độ dài ký tự từ 5-30", 5, 30)
        validation.kiemTraChuoi("#HoTen", "#tbHoTen", "(*) Vui lòng nhập vào ký tự chữ");

        // Kiem tra input Email
        validation.kiemTraEmail("#Email", "#tbEmail", "(*) Vui lòng nhập đúng định dạng Email");

        // Kiem tra input password        
        validation.kiemTraDoDai("#MatKhau", "#tbMatKhau", "(*) Độ dài ký tự từ 5-30", 5, 30)


        // Kiem tra input SĐT 
        validation.kiemTraSoDienThoai("#SoDienThoai", "#tbSoDienThoai", "(*) Vui lòng nhập đúng Số Điện Thoại");
    }

    //Nut Them người dùng
    $('body').delegate('#btnAdd', "click", function () { //uy quyen lại cho body
        var isValid = false;
        isValid = validation.validMaId && validation.validEmpty && validation.validLenght && validation.validString && validation.validEmail && validation.validPhone;
        if (isValid) {
            var nguoiDungMoi = new NguoiDung(TaiKhoan.val(), MatKhau.val(), HoTen.val(), Email.val(), SoDienThoai.val(), MaLoaiNguoiDung.val());
            danhSachNguoiDung.themNguoiDung(nguoiDungMoi)
                .done(function (data) {
                    var objData = {};
                    if (data === "tai khoan da ton tai !") {
                        alert(data)
                    } else {
                        objData = {
                            TaiKhoan: data.TaiKhoan,
                            MatKhau: data.MatKhau,
                            HoTen: data.HoTen,
                            Email: data.Email,
                            SoDT: data.SoDT,
                            MaLoaiNguoiDung: data.MaLoaiNguoiDung,
                            TenLoaiNguoiDung: (data.MaLoaiNguoiDung === 'GV') ? "Giáo Vụ" : "Học Viên",
                        }
                        mangNguoiDung.unshift(objData);
                        listNguoiDung(mangNguoiDung);
                        setLocalStorage()
                    }
                }).fail(function (error) {
                    console.log(error)
                })
            $('#myModal').modal('hide');

        } else {
            validation.kiemTraRong('#TaiKhoan', "#tbTaiKhoan", "(*) Vui lòng nhập Tài Khoản")
            validation.kiemTraRong('#HoTen', "#tbHoTen", "(*) Vui lòng nhập Họ Tên")
            validation.kiemTraRong("#Email", "#tbEmail", "(*) Vui lòng nhập Email")
            validation.kiemTraRong("#MatKhau", "#tbMatKhau", "(*) Vui lòng nhập Mật khẩu");
            validation.kiemTraRong("#SoDienThoai", "#tbSoDienThoai", "(*) Vui lòng nhập Số Điện Thoại");

        }

    })

    //Load data Edit 
    $('body').delegate(".btnSua", "click", function () {
        editTitle("Sủa Người Dùng", 'btnEdit', 'Cập Nhật', true)

        var taikhoan = $(this).data('taikhoan');
        danhSachNguoiDung.getUserById()
        var dataUser = danhSachNguoiDung.layThongTinNguoiDung(taikhoan)

        $('#TaiKhoan').attr('disabled', '')
        $('#TaiKhoan').val(dataUser.TaiKhoan)
        $('#HoTen').val(dataUser.HoTen)
        $('#MatKhau').val(dataUser.MatKhau)
        $('#Email').val(dataUser.Email)
        $('#SoDienThoai').val(dataUser.SoDT)
        $('#loaiNguoiDung').val(dataUser.MaLoaiNguoiDung)
    })

    // Click btnEdit

    $('body').delegate("#btnEdit", 'click', function () {
        var isValid = false;

        isValid = validation.validEmpty && validation.validLenght && validation.validString && validation.validEmail && validation.validPhone;

        if (isValid) {
        var user = new NguoiDung(TaiKhoan.val(), HoTen.val(), MatKhau.val(), Email.val(), SoDienThoai.val(), MaLoaiNguoiDung.val());
        danhSachNguoiDung.editUser(user)
            .done(function (dataUser) {
                danhSachNguoiDung.editUserLocal(mangNguoiDung, dataUser) // set lai thông tin ở mảng local sau khi update thành công
                listNguoiDung(mangNguoiDung);
                setLocalStorage()
                console.log(mangNguoiDung)
                //  location.reload()
            }).fail(function (error) {
                console.log(error)
            });
        $('#myModal').modal('hide');
        }
    })

    // Click Btn Delete
    $('body').delegate('.btnDelete', 'click', function () {
        var accountUser = $(this).data('taikhoan');
        console.log(accountUser)
        danhSachNguoiDung.deleteUser(accountUser)
            .done(function (data) {
                var indexUser = mangNguoiDung.findIndex((item) => {
                    return data.TaiKhoan === accountUser;
                })
                mangNguoiDung.splice(indexUser, 1);
                listNguoiDung(mangNguoiDung);
                setLocalStorage()

            }).fail(function (error) {
                console.log(error)
            });
    })

    //Search
    $('#searchUser').keyup(() => {
        console.log('search')
        var text = $('#searchUser').val()
        var mangSearch = danhSachNguoiDung.searchUser(mangNguoiDung, text);
        listNguoiDung(mangSearch);

    })

    function setLocalStorage() {
        localStorage.setItem(
            "DanhSachUsers",
            JSON.stringify(mangNguoiDung)
        );
    }

    function getLocalStorage() {
        if (localStorage.getItem("DanhSachUsers") != null) {
            mangNguoiDung = JSON.parse(
                localStorage.getItem("DanhSachUsers")
            );
            listNguoiDung(danhSachNguoiDung.mangNguoiDung);
        }
    }

    function editTitle(title, idBtn, nameBtn, isvalid) {
        validation.validMaId = isvalid;
        validation.validEmpty = isvalid;
        validation.validLenght = isvalid;
        validation.validString = isvalid;
        validation.validEmail = isvalid;
        validation.validPhone = isvalid;
        validation.validSelectBox = isvalid;
        $(".sp-valid").css({
            "display": "none"
        });
        $("#myModal input").css({
            "border-color": "#ced4da"
        });
        $('#myModal .modal-title').html(title)
        var buttonAdd = `
        <button type="button" class="btn btn-success" id="${idBtn}" >${nameBtn}</button>
        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
        `
        $('#myModal .modal-footer').html(buttonAdd)
    }
})