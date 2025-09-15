// 🔄 간단한 방법으로 원래 레이아웃 복원
const { Client } = require('@notionhq/client');

const NOTION_API_KEY = process.env.NOTION_API_KEY || 'your-notion-api-key-here';
const NOTION_PAGE_ID = '2697705af35080d29bd3ec3447918eab';

const notion = new Client({
  auth: NOTION_API_KEY,
});

class SimpleLayoutRestorer {
  constructor() {
    this.notion = notion;
  }

  // 🔄 간단한 방법으로 원래 레이아웃 복원
  async restoreSimpleLayout() {
    try {
      console.log("🔄 간단한 방법으로 원래 레이아웃 복원...");
      
      // 프로젝트 블록들 찾기
      const response = await this.notion.blocks.children.list({
        block_id: NOTION_PAGE_ID,
      });
      
      // Featured Projects 섹션 찾기
      const featuredProjectsBlock = response.results.find(block => 
        block.type === 'heading_2' && 
        block.heading_2.rich_text[0]?.text?.content?.includes('Featured Projects')
      );
      
      if (featuredProjectsBlock) {
        // Featured Projects 다음에 간단한 프로젝트 섹션들 추가
        await this.addSimpleProjectSections();
      }
      
      console.log("✅ 간단한 방법으로 원래 레이아웃 복원 완료");
      
    } catch (error) {
      console.error("❌ 간단한 레이아웃 복원 실패:", error.message);
    }
  }

  // 🎯 간단한 프로젝트 섹션들 추가
  async addSimpleProjectSections() {
    try {
      console.log("🎯 간단한 프로젝트 섹션들 추가...");
      
      // GreenWear 프로젝트 추가
      await this.addProjectSection("GreenWear", "스마트 웨어러블 헬스케어 플랫폼", "실시간 건강 데이터 수집 및 AI 분석을 통한 웨어러블 헬스케어 솔루션입니다.");
      
      // HRIM 프로젝트 추가
      await this.addProjectSection("HRIM", "ESG 분석 대시보드", "Hanwha BEYOND SW Camp에서 개발한 ESG 분석 대시보드입니다.");
      
      // QueDoc 프로젝트 추가
      await this.addProjectSection("QueDoc", "병원 예약 시스템", "병원 예약을 더 편리하게 만들어보고 싶어서 시작한 프로젝트입니다.");
      
      // 기술 블로그 추가
      await this.addProjectSection("기술 블로그", "71_stars 개발 블로그", "개발하면서 배운 것들을 정리하고 공유하는 블로그입니다.");
      
      console.log("✅ 간단한 프로젝트 섹션들 추가 완료");
      
    } catch (error) {
      console.error("❌ 간단한 프로젝트 섹션 추가 실패:", error.message);
    }
  }

  // 🎯 개별 프로젝트 섹션 추가
  async addProjectSection(title, subtitle, description) {
    try {
      // 프로젝트 제목 추가
      await this.notion.blocks.children.append({
        block_id: NOTION_PAGE_ID,
        children: [
          {
            type: "heading_3",
            heading_3: {
              rich_text: [
                {
                  type: "text",
                  text: {
                    content: title
                  }
                }
              ]
            }
          }
        ]
      });
      
      // 프로젝트 부제목 추가
      await this.notion.blocks.children.append({
        block_id: NOTION_PAGE_ID,
        children: [
          {
            type: "paragraph",
            paragraph: {
              rich_text: [
                {
                  type: "text",
                  text: {
                    content: subtitle
                  }
                }
              ]
            }
          }
        ]
      });
      
      // 프로젝트 설명 추가
      await this.notion.blocks.children.append({
        block_id: NOTION_PAGE_ID,
        children: [
          {
            type: "paragraph",
            paragraph: {
              rich_text: [
                {
                  type: "text",
                  text: {
                    content: description
                  }
                }
              ]
            }
          }
        ]
      });
      
      // 구분선 추가
      await this.notion.blocks.children.append({
        block_id: NOTION_PAGE_ID,
        children: [
          {
            type: "divider",
            divider: {}
          }
        ]
      });
      
      console.log(`✅ ${title} 프로젝트 섹션 추가 완료`);
      
    } catch (error) {
      console.error(`❌ ${title} 프로젝트 섹션 추가 실패:`, error.message);
    }
  }

  // 🎯 전체 복원 실행
  async restoreAll() {
    console.log("🔄 간단한 방법으로 원래 레이아웃 복원 시작...");
    
    await this.restoreSimpleLayout();
    
    console.log("🎉 간단한 방법으로 원래 레이아웃 복원 완료!");
    console.log("✨ 이제 각 프로젝트별 설명과 구분선이 복원되었습니다!");
  }
}

// 실행
const restorer = new SimpleLayoutRestorer();
restorer.restoreAll();
