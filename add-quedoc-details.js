// 🔍 QueDoc 프로젝트에 추가 세부사항 추가
const { Client } = require('@notionhq/client');

const NOTION_API_KEY = process.env.NOTION_API_KEY || 'your-notion-api-key-here';
const NOTION_PAGE_ID = '2697705af35080d29bd3ec3447918eab';

const notion = new Client({
  auth: NOTION_API_KEY,
});

class QueDocDetailsAdder {
  constructor() {
    this.notion = notion;
  }

  // 🎯 QueDoc 프로젝트에 추가 세부사항 추가
  async addQueDocDetails() {
    try {
      console.log("🔍 QueDoc 프로젝트에 추가 세부사항 추가...");
      
      // QueDoc 프로젝트 섹션 찾기
      const response = await this.notion.blocks.children.list({
        block_id: NOTION_PAGE_ID,
      });
      
      // QueDoc 프로젝트의 마지막 블록 찾기 (GitHub 링크 다음)
      let queDocEndIndex = -1;
      let queDocStartIndex = -1;
      
      response.results.forEach((block, index) => {
        if (block.type === 'heading_3' && 
            block.heading_3.rich_text[0]?.text?.content?.includes('QueDoc')) {
          queDocStartIndex = index;
        }
        if (block.type === 'paragraph' && 
            block.paragraph.rich_text[0]?.text?.content?.includes('github.com/saway126/QueDoc')) {
          queDocEndIndex = index;
        }
      });
      
      if (queDocStartIndex === -1 || queDocEndIndex === -1) {
        console.log("❌ QueDoc 프로젝트 섹션을 찾을 수 없습니다.");
        return;
      }
      
      console.log(`📄 QueDoc 프로젝트 섹션: ${queDocStartIndex + 1}번째 ~ ${queDocEndIndex + 1}번째 블록`);
      
      // QueDoc 프로젝트에 추가 세부사항 추가
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
                    content: "🎯 **Key Features**: 병원 예약, 의사 일정 관리, 환자 정보 관리, 예약 현황 대시보드"
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
                    content: "🔧 **Development Environment**: IntelliJ IDEA, MySQL Workbench, Git"
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
                    content: "📊 **Project Scale**: 4명 팀 프로젝트, 2개월 개발 기간"
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
                    content: "🚀 **Deployment**: AWS EC2, 도메인 연결 (quedoc.kro.kr), HTTP 운영 중"
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
                    content: "🔒 **Security**: SSL 인증서 적용 예정, 보안 강화 계획"
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
                    content: "**💡 개발 경험**: 이 프로젝트를 통해 프론트엔드와 백엔드의 연동, 데이터베이스 설계, 사용자 인터페이스 설계에 대한 실무 경험을 쌓을 수 있었습니다. 특히 사용자 경험을 중시한 UI/UX 설계와 반응형 웹 개발에 집중했습니다."
                  }
                }
              ]
            }
          }
        ]
      });
      
      console.log("✅ QueDoc 프로젝트 추가 세부사항 완료");
      
    } catch (error) {
      console.error("❌ QueDoc 프로젝트 추가 세부사항 실패:", error.message);
    }
  }

  // 🎯 QueDoc 프로젝트 상태 정보 추가
  async addQueDocStatus() {
    try {
      console.log("📊 QueDoc 프로젝트 상태 정보 추가...");
      
      // QueDoc 프로젝트에 상태 정보 추가
      await this.notion.blocks.children.append({
        block_id: NOTION_PAGE_ID,
        children: [
          {
            type: "divider",
            divider: {}
          },
          {
            type: "paragraph",
            paragraph: {
              rich_text: [
                {
                  type: "text",
                  text: {
                    content: "**📈 프로젝트 현황**:"
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
                    content: "✅ **완료**: 기본 예약 시스템, 사용자 관리, 의사 일정 관리"
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
                    content: "🔄 **진행 중**: SSL 인증서 적용, 보안 강화"
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
                    content: "📋 **계획**: 모바일 앱 개발, AI 기반 예약 추천 시스템"
                  }
                }
              ]
            }
          }
        ]
      });
      
      console.log("✅ QueDoc 프로젝트 상태 정보 추가 완료");
      
    } catch (error) {
      console.error("❌ QueDoc 프로젝트 상태 정보 추가 실패:", error.message);
    }
  }

  // 🎯 전체 QueDoc 세부사항 추가
  async addAllQueDocDetails() {
    console.log("🔍 QueDoc 전체 세부사항 추가 시작...");
    
    await this.addQueDocDetails();
    await this.addQueDocStatus();
    
    console.log("🎉 QueDoc 전체 세부사항 추가 완료!");
    console.log("✨ QueDoc 프로젝트가 더욱 상세하고 전문적으로 업데이트되었습니다!");
  }
}

// 실행
const adder = new QueDocDetailsAdder();
adder.addAllQueDocDetails();
