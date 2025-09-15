// 🔍 현재 포트폴리오 디자인 분석
const { Client } = require('@notionhq/client');

const NOTION_API_KEY = process.env.NOTION_API_KEY || 'your-notion-api-key-here';
const NOTION_PAGE_ID = '2697705af35080d29bd3ec3447918eab';

const notion = new Client({
  auth: NOTION_API_KEY,
});

async function analyzeCurrentDesign() {
  try {
    console.log("🔍 현재 포트폴리오 디자인 분석...");
    
    // 페이지 블록들 가져오기
    const response = await notion.blocks.children.list({
      block_id: NOTION_PAGE_ID,
    });
    
    console.log(`📄 총 ${response.results.length}개 블록 발견:`);
    
    response.results.forEach((block, index) => {
      console.log(`${index + 1}. 타입: ${block.type}`);
      
      if (block.type === 'heading_1') {
        console.log(`   제목: ${block.heading_1.rich_text[0]?.text?.content || "제목 없음"}`);
      } else if (block.type === 'heading_2') {
        console.log(`   부제목: ${block.heading_2.rich_text[0]?.text?.content || "부제목 없음"}`);
      } else if (block.type === 'paragraph') {
        const content = block.paragraph.rich_text[0]?.text?.content || "";
        if (content.length > 0) {
          console.log(`   내용: ${content.substring(0, 50)}...`);
        }
      } else if (block.type === 'bulleted_list_item') {
        const content = block.bulleted_list_item.rich_text[0]?.text?.content || "";
        console.log(`   목록: ${content.substring(0, 50)}...`);
      }
      
      console.log(`   ID: ${block.id}`);
      console.log("---");
    });
    
    return response.results;
  } catch (error) {
    console.error("❌ 분석 실패:", error.message);
    return [];
  }
}

// 실행
analyzeCurrentDesign();
