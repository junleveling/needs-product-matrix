// 財商與切角指南頁面的互動功能
document.addEventListener('DOMContentLoaded', function() {
    // 標籤切換功能
    document.querySelectorAll('.guide-tab').forEach(function(tab) {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 移除所有標籤的活躍狀態
            document.querySelectorAll('.guide-tab').forEach(function(t) {
                t.classList.remove('active');
            });
            
            // 添加當前標籤的活躍狀態
            this.classList.add('active');
            
            // 隱藏所有內容
            document.querySelectorAll('.guide-content').forEach(function(content) {
                content.classList.add('d-none');
            });
            
            // 顯示對應的內容
            const targetId = this.getAttribute('data-target');
            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.classList.remove('d-none');
            }
        });
    });
    
    // 財商評估工具互動
    const assessBtn = document.getElementById('assessLiteracyBtn');
    if (assessBtn) {
        assessBtn.addEventListener('click', function() {
            // 獲取用戶選擇的答案
            const answers = [];
            document.querySelectorAll('.literacy-question').forEach(function(question, index) {
                const selectedOption = question.querySelector('input[name="q' + (index + 1) + '"]:checked');
                if (selectedOption) {
                    answers.push(parseInt(selectedOption.value));
                } else {
                    answers.push(0);
                }
            });
            
            // 計算財商水平
            const literacyLevel = assessFinancialLiteracy(answers);
            
            // 顯示結果
            showLiteracyResult(literacyLevel);
        });
    }
    
    // 行銷切角選擇器互動
    document.querySelectorAll('.angle-filter').forEach(function(filter) {
        filter.addEventListener('change', filterMarketingAngles);
    });
    
    // 初始化顯示第一個標籤內容
    const firstTab = document.querySelector('.guide-tab');
    if (firstTab) {
        firstTab.click();
    }
});

// 評估財商水平
function assessFinancialLiteracy(answers) {
    // 計算總分
    const totalScore = answers.reduce((sum, score) => sum + score, 0);
    
    // 根據總分判斷財商水平
    if (totalScore < 10) {
        return {
            level: 'basic',
            label: '初階財商',
            description: '您對金融產品和市場認識有限，建議從基礎金融知識開始學習，選擇簡單易懂的產品。',
            recommendations: [
                '建議選擇基本存款和簡單投資產品',
                '尋求專業顧問的指導和教育',
                '參加基礎理財課程增強知識'
            ]
        };
    } else if (totalScore < 20) {
        return {
            level: 'intermediate',
            label: '中階財商',
            description: '您具備基本金融知識，能理解中等複雜度的產品和策略，但在複雜金融決策上可能需要專業建議。',
            recommendations: [
                '可以考慮更多元化的投資產品',
                '定期更新金融知識，了解市場趨勢',
                '在複雜決策前諮詢專業意見'
            ]
        };
    } else {
        return {
            level: 'advanced',
            label: '高階財商',
            description: '您具備豐富金融知識和市場洞察力，能理解複雜金融產品和市場機制，可以做出較為獨立的投資決策。',
            recommendations: [
                '可以考慮更複雜和多元的投資策略',
                '定期檢視和優化投資組合',
                '關注全球市場趨勢和創新金融產品'
            ]
        };
    }
}

// 顯示財商評估結果
function showLiteracyResult(result) {
    const resultContainer = document.getElementById('literacyResultContainer');
    if (!resultContainer) return;
    
    // 顯示結果容器
    resultContainer.classList.remove('d-none');
    
    // 更新結果內容
    const levelLabel = document.getElementById('literacyLevelLabel');
    const levelDescription = document.getElementById('literacyLevelDescription');
    const recommendationsList = document.getElementById('literacyRecommendations');
    
    if (levelLabel) levelLabel.textContent = result.label;
    if (levelDescription) levelDescription.textContent = result.description;
    
    if (recommendationsList) {
        recommendationsList.innerHTML = '';
        result.recommendations.forEach(function(rec) {
            const li = document.createElement('li');
            li.textContent = rec;
            recommendationsList.appendChild(li);
        });
    }
    
    // 設置結果卡片的顏色
    const resultCard = document.getElementById('literacyResultCard');
    if (resultCard) {
        // 移除所有可能的顏色類
        resultCard.classList.remove('bg-primary', 'bg-success', 'bg-dark');
        
        // 添加對應的顏色類
        if (result.level === 'basic') {
            resultCard.classList.add('bg-primary');
        } else if (result.level === 'intermediate') {
            resultCard.classList.add('bg-success');
        } else {
            resultCard.classList.add('bg-dark');
        }
    }
    
    // 滾動到結果區域
    resultContainer.scrollIntoView({ behavior: 'smooth' });
}

// 篩選行銷切角
function filterMarketingAngles() {
    const literacyFilter = document.getElementById('literacyFilter').value;
    const needFilter = document.getElementById('needFilter').value;
    
    document.querySelectorAll('.angle-card').forEach(function(card) {
        const literacy = card.getAttribute('data-literacy');
        const needs = card.getAttribute('data-needs').split(' ');
        
        // 檢查是否符合篩選條件
        const matchLiteracy = literacyFilter === 'all' || literacy === literacyFilter || literacy === 'all';
        const matchNeed = needFilter === 'all' || needs.includes(needFilter);
        
        // 顯示或隱藏行銷切角卡片
        if (matchLiteracy && matchNeed) {
            card.classList.remove('d-none');
        } else {
            card.classList.add('d-none');
        }
    });
}
