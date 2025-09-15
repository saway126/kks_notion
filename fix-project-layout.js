// 🎨 프로젝트 레이아웃 정리
const { Client } = require('@notionhq/client');

const NOTION_API_KEY = process.env.NOTION_API_KEY || 'your-notion-api-key-here';
const NOTION_PAGE_ID = '2697705af35080d29bd3ec3447918eab';

const notion = new Client({
  auth: NOTION_API_KEY,
});

class ProjectLayoutFixer {
  constructor() {
    this.notion = notion;
  }

  // 🎯 프로젝트 섹션을 깔끔하게 재구성
  async reorganizeProjectSection() {
    try {
      console.log("🎨 프로젝트 섹션 레이아웃 정리 시작...");
      
      // 기존 프로젝트 블록들 찾기
      const response = await this.notion.blocks.children.list({
        block_id: NOTION_PAGE_ID,
      });
      
      // 프로젝트 관련 블록들 찾기
      const projectBlocks = response.results.filter(block => 
        block.type === 'bulleted_list_item' && 
        (block.bulleted_list_item.rich_text[0]?.text?.content?.includes('GreenWear') ||
         block.bulleted_list_item.rich_text[0]?.text?.content?.includes('QueDoc') ||
         block.bulleted_list_item.rich_text[0]?.text?.content?.includes('HRIM') ||
         block.bulleted_list_item.rich_text[0]?.text?.content?.includes('블로그'))
      );
      
      console.log(`📄 ${projectBlocks.length}개 프로젝트 블록 발견`);
      
      // 각 프로젝트를 카드 형태로 재구성
      for (let i = 0; i < projectBlocks.length; i++) {
        const block = projectBlocks[i];
        const content = block.bulleted_list_item.rich_text[0]?.text?.content || "";
        
        // 프로젝트별로 정리된 내용 생성
        let newContent = "";
        
        if (content.includes('GreenWear')) {
          newContent = `🌱 **GreenWear** - 스마트 웨어러블 헬스케어 플랫폼
완전한 풀스택 프로젝트로, ESP32 하드웨어부터 Vue.js 웹앱, React Native 모바일앱, Node.js 백엔드, AI 분석까지 모든 것을 직접 구현했습니다.

🔗 **Demo**: https://greenwear-demo.vercel.app/
📁 **GitHub**: https://github.com/saway126/greenwear`;
        } else if (content.includes('QueDoc')) {
          newContent = `🏥 **QueDoc** - 병원 예약 시스템
사용자 경험을 중시한 웹 애플리케이션으로, Vue.js와 Spring Boot를 활용해 직관적이고 안정적인 예약 시스템을 만들었습니다.

📁 **GitHub**: https://github.com/saway126/QueDoc`;
        } else if (content.includes('HRIM')) {
          newContent = `📊 **HRIM** - ESG 분석 대시보드
Hanwha BEYOND SW Camp 최종 프로젝트로, 연도와 회사에 따라 동적으로 변하는 ESG 지표를 시각화하는 대시보드를 개발했습니다.

📁 **GitHub**: https://github.com/beyond-sw-camp/be12-fin-HRIM-IMHR-FE`;
        } else if (content.includes('블로그')) {
          newContent = `✍️ **기성이의 기술 블로그**
개발 과정에서 배운 것들을 정리하고 공유하는 블로그입니다. Jekyll과 GitHub Pages를 활용해 구축했습니다.

🔗 **Site**: https://saway126.github.io/
📁 **GitHub**: https://github.com/saway126/saway126.github.io`;
        }
        
        // 블록 업데이트
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
        
        console.log(`✅ ${i + 1}번째 프로젝트 정리 완료`);
      }
      
      console.log("🎉 프로젝트 섹션 레이아웃 정리 완료!");
      
    } catch (error) {
      console.error("❌ 프로젝트 섹션 정리 실패:", error.message);
    }
  }

  // 🎯 프로젝트 섹션에 구분선 추가
  async addProjectSeparators() {
    try {
      console.log("📏 프로젝트 간 구분선 추가...");
      
      // 프로젝트 블록들 찾기
      const response = await this.notion.blocks.children.list({
        block_id: NOTION_PAGE_ID,
      });
      
      const projectBlocks = response.results.filter(block => 
        block.type === 'bulleted_list_item' && 
        (block.bulleted_list_item.rich_text[0]?.text?.content?.includes('GreenWear') ||
         block.bulleted_list_item.rich_text[0]?.text?.content?.includes('QueDoc') ||
         block.bulleted_list_item.rich_text[0]?.text?.content?.includes('HRIM') ||
         block.bulleted_list_item.rich_text[0]?.text?.content?.includes('블로그'))
      );
      
      // 각 프로젝트 사이에 구분선 추가
      for (let i = 0; i < projectBlocks.length - 1; i++) {
        const currentBlock = projectBlocks[i];
        const nextBlock = projectBlocks[i + 1];
        
        // 현재 블록 다음에 구분선 추가
        await this.notion.blocks.children.append({
          block_id: NOTION_PAGE_ID,
          children: [
            {
              type: "divider",
              divider: {}
            }
          ]
        });
        
        console.log(`✅ ${i + 1}번째 프로젝트 후 구분선 추가`);
      }
      
      console.log("🎉 프로젝트 구분선 추가 완료!");
      
    } catch (error) {
      console.error("❌ 구분선 추가 실패:", error.message);
    }
  }

  // 🎯 전체 프로젝트 레이아웃 정리
  async fixAllProjectLayout() {
    console.log("🎨 프로젝트 레이아웃 전체 정리 시작...");
    
    await this.reorganizeProjectSection();
    await this.addProjectSeparators();
    
    console.log("🎉 프로젝트 레이아웃 정리 완료!");
    console.log("✨ 이제 프로젝트들이 깔끔하게 정리되었습니다!");
  }
}

// 실행
const fixer = new ProjectLayoutFixer();
fixer.fixAllProjectLayout();
