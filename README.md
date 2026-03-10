# Interactive Math Portfolio

這是一個基於 React 19 和 Vite 構建的高級數學作品集。整合了 Gemini AI 提供互動式數學輔助。

## 🚀 快速開始

### 前置作業
- 安裝 [Node.js](https://nodejs.org/) (建議 v20 以上)
- 準備 [Gemini API Key](https://aistudio.google.com/app/apikey)

### 本地開發
1. **安裝套件**
   ```bash
   npm install
   ```
2. **設定環境變數**
   複製 `.env.example` 並重新命名為 `.env`，填入你的 API Key：
   ```env
   GEMINI_API_KEY=your_api_key_here
   ```
3. **啟動開發伺服器**
   ```bash
   npm run dev
   ```
   現在可以在 `http://localhost:3000` 查看你的應用。

## 🛠️ 專案腳本
- `npm run dev`: 啟動開發環境
- `npm run build`: 構建生產版本
- `npm run lint`: 檢查程式碼風格
- `npm run type-check`: 執行 TypeScript 類型檢查

## 📦 部署指南
本專案已設定 GitHub Actions。當你推送到 `main` 分支時，會自動部屬至 GitHub Pages。
**注意：** 須在 GitHub Repository > Settings > Secrets and variables > Actions 中設定 `GEMINI_API_KEY`。

## 📁 專案結構
- `src/`: 原始碼
  - `src/pages/`: 獨立頁面組件 (首頁、作品集、AI 助手等)
  - `src/components/`: 通用 UI 組件
  - `src/data/`: 靜態數據 (LaTeX 符號、作品列表等)
  - `src/utils/`: 工具函式
- `.github/workflows/`: 自動化部屬設定
- `index.html`: 應用程式入口
