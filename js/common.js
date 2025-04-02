// 通用腳本文件 - 處理所有頁面共享的功能
document.addEventListener('DOMContentLoaded', function() {
    // 導航欄活躍項目設置
    setActiveNavItem();
    
    // 返回頂部按鈕
    setupBackToTopButton();
    
    // 深色/淺色模式切換
    setupThemeToggle();
    
    // 響應式表格處理
    makeTablesResponsive();
    
    // 外部連結處理
    handleExternalLinks();
});

// 設置當前頁面的導航項為活躍狀態
function setActiveNavItem() {
    // 獲取當前頁面的文件名
    const currentPage = window.location.pathname.split('/').pop();
    
    // 設置對應的導航項為活躍狀態
    document.querySelectorAll('.navbar-nav .nav-link').forEach(function(link) {
        const href = link.getAttribute('href');
        if (href === currentPage || 
            (currentPage === '' && href === 'index.html') ||
            (href === 'index.html' && currentPage === '')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// 設置返回頂部按鈕
function setupBackToTopButton() {
    // 創建返回頂部按鈕
    const backToTopBtn = document.createElement('button');
    backToTopBtn.id = 'backToTopBtn';
    backToTopBtn.innerHTML = '<i class="bi bi-arrow-up"></i>';
    backToTopBtn.className = 'btn btn-primary back-to-top-btn';
    backToTopBtn.title = '返回頂部';
    document.body.appendChild(backToTopBtn);
    
    // 監聽滾動事件，控制按鈕顯示/隱藏
    window.addEventListener('scroll', function() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });
    
    // 點擊返回頂部
    backToTopBtn.addEventListener('click', function() {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    });
    
    // 添加樣式
    const style = document.createElement('style');
    style.textContent = `
        .back-to-top-btn {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 99;
            display: none;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            text-align: center;
            line-height: 1;
            padding: 0;
            box-shadow: 0 2px 5px rgba(0,0,0,0.3);
        }
        .back-to-top-btn i {
            line-height: 40px;
            font-size: 20px;
        }
    `;
    document.head.appendChild(style);
}

// 設置深色/淺色模式切換
function setupThemeToggle() {
    // 檢查是否有主題切換按鈕
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    if (!themeToggleBtn) return;
    
    // 檢查用戶偏好
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');
    
    // 設置初始主題
    if (savedTheme === 'dark' || (savedTheme === null && prefersDarkMode)) {
        document.body.classList.add('dark-theme');
        themeToggleBtn.innerHTML = '<i class="bi bi-sun"></i>';
    } else {
        document.body.classList.remove('dark-theme');
        themeToggleBtn.innerHTML = '<i class="bi bi-moon"></i>';
    }
    
    // 切換主題
    themeToggleBtn.addEventListener('click', function() {
        if (document.body.classList.contains('dark-theme')) {
            document.body.classList.remove('dark-theme');
            localStorage.setItem('theme', 'light');
            themeToggleBtn.innerHTML = '<i class="bi bi-moon"></i>';
        } else {
            document.body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark');
            themeToggleBtn.innerHTML = '<i class="bi bi-sun"></i>';
        }
    });
    
    // 添加深色主題樣式
    const style = document.createElement('style');
    style.textContent = `
        body.dark-theme {
            background-color: #212529;
            color: #f8f9fa;
        }
        body.dark-theme .card {
            background-color: #343a40;
            border-color: #495057;
        }
        body.dark-theme .card-header {
            background-color: #495057;
            border-color: #6c757d;
        }
        body.dark-theme .table {
            color: #f8f9fa;
        }
        body.dark-theme .table-bordered {
            border-color: #495057;
        }
        body.dark-theme .table-bordered td,
        body.dark-theme .table-bordered th {
            border-color: #495057;
        }
        body.dark-theme .navbar {
            background-color: #343a40 !important;
        }
        body.dark-theme .bg-light {
            background-color: #343a40 !important;
        }
        body.dark-theme .text-dark {
            color: #f8f9fa !important;
        }
    `;
    document.head.appendChild(style);
}

// 使表格響應式
function makeTablesResponsive() {
    document.querySelectorAll('table').forEach(function(table) {
        if (!table.parentElement.classList.contains('table-responsive')) {
            const wrapper = document.createElement('div');
            wrapper.className = 'table-responsive';
            table.parentNode.insertBefore(wrapper, table);
            wrapper.appendChild(table);
        }
    });
}

// 處理外部連結
function handleExternalLinks() {
    document.querySelectorAll('a').forEach(function(link) {
        const href = link.getAttribute('href');
        if (href && href.startsWith('http') && !href.includes(window.location.hostname)) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
            
            // 添加外部連結圖標
            if (!link.querySelector('.bi-box-arrow-up-right')) {
                const icon = document.createElement('i');
                icon.className = 'bi bi-box-arrow-up-right ms-1';
                icon.style.fontSize = '0.8em';
                link.appendChild(icon);
            }
        }
    });
}
