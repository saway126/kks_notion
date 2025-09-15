// 🎨 포트폴리오를 더 자연스럽고 모던하게 개선
const { Client } = require('@notionhq/client');

const NOTION_API_KEY = process.env.NOTION_API_KEY || 'your-notion-api-key-here';
const NOTION_PAGE_ID = '2697705af35080d29bd3ec3447918eab';

const notion = new Client({
  auth: NOTION_API_KEY,
});

class PortfolioModernizer {
  constructor() {
    this.notion = notion;
  }

  // 🎯 더 친근한 소개 문구로 변경
  async updateIntroduction() {
    try {
      // 기존 딱딱한 문구를 더 자연스럽게 변경
      const newIntro = "안녕하세요! 👋 문제를 해결하는 것을 좋아하는 풀스택 개발자 김기성입니다.\n\n사용자 중심의 인터랙션과 성능 최적화에 집중하며, Vue/React부터 Spring Boot까지 전체 스택을 다룹니다. 접근성, 상태 관리, 테스트와 배포 자동화를 통해 일관된 사용자 경험을 만드는 것을 목표로 합니다.";
      
      // 첫 번째 컬럼의 소개 문구 찾아서 업데이트
      const response = await this.notion.blocks.children.list({
        block_id: NOTION_PAGE_ID,
      });
      
      // paragraph 블록 찾기
      const introBlock = response.results.find(block => 
        block.type === 'paragraph' && 
        block.paragraph.rich_text[0]?.text?.content?.includes('사용자 중심')
      );
      
      if (introBlock) {
        await this.notion.blocks.update({
          block_id: introBlock.id,
          paragraph: {
            rich_text: [
              {
                type: "text",
                text: {
                  content: newIntro
                }
              }
            ]
          }
        });
        
        console.log("✅ 소개 문구를 더 친근하게 업데이트 완료!");
      }
      
    } catch (error) {
      console.error("❌ 소개 문구 업데이트 실패:", error.message);
    }
  }

  // 🎯 Skills 섹션을 더 자연스럽게 재구성
  async reorganizeSkills() {
    try {
      // 기존 Skills 섹션에 더 자연스러운 설명 추가
      const newSkillsIntro = "💡 제가 잘하는 것들";
      
      // Skills 섹션 찾기
      const response = await this.notion.blocks.children.list({
        block_id: NOTION_PAGE_ID,
      });
      
      // Skills 제목 찾기
      const skillsHeading = response.results.find(block => 
        block.type === 'heading_3' && 
        block.heading_3.rich_text[0]?.text?.content?.includes('Skills')
      );
      
      if (skillsHeading) {
        await this.notion.blocks.update({
          block_id: skillsHeading.id,
          heading_3: {
            rich_text: [
              {
                type: "text",
                text: {
                  content: newSkillsIntro
                }
              }
            ]
          }
        });
        
        console.log("✅ Skills 섹션을 더 자연스럽게 업데이트 완료!");
      }
      
    } catch (error) {
      console.error("❌ Skills 섹션 업데이트 실패:", error.message);
    }
  }

  // 🎯 프로젝트 설명을 더 스토리텔링 방식으로 변경
  async updateProjectDescriptions() {
    try {
      const projectUpdates = [
        {
          id: '26d7705a-f350-80f9-94c0-fe54dfbb7315', // GreenWear
          newContent: "🌱 GreenWear - 스마트 웨어러블 헬스케어 플랫폼\n완전한 풀스택 프로젝트로, ESP32 하드웨어부터 Vue.js 웹앱, React Native 모바일앱, Node.js 백엔드, AI 분석까지 모든 것을 직접 구현했습니다."
        },
        {
          id: '26d7705a-f350-80c8-82df-db8ac0a7edf7', // QueDoc
          newContent: "🏥 QueDoc - 병원 예약 시스템\n사용자 경험을 중시한 웹 애플리케이션으로, Vue.js와 Spring Boot를 활용해 직관적이고 안정적인 예약 시스템을 만들었습니다."
        },
        {
          id: '26d7705a-f350-804b-a300-f8de609c572c', // HRIM
          newContent: "📊 HRIM - ESG 분석 대시보드\nHanwha BEYOND SW Camp 최종 프로젝트로, 연도와 회사에 따라 동적으로 변하는 ESG 지표를 시각화하는 대시보드를 개발했습니다."
        },
        {
          id: '26d7705a-f350-80f4-a7af-d1bd6f18c4dd', // 블로그
          newContent: "✍️ 기성이의 기술 블로그\n개발 과정에서 배운 것들을 정리하고 공유하는 블로그입니다. Jekyll과 GitHub Pages를 활용해 구축했습니다."
        }
      ];
      
      for (const update of projectUpdates) {
        await this.notion.blocks.update({
          block_id: update.id,
          bulleted_list_item: {
            rich_text: [
              {
                type: "text",
                text: {
                  content: update.newContent
                }
              }
            ]
          }
        });
      }
      
      console.log("✅ 프로젝트 설명을 더 스토리텔링 방식으로 업데이트 완료!");
      
    } catch (error) {
      console.error("❌ 프로젝트 설명 업데이트 실패:", error.message);
    }
  }

  // 🎯 새로운 섹션 추가 - 개발 철학
  async addDevelopmentPhilosophy() {
    try {
      // 새로운 섹션 추가
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
                    content: "🚀 개발 철학"
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
                    content: "코딩은 단순히 기능을 구현하는 것이 아니라, 사용자의 문제를 해결하는 도구라고 생각합니다. 항상 '왜?'라는 질문을 던지며, 더 나은 방법을 찾아가고 있습니다."
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
                    content: "🎯 문제 해결 중심: 사용자의 진짜 니즈를 파악하고 최적의 솔루션을 설계합니다"
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
                    content: "🔄 지속적 학습: 새로운 기술을 배우고 적용하는 것을 즐깁니다"
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
                    content: "🤝 협업 중심: 팀원들과 함께 성장하며 더 나은 결과를 만들어갑니다"
                  }
                }
              ]
            }
          }
        ]
      });
      
      console.log("✅ 개발 철학 섹션 추가 완료!");
      
    } catch (error) {
      console.error("❌ 개발 철학 섹션 추가 실패:", error.message);
    }
  }

  // 🎯 전체 업데이트 실행
  async runModernization() {
    console.log("🎨 포트폴리오 디자인 현대화 시작...");
    
    await this.updateIntroduction();
    await this.reorganizeSkills();
    await this.updateProjectDescriptions();
    await this.addDevelopmentPhilosophy();
    
    console.log("🎉 포트폴리오 디자인 현대화 완료!");
  }
}

// 실행
const modernizer = new PortfolioModernizer();
modernizer.runModernization();
