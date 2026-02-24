# WinUI 3 數學教育作品集開發提示詞 (v0.1.3.0)

本文件定義了「李老師數學/資訊教育作品集」的核心架構與樣式規範，用於未來導入或重構專案時保持一致性。

## 1. 核心視覺風格 (WinUI 3 Gallery 規範)
- **配色方案**:
  - 背景色: `bg-win-bg` (淺色: #f3f3f3, 深色: #1e1e1e)
  - 表面色: `bg-win-surface` (淺色: #ffffff, 深色: #202020)
  - 邊框色: `border-win-border` (淺色: rgba(0,0,0,0.06), 深色: rgba(255,255,255,0.08))
  - 強調色: `bg-win-accent` (#0078d4 / #60cdff)
- **圓角規範**: 
  - 主容器左上角: `rounded-tl-2xl` (1rem)
  - 卡片與按鈕: `rounded-xl` (0.75rem)
  - 標籤 (Pills): `rounded-full`
- **字體**: 優先使用 `Inter`，數學公式使用 `KaTeX` 渲染。

## 2. 佈局架構
- **整體結構**: 側邊欄 + 主內容區。
- **內頁樣式**: 
  - 內頁與內頁下半部內容右邊**不設內邊距**，內容應延伸填滿右側。
  - `win-page-content` 應為 `flex flex-col overflow-hidden`，由子元素自行處理內部滾動。
- **AI 學習機器人頁面**:
  - 容器應填滿可用空間 (`flex-1`)，不設最大寬度限制。
  - 包含獨立滾動的訊息區域與固定的輸入區域。

## 3. 數學工具功能規範
- **LaTeX 符號表**:
  - **網格佈局**: 採用固定大小的自適應網格 (`grid-cols-[repeat(auto-fill,minmax(100px,1fr))]`)，確保無左右滾動條。
  - **詳情面板**: 
    - 包含符號預覽、名稱、LaTeX 代碼與標籤。
    - 複製按鈕置於文字右側，採用 Subtle 樣式 (僅懸停顯示)。
    - 分類併入標籤系統，分類標籤使用強調色背景。
    - 標籤樣式: 白色文字、大圓角 (`rounded-full`)。
- **LaTeX 試算區**:
  - 提供左右分割佈局：左側為代碼編輯器，右側為即時預覽。
  - 包含常用範例快速插入功能。
- **矩陣計算機**:
  - 支援 2x2 與 3x3 矩陣的基本運算（加、減、乘、行列式、反矩陣）。
  - 結果以 LaTeX 格式美化呈現。

## 4. AI 助手規範 (Gemini 整合)
- **渲染能力**:
  - **LaTeX**: 支援行內 `$ ... $` 與塊狀 `$$ ... $$`。塊狀公式需置中並具備額外上下間距。
  - **程式碼**: 使用 `react-syntax-highlighter` 提供語法高亮，支援多種語言。
- **格式規範**:
  - 適當使用 **粗體**、*斜體*、~~刪除線~~ 強調重點。
  - 分隔線 (`---`) 顏色偏灰，且與前後文字距離加大（至少 1 行距）。
- **人格設定**: 專業親切的國高中數學/資訊教師，**不主動進行自我介紹**。

## 5. 組件規範
- **MathRenderer**: 使用 `katex.renderToString` 配合 `dangerouslySetInnerHTML` 進行渲染，以確保在 React 環境下的穩定性。
- **側邊欄 (Sidebar)**: 
  - 支援收合模式。
  - **ToolTip**: 懸停時出現，樣式為深灰底 (`#2b2b2b`)、細淡灰邊框、白色 `11px` 文字、具備基礎圓角。
- **切換按鈕 (Switch)**: 
  - 深色模式下，圓形滑塊為黑色 (`bg-black`)。
- **設定視窗 (Settings)**:
  - 包含個人化與關於區塊，版本號更新至 `0.1.3.0`。

## 6. 重要內容資訊
- **作者**: 李 老師
- **單位**: 中山大學附屬國光高級中學
- **Email**: ts08@nsysu.kksh.kh.edu.tw
- **GitHub**: https://github.com/JIA-WEI-LI

## 7. 技術棧
- React 18 + Vite + TypeScript
- Tailwind CSS v4
- Framer Motion
- Lucide React
- react-markdown + remark-math + rehype-katex + react-syntax-highlighter
- KaTeX (Math Rendering)
