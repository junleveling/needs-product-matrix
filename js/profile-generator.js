// 客戶畫像生成器的互動功能
document.addEventListener('DOMContentLoaded', function() {
    // 問題導航按鈕
    const nextBtn1 = document.getElementById('nextBtn1');
    const nextBtn2 = document.getElementById('nextBtn2');
    const prevBtn2 = document.getElementById('prevBtn2');
    const prevBtn3 = document.getElementById('prevBtn3');
    const generateBtn = document.getElementById('generateBtn');
    const restartBtn = document.getElementById('restartBtn');
    const saveResultBtn = document.getElementById('saveResultBtn');
    
    // 問題容器
    const question1 = document.getElementById('question1');
    const question2 = document.getElementById('question2');
    const question3 = document.getElementById('question3');
    const questionContainer = document.getElementById('questionContainer');
    const resultContainer = document.getElementById('resultContainer');
    
    // 選項按鈕事件監聽
    document.querySelectorAll('.option-btn').forEach(function(button) {
        button.addEventListener('click', function() {
            // 如果是多選按鈕，切換選中狀態
            if (this.classList.contains('multi-select')) {
                this.classList.toggle('active');
            } else {
                // 如果是單選按鈕，移除同組其他按鈕的選中狀態
                const parentDiv = this.closest('.mb-3');
                parentDiv.querySelectorAll('.option-btn').forEach(function(btn) {
                    btn.classList.remove('active');
                });
                // 添加當前按鈕的選中狀態
                this.classList.add('active');
            }
        });
    });
    
    // 下一步按鈕事件
    if (nextBtn1) {
        nextBtn1.addEventListener('click', function() {
            question1.classList.add('d-none');
            question2.classList.remove('d-none');
        });
    }
    
    if (nextBtn2) {
        nextBtn2.addEventListener('click', function() {
            question2.classList.add('d-none');
            question3.classList.remove('d-none');
        });
    }
    
    // 上一步按鈕事件
    if (prevBtn2) {
        prevBtn2.addEventListener('click', function() {
            question2.classList.add('d-none');
            question1.classList.remove('d-none');
        });
    }
    
    if (prevBtn3) {
        prevBtn3.addEventListener('click', function() {
            question3.classList.add('d-none');
            question2.classList.remove('d-none');
        });
    }
    
    // 生成客戶畫像按鈕事件
    if (generateBtn) {
        generateBtn.addEventListener('click', function() {
            // 收集用戶選擇的數據
            const profileData = collectProfileData();
            
            // 生成客戶畫像
            generateCustomerProfile(profileData);
            
            // 顯示結果
            questionContainer.classList.add('d-none');
            resultContainer.classList.remove('d-none');
        });
    }
    
    // 重新開始按鈕事件
    if (restartBtn) {
        restartBtn.addEventListener('click', function() {
            // 重置所有選擇
            resetAllSelections();
            
            // 返回第一個問題
            resultContainer.classList.add('d-none');
            questionContainer.classList.remove('d-none');
            question2.classList.add('d-none');
            question3.classList.add('d-none');
            question1.classList.remove('d-none');
        });
    }
    
    // 儲存結果按鈕事件
    if (saveResultBtn) {
        saveResultBtn.addEventListener('click', function() {
            // 模擬儲存功能
            alert('客戶畫像已儲存！');
        });
    }
});

// 收集用戶選擇的數據
function collectProfileData() {
    const profileData = {
        basicInfo: {},
        financialStatus: {},
        literacyAndNeeds: {}
    };
    
    // 收集基本資訊
    document.querySelectorAll('#question1 .options-container').forEach(function(container, index) {
        const selectedBtn = container.querySelector('.option-btn.active');
        if (selectedBtn) {
            const value = selectedBtn.getAttribute('data-value');
            const category = ['age', 'family', 'occupation'][index];
            profileData.basicInfo[category] = value;
        }
    });
    
    // 收集財務狀況
    document.querySelectorAll('#question2 .options-container').forEach(function(container, index) {
        const selectedBtn = container.querySelector('.option-btn.active');
        if (selectedBtn) {
            const value = selectedBtn.getAttribute('data-value');
            const category = ['income', 'assets', 'debt'][index];
            profileData.financialStatus[category] = value;
        }
    });
    
    // 收集財商與需求
    document.querySelectorAll('#question3 .options-container').forEach(function(container, index) {
        if (index === 2) {
            // 多選需求
            const selectedBtns = container.querySelectorAll('.option-btn.active');
            const needs = [];
            selectedBtns.forEach(function(btn) {
                needs.push(btn.getAttribute('data-value'));
            });
            profileData.literacyAndNeeds.needs = needs;
        } else {
            const selectedBtn = container.querySelector('.option-btn.active');
            if (selectedBtn) {
                const value = selectedBtn.getAttribute('data-value');
                const category = ['experience', 'risk'][index];
                profileData.literacyAndNeeds[category] = value;
            }
        }
    });
    
    return profileData;
}

// 生成客戶畫像
function generateCustomerProfile(profileData) {
    // 評估財商水平
    const literacyLevel = assessFinancialLiteracy(profileData);
    
    // 生成基本畫像
    generateBasicProfile(profileData);
    
    // 顯示財商水平
    displayLiteracyLevel(literacyLevel);
    
    // 分析需求
    analyzeNeeds(profileData, literacyLevel);
    
    // 產品推薦
    recommendProducts(profileData, literacyLevel);
    
    // 溝通策略建議
    suggestCommunicationStrategy(profileData, literacyLevel);
}

// 評估財商水平
function assessFinancialLiteracy(profileData) {
    let level = 'basic'; // 預設為初階
    
    // 根據金融產品使用經驗評估
    const experience = profileData.literacyAndNeeds.experience;
    if (experience === 'advanced' || experience === 'expert') {
        level = 'advanced'; // 高階
    } else if (experience === 'intermediate') {
        level = 'intermediate'; // 中階
    }
    
    // 考慮資產規模
    const assets = profileData.financialStatus.assets;
    if (assets === 'above-30m' || assets === '10m-30m') {
        // 高資產客戶財商水平提升
        if (level === 'basic') level = 'intermediate';
        else if (level === 'intermediate') level = 'advanced';
    }
    
    // 考慮職業
    const occupation = profileData.basicInfo.occupation;
    if (occupation === 'professional' || occupation === 'business-owner') {
        // 專業人士或企業主財商水平可能較高
        if (level === 'basic') level = 'intermediate';
    }
    
    return level;
}

// 生成基本畫像
function generateBasicProfile(profileData) {
    const profileBasic = document.getElementById('profileBasic');
    if (!profileBasic) return;
    
    // 年齡描述
    let ageDesc = '';
    switch(profileData.basicInfo.age) {
        case '20-30': ageDesc = '年輕族群（20-30歲）'; break;
        case '31-40': ageDesc = '成家立業期（31-40歲）'; break;
        case '41-50': ageDesc = '家庭成長期（41-50歲）'; break;
        case '51-60': ageDesc = '事業高峰期（51-60歲）'; break;
        case '61+': ageDesc = '退休準備/生活期（61歲以上）'; break;
        default: ageDesc = '未知年齡段';
    }
    
    // 家庭狀況描述
    let familyDesc = '';
    switch(profileData.basicInfo.family) {
        case 'single': familyDesc = '單身'; break;
        case 'married-no-kids': familyDesc = '已婚無子女'; break;
        case 'married-young-kids': familyDesc = '已婚有幼兒'; break;
        case 'married-adult-kids': familyDesc = '已婚子女成年'; break;
        case 'other': familyDesc = '其他家庭狀況'; break;
        default: familyDesc = '未知家庭狀況';
    }
    
    // 職業描述
    let occupationDesc = '';
    switch(profileData.basicInfo.occupation) {
        case 'employee': occupationDesc = '一般受雇者'; break;
        case 'manager': occupationDesc = '管理職'; break;
        case 'professional': occupationDesc = '專業人士'; break;
        case 'business-owner': occupationDesc = '企業主'; break;
        case 'retired': occupationDesc = '退休人士'; break;
        default: occupationDesc = '未知職業';
    }
    
    // 收入描述
    let incomeDesc = '';
    switch(profileData.financialStatus.income) {
        case 'below-50k': incomeDesc = '月收入5萬以下'; break;
        case '50k-80k': incomeDesc = '月收入5-8萬'; break;
        case '80k-120k': incomeDesc = '月收入8-12萬'; break;
        case '120k-200k': incomeDesc = '月收入12-20萬'; break;
        case 'above-200k': incomeDesc = '月收入20萬以上'; break;
        default: incomeDesc = '未知收入';
    }
    
    // 資產描述
    let assetsDesc = '';
    switch(profileData.financialStatus.assets) {
        case 'below-1m': assetsDesc = '資產100萬以下'; break;
        case '1m-3m': assetsDesc = '資產100-300萬'; break;
        case '3m-10m': assetsDesc = '資產300萬-1000萬'; break;
        case '10m-30m': assetsDesc = '資產1000萬-3000萬'; break;
        case 'above-30m': assetsDesc = '資產3000萬以上'; break;
        default: assetsDesc = '未知資產規模';
    }
    
    // 負債描述
    let debtDesc = '';
    switch(profileData.financialStatus.debt) {
        case 'no-debt': debtDesc = '無負債'; break;
        case 'mortgage': debtDesc = '有房貸'; break;
        case 'car-loan': debtDesc = '有車貸'; break;
        case 'multiple-loans': debtDesc = '有多項貸款'; break;
        case 'high-debt': debtDesc = '高負債'; break;
        default: debtDesc = '未知負債情況';
    }
    
    // 生成HTML
    profileBasic.innerHTML = `
        <div class="card">
            <div class="card-body">
                <p><strong>客戶類型：</strong>${ageDesc}，${familyDesc}，${occupationDesc}</p>
                <p><strong>財務狀況：</strong>${incomeDesc}，${assetsDesc}，${debtDesc}</p>
            </div>
        </div>
    `;
}

// 顯示財商水平
function displayLiteracyLevel(level) {
    const literacyLevel = document.getElementById('literacyLevel');
    if (!literacyLevel) return;
    
    let levelDesc = '';
    let levelColor = '';
    let levelDetail = '';
    
    switch(level) {
        case 'basic':
            levelDesc = '初階財商';
            levelColor = 'primary';
            levelDetail = '客戶對金融產品和市場認識有限，需要基礎教育和簡單產品，偏好生活化和情感化的溝通方式。';
            break;
        case 'intermediate':
            levelDesc = '中階財商';
            levelColor = 'success';
            levelDetail = '客戶具備基本金融知識，能理解中等複雜度的產品和策略，可接受功能性和教育性的溝通方式。';
            break;
        case 'advanced':
            levelDesc = '高階財商';
            levelColor = 'dark';
            levelDetail = '客戶具備豐富金融知識和市場洞察力，能理解複雜金融產品和市場機制，適合專業分析和數據驅動的溝通方式。';
            break;
        default:
            levelDesc = '未知財商水平';
            levelColor = 'secondary';
            levelDetail = '無法評估客戶的財商水平，建議進一步了解客戶的金融知識和經驗。';
    }
    
    literacyLevel.innerHTML = `
        <div class="card">
            <div class="card-header bg-${levelColor} text-white">
                <h5 class="mb-0">${levelDesc}</h5>
            </div>
            <div class="card-body">
                <p>${levelDetail}</p>
            </div>
        </div>
    `;
}

// 分析需求
function analyzeNeeds(profileData, literacyLevel) {
    const needsAnalysis = document.getElementById('needsAnalysis');
    if (!needsAnalysis) return;
    
    // 獲取選擇的需求
    const selectedNeeds = profileData.literacyAndNeeds.needs || [];
    
    // 基於客戶資料推斷可能的隱性需求
    const implicitNeeds = inferImplicitNeeds(profileData, selectedNeeds);
    
    // 生成HTML
    let needsHtml = '<div class="row">';
    
    // 顯性需求
    needsHtml += `
        <div class="col-md-6 mb-3">
            <div class="card h-100">
                <div class="card-header bg-primary text-white">
                    <h5 class="mb-0">顯性需求</h5>
                </div>
                <div class="card-body">
                    <ul>
    `;
    
    if (selectedNeeds.length === 0) {
        needsHtml += '<li>未選擇任何需求</li>';
    } else {
        selectedNeeds.forEach(function(need) {
            let needDesc = '';
            switch(need) {
                case 'savings': needDesc = '儲蓄與流動性需求'; break;
                case 'investment': needDesc = '投資增值需求'; break;
                case 'loan': needDesc = '融資需求'; break;
                case 'retirement': needDesc = '退休規劃需求'; break;
                case 'passive-income': needDesc = '被動收入需求'; break;
                case 'overseas': needDesc = '海外資金需求'; break;
                case 'tax': needDesc = '稅務規劃需求'; break;
                default: needDesc = need;
            }
            needsHtml += `<li>${needDesc}</li>`;
        });
    }
    
    needsHtml += `
                    </ul>
                </div>
            </div>
        </div>
    `;
    
    // 隱性需求
    needsHtml += `
        <div class="col-md-6 mb-3">
            <div class="card h-100">
                <div class="card-header bg-info text-white">
                    <h5 class="mb-0">推斷的隱性需求</h5>
                </div>
                <div class="card-body">
                    <ul>
    `;
    
    if (implicitNeeds.length === 0) {
        needsHtml += '<li>無法推斷隱性需求</li>';
    } else {
        implicitNeeds.forEach(function(need) {
            needsHtml += `<li>${need}</li>`;
        });
    }
    
    needsHtml += `
                    </ul>
                </div>
            </div>
        </div>
    `;
    
    // 需求衝突與平衡
    needsHtml += `
        <div class="col-12 mt-3">
            <div class="card">
                <div class="card-header bg-warning text-dark">
                    <h5 class="mb-0">需求衝突與平衡</h5>
                </div>
                <div class="card-body">
                    ${generateConflictAnalysis(profileData, selectedNeeds)}
                </div>
            </div>
        </div>
    `;
    
    needsHtml += '</div>';
    
    needsAnalysis.innerHTML = needsHtml;
}

// 推斷隱性需求
function inferImplicitNeeds(profileData, selectedNeeds) {
    const implicitNeeds = [];
    
    // 基於年齡和家庭狀況
    const age = profileData.basicInfo.age;
    const family = profileData.basicInfo.family;
    
    if (age === '20-30' || age === '31-40') {
        implicitNeeds.push('財務安全感需求：對未來財務不確定性的焦慮');
    }
    
    if (family === 'married-young-kids') {
        implicitNeeds.push('家庭保障需求：希望為家人提供穩定的財務環境');
    }
    
    if (age === '51-60' || age === '61+') {
        implicitNeeds.push('健康保障需求：關注醫療和長期照護的財務規劃');
    }
    
    // 基於職業和收入
    const occupation = profileData.basicInfo.occupation;
    const income = profileData.financialStatus.income;
    
    if (occupation === 'business-owner' || occupation === 'professional') {
        implicitNeeds.push('專業認同需求：希望獲得與專業身份相符的金融服務');
    }
    
    if (income === '120k-200k' || income === 'above-200k') {
        implicitNeeds.push('社會地位需求：希望金融服務能彰顯社會地位');
    }
    
    // 基於資產和負債
    const assets = profileData.financialStatus.assets;
    const debt = profileData.financialStatus.debt;
    
    if (assets === '10m-30m' || assets === 'above-30m') {
        implicitNeeds.push('財富傳承需求：關注資產如何有效傳給下一代');
    }
    
    if (debt === 'multiple-loans' || debt === 'high-debt') {
        implicitNeeds.push('財務控制感需求：希望重新掌握財務狀況的控制權');
    }
    
    // 基於風險偏好
    const risk = profileData.literacyAndNeeds.risk;
    
    if (risk === 'conservative') {
        implicitNeeds.push('資產保全需求：優先考慮資產安全而非高報酬');
    }
    
    if (risk === 'aggressive') {
        implicitNeeds.push('投資成就感需求：從成功投資中獲得滿足感');
    }
    
    // 基於選擇的需求推斷其他相關需求
    if (selectedNeeds.includes('passive-income')) {
        implicitNeeds.push('財務自由渴望：嚮往不需依賴工資的生活方式');
    }
    
    if (selectedNeeds.includes('overseas')) {
        implicitNeeds.push('國際化身份認同：希望通過全球資產配置彰顯國際視野');
    }
    
    return implicitNeeds;
}

// 生成需求衝突分析
function generateConflictAnalysis(profileData, selectedNeeds) {
    // 檢查是否存在常見的需求衝突
    const conflicts = [];
    
    // 流動性 vs. 收益性
    if (selectedNeeds.includes('savings') && (selectedNeeds.includes('investment') || selectedNeeds.includes('passive-income'))) {
        conflicts.push('流動性需求與收益性需求的衝突：高流動性通常意味著較低收益');
    }
    
    // 安全性 vs. 增長性
    if (profileData.literacyAndNeeds.risk === 'conservative' && selectedNeeds.includes('investment')) {
        con<response clipped><NOTE>To save on context only part of this file has been shown to you. You should retry this tool after you have searched inside the file with `grep -n` in order to find the line numbers of what you are looking for.</NOTE>