// 🔍 URL에서 페이지 ID 추출
const url = "https://lying-dresser-408.notion.site/71stars";

// URL에서 페이지 ID 추출하는 함수
function extractPageId(url) {
  // 방법 1: URL 패턴 분석
  const patterns = [
    /notion\.site\/([a-f0-9-]+)/i,
    /notion\.so\/([a-f0-9-]+)/i,
    /([a-f0-9-]{32,})/i
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      return match[1];
    }
  }
  
  return null;
}

// 방법 2: 수동으로 ID 추출
function manualExtract() {
  // URL: https://lying-dresser-408.notion.site/71stars
  // 이 경우 페이지 ID가 URL에 직접 노출되지 않음
  
  // 대안 1: 페이지 소스에서 ID 찾기
  console.log("💡 해결 방법:");
  console.log("1. 포트폴리오 페이지 열기");
  console.log("2. F12 (개발자 도구) 열기");
  console.log("3. Console 탭에서 다음 코드 실행:");
  console.log("   window.location.pathname");
  console.log("   또는");
  console.log("   document.querySelector('[data-page-id]')?.getAttribute('data-page-id')");
  
  // 대안 2: 페이지 공유 링크에서 ID 추출
  console.log("\n4. 또는 페이지 공유 링크 생성:");
  console.log("   Share → Copy link → URL에서 ID 추출");
}

const pageId = extractPageId(url);
if (pageId) {
  console.log("✅ 추출된 페이지 ID:", pageId);
} else {
  console.log("❌ URL에서 페이지 ID를 추출할 수 없습니다.");
  manualExtract();
}
