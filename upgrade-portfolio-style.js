// 🎨 포트폴리오를 더 전문적으로 업그레이드
const { Client } = require('@notionhq/client');

const NOTION_API_KEY = process.env.NOTION_API_KEY || 'your-notion-api-key-here';
const NOTION_PAGE_ID = '2697705af35080d29bd3ec3447918eab';

const notion = new Client({
  auth: NOTION_API_KEY,
});

class PortfolioStyleUpgrader {
  constructor() {
    this.notion = notion;
  }

  // 🎯 프로젝트 카드에 더 전문적인 스타일 적용
  async upgradeProjectCards() {
    try {
      console.log("🎨 프로젝트 카드 스타일 업그레이드...");
      
      // 프로젝트 블록들 찾기
      const response = await this.notion.blocks.children.list({
        block_id: NOTION_PAGE_ID,
      });
      
      const projectBlocks = response.results.filter(block => 
        block.type === 'bulleted_list_item' && 
        (block.bulleted_list_item.rich_text[0]?.text?.content?.includes('기술 스택') ||
         block.bulleted_list_item.rich_text[0]?.text?.content?.includes('개발 기간') ||
         block.bulleted_list_item.rich_text[0]?.text?.content?.includes('담당 역할'))
      );
      
      console.log(`📄 ${projectBlocks.length}개 프로젝트 관련 블록 발견`);
      
      // 각 프로젝트 정보를 더 전문적으로 업데이트
      for (let i = 0; i < projectBlocks.length; i++) {
        const block = projectBlocks[i];
        const content = block.bulleted_list_item.rich_text[0]?.text?.content || "";
        
        let newContent = "";
        
        if (content.includes('기술 스택')) {
          // 기술 스택을 더 전문적으로 표시
          const techStack = content.split(': ')[1];
          newContent = `🛠️ **Tech Stack**: ${techStack}`;
        } else if (content.includes('개발 기간')) {
          // 개발 기간을 더 전문적으로 표시
          const period = content.split(': ')[1];
          newContent = `📅 **Duration**: ${period}`;
        } else if (content.includes('담당 역할')) {
          // 담당 역할을 더 전문적으로 표시
          const role = content.split(': ')[1];
          newContent = `👨‍💻 **Role**: ${role}`;
        }
        
        if (newContent) {
          await this.notion.blocks.update({
            block_id: block.id,
            bulleted_list_item: {
              rich_text: [
                {
                  type: "text",
                  text: {
                    content: newContent
                  }
                }
              ]
            }
          });
          
          console.log(`✅ ${i + 1}번째 프로젝트 정보 업그레이드 완료`);
        }
      }
      
      console.log("🎉 프로젝트 카드 스타일 업그레이드 완료!");
      
    } catch (error) {
      console.error("❌ 프로젝트 카드 스타일 업그레이드 실패:", error.message);
    }
  }

  // 🎯 프로젝트 링크를 더 전문적으로 표시
  async upgradeProjectLinks() {
    try {
      console.log("🔗 프로젝트 링크 업그레이드...");
      
      // 프로젝트 링크 블록들 찾기
      const response = await this.notion.blocks.children.list({
        block_id: NOTION_PAGE_ID,
      });
      
      const linkBlocks = response.results.filter(block => 
        block.type === 'paragraph' && 
        (block.paragraph.rich_text[0]?.text?.content?.includes('Demo:') ||
         block.paragraph.rich_text[0]?.text?.content?.includes('GitHub:'))
      );
      
      console.log(`📄 ${linkBlocks.length}개 링크 블록 발견`);
      
      // 각 링크를 더 전문적으로 업데이트
      for (let i = 0; i < linkBlocks.length; i++) {
        const block = linkBlocks[i];
        const content = block.paragraph.rich_text[0]?.text?.content || "";
        
        let newContent = "";
        
        if (content.includes('Demo:')) {
          // Demo 링크를 더 전문적으로 표시
          const url = content.split('Demo: ')[1];
          newContent = `🌐 **Live Demo**: ${url}`;
        } else if (content.includes('GitHub:')) {
          // GitHub 링크를 더 전문적으로 표시
          const url = content.split('GitHub: ')[1];
          newContent = `💻 **Source Code**: ${url}`;
        }
        
        if (newContent) {
          await this.notion.blocks.update({
            block_id: block.id,
            paragraph: {
              rich_text: [
                {
                  type: "text",
                  text: {
                    content: newContent
                  }
                }
              ]
            }
          });
          
          console.log(`✅ ${i + 1}번째 링크 업그레이드 완료`);
        }
      }
      
      console.log("🎉 프로젝트 링크 업그레이드 완료!");
      
    } catch (error) {
      console.error("❌ 프로젝트 링크 업그레이드 실패:", error.message);
    }
  }

  // 🎯 프로젝트 제목을 더 전문적으로 업데이트
  async upgradeProjectTitles() {
    try {
      console.log("📝 프로젝트 제목 업그레이드...");
      
      // 프로젝트 제목 블록들 찾기
      const response = await this.notion.blocks.children.list({
        block_id: NOTION_PAGE_ID,
      });
      
      const titleBlocks = response.results.filter(block => 
        block.type === 'heading_3' && 
        (block.heading_3.rich_text[0]?.text?.content?.includes('GreenWear') ||
         block.heading_3.rich_text[0]?.text?.content?.includes('QueDoc') ||
         block.heading_3.rich_text[0]?.text?.content?.includes('HRIM') ||
         block.heading_3.rich_text[0]?.text?.content?.includes('기술 블로그'))
      );
      
      console.log(`📄 ${titleBlocks.length}개 제목 블록 발견`);
      
      // 각 제목을 더 전문적으로 업데이트
      const newTitles = [
        "🌱 GreenWear - Smart Wearable Healthcare Platform",
        "🏥 QueDoc - Hospital Reservation System",
        "📊 HRIM - ESG Analysis Dashboard",
        "✍️ Tech Blog - Development Experience & Learning"
      ];
      
      for (let i = 0; i < titleBlocks.length && i < newTitles.length; i++) {
        const block = titleBlocks[i];
        
        await this.notion.blocks.update({
          block_id: block.id,
          heading_3: {
            rich_text: [
              {
                type: "text",
                text: {
                  content: newTitles[i]
                }
              }
            ]
          }
        });
        
        console.log(`✅ ${i + 1}번째 제목 업그레이드 완료`);
      }
      
      console.log("🎉 프로젝트 제목 업그레이드 완료!");
      
    } catch (error) {
      console.error("❌ 프로젝트 제목 업그레이드 실패:", error.message);
    }
  }

  // 🎯 전체 포트폴리오 스타일 업그레이드
  async upgradeAllPortfolioStyle() {
    console.log("🎨 포트폴리오 스타일 전체 업그레이드 시작...");
    
    await this.upgradeProjectTitles();
    await this.upgradeProjectCards();
    await this.upgradeProjectLinks();
    
    console.log("🎉 포트폴리오 스타일 전체 업그레이드 완료!");
    console.log("✨ 이제 정말 전문적인 포트폴리오가 되었습니다!");
  }
}

// 실행
const upgrader = new PortfolioStyleUpgrader();
upgrader.upgradeAllPortfolioStyle();
