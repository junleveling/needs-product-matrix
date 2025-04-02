document.addEventListener('DOMContentLoaded', function() {
    // 初始化指南頁面的導航功能已在common.js中處理
    
    // 添加行銷切角示例的互動功能
    initMarketingAngleExamples();
});

// 初始化行銷切角示例的互動功能
function initMarketingAngleExamples() {
    const exampleBlocks = document.querySelectorAll('.marketing-angle-examples');
    
    exampleBlocks.forEach(block => {
        // 添加懸停效果
        block.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
        });
        
        block.addEventListener('mouseleave', function() {
            this.style.boxShadow = 'none';
        });
        
        // 添加點擊展開/收起功能
        const heading = block.querySelector('h4');
        const list = block.querySelector('ul');
        
        if (heading && list) {
            heading.style.cursor = 'pointer';
            
            // 初始狀態：展開
            list.style.display = 'block';
            heading.dataset.expanded = 'true';
            
            heading.addEventListener('click', function() {
                if (this.dataset.expanded === 'true') {
                    list.style.display = 'none';
                    this.dataset.expanded = 'false';
                } else {
                    list.style.display = 'block';
                    this.dataset.expanded = 'true';
                }
            });
        }
    });
}
