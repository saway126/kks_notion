// 🧹 마크다운 문법 제거하고 깔끔한 일반 텍스트로 정리
const { Client } = require('@notionhq/client');

const NOTION_API_KEY = process.env.NOTION_API_KEY || 'your-notion-api-key-here';
const NOTION_PAGE_ID = '2697705af35080d29bd3ec3447918eab';

const notion = new Client({
  auth: NOTION_API_KEY,
});

class TextFormattingCleaner {
  constructor() {
    this.notion = notion;
  }

  // 🧹 마크다운 문법이 포함된 텍스트들을 깔끔하게 정리
  async cleanTextFormatting() {
    try {
      console.log("🧹 마크다운 문법 제거하고 깔끔한 텍스트로 정리...");
      
      // 프로젝트 블록들 찾기
      const response = await this.notion.blocks.children.list({
        block_id: NOTION_PAGE_ID,
      });
      
      // 마크다운 문법이 포함된 블록들 찾기
      const blocksWithMarkdown = response.results.filter(block => 
        (block.type === 'paragraph' && this.hasMarkdownSyntax(block.paragraph?.rich_text[0]?.text?.content)) ||
        (block.type === 'bulleted_list_item' && this.hasMarkdownSyntax(block.bulleted_list_item?.rich_text[0]?.text?.content)) ||
        (block.type === 'heading_3' && this.hasMarkdownSyntax(block.heading_3?.rich_text[0]?.text?.content))
      );
      
      console.log(`📄 ${blocksWithMarkdown.length}개의 마크다운 문법 블록 발견`);
      
      // 각 블록의 마크다운 문법 제거
      for (const block of blocksWithMarkdown) {
        await this.cleanBlockMarkdown(block);
      }
      
      console.log("✅ 마크다운 문법 제거 완료");
      
    } catch (error) {
      console.error("❌ 마크다운 문법 제거 실패:", error.message);
    }
  }

  // 🔍 마크다운 문법이 있는지 확인
  hasMarkdownSyntax(text) {
    if (!text) return false;
    return text.includes('**') || text.includes('*') || text.includes('##') || text.includes('###');
  }

  // 🧹 개별 블록의 마크다운 문법 제거
  async cleanBlockMarkdown(block) {
    try {
      let cleanText = '';
      
      if (block.type === 'paragraph') {
        cleanText = this.cleanText(block.paragraph?.rich_text[0]?.text?.content || '');
        
        await this.notion.blocks.update({
          block_id: block.id,
          paragraph: {
            rich_text: [
              {
                type: "text",
                text: {
                  content: cleanText
                }
              }
            ]
          }
        });
        
      } else if (block.type === 'bulleted_list_item') {
        cleanText = this.cleanText(block.bulleted_list_item?.rich_text[0]?.text?.content || '');
        
        await this.notion.blocks.update({
          block_id: block.id,
          bulleted_list_item: {
            rich_text: [
              {
                type: "text",
                text: {
                  content: cleanText
                }
              }
            ]
          }
        });
        
      } else if (block.type === 'heading_3') {
        cleanText = this.cleanText(block.heading_3?.rich_text[0]?.text?.content || '');
        
        await this.notion.blocks.update({
          block_id: block.id,
          heading_3: {
            rich_text: [
              {
                type: "text",
                text: {
                  content: cleanText
                }
              }
            ]
          }
        });
      }
      
      console.log(`✅ 블록 정리 완료: ${cleanText.substring(0, 50)}...`);
      
    } catch (error) {
      console.error("❌ 블록 정리 실패:", error.message);
    }
  }

  // 🧹 텍스트에서 마크다운 문법 제거
  cleanText(text) {
    if (!text) return '';
    
    // **텍스트** → 텍스트
    text = text.replace(/\*\*(.*?)\*\*/g, '$1');
    
    // *텍스트* → 텍스트  
    text = text.replace(/\*(.*?)\*/g, '$1');
    
    // ## 제목 → 제목
    text = text.replace(/##\s*/g, '');
    
    // ### 제목 → 제목
    text = text.replace(/###\s*/g, '');
    
    // 불필요한 공백 정리
    text = text.replace(/\s+/g, ' ').trim();
    
    return text;
  }

  // 🎨 프로젝트 설명들을 자연스럽게 재작성
  async rewriteProjectDescriptions() {
    try {
      console.log("🎨 프로젝트 설명들을 자연스럽게 재작성...");
      
      // 자연스러운 프로젝트 설명들
      const naturalDescriptions = {
        'GreenWear': {
          title: "GreenWear",
          description: "실제로 ESP32를 사서 센서를 연결해보면서 만든 프로젝트예요. 심박수, 산소포화도, 체온을 실시간으로 측정하고 LED로 상태를 표시합니다. 웹 대시보드에서도 실시간으로 모니터링할 수 있어요.",
          techStack: "기술 스택: ESP32, Vue.js, React Native, Node.js, MySQL, AI 분석",
          duration: "개발 기간: 2024년 3월 - 2024년 6월",
          role: "담당 역할: 풀스택 개발자 (하드웨어 + 소프트웨어)",
          demo: "Live Demo: https://greenwear-demo.vercel.app/",
          github: "Source Code: https://github.com/saway126/greenwear"
        },
        'HRIM': {
          title: "HRIM",
          description: "한화 BEYOND SW 캠프에서 팀으로 개발한 ESG 분석 대시보드입니다. 환경, 사회, 지배구조 데이터를 시각화하고 분석할 수 있어요. Chart.js를 활용해서 다양한 그래프와 차트를 구현했습니다.",
          techStack: "기술 스택: Vue.js, Spring Boot, Chart.js, MySQL, Docker",
          duration: "개발 기간: 2024년 7월 - 2024년 8월",
          role: "담당 역할: 프론트엔드 개발자",
          demo: "Live Demo: https://www.imhr.kro.kr/login",
          github: "Source Code: https://github.com/beyond-sw-camp/be12-fin-HRIM-IMHR-FE"
        },
        'QueDoc': {
          title: "QueDoc",
          description: "병원 예약을 더 편리하게 만들어보고 싶어서 시작한 프로젝트입니다. 사용자가 쉽게 병원을 찾고 예약할 수 있도록 UI/UX에 신경 썼어요. 대기열 현황도 실시간으로 확인할 수 있습니다.",
          techStack: "기술 스택: Vue.js, Spring Boot, MySQL, Redis, AWS",
          duration: "개발 기간: 2024년 1월 - 2024년 4월",
          role: "담당 역할: 풀스택 개발자",
          demo: "Live Demo: https://www.quedoc.kro.kr/",
          github: "Source Code: https://github.com/saway126/QueDoc"
        },
        '기술 블로그': {
          title: "기술 블로그",
          description: "개발하면서 배운 것들을 정리하고 공유하는 블로그입니다. Jekyll Chirpy 테마를 우주 돌고래 컨셉으로 커스터마이징했어요. 글래스모피즘 효과와 다크/라이트 테마 토글도 구현했습니다.",
          techStack: "기술 스택: Jekyll, Chirpy Theme, GitHub Pages, CSS, JavaScript",
          duration: "개발 기간: 2023년 12월 - 현재",
          role: "담당 역할: 개발자 & 블로거",
          demo: "Live Demo: https://saway126.github.io/",
          github: "Source Code: https://github.com/saway126/saway126.github.io"
        }
      };
      
      // 각 프로젝트의 설명을 자연스럽게 재작성
      for (const [projectName, content] of Object.entries(naturalDescriptions)) {
        await this.rewriteProjectDescription(projectName, content);
      }
      
      console.log("✅ 프로젝트 설명들 자연스럽게 재작성 완료");
      
    } catch (error) {
      console.error("❌ 프로젝트 설명 재작성 실패:", error.message);
    }
  }

  // 🎯 개별 프로젝트 설명 재작성
  async rewriteProjectDescription(projectName, content) {
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
        const projectBlocks = response.results.slice(projectIndex + 1, projectIndex + 15);
        
        // 기존 설명 블록들 삭제
        for (const block of projectBlocks) {
          if (block.type === 'paragraph' || block.type === 'bulleted_list_item') {
            await this.notion.blocks.delete({
              block_id: block.id
            });
          }
        }
        
        // 새로운 자연스러운 설명 추가
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
        
        console.log(`✅ ${projectName} 프로젝트 설명 자연스럽게 재작성 완료`);
      }
      
    } catch (error) {
      console.error(`❌ ${projectName} 프로젝트 설명 재작성 실패:`, error.message);
    }
  }

  // 🎯 전체 텍스트 정리 실행
  async cleanAllText() {
    console.log("🧹 전체 텍스트 정리 시작...");
    
    await this.cleanTextFormatting();
    await this.rewriteProjectDescriptions();
    
    console.log("🎉 전체 텍스트 정리 완료!");
    console.log("✨ 이제 마크다운 문법 없이 깔끔한 일반 텍스트로 정리되었습니다!");
  }
}

// 실행
const cleaner = new TextFormattingCleaner();
cleaner.cleanAllText();
