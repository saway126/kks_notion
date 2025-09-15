// 🔍 Integration 접근 권한 테스트
const { Client } = require('@notionhq/client');

const NOTION_API_KEY = process.env.NOTION_API_KEY || 'your-notion-api-key-here';

const notion = new Client({
  auth: NOTION_API_KEY,
});

async function testIntegrationAccess() {
  try {
    console.log("🔍 Integration 접근 권한 테스트...");
    
    // 1. 사용자 정보 확인
    const user = await notion.users.me();
    console.log("✅ 사용자 정보:", user.name);
    
    // 2. 모든 페이지 검색 (권한 있는 페이지만)
    console.log("📄 권한 있는 페이지 검색...");
    const searchResponse = await notion.search({
      filter: {
        property: "object",
        value: "page"
      }
    });
    
    console.log(`📄 총 ${searchResponse.results.length}개 페이지 발견:`);
    
    if (searchResponse.results.length === 0) {
      console.log("❌ 접근 가능한 페이지가 없습니다.");
      console.log("💡 해결 방법:");
      console.log("1. 포트폴리오 페이지에서 Share 버튼 클릭");
      console.log("2. 'Add people' → 'Add an integration'");
      console.log("3. 'kks0518' 검색 후 추가");
      console.log("4. 'Full access' 권한 확인");
      return;
    }
    
    // 3. 각 페이지 정보 출력
    searchResponse.results.forEach((page, index) => {
      const title = page.properties.title?.title?.[0]?.text?.content || "제목 없음";
      console.log(`${index + 1}. ${title}`);
      console.log(`   ID: ${page.id}`);
      console.log(`   URL: https://www.notion.so/${page.id.replace(/-/g, '')}`);
      console.log("---");
    });
    
    // 4. 71_stars 관련 페이지 찾기
    const targetPages = searchResponse.results.filter(page => {
      const title = page.properties.title?.title?.[0]?.text?.content || "";
      return title.includes("71") || title.includes("stars") || title.includes("기성") || title.includes("포트폴리오");
    });
    
    if (targetPages.length > 0) {
      console.log("🎯 타겟 페이지들:");
      targetPages.forEach((page, index) => {
        const title = page.properties.title?.title?.[0]?.text?.content || "제목 없음";
        console.log(`${index + 1}. ${title}`);
        console.log(`   ID: ${page.id}`);
        console.log(`   이 ID를 사용하세요!`);
      });
    } else {
      console.log("❌ 71_stars 관련 페이지를 찾을 수 없습니다.");
      console.log("💡 포트폴리오 페이지에 Integration 권한을 부여해주세요.");
    }
    
  } catch (error) {
    console.error("❌ 테스트 실패:", error.message);
    
    if (error.message.includes("Unauthorized")) {
      console.log("💡 해결 방법:");
      console.log("1. Integration이 활성화되어 있는지 확인");
      console.log("2. API 키가 올바른지 확인");
      console.log("3. 페이지에 Integration 권한이 있는지 확인");
    }
  }
}

// 실행
testIntegrationAccess();
