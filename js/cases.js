// 案例頁面的互動功能
document.addEventListener('DOMContentLoaded', function() {
    // 案例篩選功能
    const financialLiteracyFilter = document.getElementById('financialLiteracyFilter');
    const needTypeFilter = document.getElementById('needTypeFilter');
    
    if (financialLiteracyFilter) {
        financialLiteracyFilter.addEventListener('change', filterCases);
    }
    
    if (needTypeFilter) {
        needTypeFilter.addEventListener('change', filterCases);
    }
    
    // 案例詳情查看按鈕
    document.querySelectorAll('.view-case-btn').forEach(function(button) {
        button.addEventListener('click', function() {
            const caseCard = this.closest('.case-card');
            const caseId = caseCard.getAttribute('data-case-id');
            showCaseDetail(caseId);
        });
    });
    
    // 初始化隱藏所有案例詳情
    document.querySelectorAll('.case-detail').forEach(function(detail) {
        detail.classList.add('d-none');
    });
});

// 篩選案例
function filterCases() {
    const literacyFilter = document.getElementById('financialLiteracyFilter').value;
    const needFilter = document.getElementById('needTypeFilter').value;
    
    document.querySelectorAll('#casesContainer > div').forEach(function(caseCard) {
        const literacy = caseCard.getAttribute('data-literacy');
        const need = caseCard.getAttribute('data-need');
        
        // 檢查是否符合篩選條件
        const matchLiteracy = literacyFilter === 'all' || literacy === literacyFilter;
        const matchNeed = needFilter === 'all' || need === needFilter;
        
        // 顯示或隱藏案例卡片
        if (matchLiteracy && matchNeed) {
            caseCard.classList.remove('d-none');
        } else {
            caseCard.classList.add('d-none');
        }
    });
}

// 顯示案例詳情
function showCaseDetail(caseId) {
    // 隱藏所有案例詳情
    document.querySelectorAll('.case-detail').forEach(function(detail) {
        detail.classList.add('d-none');
    });
    
    // 顯示選定的案例詳情
    const targetDetail = document.getElementById(caseId + '-detail');
    if (targetDetail) {
        targetDetail.classList.remove('d-none');
    }
    
    // 顯示模態框
    const modal = new bootstrap.Modal(document.getElementById('caseDetailModal'));
    modal.show();
}
