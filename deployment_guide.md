# 需求與產品適配網站部署指南

## 部署到 Zeabur

本網站已經配置好可以直接部署到 Zeabur 平台。請按照以下步驟進行部署：

### 1. 準備工作

1. 確保您已經有 GitHub 帳號
2. 確保您已經有 Zeabur 帳號並與 GitHub 帳號關聯

### 2. 將代碼推送到 GitHub

1. 在 GitHub 上創建一個新的倉庫
2. 將本地代碼推送到該倉庫：

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/您的用戶名/您的倉庫名.git
git push -u origin main
```

### 3. 在 Zeabur 上部署

1. 登錄到 Zeabur 平台
2. 創建一個新的項目
3. 選擇「從 GitHub 部署」
4. 選擇您剛才創建的倉庫
5. Zeabur 將自動檢測到 package.json 文件並使用 Node.js 環境
6. 點擊「部署」按鈕

### 4. 配置域名（可選）

1. 在 Zeabur 項目設置中，選擇「域名」選項
2. 添加您的自定義域名
3. 按照指示配置 DNS 記錄

## 項目結構說明

```
/
├── data/                  # 配對矩陣數據文件
│   ├── risk_time_matrix.json
│   ├── life_stage_need_matrix.json
│   ├── product_need_matrix.json
│   └── situation_feature_matrix.json
├── src/                   # 前端源代碼
│   ├── css/               # 樣式文件
│   │   └── style.css
│   ├── js/                # JavaScript 文件
│   │   └── main.js
│   ├── img/               # 圖片資源
│   ├── index.html         # 首頁
│   ├── customer-needs.html # 客戶需求頁面
│   ├── product-features.html # 產品特色頁面
│   ├── matching-framework.html # 配對框架頁面
│   ├── matching-tool.html # 適配工具頁面
│   └── matching-matrix.html # 配對矩陣頁面
├── package.json           # 項目配置文件
└── server.js              # Express 伺服器
```

## 本地測試

如果您想在部署前在本地測試網站，請按照以下步驟操作：

1. 確保您已安裝 Node.js
2. 在項目根目錄下運行以下命令：

```bash
npm install
npm start
```

3. 打開瀏覽器，訪問 http://localhost:3000

## 技術說明

- 前端：HTML5, CSS3, JavaScript, Bootstrap 5
- 後端：Node.js, Express
- 數據存儲：JSON 文件
- 部署平台：Zeabur

## 注意事項

- 所有頁面都使用了 #26a862 為主色調
- 所有頁面都支持響應式設計，可在各種設備上正常顯示
- 配對算法基於 JSON 數據文件，可以根據需要進行修改
