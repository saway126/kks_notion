// 🔍 원래 있던 이미지들을 복원
const { Client } = require('@notionhq/client');

const NOTION_API_KEY = process.env.NOTION_API_KEY || 'your-notion-api-key-here';
const NOTION_PAGE_ID = '2697705af35080d29bd3ec3447918eab';

const notion = new Client({
  auth: NOTION_API_KEY,
});

class OriginalImagesRestorer {
  constructor() {
    this.notion = notion;
  }

  // 🎯 원래 있던 이미지들을 복원하는 방법 제안
  async suggestImageRestoration() {
    try {
      console.log("🔍 원래 이미지 복원 방법 제안...");
      
      // 프로젝트별 원래 이미지 복원 가이드 생성
      const restorationGuide = `
# 🖼️ 원래 프로젝트 이미지 복원 가이드

## 📸 수동으로 이미지 복원하는 방법

### 1. GreenWear 프로젝트
- **원래 이미지**: GreenWear 웹 애플리케이션의 실제 스크린샷
- **복원 방법**: 
  1. https://greenwear-demo.vercel.app/ 접속
  2. 스크린샷 촬영 (F12 → 스크린샷 도구 사용)
  3. Notion에 이미지 업로드

### 2. HRIM 프로젝트  
- **원래 이미지**: HRIM ESG 대시보드의 실제 스크린샷
- **복원 방법**:
  1. https://www.imhr.kro.kr/login 접속
  2. 로그인 후 대시보드 화면 스크린샷 촬영
  3. Notion에 이미지 업로드

### 3. QueDoc 프로젝트
- **원래 이미지**: QueDoc 병원 예약 시스템의 실제 스크린샷
- **복원 방법**:
  1. https://www.quedoc.kro.kr/ 접속
  2. 예약 시스템 화면 스크린샷 촬영
  3. Notion에 이미지 업로드

### 4. 기술 블로그
- **원래 이미지**: 기술 블로그의 실제 스크린샷
- **복원 방법**:
  1. https://saway126.github.io/ 접속
  2. 블로그 메인 페이지 스크린샷 촬영
  3. Notion에 이미지 업로드

## 🎯 권장사항

1. **실제 스크린샷 사용**: 각 프로젝트의 실제 동작 화면을 촬영
2. **일관된 크기**: 모든 이미지를 동일한 비율로 조정 (16:9 권장)
3. **고품질**: 선명하고 깔끔한 스크린샷 사용
4. **대표 화면**: 각 프로젝트의 핵심 기능을 보여주는 화면 선택

## 📱 스크린샷 촬영 팁

- **데스크톱**: F12 개발자 도구 → 스크린샷 도구 사용
- **모바일**: 브라우저 개발자 도구에서 모바일 뷰로 전환 후 촬영
- **크롭**: 불필요한 부분 제거하고 핵심 내용만 포함
- **최적화**: 파일 크기 최적화 (1MB 이하 권장)
      `;
      
      // 가이드를 파일로 저장
      const fs = require('fs');
      fs.writeFileSync('image-restoration-guide.md', restorationGuide);
      
      console.log("✅ 이미지 복원 가이드 생성 완료!");
      console.log("📄 image-restoration-guide.md 파일을 확인하세요");
      
    } catch (error) {
      console.error("❌ 이미지 복원 가이드 생성 실패:", error.message);
    }
  }

  // 🎯 현재 이미지 상태 분석
  async analyzeCurrentImages() {
    try {
      console.log("🔍 현재 이미지 상태 분석...");
      
      // 프로젝트 블록들 찾기
      const response = await this.notion.blocks.children.list({
        block_id: NOTION_PAGE_ID,
      });
      
      // 이미지 블록들 찾기
      const imageBlocks = response.results.filter(block => 
        block.type === 'image'
      );
      
      console.log(`📄 ${imageBlocks.length}개의 이미지 블록 발견:`);
      
      imageBlocks.forEach((block, index) => {
        const imageUrl = block.image?.external?.url || block.image?.file?.url || 'Unknown';
        console.log(`${index + 1}. 이미지 URL: ${imageUrl}`);
      });
      
      return imageBlocks;
      
    } catch (error) {
      console.error("❌ 현재 이미지 상태 분석 실패:", error.message);
      return [];
    }
  }

  // 🎯 이미지 복원 제안
  async suggestImageRestoration() {
    console.log("🔍 이미지 복원 제안 시작...");
    
    await this.analyzeCurrentImages();
    await this.suggestImageRestoration();
    
    console.log("🎉 이미지 복원 제안 완료!");
    console.log("💡 수동으로 실제 프로젝트 스크린샷을 촬영해서 업로드하는 것을 권장합니다!");
  }
}

// 실행
const restorer = new OriginalImagesRestorer();
restorer.suggestImageRestoration();
