function DanhSachNguoiDung() {
    this.mangNguoiDung = []
    // Lay Danh Sach nguoidung
    this.getlistUsers = function () {
        return $.ajax({
            method: "GET",
            url: "http://svcy.myclass.vn/api/QuanLyTrungTam/DanhSachNguoiDung",
            // dataType: "JSON",
        }) //.done(function (data) {
        //    // localStorage.setItem(  "DanhSachUsers", JSON.stringify(data) );
        //     //listNguoiDung(data)
        //   //  this.mangNguoiDung = data
        //    // listNguoiDung(this.mangNguoiDung)
        //     console.log(this.mangNguoiDung)
        // })
        // .fail(function (error) {
        //     console.log(error)
        // });
        // //console.log(this.mangNguoiDung)

    }
 
    // them Ng Dung
    this.themNguoiDung = function (NhanVien) {
        //api/QuanLyTrungTam/ThemNguoiDung
        return $.ajax({
            type: "POST",
            url: "http://svcy.myclass.vn/api/QuanLyTrungTam/ThemNguoiDung",
            data: NhanVien,
        })
        // this.mangNguoiDung.unshift(NhanVien);
    }

    // lay Nguoi Dung 
    this.getUserById = function (taiKhoanND) {
        //api/QuanLyTrungTam/ThongTinNguoiDung?taikhoan={taikhoan}
        return $.ajax({
            type: "GET",
            url: `http://svcy.myclass.vn/api/QuanLyTrungTam/ThongTinNguoiDung?taikhoan=${taiKhoanND}`,
            // dataType: "JSON",
        })
    }
    this.layThongTinNguoiDung = function (taiKhoanND) {
        var mangNguoiDung = JSON.parse(localStorage.getItem('DanhSachUsers'));
        return mangNguoiDung.find(function (item) {
            return item.TaiKhoan === taiKhoanND
        })
    }
    // Sua Nguoi dung
    this.editUser = function (user) {
        console.log(user)
        return $.ajax({
            type: "PUT",
            url: 'http://svcy.myclass.vn/api/QuanLyTrungTam/CapNhatThongTinNguoiDung',
            data: JSON.stringify(user),
            contentType: 'application/json',
            dataType: 'JSON'
        })

    }
    this.editUserLocal = function (mangNguoiDung, user) {
        mangNguoiDung.map((item) => {
            if (item.TaiKhoan === user.TaiKhoan) {
                item.HoTen = user.HoTen
                item.MatKhau = user.MatKhau
                item.Email = user.Email
                item.SoDT = user.SoDT
                item.MaLoaiNguoiDung = user.MaLoaiNguoiDung
                item.TenLoaiNguoiDung = (user.MaLoaiNguoiDung === 'GV') ? "Giáo Vụ" : "Học Viên"
            }
        })
    }
    //Delete User

    this.deleteUser = function (accountUser) {
        // QuanLyTrungTam/XoaNguoiDung/{id}
      return  $.ajax({
            type: "DELETE",
            url: `http://svcy.myclass.vn/api/QuanLyTrungTam/XoaNguoiDung/${accountUser}`,
            // dataType: "JSON",
        })
    }
    // Search
    this.searchUser = function (mangNguoiDung,text) {
        return mangNguoiDung.filter((item) => {
            return item.TaiKhoan.toUpperCase().indexOf(text.toUpperCase()) > -1 //|| item.HoTen.toUpperCase().indexOf(text.toUpperCase()) > -1
        })

    }

}