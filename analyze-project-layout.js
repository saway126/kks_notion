// 🔍 프로젝트 섹션 레이아웃 분석
const { Client } = require('@notionhq/client');

const NOTION_API_KEY = process.env.NOTION_API_KEY || 'your-notion-api-key-here';
const NOTION_PAGE_ID = '2697705af35080d29bd3ec3447918eab';

const notion = new Client({
  auth: NOTION_API_KEY,
});

async function analyzeProjectLayout() {
  try {
    console.log("🔍 프로젝트 섹션 레이아웃 분석...");
    
    // 페이지 블록들 가져오기
    const response = await notion.blocks.children.list({
      block_id: NOTION_PAGE_ID,
    });
    
    console.log(`📄 총 ${response.results.length}개 블록 발견:`);
    
    let projectSectionStart = false;
    let projectBlocks = [];
    
    response.results.forEach((block, index) => {
      // 프로젝트 섹션 시작 찾기
      if (block.type === 'heading_3' && 
          block.heading_3.rich_text[0]?.text?.content?.includes('제가 만든 것들')) {
        projectSectionStart = true;
        console.log(`🎯 프로젝트 섹션 시작: ${index + 1}번째 블록`);
      }
      
      // 프로젝트 섹션 내의 블록들 수집
      if (projectSectionStart) {
        projectBlocks.push({
          index: index + 1,
          type: block.type,
          id: block.id,
          content: getBlockContent(block)
        });
        
        // 다음 섹션 시작하면 중단
        if (block.type === 'heading_2' && index > 0) {
          projectSectionStart = false;
        }
      }
    });
    
    console.log("\n📋 프로젝트 섹션 블록들:");
    projectBlocks.forEach(block => {
      console.log(`${block.index}. ${block.type}: ${block.content}`);
    });
    
    return projectBlocks;
  } catch (error) {
    console.error("❌ 분석 실패:", error.message);
    return [];
  }
}

function getBlockContent(block) {
  switch (block.type) {
    case 'heading_3':
      return block.heading_3.rich_text[0]?.text?.content || "제목 없음";
    case 'paragraph':
      return block.paragraph.rich_text[0]?.text?.content || "";
    case 'bulleted_list_item':
      return block.bulleted_list_item.rich_text[0]?.text?.content || "";
    case 'column_list':
      return "컬럼 리스트";
    case 'divider':
      return "구분선";
    default:
      return block.type;
  }
}

// 실행
analyzeProjectLayout();
