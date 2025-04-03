
# Matching Site (Frontend + Backend)

一個金融產品配對工具網站，具備：
- 客戶需求導覽頁面
- 產品三層特色展示
- 多維度配對工具與視覺化矩陣
- JSON 後台上傳與即時更新

---

## 📁 專案結構

```
/frontend         # React + Vite + Tailwind 前端
  └── public/json # 配對資料 JSON
/backend          # Node.js + Express API（上傳 JSON）
```


---

## 🛠 本地開發

### 前端啟動
```bash
cd frontend
npm install
npm run dev
```

### 後端啟動
```bash
cd backend
npm install
node upload.js
```

---

## 📦 JSON 上傳 API

- POST `/upload/:type`
- 使用 `multipart/form-data` 傳送 JSON 檔案（欄位名為 `file`）
- 實際儲存在 `/frontend/public/json/{type}.json`

---

## 🖼 頁面一覽

- `/` 首頁
- `/needs` 客戶需求頁
- `/products` 產品特色頁
- `/tool` 配對工具
- `/matrix` 配對矩陣總覽
- `/admin` JSON 上傳頁（管理者）
