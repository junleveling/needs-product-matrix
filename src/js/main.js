// 主要JavaScript文件，實現配對算法和亮燈機制

// 等待DOM加載完成
document.addEventListener('DOMContentLoaded', function() {
    // 初始化亮燈機制
    initMatrixHighlighting();
});

// 初始化亮燈機制
function initMatrixHighlighting() {
    const needCheckboxes = document.querySelectorAll('.need-checkbox');
    
    if (needCheckboxes.length > 0) {
        needCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', updateMatrixHighlighting);
        });
    }
}

// 更新矩陣亮燈效果
function updateMatrixHighlighting() {
    // 獲取所有選中的需求
    const selectedNeeds = [];
    document.querySelectorAll('.need-checkbox:checked').forEach(checkbox => {
        selectedNeeds.push(checkbox.value);
    });
    
    // 更新所有矩陣單元格的亮燈效果
    document.querySelectorAll('.matrix-cell').forEach(cell => {
        const cellNeeds = cell.getAttribute('data-needs')?.split(',') || [];
        
        // 如果單元格的需求與選中的需求有交集，則亮燈
        const hasMatch = selectedNeeds.length > 0 && cellNeeds.some(need => selectedNeeds.includes(need));
        
        if (hasMatch) {
            cell.classList.add('highlight');
        } else {
            cell.classList.remove('highlight');
        }
    });
}

// 風險偏好與時間維度配對算法
async function processRiskTimeForm() {
    const riskPreference = document.getElementById('risk_preference').value;
    const timeHorizon = document.getElementById('time_horizon').value;
    const priorityFactor = document.querySelector('input[name="priority_factor"]:checked')?.value;
    
    if (!riskPreference || !timeHorizon || !priorityFactor) {
        alert('請填寫所有必填欄位');
        return;
    }
    
    try {
        // 獲取風險偏好與時間維度配對矩陣數據
        const response = await fetch('/api/data/risk_time_matrix.json');
        const data = await response.json();
        
        // 處理數據並顯示結果
        const results = matchRiskTimeData(data, riskPreference, timeHorizon, priorityFactor);
        displayRiskTimeResults(results);
        
        // 顯示結果區域
        document.getElementById('risk_time_results').style.display = 'block';
        
        // 滾動到結果區域
        document.getElementById('risk_time_results').scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
        console.error('獲取或處理數據時出錯:', error);
        alert('獲取數據時出錯，請稍後再試');
    }
}

// 人生階段與需求層次配對算法
async function processLifeStageNeedForm() {
    const lifeStage = document.getElementById('life_stage').value;
    const needLevel = document.getElementById('need_level').value;
    
    if (!lifeStage || !needLevel) {
        alert('請填寫所有必填欄位');
        return;
    }
    
    try {
        // 獲取人生階段與需求層次配對矩陣數據
        const response = await fetch('/api/data/life_stage_need_matrix.json');
        const data = await response.json();
        
        // 處理數據並顯示結果
        const results = matchLifeStageNeedData(data, lifeStage, needLevel);
        displayLifeStageNeedResults(results);
        
        // 顯示結果區域
        document.getElementById('life_stage_need_results').style.display = 'block';
        
        // 滾動到結果區域
        document.getElementById('life_stage_need_results').scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
        console.error('獲取或處理數據時出錯:', error);
        alert('獲取數據時出錯，請稍後再試');
    }
}

// 產品類型與需求層次配對算法
async function processProductNeedForm() {
    const productType = document.getElementById('product_type').value;
    const needLevel = document.getElementById('product_need_level').value;
    
    if (!productType || !needLevel) {
        alert('請填寫所有必填欄位');
        return;
    }
    
    try {
        // 獲取產品類型與需求層次配對矩陣數據
        const response = await fetch('/api/data/product_need_matrix.json');
        const data = await response.json();
        
        // 處理數據並顯示結果
        const results = matchProductNeedData(data, productType, needLevel);
        displayProductNeedResults(results);
        
        // 顯示結果區域
        document.getElementById('product_need_results').style.display = 'block';
        
        // 滾動到結果區域
        document.getElementById('product_need_results').scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
        console.error('獲取或處理數據時出錯:', error);
        alert('獲取數據時出錯，請稍後再試');
    }
}

// 特殊情境與產品特色配對算法
async function processSituationFeatureForm() {
    const specialSituation = document.getElementById('special_situation').value;
    const featureLevel = document.getElementById('feature_level').value;
    
    if (!specialSituation || !featureLevel) {
        alert('請填寫所有必填欄位');
        return;
    }
    
    try {
        // 獲取特殊情境與產品特色配對矩陣數據
        const response = await fetch('/api/data/situation_feature_matrix.json');
        const data = await response.json();
        
        // 處理數據並顯示結果
        const results = matchSituationFeatureData(data, specialSituation, featureLevel);
        displaySituationFeatureResults(results);
        
        // 顯示結果區域
        document.getElementById('situation_feature_results').style.display = 'block';
        
        // 滾動到結果區域
        document.getElementById('situation_feature_results').scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
        console.error('獲取或處理數據時出錯:', error);
        alert('獲取數據時出錯，請稍後再試');
    }
}
