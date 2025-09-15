// 🔄 최종 정리 작업 전 상태로 복원
const { Client } = require('@notionhq/client');

const NOTION_API_KEY = process.env.NOTION_API_KEY || 'your-notion-api-key-here';
const NOTION_PAGE_ID = '2697705af35080d29bd3ec3447918eab';

const notion = new Client({
  auth: NOTION_API_KEY,
});

class RestoreBeforePolish {
  constructor() {
    this.notion = notion;
  }

  // 🔄 최종 정리 작업 전 상태로 복원
  async restoreBeforePolish() {
    try {
      console.log("🔄 최종 정리 작업 전 상태로 복원...");
      
      // 프로젝트 블록들 찾기
      const response = await this.notion.blocks.children.list({
        block_id: NOTION_PAGE_ID,
      });
      
      // 최근에 추가된 불필요한 블록들 삭제
      await this.cleanRecentChanges();
      
      // 원래 상태로 복원
      await this.restoreOriginalState();
      
      console.log("✅ 최종 정리 작업 전 상태로 복원 완료");
      
    } catch (error) {
      console.error("❌ 상태 복원 실패:", error.message);
    }
  }

  // 🧹 최근 변경사항 정리
  async cleanRecentChanges() {
    try {
      console.log("🧹 최근 변경사항 정리...");
      
      // 프로젝트 블록들 찾기
      const response = await this.notion.blocks.children.list({
        block_id: NOTION_PAGE_ID,
      });
      
      // 최근에 추가된 불필요한 블록들 찾기
      const recentBlocks = response.results.filter(block => 
        // 최근 추가된 연결 문구들
        (block.type === 'paragraph' && block.paragraph?.rich_text[0]?.text?.content?.includes('💡 다음으로는')) ||
        (block.type === 'paragraph' && block.paragraph?.rich_text[0]?.text?.content?.includes('🏥 개인 프로젝트로는')) ||
        (block.type === 'paragraph' && block.paragraph?.rich_text[0]?.text?.content?.includes('📝 그리고 개발하면서')) ||
        // 중복된 설명들
        (block.type === 'paragraph' && block.paragraph?.rich_text[0]?.text?.content?.includes('실시간 헬스케어 모니터링 시스템입니다')) ||
        (block.type === 'paragraph' && block.paragraph?.rich_text[0]?.text?.content?.includes('ESG 분석 대시보드입니다')) ||
        (block.type === 'paragraph' && block.paragraph?.rich_text[0]?.text?.content?.includes('병원 예약 시스템입니다')) ||
        (block.type === 'paragraph' && block.paragraph?.rich_text[0]?.text?.content?.includes('개발 학습 블로그입니다'))
      );
      
      // 최근 변경사항들 삭제
      for (const block of recentBlocks) {
        await this.notion.blocks.delete({
          block_id: block.id
        });
      }
      
      console.log(`✅ ${recentBlocks.length}개의 최근 변경사항 정리 완료`);
      
    } catch (error) {
      console.error("❌ 최근 변경사항 정리 실패:", error.message);
    }
  }

  // 🔄 원래 상태로 복원
  async restoreOriginalState() {
    try {
      console.log("🔄 원래 상태로 복원...");
      
      // 프로젝트별 원래 내용 복원
      const originalContent = {
        'GreenWear': {
          description: "실제로 ESP32를 사서 센서를 연결해보면서 만든 프로젝트예요. 심박수, 산소포화도, 체온을 실시간으로 측정하고 LED로 상태를 표시합니다. 웹 대시보드에서도 실시간으로 모니터링할 수 있어요.",
          techStack: "기술 스택: ESP32, Vue.js, React Native, Node.js, MySQL, AI 분석",
          duration: "개발 기간: 2024년 3월 - 2024년 6월",
          role: "담당 역할: 풀스택 개발자 (하드웨어 + 소프트웨어)",
          demo: "Live Demo: https://greenwear-demo.vercel.app/",
          github: "Source Code: https://github.com/saway126/greenwear"
        },
        'HRIM': {
          description: "한화 BEYOND SW 캠프에서 팀으로 개발한 ESG 분석 대시보드입니다. 환경, 사회, 지배구조 데이터를 시각화하고 분석할 수 있어요. Chart.js를 활용해서 다양한 그래프와 차트를 구현했습니다.",
          techStack: "기술 스택: Vue.js, Spring Boot, Chart.js, MySQL, Docker",
          duration: "개발 기간: 2024년 7월 - 2024년 8월",
          role: "담당 역할: 프론트엔드 개발자",
          demo: "Live Demo: https://www.imhr.kro.kr/login",
          github: "Source Code: https://github.com/beyond-sw-camp/be12-fin-HRIM-IMHR-FE"
        },
        'QueDoc': {
          description: "병원 예약을 더 편리하게 만들어보고 싶어서 시작한 프로젝트입니다. 사용자가 쉽게 병원을 찾고 예약할 수 있도록 UI/UX에 신경 썼어요. 대기열 현황도 실시간으로 확인할 수 있습니다.",
          techStack: "기술 스택: Vue.js, Spring Boot, MySQL, Redis, AWS",
          duration: "개발 기간: 2024년 1월 - 2024년 4월",
          role: "담당 역할: 풀스택 개발자",
          demo: "Live Demo: https://www.quedoc.kro.kr/",
          github: "Source Code: https://github.com/saway126/QueDoc"
        },
        '기술 블로그': {
          description: "개발하면서 배운 것들을 정리하고 공유하는 블로그입니다. Jekyll Chirpy 테마를 우주 돌고래 컨셉으로 커스터마이징했어요. 글래스모피즘 효과와 다크/라이트 테마 토글도 구현했습니다.",
          techStack: "기술 스택: Jekyll, Chirpy Theme, GitHub Pages, CSS, JavaScript",
          duration: "개발 기간: 2023년 12월 - 현재",
          role: "담당 역할: 개발자 & 블로거",
          demo: "Live Demo: https://saway126.github.io/",
          github: "Source Code: https://github.com/saway126/saway126.github.io"
        }
      };
      
      // 각 프로젝트의 원래 내용 복원
      for (const [projectName, content] of Object.entries(originalContent)) {
        await this.restoreProjectContent(projectName, content);
      }
      
      console.log("✅ 원래 상태로 복원 완료");
      
    } catch (error) {
      console.error("❌ 원래 상태 복원 실패:", error.message);
    }
  }

  // 🎯 개별 프로젝트 내용 복원
  async restoreProjectContent(projectName, content) {
    try {
      // 프로젝트 블록들 찾기
      const response = await this.notion.blocks.children.list({
        block_id: NOTION_PAGE_ID,
      });
      
      // 해당 프로젝트 제목 블록 찾기
      const projectTitleBlock = response.results.find(block => 
        block.type === 'heading_3' && 
        block.heading_3.rich_text[0]?.text?.content?.includes(projectName)
      );
      
      if (projectTitleBlock) {
        // 프로젝트 제목 다음에 있는 블록들 찾기
        const projectIndex = response.results.findIndex(block => block.id === projectTitleBlock.id);
        const projectBlocks = response.results.slice(projectIndex + 1, projectIndex + 20);
        
        // 기존 블록들 정리
        for (const block of projectBlocks) {
          if (block.type === 'paragraph' || block.type === 'bulleted_list_item') {
            await this.notion.blocks.delete({
              block_id: block.id
            });
          }
        }
        
        // 원래 내용으로 복원
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
                      content: content.description
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
                      content: content.techStack
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
                      content: content.duration
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
                      content: content.role
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
                      content: content.demo
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
                      content: content.github
                    }
                  }
                ]
              }
            }
          ]
        });
        
        console.log(`✅ ${projectName} 프로젝트 원래 내용 복원 완료`);
      }
      
    } catch (error) {
      console.error(`❌ ${projectName} 프로젝트 내용 복원 실패:`, error.message);
    }
  }

  // 🎯 전체 복원 실행
  async restoreAll() {
    console.log("🔄 최종 정리 작업 전 상태로 복원 시작...");
    
    await this.restoreBeforePolish();
    
    console.log("🎉 최종 정리 작업 전 상태로 복원 완료!");
    console.log("✨ 이제 원래 상태로 돌아갔습니다!");
  }
}

// 실행
const restorer = new RestoreBeforePolish();
restorer.restoreAll();
