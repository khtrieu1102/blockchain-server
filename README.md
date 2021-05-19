# BLOCKCHAIN - ĐỒ ÁN MÔN HỌC

## Trường Đại học Khoa học Tự Nhiên - ĐHQG TPHCM

## Môn học: Các công nghệ mới trong Công nghệ Phần Mềm

## Sinh viên: NGUYỄN NGỌC KHẮC TRIỆU - 1612738

## 0. Sản phẩm:

-   Client: [Tại github này](https://github.com/khtrieu1102/blockchain-client)

-   Server: [Tại chính github này](https://github.com/khtrieu1102/blockchain-server)

---

## 1. Quá trình làm việc:

-   Từ lúc nhận deadline -> 13/5/2021: Đọc tài liệu về blockchain và cách cài đặt (NaiveCoin)

-   Code client và chỉnh sửa lại code bên server (naivecoin)

---

## 2. Các nguồn tài liệu tham khảo + sử dụng lại:

-   Tham khảo SERVER tại tài liệu blockchain [NaiveCoin](https://lhartikk.github.io/)

-   Điểm khác biệt của tài liệu tham khảo đối với yêu cầu đồ án:

    > Sử dụng privateKey trong chính project => chỉ có thể điều khiển send/mine với 1 address nhất định.

-   Tận dụng lại code Client (Reactjs) đã làm cho đồ án ví điện tử Internet Banking, môn Phát triển ứng dụng web nâng cao.

### 2.1 Các nâng cấp với tài liệu NaiveCoin:

-   Đăng nhập, tạo ví, authorization.

    > Ở đây mình làm nhanh nên đã bỏ sẵn privateKey vào bên trong của database, đây là **không được áp dụng thực tế**

    > privateKey phải được lưu bởi mỗi cá nhân, chỉ dùng được ký khi bắt đầu lệnh chuyển tiền _(Send transaction to TxPool)_

-   Sử dụng wallet

    > Giúp cho dễ test tài khoản, sử dụng tên riêng sẽ dễ nhìn hơn là dùng Address (publicKey)

---

## 3. Cách sử dụng và video hướng dẫn:

Tải server, client về tại 2 github bên trên.
Với mỗi project, gõ các lệnh

> npm install

> npm start

Video Youtube: https://youtu.be/GN7dtvE_jI4
