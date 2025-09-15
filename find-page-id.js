// 🔍 올바른 페이지 ID 찾기
const { Client } = require('@notionhq/client');

const NOTION_API_KEY = process.env.NOTION_API_KEY || 'your-notion-api-key-here';

const notion = new Client({
  auth: NOTION_API_KEY,
});

async function findPageId() {
  try {
    console.log("🔍 사용 가능한 페이지 찾기...");
    
    // 사용자 정보 가져오기
    const user = await notion.users.me();
    console.log("👤 사용자:", user.name);
    
    // 검색으로 페이지 찾기
    const searchResponse = await notion.search({
      query: "71_stars",
      filter: {
        property: "object",
        value: "page"
      }
    });
    
    console.log("📄 찾은 페이지들:");
    searchResponse.results.forEach((page, index) => {
      console.log(`${index + 1}. 제목: ${page.properties.title?.title?.[0]?.text?.content || "제목 없음"}`);
      console.log(`   ID: ${page.id}`);
      console.log(`   URL: https://www.notion.so/${page.id.replace(/-/g, '')}`);
      console.log("---");
    });
    
    return searchResponse.results;
  } catch (error) {
    console.error("❌ 검색 실패:", error.message);
    
    if (error.message.includes("Unauthorized")) {
      console.log("💡 해결 방법:");
      console.log("1. Integration이 활성화되어 있는지 확인");
      console.log("2. Integration에 검색 권한이 있는지 확인");
    }
    
    return [];
  }
}

// 실행
findPageId();
