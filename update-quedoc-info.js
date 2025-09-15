// 🔍 QueDoc 사이트 정보 업데이트
const { Client } = require('@notionhq/client');

const NOTION_API_KEY = process.env.NOTION_API_KEY || 'your-notion-api-key-here';
const NOTION_PAGE_ID = '2697705af35080d29bd3ec3447918eab';

const notion = new Client({
  auth: NOTION_API_KEY,
});

class QueDocInfoUpdater {
  constructor() {
    this.notion = notion;
  }

  // 🎯 QueDoc 프로젝트 정보 업데이트
  async updateQueDocInfo() {
    try {
      console.log("🔍 QueDoc 프로젝트 정보 업데이트...");
      
      // QueDoc 관련 블록들 찾기
      const response = await this.notion.blocks.children.list({
        block_id: NOTION_PAGE_ID,
      });
      
      // QueDoc 제목 블록 찾기
      const queDocTitle = response.results.find(block => 
        block.type === 'heading_3' && 
        block.heading_3.rich_text[0]?.text?.content?.includes('QueDoc')
      );
      
      if (queDocTitle) {
        // 제목 업데이트
        await this.notion.blocks.update({
          block_id: queDocTitle.id,
          heading_3: {
            rich_text: [
              {
                type: "text",
                text: {
                  content: "🏥 QueDoc - Hospital Reservation System"
                }
              }
            ]
          }
        });
        
        console.log("✅ QueDoc 제목 업데이트 완료");
      }
      
      // QueDoc 설명 블록 찾기
      const queDocDescription = response.results.find(block => 
        block.type === 'paragraph' && 
        block.paragraph.rich_text[0]?.text?.content?.includes('병원 예약 시스템')
      );
      
      if (queDocDescription) {
        // 설명 업데이트
        await this.notion.blocks.update({
          block_id: queDocDescription.id,
          paragraph: {
            rich_text: [
              {
                type: "text",
                text: {
                  content: "**Hospital Reservation System**"
                }
              }
            ]
          }
        });
        
        console.log("✅ QueDoc 설명 업데이트 완료");
      }
      
      // QueDoc 상세 설명 블록 찾기
      const queDocDetail = response.results.find(block => 
        block.type === 'paragraph' && 
        block.paragraph.rich_text[0]?.text?.content?.includes('사용자 경험을 중시한')
      );
      
      if (queDocDetail) {
        // 상세 설명 업데이트
        await this.notion.blocks.update({
          block_id: queDocDetail.id,
          paragraph: {
            rich_text: [
              {
                type: "text",
                text: {
                  content: "사용자 경험을 중시한 웹 애플리케이션으로, Vue.js와 Spring Boot를 활용해 직관적이고 안정적인 예약 시스템을 만들었습니다. 현재 HTTP로 운영 중이며, SSL 인증서 적용 예정입니다."
                }
              }
            ]
          }
        });
        
        console.log("✅ QueDoc 상세 설명 업데이트 완료");
      }
      
      // QueDoc 링크 블록들 찾기
      const queDocLinks = response.results.filter(block => 
        block.type === 'paragraph' && 
        (block.paragraph.rich_text[0]?.text?.content?.includes('quedoc.kro.kr') ||
         block.paragraph.rich_text[0]?.text?.content?.includes('GitHub'))
      );
      
      for (const linkBlock of queDocLinks) {
        const content = linkBlock.paragraph.rich_text[0]?.text?.content || "";
        
        if (content.includes('quedoc.kro.kr')) {
          // Demo 링크 업데이트
          await this.notion.blocks.update({
            block_id: linkBlock.id,
            paragraph: {
              rich_text: [
                {
                  type: "text",
                  text: {
                    content: "🌐 **Live Demo**: http://www.quedoc.kro.kr/ (SSL 인증서 적용 예정)"
                  }
                }
              ]
            }
          });
          
          console.log("✅ QueDoc Demo 링크 업데이트 완료");
        } else if (content.includes('GitHub')) {
          // GitHub 링크 업데이트
          await this.notion.blocks.update({
            block_id: linkBlock.id,
            paragraph: {
              rich_text: [
                {
                  type: "text",
                  text: {
                    content: "💻 **Source Code**: https://github.com/saway126/QueDoc"
                  }
                }
              ]
            }
          });
          
          console.log("✅ QueDoc GitHub 링크 업데이트 완료");
        }
      }
      
      console.log("🎉 QueDoc 프로젝트 정보 업데이트 완료!");
      
    } catch (error) {
      console.error("❌ QueDoc 프로젝트 정보 업데이트 실패:", error.message);
    }
  }

  // 🎯 QueDoc 기술 스택 정보 업데이트
  async updateQueDocTechStack() {
    try {
      console.log("🛠️ QueDoc 기술 스택 정보 업데이트...");
      
      // QueDoc 기술 스택 블록 찾기
      const response = await this.notion.blocks.children.list({
        block_id: NOTION_PAGE_ID,
      });
      
      const queDocTechStack = response.results.find(block => 
        block.type === 'bulleted_list_item' && 
        block.bulleted_list_item.rich_text[0]?.text?.content?.includes('Tech Stack') &&
        block.bulleted_list_item.rich_text[0]?.text?.content?.includes('Vue.js')
      );
      
      if (queDocTechStack) {
        // 기술 스택 업데이트
        await this.notion.blocks.update({
          block_id: queDocTechStack.id,
          bulleted_list_item: {
            rich_text: [
              {
                type: "text",
                text: {
                  content: "🛠️ **Tech Stack**: Vue.js, Spring Boot, MySQL, JPA, Bootstrap, jQuery"
                }
              }
            ]
          }
        });
        
        console.log("✅ QueDoc 기술 스택 업데이트 완료");
      }
      
      console.log("🎉 QueDoc 기술 스택 정보 업데이트 완료!");
      
    } catch (error) {
      console.error("❌ QueDoc 기술 스택 정보 업데이트 실패:", error.message);
    }
  }

  // 🎯 QueDoc 개발 기간 정보 업데이트
  async updateQueDocDuration() {
    try {
      console.log("📅 QueDoc 개발 기간 정보 업데이트...");
      
      // QueDoc 개발 기간 블록 찾기
      const response = await this.notion.blocks.children.list({
        block_id: NOTION_PAGE_ID,
      });
      
      const queDocDuration = response.results.find(block => 
        block.type === 'bulleted_list_item' && 
        block.bulleted_list_item.rich_text[0]?.text?.content?.includes('Duration') &&
        block.bulleted_list_item.rich_text[0]?.text?.content?.includes('2024.01')
      );
      
      if (queDocDuration) {
        // 개발 기간 업데이트
        await this.notion.blocks.update({
          block_id: queDocDuration.id,
          bulleted_list_item: {
            rich_text: [
              {
                type: "text",
                text: {
                  content: "📅 **Duration**: 2024.01 - 2024.02 (2개월)"
                }
              }
            ]
          }
        });
        
        console.log("✅ QueDoc 개발 기간 업데이트 완료");
      }
      
      console.log("🎉 QueDoc 개발 기간 정보 업데이트 완료!");
      
    } catch (error) {
      console.error("❌ QueDoc 개발 기간 정보 업데이트 실패:", error.message);
    }
  }

  // 🎯 전체 QueDoc 정보 업데이트
  async updateAllQueDocInfo() {
    console.log("🔍 QueDoc 전체 정보 업데이트 시작...");
    
    await this.updateQueDocInfo();
    await this.updateQueDocTechStack();
    await this.updateQueDocDuration();
    
    console.log("🎉 QueDoc 전체 정보 업데이트 완료!");
    console.log("✨ 실제 사이트 상태가 반영되었습니다!");
  }
}

// 실행
const updater = new QueDocInfoUpdater();
updater.updateAllQueDocInfo();
