document.addEventListener('DOMContentLoaded', function() {
    // 導航菜單高亮當前頁面
    highlightCurrentPage();
    
    // 初始化頁面切換功能
    initTabSwitching();
    
    // 初始化指南和案例頁面的導航功能
    initSectionNavigation();
});

// 高亮當前頁面的導航項
function highlightCurrentPage() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (currentPath.endsWith(linkPath)) {
            link.classList.add('active');
        }
    });
}

// 初始化標籤頁切換功能
function initTabSwitching() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    if (tabButtons.length === 0) return;
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 移除所有按鈕的活動狀態
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // 添加當前按鈕的活動狀態
            this.classList.add('active');
            
            // 獲取目標標籤頁ID
            const tabId = this.getAttribute('data-tab');
            
            // 隱藏所有標籤頁內容
            const tabContents = document.querySelectorAll('.tab-content');
            tabContents.forEach(content => content.classList.remove('active'));
            
            // 顯示目標標籤頁內容
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });
}

// 初始化指南和案例頁面的導航功能
function initSectionNavigation() {
    // 指南頁面導航
    initNavigation('.guide-link', '.guide-section');
    
    // 案例頁面導航
    initNavigation('.case-link', '.case-section');
}

// 通用導航初始化函數
function initNavigation(linkSelector, sectionSelector) {
    const navLinks = document.querySelectorAll(linkSelector);
    
    if (navLinks.length === 0) return;
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 移除所有鏈接的活動狀態
            navLinks.forEach(l => l.classList.remove('active'));
            
            // 添加當前鏈接的活動狀態
            this.classList.add('active');
            
            // 獲取目標部分ID
            const targetId = this.getAttribute('href').substring(1);
            
            // 隱藏所有部分
            const sections = document.querySelectorAll(sectionSelector);
            sections.forEach(section => section.classList.remove('active'));
            
            // 顯示目標部分
            document.getElementById(targetId).classList.add('active');
        });
    });
}
