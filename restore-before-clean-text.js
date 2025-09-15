// 🔄 마지막 정리 작업 전 상태로 복원
const { Client } = require('@notionhq/client');

const NOTION_API_KEY = process.env.NOTION_API_KEY || 'your-notion-api-key-here';
const NOTION_PAGE_ID = '2697705af35080d29bd3ec3447918eab';

const notion = new Client({
  auth: NOTION_API_KEY,
});

class RestoreBeforeCleanText {
  constructor() {
    this.notion = notion;
  }

  // 🔄 마지막 정리 작업 전 상태로 복원
  async restoreBeforeCleanText() {
    try {
      console.log("🔄 마지막 정리 작업 전 상태로 복원...");
      
      // 프로젝트 블록들 찾기
      const response = await this.notion.blocks.children.list({
        block_id: NOTION_PAGE_ID,
      });
      
      // 최근 변경사항들 정리
      await this.cleanRecentChanges();
      
      // 원래 상태로 복원
      await this.restoreOriginalState();
      
      console.log("✅ 마지막 정리 작업 전 상태로 복원 완료");
      
    } catch (error) {
      console.error("❌ 상태 복원 실패:", error.message);
    }
  }

  // 🧹 최근 변경사항들 정리
  async cleanRecentChanges() {
    try {
      console.log("🧹 최근 변경사항들 정리...");
      
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
        (block.type === 'paragraph' && block.paragraph?.rich_text[0]?.text?.content?.includes('실제로 ESP32를 사서')) ||
        (block.type === 'paragraph' && block.paragraph?.rich_text[0]?.text?.content?.includes('한화 BEYOND SW 캠프에서')) ||
        (block.type === 'paragraph' && block.paragraph?.rich_text[0]?.text?.content?.includes('병원 예약을 더 편리하게')) ||
        (block.type === 'paragraph' && block.paragraph?.rich_text[0]?.text?.content?.includes('개발하면서 배운 것들을')) ||
        // 중복된 기술 스택 정보들
        (block.type === 'bulleted_list_item' && block.bulleted_list_item?.rich_text[0]?.text?.content?.includes('기술 스택: ESP32')) ||
        (block.type === 'bulleted_list_item' && block.bulleted_list_item?.rich_text[0]?.text?.content?.includes('기술 스택: Vue.js')) ||
        (block.type === 'bulleted_list_item' && block.bulleted_list_item?.rich_text[0]?.text?.content?.includes('기술 스택: Jekyll'))
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
      
      // 프로젝트별 원래 내용 복원 (마지막 정리 전 상태)
      const originalContent = {
        'GreenWear': {
          title: "**GreenWear - 스마트웨어 헬스케어**",
          description: "실제로 ESP32와 웨어러블 센서를 연결해서 만든 프로젝트예요. 심박수, 산소포화도, 체온을 실시간으로 측정하고 LED로 상태를 표시합니다. 웹 대시보드에서도 실시간으로 모니터링할 수 있어요.",
          techStack: "**기술 스택**: ESP32, Vue.js, React Native, Node.js, MySQL, AI 분석",
          duration: "**개발 기간**: 2024년 3월 - 2024년 6월",
          role: "**담당 역할**: 풀스택 개발자 (하드웨어 + 소프트웨어)",
          demo: "**Live Demo**: https://greenwear-demo.vercel.app/",
          github: "**Source Code**: https://github.com/saway126/greenwear",
          story: "💡 **개발 스토리**: 실제로 ESP32를 사서 센서를 연결해보면서 하드웨어 개발의 재미를 느꼈어요! 처음에는 전자부품도 잘 몰랐는데, 하나씩 연결해보면서 동작하는 걸 보니 정말 신기했어요.",
          challenge: "🔧 **기술적 도전**: 하드웨어와 소프트웨어를 연결하는 것이 가장 어려웠어요. ESP32에서 데이터를 보내고 웹에서 받아서 처리하는 과정에서 많은 시행착오가 있었습니다."
        },
        'HRIM': {
          title: "**HRIM - ESG 분석 대시보드**",
          description: "한화 BEYOND SW 캠프에서 팀으로 개발한 ESG 분석 대시보드입니다. 환경, 사회, 지배구조 데이터를 시각화하고 분석할 수 있어요. Chart.js를 활용해서 다양한 그래프와 차트를 구현했습니다.",
          techStack: "**기술 스택**: Vue.js, Spring Boot, Chart.js, MySQL, Docker",
          duration: "**개발 기간**: 2024년 7월 - 2024년 8월",
          role: "**담당 역할**: 프론트엔드 개발자",
          demo: "**Live Demo**: https://www.imhr.kro.kr/login",
          github: "**Source Code**: https://github.com/beyond-sw-camp/be12-fin-HRIM-IMHR-FE",
          story: "💡 **팀 협업**: 한화 BEYOND SW 캠프에서 팀원들과 함께 개발하면서 협업의 중요성을 배웠습니다. 프론트엔드 담당으로 Chart.js를 활용해서 데이터 시각화에 집중했어요.",
          challenge: "📊 **데이터 시각화**: Chart.js를 활용해서 ESG 데이터를 직관적으로 표현하는 것에 집중했어요. 사용자가 한눈에 이해할 수 있도록 다양한 차트 타입을 활용했습니다."
        },
        'QueDoc': {
          title: "**QueDoc - 병원 예약 시스템**",
          description: "병원 예약을 더 편리하게 만들어보고 싶어서 시작한 프로젝트입니다. 사용자가 쉽게 병원을 찾고 예약할 수 있도록 UI/UX에 신경 썼어요. 대기열 현황도 실시간으로 확인할 수 있습니다.",
          techStack: "**기술 스택**: Vue.js, Spring Boot, MySQL, Redis, AWS",
          duration: "**개발 기간**: 2024년 1월 - 2024년 4월",
          role: "**담당 역할**: 풀스택 개발자",
          demo: "**Live Demo**: https://www.quedoc.kro.kr/",
          github: "**Source Code**: https://github.com/saway126/QueDoc",
          story: "💡 **문제 해결**: 병원 예약의 불편함을 직접 경험해서 더 나은 서비스를 만들고 싶었어요. 사용자 입장에서 생각해보니 예약 과정이 너무 복잡했거든요.",
          challenge: "🏥 **사용자 경험**: 병원 예약 과정을 단순화하고 사용자가 쉽게 이해할 수 있도록 UI/UX를 설계했어요. 대기열 현황도 실시간으로 보여주는 것이 핵심이었습니다."
        },
        '기술 블로그': {
          title: "**기술 블로그 - 71_stars**",
          description: "개발하면서 배운 것들을 정리하고 공유하는 블로그입니다. Jekyll Chirpy 테마를 우주 돌고래 컨셉으로 커스터마이징했어요. 글래스모피즘 효과와 다크/라이트 테마 토글도 구현했습니다.",
          techStack: "**기술 스택**: Jekyll, Chirpy Theme, GitHub Pages, CSS, JavaScript",
          duration: "**개발 기간**: 2023년 12월 - 현재",
          role: "**담당 역할**: 개발자 & 블로거",
          demo: "**Live Demo**: https://saway126.github.io/",
          github: "**Source Code**: https://github.com/saway126/saway126.github.io",
          story: "💡 **학습 기록**: 개발하면서 배운 것들을 정리하고 공유하는 것이 가장 큰 보람이에요! Jekyll 테마를 커스터마이징하면서 CSS와 JavaScript도 많이 배웠습니다.",
          challenge: "🎨 **디자인 커스터마이징**: Jekyll Chirpy 테마를 우주 돌고래 컨셉으로 완전히 바꿔봤어요. 글래스모피즘 효과와 다크/라이트 테마 토글도 직접 구현했습니다."
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
            },
            {
              type: "paragraph",
              paragraph: {
                rich_text: [
                  {
                    type: "text",
                    text: {
                      content: content.story
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
                      content: content.challenge
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
    console.log("🔄 마지막 정리 작업 전 상태로 복원 시작...");
    
    await this.restoreBeforeCleanText();
    
    console.log("🎉 마지막 정리 작업 전 상태로 복원 완료!");
    console.log("✨ 이제 원래의 자연스럽고 개인적인 상태로 돌아갔습니다!");
  }
}

// 실행
const restorer = new RestoreBeforeCleanText();
restorer.restoreAll();
