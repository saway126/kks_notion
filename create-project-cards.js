// 🎨 프로젝트를 카드 형태로 재구성
const { Client } = require('@notionhq/client');

const NOTION_API_KEY = process.env.NOTION_API_KEY || 'your-notion-api-key-here';
const NOTION_PAGE_ID = '2697705af35080d29bd3ec3447918eab';

const notion = new Client({
  auth: NOTION_API_KEY,
});

class ProjectCardCreator {
  constructor() {
    this.notion = notion;
  }

  // 🎯 프로젝트를 카드 형태로 재구성
  async createProjectCards() {
    try {
      console.log("🎨 프로젝트 카드 생성 시작...");
      
      // 기존 프로젝트 블록들 찾기
      const response = await this.notion.blocks.children.list({
        block_id: NOTION_PAGE_ID,
      });
      
      // 프로젝트 블록들 찾기
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
        
        // 프로젝트별로 정리된 카드 내용 생성
        let cardContent = "";
        
        if (content.includes('GreenWear')) {
          cardContent = `🌱 **GreenWear** - 스마트 웨어러블 헬스케어 플랫폼

완전한 풀스택 프로젝트로, ESP32 하드웨어부터 Vue.js 웹앱, React Native 모바일앱, Node.js 백엔드, AI 분석까지 모든 것을 직접 구현했습니다.

**기술 스택**: ESP32, Vue.js, React Native, Node.js, AI/ML
**기간**: 2024년 3월 - 현재
**역할**: 풀스택 개발자

🔗 **Demo**: https://greenwear-demo.vercel.app/
📁 **GitHub**: https://github.com/saway126/greenwear`;
        } else if (content.includes('QueDoc')) {
          cardContent = `🏥 **QueDoc** - 병원 예약 시스템

사용자 경험을 중시한 웹 애플리케이션으로, Vue.js와 Spring Boot를 활용해 직관적이고 안정적인 예약 시스템을 만들었습니다.

**기술 스택**: Vue.js, Spring Boot, MySQL, JPA
**기간**: 2024년 1월 - 2월
**역할**: 프론트엔드 개발자

📁 **GitHub**: https://github.com/saway126/QueDoc`;
        } else if (content.includes('HRIM')) {
          cardContent = `📊 **HRIM** - ESG 분석 대시보드

Hanwha BEYOND SW Camp 최종 프로젝트로, 연도와 회사에 따라 동적으로 변하는 ESG 지표를 시각화하는 대시보드를 개발했습니다.

**기술 스택**: Vue.js, Spring Boot, MariaDB, Chart.js
**기간**: 2024년 6월 - 8월
**역할**: 팀 리더, 풀스택 개발자

📁 **GitHub**: https://github.com/beyond-sw-camp/be12-fin-HRIM-IMHR-FE`;
        } else if (content.includes('블로그')) {
          cardContent = `✍️ **기성이의 기술 블로그**

개발 과정에서 배운 것들을 정리하고 공유하는 블로그입니다. Jekyll과 GitHub Pages를 활용해 구축했습니다.

**기술 스택**: Jekyll, Liquid, CSS, JavaScript, GitHub Pages
**기간**: 2023년 12월 - 현재
**역할**: 콘텐츠 작성, 사이트 관리

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
                  content: cardContent
                }
              }
            ]
          }
        });
        
        console.log(`✅ ${i + 1}번째 프로젝트 카드 생성 완료`);
      }
      
      console.log("🎉 프로젝트 카드 생성 완료!");
      
    } catch (error) {
      console.error("❌ 프로젝트 카드 생성 실패:", error.message);
    }
  }

  // 🎯 프로젝트 섹션 제목 개선
  async improveProjectSectionTitle() {
    try {
      console.log("📝 프로젝트 섹션 제목 개선...");
      
      // 프로젝트 섹션 제목 찾기
      const response = await this.notion.blocks.children.list({
        block_id: NOTION_PAGE_ID,
      });
      
      const projectHeading = response.results.find(block => 
        block.type === 'heading_3' && 
        block.heading_3.rich_text[0]?.text?.content?.includes('제가 만든 것들')
      );
      
      if (projectHeading) {
        await this.notion.blocks.update({
          block_id: projectHeading.id,
          heading_3: {
            rich_text: [
              {
                type: "text",
                text: {
                  content: "🚀 대표 프로젝트"
                }
              }
            ]
          }
        });
        
        console.log("✅ 프로젝트 섹션 제목 개선 완료!");
      }
      
    } catch (error) {
      console.error("❌ 프로젝트 섹션 제목 개선 실패:", error.message);
    }
  }

  // 🎯 전체 프로젝트 카드 생성
  async createAllProjectCards() {
    console.log("🎨 프로젝트 카드 전체 생성 시작...");
    
    await this.improveProjectSectionTitle();
    await this.createProjectCards();
    
    console.log("🎉 프로젝트 카드 전체 생성 완료!");
    console.log("✨ 이제 프로젝트들이 깔끔한 카드 형태로 정리되었습니다!");
  }
}

// 실행
const creator = new ProjectCardCreator();
creator.createAllProjectCards();
