// 矩陣頁面的互動功能
document.addEventListener('DOMContentLoaded', function() {
    // 初始化矩陣顯示
    showMatrix('risk-literacy-matrix');
    
    // 矩陣切換按鈕事件監聽
    document.querySelectorAll('.matrix-nav-link').forEach(function(button) {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 移除所有按鈕的活躍狀態
            document.querySelectorAll('.matrix-nav-link').forEach(function(btn) {
                btn.classList.remove('active');
            });
            
            // 添加當前按鈕的活躍狀態
            this.classList.add('active');
            
            // 顯示對應的矩陣
            const matrixId = this.getAttribute('data-matrix');
            showMatrix(matrixId);
        });
    });
    
    // 矩陣單元格點擊事件
    document.querySelectorAll('.matrix-cell').forEach(function(cell) {
        cell.addEventListener('click', function() {
            const cellId = this.getAttribute('data-cell-id');
            if (cellId) {
                showCellDetail(cellId);
            }
        });
    });
    
    // 篩選器事件監聽
    document.getElementById('matrixFilter').addEventListener('change', function() {
        filterMatrix();
    });
});

// 顯示指定的矩陣
function showMatrix(matrixId) {
    // 隱藏所有矩陣
    document.querySelectorAll('.matrix-container').forEach(function(matrix) {
        matrix.classList.add('d-none');
    });
    
    // 顯示指定的矩陣
    const targetMatrix = document.getElementById(matrixId);
    if (targetMatrix) {
        targetMatrix.classList.remove('d-none');
    }
    
    // 更新篩選器選項
    updateFilterOptions(matrixId);
}

// 更新篩選器選項
function updateFilterOptions(matrixId) {
    const filterSelect = document.getElementById('matrixFilter');
    filterSelect.innerHTML = '';
    
    // 添加"全部"選項
    const allOption = document.createElement('option');
    allOption.value = 'all';
    allOption.textContent = '顯示全部';
    filterSelect.appendChild(allOption);
    
    // 根據不同矩陣添加不同的篩選選項
    if (matrixId === 'risk-literacy-matrix') {
        addFilterOption(filterSelect, 'conservative', '保守型客戶');
        addFilterOption(filterSelect, 'moderate', '穩健型客戶');
        addFilterOption(filterSelect, 'aggressive', '積極型客戶');
    } else if (matrixId === 'lifecycle-literacy-matrix') {
        addFilterOption(filterSelect, 'early-career', '成家立業期');
        addFilterOption(filterSelect, 'family-growth', '家庭成長期');
        addFilterOption(filterSelect, 'career-peak', '事業高峰期');
        addFilterOption(filterSelect, 'pre-retirement', '退休準備期');
        addFilterOption(filterSelect, 'retirement', '退休生活期');
    } else if (matrixId === 'product-literacy-matrix') {
        addFilterOption(filterSelect, 'credit-card', '信用卡產品');
        addFilterOption(filterSelect, 'deposit', '存款產品');
        addFilterOption(filterSelect, 'loan', '貸款產品');
        addFilterOption(filterSelect, 'investment', '投資/信託/保險產品');
        addFilterOption(filterSelect, 'wealth', '財富管理服務');
        addFilterOption(filterSelect, 'digital', '數位金融服務');
    } else if (matrixId === 'special-literacy-matrix') {
        addFilterOption(filterSelect, 'overseas', '海外資金需求');
        addFilterOption(filterSelect, 'passive-income', '被動收入需求');
        addFilterOption(filterSelect, 'tax', '稅務規劃需求');
        addFilterOption(filterSelect, 'inheritance', '財富傳承需求');
    }
}

// 添加篩選選項
function addFilterOption(selectElement, value, text) {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = text;
    selectElement.appendChild(option);
}

// 篩選矩陣
function filterMatrix() {
    const filterValue = document.getElementById('matrixFilter').value;
    
    // 如果選擇"全部"，顯示所有行
    if (filterValue === 'all') {
        document.querySelectorAll('.matrix-row').forEach(function(row) {
            row.classList.remove('d-none');
        });
        return;
    }
    
    // 否則，根據篩選值顯示或隱藏行
    document.querySelectorAll('.matrix-row').forEach(function(row) {
        if (row.getAttribute('data-category') === filterValue) {
            row.classList.remove('d-none');
        } else {
            row.classList.add('d-none');
        }
    });
}

// 顯示單元格詳情
function showCellDetail(cellId) {
    // 隱藏所有單元格詳情
    document.querySelectorAll('.cell-detail').forEach(function(detail) {
        detail.classList.add('d-none');
    });
    
    // 顯示指定的單元格詳情
    const targetDetail = document.getElementById(cellId + '-detail');
    if (targetDetail) {
        targetDetail.classList.remove('d-none');
        
        // 滾動到詳情區域
        targetDetail.scrollIntoView({ behavior: 'smooth' });
    }
    
    // 顯示詳情容器
    document.getElementById('cellDetailContainer').classList.remove('d-none');
}
