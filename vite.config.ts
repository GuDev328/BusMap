import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import styleImport from 'vite-plugin-style-import';

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          'primary-color': '#333', // Màu chính
          'link-color': '#333', // Màu liên kết
          'success-color': '#52c41a', // Màu thành công
          'warning-color': '#faad14', // Màu cảnh báo
          'error-color': '#f5222d', // Màu lỗi
          'font-size-base': '14px', // Font chữ
        },
        javascriptEnabled: true,
      },
    },
  },
});
