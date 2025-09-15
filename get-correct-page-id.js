// 🔍 올바른 페이지 ID 찾기 (권한 부여 후)
const { Client } = require('@notionhq/client');

const NOTION_API_KEY = process.env.NOTION_API_KEY || 'your-notion-api-key-here';

const notion = new Client({
  auth: NOTION_API_KEY,
});

async function getCorrectPageId() {
  try {
    console.log("🔍 모든 페이지 검색...");
    
    // 모든 페이지 검색
    const searchResponse = await notion.search({
      filter: {
        property: "object",
        value: "page"
      }
    });
    
    console.log(`📄 총 ${searchResponse.results.length}개 페이지 발견:`);
    
    searchResponse.results.forEach((page, index) => {
      const title = page.properties.title?.title?.[0]?.text?.content || "제목 없음";
      console.log(`${index + 1}. ${title}`);
      console.log(`   ID: ${page.id}`);
      console.log(`   URL: https://www.notion.so/${page.id.replace(/-/g, '')}`);
      console.log("---");
    });
    
    // 71_stars 관련 페이지 찾기
    const targetPages = searchResponse.results.filter(page => {
      const title = page.properties.title?.title?.[0]?.text?.content || "";
      return title.includes("71") || title.includes("stars") || title.includes("기성");
    });
    
    if (targetPages.length > 0) {
      console.log("🎯 타겟 페이지들:");
      targetPages.forEach((page, index) => {
        const title = page.properties.title?.title?.[0]?.text?.content || "제목 없음";
        console.log(`${index + 1}. ${title}`);
        console.log(`   ID: ${page.id}`);
        console.log(`   이 ID를 사용하세요!`);
      });
    }
    
    return searchResponse.results;
  } catch (error) {
    console.error("❌ 검색 실패:", error.message);
    
    if (error.message.includes("Unauthorized")) {
      console.log("💡 해결 방법:");
      console.log("1. 포트폴리오 페이지에서 Share 버튼 클릭");
      console.log("2. 'Add people' → 'Add an integration'");
      console.log("3. 기존 Integration 추가");
      console.log("4. 다시 이 스크립트 실행");
    }
    
    return [];
  }
}

// 실행
getCorrectPageId();
