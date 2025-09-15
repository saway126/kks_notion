// 🔗 프로젝트별 데모 사이트와 GitHub 레포지토리 링크 추가
const { Client } = require('@notionhq/client');

const NOTION_API_KEY = process.env.NOTION_API_KEY || 'your-notion-api-key-here';
const NOTION_PAGE_ID = '2697705af35080d29bd3ec3447918eab';

const notion = new Client({
  auth: NOTION_API_KEY,
});

class ProjectLinksAdder {
  constructor() {
    this.notion = notion;
  }

  // 🔗 프로젝트별 데모 사이트와 GitHub 링크 추가
  async addProjectLinks() {
    try {
      console.log("🔗 프로젝트별 데모 사이트와 GitHub 링크 추가...");
      
      // 프로젝트별 링크 정보
      const projectLinks = {
        'GreenWear': {
          demo: 'https://greenwear-demo.vercel.app/',
          github: 'https://github.com/saway126/greenwear',
          techStack: 'ESP32, Vue.js, React Native, Node.js, MySQL, AI 분석',
          duration: '2024.03 - 2024.06',
          role: '풀스택 개발자'
        },
        'HRIM': {
          demo: 'https://www.imhr.kro.kr/login',
          github: 'https://github.com/beyond-sw-camp/be12-fin-HRIM-IMHR-FE',
          techStack: 'Vue.js, Spring Boot, Chart.js, MySQL, Docker',
          duration: '2024.07 - 2024.08',
          role: '프론트엔드 개발자'
        },
        'QueDoc': {
          demo: 'https://www.quedoc.kro.kr/',
          github: 'https://github.com/saway126/QueDoc',
          techStack: 'Vue.js, Spring Boot, MySQL, Redis, AWS',
          duration: '2024.01 - 2024.04',
          role: '풀스택 개발자'
        },
        '기술 블로그': {
          demo: 'https://saway126.github.io/',
          github: 'https://github.com/saway126/saway126.github.io',
          techStack: 'Jekyll, Chirpy Theme, GitHub Pages, CSS, JavaScript',
          duration: '2023.12 - 현재',
          role: '개발자 & 블로거'
        }
      };
      
      // 각 프로젝트에 링크 정보 추가
      for (const [projectName, links] of Object.entries(projectLinks)) {
        await this.addLinksToProject(projectName, links);
      }
      
      console.log("✅ 프로젝트별 데모 사이트와 GitHub 링크 추가 완료");
      
    } catch (error) {
      console.error("❌ 프로젝트 링크 추가 실패:", error.message);
    }
  }

  // 🎯 개별 프로젝트에 링크 정보 추가
  async addLinksToProject(projectName, links) {
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
        // 프로젝트 제목 다음에 링크 정보 추가
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
                      content: `기술 스택: ${links.techStack}`
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
                      content: `개발 기간: ${links.duration}`
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
                      content: `담당 역할: ${links.role}`
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
                      content: `🌐 Live Demo: `,
                      link: {
                        url: links.demo
                      }
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
                      content: `💻 Source Code: `,
                      link: {
                        url: links.github
                      }
                    }
                  }
                ]
              }
            }
          ]
        });
        
        console.log(`✅ ${projectName} 프로젝트 링크 정보 추가 완료`);
      }
      
    } catch (error) {
      console.error(`❌ ${projectName} 프로젝트 링크 추가 실패:`, error.message);
    }
  }

  // 🎯 전체 링크 추가 실행
  async addAllLinks() {
    console.log("🔗 프로젝트별 데모 사이트와 GitHub 링크 추가 시작...");
    
    await this.addProjectLinks();
    
    console.log("🎉 프로젝트별 데모 사이트와 GitHub 링크 추가 완료!");
    console.log("✨ 이제 각 프로젝트에서 데모 사이트와 GitHub로 바로 갈 수 있습니다!");
  }
}

// 실행
const adder = new ProjectLinksAdder();
adder.addAllLinks();
