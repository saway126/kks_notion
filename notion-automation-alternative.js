// Notion 자동화 대안 방법
// Puppeteer를 사용한 브라우저 자동화

const puppeteer = require('puppeteer');
const fs = require('fs');

async function updateNotionWithPuppeteer() {
    console.log('🚀 Puppeteer를 사용한 Notion 자동 업데이트 시작...');
    
    try {
        // 브라우저 실행
        const browser = await puppeteer.launch({ 
            headless: false, // 브라우저 창 보이기
            defaultViewport: null 
        });
        
        const page = await browser.newPage();
        
        // Notion 페이지로 이동
        await page.goto('https://www.notion.so/71_stars-2697705af35080d29bd3ec3447918eab');
        
        // 로그인 대기 (수동으로 로그인 필요)
        console.log('📝 브라우저에서 Notion에 로그인해주세요...');
        await page.waitForSelector('[data-testid="page-content"]', { timeout: 60000 });
        
        // 포트폴리오 내용 읽기
        const portfolioContent = fs.readFileSync('portfolio-notion.md', 'utf8');
        
        // 기존 내용 선택 및 삭제
        await page.click('[data-testid="page-content"]');
        await page.keyboard.down('Control');
        await page.keyboard.press('KeyA');
        await page.keyboard.up('Control');
        await page.keyboard.press('Delete');
        
        // 새 내용 붙여넣기
        await page.keyboard.type(portfolioContent);
        
        console.log('✅ Notion 포트폴리오 업데이트 완료!');
        
        // 브라우저 닫기
        await browser.close();
        
    } catch (error) {
        console.error('❌ 오류 발생:', error.message);
    }
}

// 실행
if (require.main === module) {
    updateNotionWithPuppeteer();
}

module.exports = { updateNotionWithPuppeteer };
