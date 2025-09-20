# Member Info Display Website

## Cấu trúc thư mục

- `index.html`, `style.css`, `script.js`: Giao diện và logic chính.
- `data/members/{member_id}/info.json`: Thông tin thành viên.
- `data/members/{member_id}/avatar.jpg`: Ảnh đại diện thành viên.
- `data/card/logo.jpg`: Logo góc phải trên card.
- `data/card/bg.jpg`: Ảnh nền card.

## Hướng dẫn phát triển

- Sử dụng Bootstrap cho layout, ưu tiên mobile.
- Để xem thử: mở `index.html` và truy cập `/members/example_member`.
- Để thêm thành viên mới: tạo thư mục và file tương tự trong `data/members/`.

## Triển khai GitHub Pages

- Đảm bảo branch chính là `main` hoặc `gh-pages`.
- Cấu hình GitHub Pages trỏ vào thư mục `/site`.
- Mỗi lần push lên GitHub, site sẽ tự động cập nhật.

## Ghi chú
- Dự án nhẹ, tối ưu cho thiết bị di động.
- Không sử dụng component nặng của Bootstrap.