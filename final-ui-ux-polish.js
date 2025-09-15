// 🎨 전체 디자인과 UI/UX 최종 정리
const { Client } = require('@notionhq/client');

const NOTION_API_KEY = process.env.NOTION_API_KEY || 'your-notion-api-key-here';
const NOTION_PAGE_ID = '2697705af35080d29bd3ec3447918eab';

const notion = new Client({
  auth: NOTION_API_KEY,
});

class FinalUIPolisher {
  constructor() {
    this.notion = notion;
  }

  // 🧹 전체적으로 깨지거나 부자연스러운 부분들 정리
  async polishOverallDesign() {
    try {
      console.log("🎨 전체 디자인과 UI/UX 최종 정리...");
      
      // 프로젝트 블록들 찾기
      const response = await this.notion.blocks.children.list({
        block_id: NOTION_PAGE_ID,
      });
      
      // 불필요한 블록들 정리
      await this.cleanUnnecessaryBlocks();
      
      // 일관된 간격과 구조 만들기
      await this.createConsistentSpacing();
      
      // 자연스러운 흐름 만들기
      await this.createNaturalFlow();
      
      console.log("✅ 전체 디자인과 UI/UX 최종 정리 완료");
      
    } catch (error) {
      console.error("❌ 전체 디자인 정리 실패:", error.message);
    }
  }

  // 🧹 불필요한 블록들 정리
  async cleanUnnecessaryBlocks() {
    try {
      console.log("🧹 불필요한 블록들 정리...");
      
      // 프로젝트 블록들 찾기
      const response = await this.notion.blocks.children.list({
        block_id: NOTION_PAGE_ID,
      });
      
      // 정리할 불필요한 블록들 찾기
      const unnecessaryBlocks = response.results.filter(block => 
        // 빈 문단
        (block.type === 'paragraph' && (!block.paragraph?.rich_text || block.paragraph.rich_text.length === 0)) ||
        // 중복된 설명
        (block.type === 'paragraph' && block.paragraph?.rich_text[0]?.text?.content?.includes('실제 동작하는')) ||
        // 불필요한 구분선
        (block.type === 'divider') ||
        // 중복된 링크 정보
        (block.type === 'bulleted_list_item' && block.bulleted_list_item?.rich_text[0]?.text?.content?.includes('🔗 실제'))
      );
      
      // 불필요한 블록들 삭제
      for (const block of unnecessaryBlocks) {
        await this.notion.blocks.delete({
          block_id: block.id
        });
      }
      
      console.log(`✅ ${unnecessaryBlocks.length}개의 불필요한 블록 정리 완료`);
      
    } catch (error) {
      console.error("❌ 불필요한 블록 정리 실패:", error.message);
    }
  }

  // 📏 일관된 간격과 구조 만들기
  async createConsistentSpacing() {
    try {
      console.log("📏 일관된 간격과 구조 만들기...");
      
      // 프로젝트 블록들 찾기
      const response = await this.notion.blocks.children.list({
        block_id: NOTION_PAGE_ID,
      });
      
      // 각 프로젝트 섹션에 일관된 구조 적용
      const projects = ['GreenWear', 'HRIM', 'QueDoc', '기술 블로그'];
      
      for (const project of projects) {
        await this.standardizeProjectStructure(project);
      }
      
      console.log("✅ 일관된 간격과 구조 만들기 완료");
      
    } catch (error) {
      console.error("❌ 일관된 구조 만들기 실패:", error.message);
    }
  }

  // 🎯 개별 프로젝트 구조 표준화
  async standardizeProjectStructure(projectName) {
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
        
        // 표준화된 구조로 재작성
        await this.createStandardProjectStructure(projectName);
      }
      
    } catch (error) {
      console.error(`❌ ${projectName} 프로젝트 구조 표준화 실패:`, error.message);
    }
  }

  // 🎯 표준화된 프로젝트 구조 생성
  async createStandardProjectStructure(projectName) {
    try {
      // 프로젝트별 표준화된 내용
      const standardContent = {
        'GreenWear': {
          description: "실시간 헬스케어 모니터링 시스템입니다. ESP32 센서로 심박수, 산소포화도, 체온을 측정하고 LED로 상태를 표시합니다. 웹 대시보드에서 실시간 모니터링이 가능해요.",
          techStack: "ESP32, Vue.js, React Native, Node.js, MySQL, AI 분석",
          period: "2024년 3월 - 2024년 6월",
          role: "풀스택 개발자 (하드웨어 + 소프트웨어)",
          demo: "https://greenwear-demo.vercel.app/",
          github: "https://github.com/saway126/greenwear"
        },
        'HRIM': {
          description: "ESG 분석 대시보드입니다. 환경, 사회, 지배구조 데이터를 시각화하고 분석할 수 있어요. Chart.js를 활용해서 다양한 그래프와 차트를 구현했습니다.",
          techStack: "Vue.js, Spring Boot, Chart.js, MySQL, Docker",
          period: "2024년 7월 - 2024년 8월",
          role: "프론트엔드 개발자",
          demo: "https://www.imhr.kro.kr/login",
          github: "https://github.com/beyond-sw-camp/be12-fin-HRIM-IMHR-FE"
        },
        'QueDoc': {
          description: "병원 예약 시스템입니다. 사용자가 쉽게 병원을 찾고 예약할 수 있도록 UI/UX에 신경 썼어요. 대기열 현황도 실시간으로 확인할 수 있습니다.",
          techStack: "Vue.js, Spring Boot, MySQL, Redis, AWS",
          period: "2024년 1월 - 2024년 4월",
          role: "풀스택 개발자",
          demo: "https://www.quedoc.kro.kr/",
          github: "https://github.com/saway126/QueDoc"
        },
        '기술 블로그': {
          description: "개발 학습 블로그입니다. Jekyll Chirpy 테마를 우주 돌고래 컨셉으로 커스터마이징했어요. 글래스모피즘 효과와 다크/라이트 테마 토글도 구현했습니다.",
          techStack: "Jekyll, Chirpy Theme, GitHub Pages, CSS, JavaScript",
          period: "2023년 12월 - 현재",
          role: "개발자 & 블로거",
          demo: "https://saway126.github.io/",
          github: "https://github.com/saway126/saway126.github.io"
        }
      };
      
      const content = standardContent[projectName];
      if (!content) return;
      
      // 표준화된 구조로 추가
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
                    content: `기술 스택: ${content.techStack}`
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
                    content: `개발 기간: ${content.period}`
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
                    content: `담당 역할: ${content.role}`
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
                    content: `Live Demo: ${content.demo}`
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
                    content: `Source Code: ${content.github}`
                  }
                }
              ]
            }
          }
        ]
      });
      
      console.log(`✅ ${projectName} 프로젝트 표준화된 구조 생성 완료`);
      
    } catch (error) {
      console.error(`❌ ${projectName} 표준화된 구조 생성 실패:`, error.message);
    }
  }

  // 🌊 자연스러운 흐름 만들기
  async createNaturalFlow() {
    try {
      console.log("🌊 자연스러운 흐름 만들기...");
      
      // 프로젝트 블록들 찾기
      const response = await this.notion.blocks.children.list({
        block_id: NOTION_PAGE_ID,
      });
      
      // 자연스러운 연결 문구들
      const flowTexts = [
        "💡 다음으로는 팀 프로젝트를 소개해드릴게요!",
        "🏥 개인 프로젝트로는 병원 예약 시스템을 만들어봤어요",
        "📝 그리고 개발하면서 배운 것들을 정리하는 블로그도 운영하고 있어요"
      ];
      
      // 각 전환점에 자연스러운 연결고리 추가
      for (let i = 0; i < flowTexts.length; i++) {
        await this.addFlowText(flowTexts[i]);
      }
      
      console.log("✅ 자연스러운 흐름 만들기 완료");
      
    } catch (error) {
      console.error("❌ 자연스러운 흐름 만들기 실패:", error.message);
    }
  }

  // 🎯 흐름 텍스트 추가
  async addFlowText(flowText) {
    try {
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
                    content: flowText
                  }
                }
              ]
            }
          }
        ]
      });
      
    } catch (error) {
      console.error("❌ 흐름 텍스트 추가 실패:", error.message);
    }
  }

  // 🎨 최종 UI/UX 정리
  async finalPolish() {
    console.log("🎨 최종 UI/UX 정리 시작...");
    
    await this.polishOverallDesign();
    
    console.log("🎉 최종 UI/UX 정리 완료!");
    console.log("✨ 이제 정말 깔끔하고 자연스러운 포트폴리오가 되었습니다!");
  }
}

// 실행
const polisher = new FinalUIPolisher();
polisher.finalPolish();
