// 🔍 직접 페이지 접근 테스트
const { Client } = require('@notionhq/client');

const NOTION_API_KEY = process.env.NOTION_API_KEY || 'your-notion-api-key-here';
const NOTION_PAGE_ID = '2697705af35080d29bd3ec3447918eab';

const notion = new Client({
  auth: NOTION_API_KEY,
});

async function directPageTest() {
  try {
    console.log("🔍 직접 페이지 접근 테스트...");
    console.log("📄 페이지 ID:", NOTION_PAGE_ID);
    
    // 페이지 정보 가져오기
    const response = await notion.pages.retrieve({
      page_id: NOTION_PAGE_ID,
    });
    
    console.log("✅ 페이지 접근 성공!");
    console.log("📄 페이지 제목:", response.properties.title?.title?.[0]?.text?.content || "제목 없음");
    console.log("🆔 페이지 ID:", response.id);
    console.log("📅 생성일:", response.created_time);
    
    return true;
  } catch (error) {
    console.error("❌ 페이지 접근 실패:", error.message);
    
    if (error.message.includes("object_not_found")) {
      console.log("💡 해결 방법:");
      console.log("1. 페이지 ID가 올바른지 확인");
      console.log("2. Integration에 페이지 권한이 있는지 확인");
      console.log("3. 페이지가 삭제되지 않았는지 확인");
    } else if (error.message.includes("Unauthorized")) {
      console.log("💡 해결 방법:");
      console.log("1. Integration이 활성화되어 있는지 확인");
      console.log("2. API 키가 올바른지 확인");
      console.log("3. 페이지에 Integration 권한이 있는지 확인");
    }
    
    return false;
  }
}

// 실행
directPageTest();
