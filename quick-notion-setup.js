// 🚀 Cursor + Notion 즉시 연동 스크립트
const { Client } = require('@notionhq/client');

// 환경변수 설정 (실제 값으로 교체 필요)
const NOTION_API_KEY = process.env.NOTION_API_KEY || 'your-notion-api-key-here'; // 여기에 실제 API 키 입력
const NOTION_PAGE_ID = '2697705af35080d29bd3ec3447918eab';

const notion = new Client({
  auth: NOTION_API_KEY,
});

class QuickNotionUpdater {
  constructor() {
    this.notion = notion;
  }

  // 🎯 제목 업데이트 (Web Frontend Designer → Full Stack Developer)
  async updateTitle() {
    try {
      await this.notion.pages.update({
        page_id: NOTION_PAGE_ID,
        properties: {
          title: {
            title: [
              {
                text: {
                  content: "71_stars 기성이의 포토폴리오 - Full Stack Developer"
                }
              }
            ]
          }
        }
      });
      console.log("✅ 제목 업데이트 완료!");
    } catch (error) {
      console.error("❌ 제목 업데이트 실패:", error.message);
    }
  }

  // 🎯 한 줄 요약 업데이트
  async updateSummary() {
    try {
      // 기존 한 줄 요약 섹션 찾기 및 업데이트
      const response = await this.notion.blocks.children.list({
        block_id: NOTION_PAGE_ID,
      });

      // 한 줄 요약 블록 찾기 (실제 블록 ID로 교체 필요)
      const summaryBlockId = 'find_summary_block_id_here';
      
      await this.notion.blocks.update({
        block_id: summaryBlockId,
        paragraph: {
          rich_text: [
            {
              type: "text",
              text: {
                content: "문제 정의 → 가설 → 실험 → 검증의 빌드 루프로 빠르게 학습합니다."
              }
            }
          ]
        }
      });
      
      console.log("✅ 한 줄 요약 업데이트 완료!");
    } catch (error) {
      console.error("❌ 한 줄 요약 업데이트 실패:", error.message);
    }
  }

  // 🎯 Skills 섹션에 새 기술 추가
  async addNewSkills() {
    try {
      // Skills 섹션에 새 기술 추가
      await this.notion.blocks.children.append({
        block_id: NOTION_PAGE_ID,
        children: [
          {
            type: "bulleted_list_item",
            bulleted_list_item: {
              rich_text: [
                {
                  type: "text",
                  text: {
                    content: "Backend: Java, Spring Boot, Node.js, Express, FastAPI"
                  }
                }
              ]
            }
          },
          {
            type: "bulleted_list_item",
            bulleted_list_item: {
              rich_text: [
                {
                  type: "text",
                  text: {
                    content: "Database: MySQL, PostgreSQL, MongoDB, Redis"
                  }
                }
              ]
            }
          },
          {
            type: "bulleted_list_item",
            bulleted_list_item: {
              rich_text: [
                {
                  type: "text",
                  text: {
                    content: "DevOps: Docker, AWS, GitHub Actions, CI/CD"
                  }
                }
              ]
            }
          },
          {
            type: "bulleted_list_item",
            bulleted_list_item: {
              rich_text: [
                {
                  type: "text",
                  text: {
                    content: "Mobile & IoT: React Native, ESP32, Arduino, WebSocket"
                  }
                }
              ]
            }
          }
        ]
      });
      
      console.log("✅ 새 기술 추가 완료!");
    } catch (error) {
      console.error("❌ 새 기술 추가 실패:", error.message);
    }
  }

  // 🎯 전체 업데이트 실행
  async runFullUpdate() {
    console.log("🚀 포트폴리오 업데이트 시작...");
    
    await this.updateTitle();
    await this.updateSummary();
    await this.addNewSkills();
    
    console.log("🎉 모든 업데이트 완료!");
  }
}

// 실행
const updater = new QuickNotionUpdater();
updater.runFullUpdate();

module.exports = QuickNotionUpdater;
