document.addEventListener('DOMContentLoaded', function() {
    // 初始化矩陣數據
    initMatrixData();
    
    // 設置篩選按鈕事件監聽器
    setupFilterButtons();
    
    // 初始顯示矩陣內容
    updateMatrixContent('risk', 'all', 'all');
});

// 矩陣數據
let matrixData = {
    risk: [],
    lifecycle: [],
    product: [],
    situation: []
};

// 初始化矩陣數據
function initMatrixData() {
    // 風險偏好矩陣數據
    matrixData.risk = [
        {
            riskProfile: 'conservative',
            literacyLevel: 'beginner',
            title: '保守型初階財商客戶的產品配對',
            description: '適合風險承受度低且金融知識有限的客戶',
            recommendations: [
                { product: '定期存款', features: '本金保障、固定利率', marketingAngle: '生活情境切角、情感訴求切角', example: '「安心起步：為您的家庭打造堅實的財務基礎」' },
                { product: '貨幣市場基金', features: '低風險、流動性高', marketingAngle: '功能價值切角', example: '「零風險被動收入：定存族的理財升級之路」' },
                { product: '保本型結構性產品', features: '本金保障、潛在收益', marketingAngle: '教育啟發切角', example: '「小錢滾大錢：開啟您的被動收入第一步」' }
            ]
        },
        {
            riskProfile: 'conservative',
            literacyLevel: 'intermediate',
            title: '保守型中階財商客戶的產品配對',
            description: '適合風險承受度低但具備基本金融知識的客戶',
            recommendations: [
                { product: '高利率定存', features: '本金保障、較高利率', marketingAngle: '數據驅動切角', example: '「數據說話：中產階級最適合的資產配置比例」' },
                { product: '債券型基金', features: '穩定收益、中低風險', marketingAngle: '問題解決切角', example: '「穩健收息：如何在低利環境中獲取更好報酬」' },
                { product: '保守型平衡基金', features: '風險分散、穩定成長', marketingAngle: '功能價值切角', example: '「穩中求進：兼顧安全與成長的投資策略」' }
            ]
        },
        {
            riskProfile: 'conservative',
            literacyLevel: 'advanced',
            title: '保守型高階財商客戶的產品配對',
            description: '適合風險承受度低但具備豐富金融知識的客戶',
            recommendations: [
                { product: '優質公司債', features: '固定收益、信用評級高', marketingAngle: '專業分析切角', example: '「全球債券市場分析：尋找最佳收益與風險平衡點」' },
                { product: '防禦型股票組合', features: '低波動、穩定配息', marketingAngle: '數據驅動切角', example: '「低波動高股息策略：穩健投資者的最佳選擇」' },
                { product: '另類投資-不動產', features: '實體資產、租金收入', marketingAngle: '專業分析切角', example: '「不動產資產配置策略：穩定現金流與長期增值的雙重優勢」' }
            ]
        },
        {
            riskProfile: 'moderate',
            literacyLevel: 'beginner',
            title: '穩健型初階財商客戶的產品配對',
            description: '適合風險承受度中等且金融知識有限的客戶',
            recommendations: [
                { product: '定期定額基金', features: '分散投資、長期累積', marketingAngle: '生活情境切角', example: '「小額投資大未來：每天一杯咖啡錢，輕鬆實現財務目標」' },
                { product: '穩健型組合基金', features: '專業配置、風險適中', marketingAngle: '教育啟發切角', example: '「投資入門第一步：掌握資產配置的關鍵原則」' },
                { product: '儲蓄型保險', features: '保障兼具儲蓄', marketingAngle: '情感訴求切角', example: '「為家人的未來做好準備：兼顧保障與儲蓄的聰明選擇」' }
            ]
        },
        {
            riskProfile: 'moderate',
            literacyLevel: 'intermediate',
            title: '穩健型中階財商客戶的產品配對',
            description: '適合風險承受度中等且具備基本金融知識的客戶',
            recommendations: [
                { product: '平衡型基金', features: '股債配置、風險分散', marketingAngle: '數據驅動切角', example: '「最佳股債比例：歷史數據支持的資產配置策略」' },
                { product: '指數型ETF', features: '低成本、市場報酬', marketingAngle: '問題解決切角', example: '「打敗95%的主動型基金：指數投資的實證優勢」' },
                { product: '外幣結構型商品', features: '潛在收益高、部分保本', marketingAngle: '功能價值切角', example: '「匯率波動中的機會：兼顧安全與收益的外幣投資策略」' }
            ]
        },
        {
            riskProfile: 'moderate',
            literacyLevel: 'advanced',
            title: '穩健型高階財商客戶的產品配對',
            description: '適合風險承受度中等且具備豐富金融知識的客戶',
            recommendations: [
                { product: '智能投資組合', features: '演算法配置、自動再平衡', marketingAngle: '專業分析切角', example: '「量化投資策略：科學方法打造最佳風險調整後報酬」' },
                { product: '高股息ETF組合', features: '穩定現金流、稅務效率', marketingAngle: '數據驅動切角', example: '「股息再投資的複利魔力：數據證明的長期致富策略」' },
                { product: '全球資產配置基金', features: '地域分散、資產多元', marketingAngle: '專業分析切角', example: '「全球經濟週期與資產輪動：把握不同市場的投資機會」' }
            ]
        },
        {
            riskProfile: 'aggressive',
            literacyLevel: 'beginner',
            title: '積極型初階財商客戶的產品配對',
            description: '適合風險承受度高但金融知識有限的客戶',
            recommendations: [
                { product: '主題型基金', features: '聚焦特定產業、成長潛力', marketingAngle: '未來願景切角', example: '「投資未來趨勢：把握科技創新帶來的增長機會」' },
                { product: '單一股票投資', features: '高風險高報酬、簡單直接', marketingAngle: '生活情境切角', example: '「日常生活中的投資機會：從消費者到股東的轉變」' },
                { product: '高收益債券基金', features: '較高利息收入、價格波動', marketingAngle: '功能價值切角', example: '「高息投資策略：如何在低利率環境中獲取可觀收益」' }
            ]
        },
        {
            riskProfile: 'aggressive',
            literacyLevel: 'intermediate',
            title: '積極型中階財商客戶的產品配對',
            description: '適合風險承受度高且具備基本金融知識的客戶',
            recommendations: [
                { product: '成長型股票基金', features: '追求資本增值、高波動', marketingAngle: '數據驅動切角', example: '「成長股投資策略：歷史數據支持的長期績效優勢」' },
                { product: '新興市場基金', features: '高風險高報酬、地域多元', marketingAngle: '未來願景切角', example: '「新興市場的崛起：投資全球經濟成長的下一個引擎」' },
                { product: '槓桿型ETF', features: '放大報酬、短期交易', marketingAngle: '問題解決切角', example: '「市場時機掌握：如何在短期內放大投資報酬」' }
            ]
        },
        {
            riskProfile: 'aggressive',
            literacyLevel: 'advanced',
            title: '積極型高階財商客戶的產品配對',
            description: '適合風險承受度高且具備豐富金融知識的客戶',
            recommendations: [
                { product: '另類投資組合', features: '低相關性、多元策略', marketingAngle: '專業分析切角', example: '「另類投資策略：優化投資組合效率前沿的關鍵」' },
                { product: '私募股權基金', features: '高潛在報酬、長期鎖定', marketingAngle: '社會認同切角', example: '「頂尖投資者的選擇：私募市場的獨特投資機會」' },
                { product: '衍生性金融商品', features: '客製化策略、槓桿操作', marketingAngle: '專業分析切角', example: '「市場波動中的獲利策略：運用期權建構非對稱報酬曲線」' }
            ]
        }
    ];
    
    // 生命週期矩陣數據
    matrixData.lifecycle = [
        {
            lifecycleStage: 'early',
            literacyLevel: 'beginner',
            title: '成家立業期初階財商客戶的產品配對',
            description: '適合新婚或準備成家的金融知識有限客戶',
            recommendations: [
                { product: '高利率活存帳戶', features: '流動性高、基本收益', marketingAngle: '生活情境切角', example: '「安心起步：為您的家庭打造堅實的財務基礎」' },
                { product: '定期定額基金', features: '小額投資、長期累積', marketingAngle: '情感訴求切角', example: '「為愛築巢：讓您的家庭夢想安心落地」' },
                { product: '房貸保險', features: '債務保障、家庭保護', marketingAngle: '情感訴求切角', example: '「新家庭的財務守護者：簡單可靠的保障方案」' }
            ]
        },
        {
            lifecycleStage: 'early',
            literacyLevel: 'intermediate',
            title: '成家立業期中階財商客戶的產品配對',
            description: '適合新婚或準備成家的具備基本金融知識客戶',
            recommendations: [
                { product: '房屋貸款', features: '優惠利率、靈活還款', marketingAngle: '問題解決切角', example: '「首購族最佳選擇：量身打造的房貸方案」' },
                { product: '定期壽險', features: '高保障、低保費', marketingAngle: '數據驅動切角', example: '「家庭財務保障缺口分析：精準計算您需要的保險金額」' },
                { product: '新婚理財組合', features: '儲蓄與投資並重', marketingAngle: '功能價值切角', example: '「新婚夫妻的聰明理財：兼顧當下生活與未來規劃」' }
            ]
        },
        {
            lifecycleStage: 'early',
            literacyLevel: 'advanced',
            title: '成家立業期高階財商客戶的產品配對',
            description: '適合新婚或準備成家的具備豐富金融知識客戶',
            recommendations: [
                { product: '投資型房貸', features: '靈活運用、資金槓桿', marketingAngle: '專業分析切角', example: '「房貸最佳化策略：如何運用低成本資金創造投資槓桿」' },
                { product: '新婚財富管理', features: '資產配置、稅務規劃', marketingAngle: '專業分析切角', example: '「新家庭的財富藍圖：整合性資產配置與稅務策略」' },
                { product: '房地產投資信託', features: '不動產曝險、穩定收益', marketingAngle: '未來願景切角', example: '「打造家庭資產基礎：不動產投資的長期增值策略」' }
            ]
        },
        // 更多生命週期矩陣數據...
    ];
    
    // 產品類型矩陣數據
    matrixData.product = [
        {
            productType: 'credit-card',
            literacyLevel: 'beginner',
            title: '信用卡產品與初階財商客戶的配對',
            description: '適合金融知識有限客戶的信用卡產品推薦',
            recommendations: [
                { product: '現金回饋信用卡', features: '簡單回饋機制、無年費', marketingAngle: '功能價值切角', example: '「消費也能賺：每一筆消費都為您創造現金回饋」' },
                { product: '分期零利率信用卡', features: '大額消費分期、免利息', marketingAngle: '生活情境切角', example: '「輕鬆擁有夢想家電：零利率分期讓預算更彈性」' },
                { product: '基本旅遊保障信用卡', features: '簡易旅遊保險、便利性', marketingAngle: '情感訴求切角', example: '「安心出遊：讓您的旅程充滿美好回憶而非煩惱」' }
            ]
        },
        {
            productType: 'credit-card',
            literacyLevel: 'intermediate',
            title: '信用卡產品與中階財商客戶的配對',
            description: '適合具備基本金融知識客戶的信用卡產品推薦',
            recommendations: [
                { product: '多重回饋信用卡', features: '不同消費類別回饋、優惠多元', marketingAngle: '數據驅動切角', example: '「精打細算的消費策略：如何透過正確刷卡年省上萬元」' },
                { product: '聯名品牌信用卡', features: '品牌專屬優惠、積點回饋', marketingAngle: '社會認同切角', example: '「品味生活的最佳夥伴：與您喜愛的品牌共創專屬權益」' },
                { product: '里程累積信用卡', features: '消費累積里程、兌換機票', marketingAngle: '問題解決切角', example: '「聰明累積旅遊基金：如何透過日常消費換取免費機票」' }
            ]
        },
        {
            productType: 'credit-card',
            literacyLevel: 'advanced',
            title: '信用卡產品與高階財商客戶的配對',
            description: '適合具備豐富金融知識客戶的信用卡產品推薦',
            recommendations: [
                { product: '頂級權益信用卡', features: '高端禮賓服務、機場貴賓室', marketingAngle: '社會認同切角', example: '「頂尖人士的生活配件：彰顯身分的同時享受無與倫比的服務」' },
                { product: '多幣別信用卡', features: '免外幣手續費、匯率優惠', marketingAngle: '專業分析切角', example: '「全球消費策略：如何優化跨國支付成本與匯率效益」' },
                { product: '商務差旅信用卡', features: '商務艙升等、差旅保險', marketingAngle: '問題解決切角', example: '「商務人士的旅行效率方案：讓每一趟公幹都更加順暢」' }
            ]
        },
        // 更多產品類型矩陣數據...
    ];
    
    // 特殊情境矩陣數據
    matrixData.situation = [
        {
            situationType: 'passive-income',
            literacyLevel: 'beginner',
            title: '被動收入需求與初階財商客戶的配對',
            description: '適合金融知識有限且希望創造被動收入的客戶',
            recommendations: [
                { product: '高利率定期存款', features: '本金保障、固定利息', marketingAngle: '功能價值切角', example: '「零風險被動收入：定存族的理財升級之路」' },
                { product: '每月配息基金', features: '定期派息、收益穩定', marketingAngle: '生活情境切角', example: '「每月穩定入帳：為您量身打造的被動收入方案」' },
                { product: '自動化定期定額投資', features: '紀律投資、長期累積', marketingAngle: '教育啟發切角', example: '「小錢滾大錢：開啟您的被動收入第一步」' }
            ]
        },
        {
            situationType: 'passive-income',
            literacyLevel: 'intermediate',
            title: '被動收入需求與中階財商客戶的配對',
            description: '適合具備基本金融知識且希望創造被動收入的客戶',
            recommendations: [
                { product: '高股息ETF', features: '分散投資、穩定配息', marketingAngle: '數據驅動切角', example: '「股息投資策略：數據顯示的長期穩定收益來源」' },
                { product: '房地產投資信託', features: '不動產收益、流動性佳', marketingAngle: '問題解決切角', example: '「不必當房東的租金收入：REITs投資的優勢與策略」' },
                { product: '配息型債券組合', features: '固定收益、風險適中', marketingAngle: '功能價值切角', example: '「打造收息投資組合：兼顧當期收入與長期增值」' }
            ]
        },
        {
            situationType: 'passive-income',
            literacyLevel: 'advanced',
            title: '被動收入需求與高階財商客戶的配對',
            description: '適合具備豐富金融知識且希望創造被動收入的客戶',
            recommendations: [
                { product: '股息成長策略', features: '長期增值、收益成長', marketingAngle: '專業分析切角', example: '「股息成長投資法：複合成長率分析與長期財富效應」' },
                { product: '另類收益資產', features: '低相關性、穩定現金流', marketingAngle: '專業分析切角', example: '「多元收益來源：建構對抗市場波動的被動收入投資組合」' },
                { product: '結構型收益商品', features: '客製化收益、風險控制', marketingAngle: '數據驅動切角', example: '「精準設計的收益結構：根據市場環境優化您的被動收入」' }
            ]
        },
        // 更多特殊情境矩陣數據...
    ];
}

// 設置篩選按鈕事件監聽器
function setupFilterButtons() {
    // 風險偏好矩陣篩選
    document.getElementById('risk-filter-btn').addEventListener('click', function() {
        const riskProfile = document.getElementById('risk-filter').value;
        const literacyLevel = document.getElementById('risk-literacy').value;
        updateMatrixContent('risk', riskProfile, literacyLevel);
    });
    
    // 生命週期矩陣篩選
    document.getElementById('lifecycle-filter-btn').addEventListener('click', function() {
        const lifecycleStage = document.getElementById('lifecycle-filter').value;
        const literacyLevel = document.getElementById('lifecycle-literacy').value;
        updateMatrixContent('lifecycle', lifecycleStage, literacyLevel);
    });
    
    // 產品類型矩陣篩選
    document.getElementById('product-filter-btn').addEventListener('click', function() {
        const productType = document.getElementById('product-filter').value;
        const literacyLevel = document.getElementById('product-literacy').value;
        updateMatrixContent('product', productType, literacyLevel);
    });
    
    // 特殊情境矩陣篩選
    document.getElementById('situation-filter-btn').addEventListener('click', function() {
        const situationType = document.getElementById('situation-filter').value;
        const literacyLevel = document.getElementById('situation-literacy').value;
        updateMatrixContent('situation', situationType, literacyLevel);
    });
}

// 更新矩陣內容
function updateMatrixContent(matrixType, filterValue, literacyLevel) {
    const contentElement = document.getElementById(`${matrixType}-content`);
    let filteredData = matrixData[matrixType];
    
    // 應用篩選
    if (filterValue !== 'all') {
        filteredData = filteredData.filter(item => {
            if (matrixType === 'risk') return item.riskProfile === filterValue;
            if (matrixType === 'lifecycle') return item.lifecycleStage === filterValue;
            if (matrixType === 'product') return item.productType === filterValue;
            if (matrixType === 'situation') return item.situationType === filterValue;
            return true;
        });
    }
    
    if (literacyLevel !== 'all') {
        filteredData = filteredData.filter(item => item.literacyLevel === literacyLevel);
    }
    
    // 生成HTML內容
    if (filteredData.length === 0) {
        contentElement.innerHTML = '<div class="no-results">沒有符合條件的配對結果。請調整篩選條件後重試。</div>';
        return;
    }
    
    let html = '';
    
    filteredData.forEach(item => {
        html += `
            <div class="matrix-item">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                <div class="recommendations">
                    <h4>推薦產品與行銷切角</h4>
                    <table class="recommendation-table">
                        <thead>
                            <tr>
                                <th>產品</th>
                                <th>產品特色</th>
                                <th>建議行銷切角</th>
                                <th>標題範例</th>
                            </tr>
                        </thead>
                        <tbody>
        `;
        
        item.recommendations.forEach(rec => {
            html += `
                <tr>
                    <td>${rec.product}</td>
                    <td>${rec.features}</td>
                    <td>${rec.marketingAngle}</td>
                    <td>${rec.example}</td>
                </tr>
            `;
        });
        
        html += `
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    });
    
    contentElement.innerHTML = html;
}
