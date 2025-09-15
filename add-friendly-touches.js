// 🎨 더 친근한 터치 추가
const { Client } = require('@notionhq/client');

const NOTION_API_KEY = process.env.NOTION_API_KEY || 'your-notion-api-key-here';
const NOTION_PAGE_ID = '2697705af35080d29bd3ec3447918eab';

const notion = new Client({
  auth: NOTION_API_KEY,
});

class FriendlyTouchAdder {
  constructor() {
    this.notion = notion;
  }

  // 🎯 Contact 섹션을 더 친근하게 변경
  async updateContactSection() {
    try {
      // Contact 섹션에 더 친근한 문구 추가
      const newContactIntro = "💬 언제든지 연락주세요!";
      
      // Contact 제목 찾기
      const response = await this.notion.blocks.children.list({
        block_id: NOTION_PAGE_ID,
      });
      
      // Contact 섹션 찾기 (첫 번째 컬럼에서)
      const contactBlock = response.results.find(block => 
        block.type === 'paragraph' && 
        block.paragraph.rich_text[0]?.text?.content?.includes('Contact')
      );
      
      if (contactBlock) {
        await this.notion.blocks.update({
          block_id: contactBlock.id,
          paragraph: {
            rich_text: [
              {
                type: "text",
                text: {
                  content: newContactIntro
                }
              }
            ]
          }
        });
        
        console.log("✅ Contact 섹션을 더 친근하게 업데이트 완료!");
      }
      
    } catch (error) {
      console.error("❌ Contact 섹션 업데이트 실패:", error.message);
    }
  }

  // 🎯 새로운 섹션 추가 - 취미와 관심사
  async addPersonalSection() {
    try {
      // 개인적인 섹션 추가
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
                    content: "🌟 개발 외에도"
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
                    content: "코딩만 하는 건 아니에요! 개발자로서의 성장뿐만 아니라 개인적인 취미와 관심사도 있습니다."
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
                    content: "📚 독서: 기술 서적과 소설을 즐겨 읽습니다"
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
                    content: "🎵 음악: 개발할 때는 항상 음악을 들으며 집중합니다"
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
                    content: "🚶‍♂️ 산책: 아이디어가 막힐 때는 산책하며 생각을 정리합니다"
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
                    content: "☕ 커피: 좋은 커피와 함께하는 코딩이 최고입니다"
                  }
                }
              ]
            }
          }
        ]
      });
      
      console.log("✅ 개인적인 섹션 추가 완료!");
      
    } catch (error) {
      console.error("❌ 개인적인 섹션 추가 실패:", error.message);
    }
  }

  // 🎯 마지막 인사말 추가
  async addClosingMessage() {
    try {
      // 마지막 인사말 추가
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
                    content: "💫 함께 멋진 프로젝트를 만들어가고 싶습니다!\n\n언제든지 연락주세요. 좋은 이야기 나누고 싶어요! 😊"
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
                    content: "— 김기성"
                  }
                }
              ]
            }
          }
        ]
      });
      
      console.log("✅ 마지막 인사말 추가 완료!");
      
    } catch (error) {
      console.error("❌ 마지막 인사말 추가 실패:", error.message);
    }
  }

  // 🎯 전체 친근한 터치 추가
  async addAllFriendlyTouches() {
    console.log("🌟 친근한 터치 추가 시작...");
    
    await this.updateContactSection();
    await this.addPersonalSection();
    await this.addClosingMessage();
    
    console.log("🎉 친근한 터치 추가 완료!");
  }
}

// 실행
const friendlyAdder = new FriendlyTouchAdder();
friendlyAdder.addAllFriendlyTouches();
