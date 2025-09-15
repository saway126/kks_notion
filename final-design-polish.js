// 🎨 최종 디자인 완성
const { Client } = require('@notionhq/client');

const NOTION_API_KEY = process.env.NOTION_API_KEY || 'your-notion-api-key-here';
const NOTION_PAGE_ID = '2697705af35080d29bd3ec3447918eab';

const notion = new Client({
  auth: NOTION_API_KEY,
});

class FinalDesignPolisher {
  constructor() {
    this.notion = notion;
  }

  // 🎯 제목을 더 자연스럽게 변경
  async updateMainTitle() {
    try {
      // 페이지 제목을 더 자연스럽게 변경
      await this.notion.pages.update({
        page_id: NOTION_PAGE_ID,
        properties: {
          title: {
            title: [
              {
                text: {
                  content: "🌟 김기성의 포트폴리오"
                }
              }
            ]
          }
        }
      });
      
      console.log("✅ 메인 제목을 더 자연스럽게 업데이트 완료!");
      
    } catch (error) {
      console.error("❌ 메인 제목 업데이트 실패:", error.message);
    }
  }

  // 🎯 프로젝트 섹션 제목을 더 자연스럽게 변경
  async updateProjectSectionTitle() {
    try {
      // 프로젝트 섹션 제목 찾기
      const response = await this.notion.blocks.children.list({
        block_id: NOTION_PAGE_ID,
      });
      
      // 프로젝트 제목 찾기
      const projectHeading = response.results.find(block => 
        block.type === 'heading_3' && 
        block.heading_3.rich_text[0]?.text?.content?.includes('대표 프로젝트')
      );
      
      if (projectHeading) {
        await this.notion.blocks.update({
          block_id: projectHeading.id,
          heading_3: {
            rich_text: [
              {
                type: "text",
                text: {
                  content: "🚀 제가 만든 것들"
                }
              }
            ]
          }
        });
        
        console.log("✅ 프로젝트 섹션 제목을 더 자연스럽게 업데이트 완료!");
      }
      
    } catch (error) {
      console.error("❌ 프로젝트 섹션 제목 업데이트 실패:", error.message);
    }
  }

  // 🎯 새로운 섹션 추가 - 현재 관심사
  async addCurrentInterests() {
    try {
      // 현재 관심사 섹션 추가
      await this.notion.blocks.children.append({
        block_id: NOTION_PAGE_ID,
        children: [
          {
            type: "divider",
            divider: {}
          },
          {
            type: "heading_2",
            heading_2: {
              rich_text: [
                {
                  type: "text",
                  text: {
                    content: "🔮 지금 관심 있는 것들"
                  }
                }
              ]
            }
          },
          {
            type: "paragraph",
            paragraph: {
              rich_text: [
                {
                  type: "text",
                  text: {
                    content: "항상 새로운 기술을 배우고 적용하는 것을 좋아합니다. 현재 특히 관심을 가지고 있는 분야들을 소개해드릴게요!"
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
                    content: "🤖 AI/ML: 사용자 경험을 개선할 수 있는 AI 기술 연구"
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
                    content: "☁️ 클라우드: AWS, GCP를 활용한 확장 가능한 아키텍처 설계"
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
                    content: "📱 모바일: React Native로 크로스 플랫폼 앱 개발"
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
                    content: "🔧 DevOps: CI/CD 파이프라인 구축과 자동화"
                  }
                }
              ]
            }
          }
        ]
      });
      
      console.log("✅ 현재 관심사 섹션 추가 완료!");
      
    } catch (error) {
      console.error("❌ 현재 관심사 섹션 추가 실패:", error.message);
    }
  }

  // 🎯 전체 최종 완성
  async polishFinalDesign() {
    console.log("🎨 최종 디자인 완성 시작...");
    
    await this.updateMainTitle();
    await this.updateProjectSectionTitle();
    await this.addCurrentInterests();
    
    console.log("🎉 최종 디자인 완성 완료!");
    console.log("✨ 이제 포트폴리오가 훨씬 더 자연스럽고 친근해졌습니다!");
  }
}

// 실행
const polisher = new FinalDesignPolisher();
polisher.polishFinalDesign();
