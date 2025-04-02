document.addEventListener('DOMContentLoaded', function() {
    // 設置表單提交事件監聽器
    setupFormSubmission();
});

// 設置表單提交事件
function setupFormSubmission() {
    const form = document.getElementById('profile-form');
    
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 收集表單數據
        const formData = {
            age: parseInt(document.getElementById('age').value),
            lifecycle: document.getElementById('lifecycle').value,
            risk: document.getElementById('risk').value,
            literacy: document.getElementById('literacy').value,
            needs: getSelectedNeeds(),
            occupation: document.getElementById('occupation').value,
            education: document.getElementById('education').value,
            decisionStyle: document.getElementById('decision-style').value
        };
        
        // 生成客戶畫像和推薦
        generateProfileAndRecommendations(formData);
    });
}

// 獲取選中的需求
function getSelectedNeeds() {
    const checkboxes = document.querySelectorAll('input[name="needs"]:checked');
    const needs = [];
    
    checkboxes.forEach(checkbox => {
        needs.push(checkbox.value);
    });
    
    return needs;
}

// 生成客戶畫像和推薦
function generateProfileAndRecommendations(formData) {
    // 確定生命週期階段描述
    const lifecycleLabels = {
        'early': '成家立業期',
        'growth': '家庭成長期',
        'peak': '事業高峰期',
        'pre-retire': '退休準備期',
        'retire': '退休生活期'
    };
    
    // 確定風險偏好描述
    const riskLabels = {
        'conservative': '保守型',
        'moderate': '穩健型',
        'aggressive': '積極型'
    };
    
    // 確定財商水平描述
    const literacyLabels = {
        'beginner': '初階財商',
        'intermediate': '中階財商',
        'advanced': '高階財商'
    };
    
    // 確定需求描述
    const needLabels = {
        'savings': '儲蓄與流動性',
        'loan': '融資需求',
        'investment': '投資需求',
        'risk': '風險管理',
        'passive': '被動收入',
        'overseas': '海外資金調度',
        'tax': '稅務規劃',
        'inheritance': '財富傳承'
    };
    
    // 根據客戶資料選擇適合的產品和行銷切角
    const recommendations = getRecommendations(formData);
    
    // 生成客戶畫像HTML
    let html = `
        <div class="profile-summary">
            <h3>客戶畫像摘要</h3>
            <ul>
                <li><strong>年齡：</strong>${formData.age}歲</li>
                <li><strong>生命週期階段：</strong>${lifecycleLabels[formData.lifecycle]}</li>
                <li><strong>風險偏好：</strong>${riskLabels[formData.risk]}</li>
                <li><strong>財商水平：</strong>${literacyLabels[formData.literacy]}</li>
                <li><strong>主要需求：</strong>${formData.needs.map(need => needLabels[need]).join('、')}</li>
    `;
    
    if (formData.occupation) {
        html += `<li><strong>職業類型：</strong>${getOccupationLabel(formData.occupation)}</li>`;
    }
    
    if (formData.education) {
        html += `<li><strong>教育程度：</strong>${getEducationLabel(formData.education)}</li>`;
    }
    
    if (formData.decisionStyle) {
        html += `<li><strong>決策風格：</strong>${getDecisionStyleLabel(formData.decisionStyle)}</li>`;
    }
    
    html += `
            </ul>
        </div>
        
        <div class="product-recommendations">
            <h3>產品推薦</h3>
            <ul>
    `;
    
    recommendations.products.forEach(product => {
        html += `<li><strong>${product.name}：</strong>${product.description}</li>`;
    });
    
    html += `
            </ul>
        </div>
        
        <div class="marketing-recommendations">
            <h3>行銷切角建議</h3>
            <div class="primary-angles">
                <h4>主要行銷切角</h4>
                <ul>
    `;
    
    recommendations.marketingAngles.primary.forEach(angle => {
        html += `<li><strong>${angle.name}：</strong>${angle.description}</li>`;
    });
    
    html += `
                </ul>
            </div>
            
            <div class="secondary-angles">
                <h4>輔助行銷切角</h4>
                <ul>
    `;
    
    recommendations.marketingAngles.secondary.forEach(angle => {
        html += `<li><strong>${angle.name}：</strong>${angle.description}</li>`;
    });
    
    html += `
                </ul>
            </div>
        </div>
        
        <div class="title-examples">
            <h3>標題範例</h3>
            <ul>
    `;
    
    recommendations.titleExamples.forEach(title => {
        html += `<li>${title}</li>`;
    });
    
    html += `
            </ul>
        </div>
        
        <div class="communication-tips">
            <h3>溝通重點</h3>
            <ul>
    `;
    
    recommendations.communicationTips.forEach(tip => {
        html += `<li>${tip}</li>`;
    });
    
    html += `
            </ul>
        </div>
    `;
    
    // 更新結果區域
    document.querySelector('#profile-result .result-content').innerHTML = html;
}

// 獲取職業標籤
function getOccupationLabel(occupation) {
    const labels = {
        'professional': '專業人士',
        'business': '企業主',
        'employee': '受薪階級',
        'creative': '創意工作者',
        'retired': '退休人士'
    };
    
    return labels[occupation] || occupation;
}

// 獲取教育程度標籤
function getEducationLabel(education) {
    const labels = {
        'high-school': '高中/職',
        'college': '大專/大學',
        'graduate': '研究所以上'
    };
    
    return labels[education] || education;
}

// 獲取決策風格標籤
function getDecisionStyleLabel(style) {
    const labels = {
        'rational': '理性決策',
        'emotional': '感性決策',
        'mixed': '混合型'
    };
    
    return labels[style] || style;
}

// 根據客戶資料獲取推薦
function getRecommendations(formData) {
    // 產品推薦
    let products = [];
    
    // 根據財商水平、風險偏好和生命週期階段選擇產品
    if (formData.literacy === 'beginner') {
        if (formData.risk === 'conservative') {
            products.push(
                { name: '定期存款', description: '安全可靠的儲蓄工具，提供固定利息收入' },
                { name: '活期儲蓄帳戶', description: '流動性高，隨時可取用的基本儲蓄工具' }
            );
            
            if (formData.needs.includes('passive')) {
                products.push({ name: '每月配息基金', description: '提供穩定月配息的低風險投資工具' });
            }
        } else if (formData.risk === 'moderate') {
            products.push(
                { name: '定期定額基金', description: '透過小額定期投資累積財富的入門工具' },
                { name: '保本型結構性產品', description: '兼顧本金保障和潛在收益的投資選擇' }
            );
        } else {
            products.push(
                { name: '主題型基金', description: '聚焦特定產業或趨勢的成長型投資工具' },
                { name: '高收益債券基金', description: '提供較高利息收入的固定收益投資' }
            );
        }
        
        // 根據生命週期添加產品
        if (formData.lifecycle === 'early') {
            products.push({ name: '房貸保險', description: '保障房貸還款能力，為家人提供安心保障' });
        } else if (formData.lifecycle === 'growth') {
            products.push({ name: '教育儲蓄帳戶', description: '為子女教育需求提前規劃的儲蓄工具' });
        }
    } else if (formData.literacy === 'intermediate') {
        if (formData.risk === 'conservative') {
            products.push(
                { name: '債券型基金', description: '投資於債券市場，提供穩定收益和較低波動' },
                { name: '保守型平衡基金', description: '股債配置偏重債券，兼顧安全與適度成長' }
            );
            
            if (formData.needs.includes('passive')) {
                products.push({ name: '高股息ETF', description: '投資高股息股票的指數型基金，提供穩定配息' });
            }
        } else if (formData.risk === 'moderate') {
            products.push(
                { name: '平衡型基金', description: '均衡配置股票與債券，平衡風險與報酬' },
                { name: '指數型ETF', description: '追蹤特定市場指數，低成本參與市場整體表現' }
            );
        } else {
            products.push(
                { name: '成長型股票基金', description: '投資於具成長潛力的股票，追求資本增值' },
                { name: '新興市場基金', description: '投資於新興市場國家，把握高成長機會' }
            );
        }
        
        // 根據生命週期添加產品
        if (formData.lifecycle === 'peak') {
            products.push({ name: '投資型保險', description: '兼具保障和投資功能的保險產品' });
        } else if (formData.lifecycle === 'pre-retire') {
            products.push({ name: '目標日期基金', description: '根據退休時間自動調整資產配置的基金' });
        }
    } else {
        if (formData.risk === 'conservative') {
            products.push(
                { name: '優質公司債', description: '投資於信用評級高的企業債券，提供穩定收益' },
                { name: '防禦型股票組合', description: '投資於低波動、高股息的防禦型股票' }
            );
            
            if (formData.needs.includes('passive')) {
                products.push({ name: '股息成長策略', description: '投資於持續提高股息的優質企業，長期創造收益成長' });
            }
        } else if (formData.risk === 'moderate') {
            products.push(
                { name: '智能投資組合', description: '使用演算法自動配置和再平衡的多元資產組合' },
                { name: '全球資產配置基金', description: '投資於全球不同資產類別，分散風險並把握機會' }
            );
        } else {
            products.push(
                { name: '另類投資組合', description: '包含對沖基金、商品、不動產等低相關性資產' },
                { name: '私募股權基金', description: '投資於非公開交易企業，追求高潛在報酬' }
            );
        }
        
        // 根據特殊需求添加產品
        if (formData.needs.includes('tax')) {
            products.push({ name: '稅務優化投資組合', description: '考量稅務效率的投資策略，降低稅負影響' });
        } else if (formData.needs.includes('inheritance')) {
            products.push({ name: '家族信託規劃', description: '協助財富有效傳承的信託安排' });
        }
    }
    
    // 行銷切角建議
    let primaryAngles = [];
    let secondaryAngles = [];
    
    // 根據財商水平選擇行銷切角
    if (formData.literacy === 'beginner') {
        primaryAngles.push(
            { name: '生活情境切角', description: '連結產品與日常生活場景，使用貼近生活的例子和語言' },
            { name: '情感訴求切角', description: '強調產品如何滿足情感需求，如安全感、家庭保障等' }
        );
        
        secondaryAngles.push(
            { name: '功能價值切角', description: '簡明扼要地說明產品的實用功能和直接價值' },
            { name: '教育啟發切角', description: '提供基礎金融知識，幫助理解產品的基本原理' }
        );
    } else if (formData.literacy === 'intermediate') {
        primaryAngles.push(
            { name: '問題解決切角', description: '聚焦於產品如何解決特定財務問題或痛點' },
            { name: '數據驅動切角', description: '使用簡明的數據和比較，說明產品的優勢' }
        );
        
        secondaryAngles.push(
            { name: '功能價值切角', description: '詳細說明產品的功能特點和價值主張' },
            { name: '未來願景切角', description: '連結產品與客戶的中長期財務目標' }
        );
    } else {
        primaryAngles.push(
            { name: '專業分析切角', description: '提供深度市場分析和專業投資見解' },
            { name: '數據驅動切角', description: '使用詳細的數據分析和比較，支持投資決策' }
        );
        
        secondaryAngles.push(
            { name: '問題解決切角', description: '針對複雜財務問題提供全面解決方案' },
            { name: '社會認同切角', description: '強調產品受到專業投資者和同儕認可' }
        );
    }
    
    // 根據決策風格調整行銷切角
    if (formData.decisionStyle === 'emotional') {
        // 對於感性決策者，加強情感訴求
        if (!primaryAngles.some(angle => angle.name === '情感訴求切角')) {
            secondaryAngles.push({ name: '情感訴求切角', description: '連結產品與情感需求，使用情感豐富的語言和故事' });
        }
    } else if (formData.decisionStyle === 'rational') {
        // 對於理性決策者，加強數據驅動
        if (!primaryAngles.some(angle => angle.name === '數據驅動切角')) {
            secondaryAngles.push({ name: '數據驅動切角', description: '使用具體數字和比較數據說服客戶' });
        }
    }
    
    // 標題範例
    let titleExamples = [];
    
    // 根據客戶特徵和需求生成標題範例
    if (formData.literacy === 'beginner') {
        if (formData.lifecycle === 'early') {
            titleExamples.push(
                '安心起步：為您的家庭打造堅實的財務基礎',
                '新家庭的財務守護者：簡單可靠的保障方案',
                '人生新階段，財務新規劃：輕鬆掌握家庭財務',
                '為愛築巢：讓您的家庭夢想安心落地',
                '穩健起步：新婚家庭的理財第一步'
            );
        } else if (formData.needs.includes('passive')) {
            titleExamples.push(
                '輕鬆創造被動收入：小資族也能實現的財務自由',
                '每月穩定入帳：為您量身打造的被動收入方案',
                '零風險被動收入：定存族的理財升級之路',
                '小錢滾大錢：開啟您的被動收入第一步',
                '睡覺也能賺：新手必懂的被動收入入門'
            );
        } else {
            titleExamples.push(
                '理財新手必看：簡單易懂的財務規劃指南',
                '安心理財第一步：為您量身打造的基礎投資組合',
                '財務安全感的基石：新手也能輕鬆上手的保障方案',
                '小資族的聰明理財：每一分錢都能創造更多價值',
                '理財不複雜：打造屬於您的簡單致富方程式'
            );
        }
    } else if (formData.literacy === 'intermediate') {
        if (formData.lifecycle === 'growth' && formData.needs.includes('loan')) {
            titleExamples.push(
                '教育金提前佈局：讓孩子的未來無後顧之憂',
                '海外教育資金規劃：精準計算與彈性調度',
                '子女教育投資攻略：兼顧成長與安全的最佳方案',
                '教育基金智慧管理：為孩子打造更好的起點',
                '跨國學費無憂：一站式海外教育資金解決方案'
            );
        } else if (formData.lifecycle === 'peak') {
            titleExamples.push(
                '數據說話：中產階級最適合的資產配置比例',
                '投資報酬率大揭密：同齡人都在用的理財策略',
                '35-45歲必看：事業高峰期的最佳投資組合',
                '財務成長的黃金十年：數據支持的投資決策',
                '精準分析：您的事業與投資如何相輔相成'
            );
        } else {
            titleExamples.push(
                '資產配置的科學：如何建構最適合您的投資組合',
                '投資效率最大化：善用金融工具提升報酬率',
                '風險與報酬的平衡藝術：穩健投資者的最佳策略',
                '財務目標達成計畫：量身訂製的理財時間表',
                '市場波動中的穩健成長：抓住機會同時控制風險'
            );
        }
    } else {
        if (formData.needs.includes('inheritance') || formData.needs.includes('tax')) {
            titleExamples.push(
                '全球資產配置新視野：高淨值人士的投資策略',
                '市場週期與資產輪動：把握2025年投資機會',
                '多元資產配置的科學：風險平衡與報酬最大化',
                '財富傳承的藝術：家族資產的稅務優化策略',
                '宏觀經濟視角：如何在不確定性中保持投資優勢'
            );
        } else if (formData.lifecycle === 'pre-retire' || formData.lifecycle === 'retire') {
            titleExamples.push(
                '從工作收入到投資收入：無縫轉換的退休規劃',
                '財務自由的藍圖：打造永續的退休收入來源',
                '退而不休：高資產人士的理想退休生活',
                '資產長壽化：如何讓您的財富比您活得更久',
                '退休後的財富管理：從積累到分配的智慧轉換'
            );
        } else {
            titleExamples.push(
                '投資組合效率前沿：科學方法優化風險調整後報酬',
                '另類投資策略：低相關性資產在投資組合中的角色',
                '全球宏觀趨勢與戰術資產配置：把握市場轉折點',
                '量化模型與人為判斷：結合兩者優勢的投資方法',
                '財富管理的整體觀：從投資、稅務到傳承的全方位規劃'
            );
        }
    }
    
    // 溝通重點
    let communicationTips = [];
    
    // 根據財商水平提供溝通重點
    if (formData.literacy === 'beginner') {
        communicationTips = [
            '使用簡單直觀的語言，避免專業術語',
            '強調產品的安全性和簡單易用特點',
            '提供具體的生活例子說明產品功能',
            '使用視覺化工具展示產品效益',
            '分步驟引導決策過程，避免資訊過載'
        ];
    } else if (formData.literacy === 'intermediate') {
        communicationTips = [
            '平衡產品功能說明和市場分析',
            '適度使用專業術語，並提供解釋',
            '提供數據支持的比較分析',
            '討論風險與報酬的關係',
            '連結產品與特定財務目標的達成'
        ];
    } else {
        communicationTips = [
            '提供深度市場分析和專業見解',
            '討論產品在整體資產配置中的角色',
            '分析不同市場情境下的表現預期',
            '探討稅務和法律層面的考量',
            '強調客製化策略和專屬服務'
        ];
    }
    
    return {
        products: products,
        marketingAngles: {
            primary: primaryAngles,
            secondary: secondaryAngles
        },
        titleExamples: titleExamples,
        communicationTips: communicationTips
    };
}
