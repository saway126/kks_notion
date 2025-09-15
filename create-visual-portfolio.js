// 🎨 진짜 포트폴리오처럼 시각적으로 정리
const { Client } = require('@notionhq/client');

const NOTION_API_KEY = process.env.NOTION_API_KEY || 'your-notion-api-key-here';
const NOTION_PAGE_ID = '2697705af35080d29bd3ec3447918eab';

const notion = new Client({
  auth: NOTION_API_KEY,
});

class VisualPortfolioCreator {
  constructor() {
    this.notion = notion;
  }

  // 🎯 프로젝트 섹션을 완전히 새로 구성
  async recreateProjectSection() {
    try {
      console.log("🎨 프로젝트 섹션 완전 재구성 시작...");
      
      // 기존 프로젝트 관련 블록들 찾기
      const response = await this.notion.blocks.children.list({
        block_id: NOTION_PAGE_ID,
      });
      
      // 프로젝트 관련 블록들 찾기 (제목부터 마지막 프로젝트까지)
      let projectStartIndex = -1;
      let projectEndIndex = -1;
      
      response.results.forEach((block, index) => {
        if (block.type === 'heading_3' && 
            block.heading_3.rich_text[0]?.text?.content?.includes('Projects')) {
          projectStartIndex = index;
        }
        if (block.type === 'bulleted_list_item' && 
            block.bulleted_list_item.rich_text[0]?.text?.content?.includes('블로그')) {
          projectEndIndex = index;
        }
      });
      
      if (projectStartIndex === -1 || projectEndIndex === -1) {
        console.log("❌ 프로젝트 섹션을 찾을 수 없습니다.");
        return;
      }
      
      console.log(`📄 프로젝트 섹션: ${projectStartIndex + 1}번째 ~ ${projectEndIndex + 1}번째 블록`);
      
      // 기존 프로젝트 블록들 삭제
      const blocksToDelete = response.results.slice(projectStartIndex, projectEndIndex + 1);
      
      for (const block of blocksToDelete) {
        try {
          await this.notion.blocks.delete({
            block_id: block.id,
          });
          console.log(`✅ ${block.type} 블록 삭제 완료`);
        } catch (error) {
          console.log(`⚠️ 블록 삭제 실패: ${error.message}`);
        }
      }
      
      // 새로운 프로젝트 섹션 생성
      await this.createNewProjectSection();
      
      console.log("🎉 프로젝트 섹션 완전 재구성 완료!");
      
    } catch (error) {
      console.error("❌ 프로젝트 섹션 재구성 실패:", error.message);
    }
  }

  // 🎯 새로운 프로젝트 섹션 생성
  async createNewProjectSection() {
    try {
      console.log("🎨 새로운 프로젝트 섹션 생성...");
      
      // 새로운 프로젝트 섹션 추가
      await this.notion.blocks.children.append({
        block_id: NOTION_PAGE_ID,
        children: [
          {
            type: "heading_2",
            heading_2: {
              rich_text: [
                {
                  type: "text",
                  text: {
                    content: "🚀 Featured Projects"
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
                    content: "제가 직접 개발한 대표 프로젝트들을 소개합니다. 각 프로젝트는 사용자 중심의 설계와 최신 기술 스택을 활용해 구현했습니다."
                  }
                }
              ]
            }
          },
          {
            type: "divider",
            divider: {}
          }
        ]
      });
      
      // GreenWear 프로젝트 카드
      await this.createProjectCard({
        title: "🌱 GreenWear",
        subtitle: "스마트 웨어러블 헬스케어 플랫폼",
        description: "완전한 풀스택 프로젝트로, ESP32 하드웨어부터 Vue.js 웹앱, React Native 모바일앱, Node.js 백엔드, AI 분석까지 모든 것을 직접 구현했습니다.",
        techStack: "ESP32, Vue.js, React Native, Node.js, AI/ML, AWS",
        period: "2024.03 - 현재",
        role: "풀스택 개발자",
        demoUrl: "https://greenwear-demo.vercel.app/",
        githubUrl: "https://github.com/saway126/greenwear",
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop"
      });
      
      // QueDoc 프로젝트 카드
      await this.createProjectCard({
        title: "🏥 QueDoc",
        subtitle: "병원 예약 시스템",
        description: "사용자 경험을 중시한 웹 애플리케이션으로, Vue.js와 Spring Boot를 활용해 직관적이고 안정적인 예약 시스템을 만들었습니다.",
        techStack: "Vue.js, Spring Boot, MySQL, JPA",
        period: "2024.01 - 2024.02",
        role: "프론트엔드 개발자",
        demoUrl: null,
        githubUrl: "https://github.com/saway126/QueDoc",
        imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=400&fit=crop"
      });
      
      // HRIM 프로젝트 카드
      await this.createProjectCard({
        title: "📊 HRIM",
        subtitle: "ESG 분석 대시보드",
        description: "Hanwha BEYOND SW Camp 최종 프로젝트로, 연도와 회사에 따라 동적으로 변하는 ESG 지표를 시각화하는 대시보드를 개발했습니다.",
        techStack: "Vue.js, Spring Boot, MariaDB, Chart.js",
        period: "2024.06 - 2024.08",
        role: "팀 리더, 풀스택 개발자",
        demoUrl: null,
        githubUrl: "https://github.com/beyond-sw-camp/be12-fin-HRIM-IMHR-FE",
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop"
      });
      
      // 블로그 프로젝트 카드
      await this.createProjectCard({
        title: "✍️ 기술 블로그",
        subtitle: "개발 경험과 학습 기록",
        description: "개발 과정에서 배운 것들을 정리하고 공유하는 블로그입니다. Jekyll과 GitHub Pages를 활용해 구축했습니다.",
        techStack: "Jekyll, Liquid, CSS, JavaScript, GitHub Pages",
        period: "2023.12 - 현재",
        role: "콘텐츠 작성, 사이트 관리",
        demoUrl: "https://saway126.github.io/",
        githubUrl: "https://github.com/saway126/saway126.github.io",
        imageUrl: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=400&fit=crop"
      });
      
      console.log("✅ 새로운 프로젝트 섹션 생성 완료!");
      
    } catch (error) {
      console.error("❌ 새로운 프로젝트 섹션 생성 실패:", error.message);
    }
  }

  // 🎯 개별 프로젝트 카드 생성
  async createProjectCard(project) {
    try {
      await this.notion.blocks.children.append({
        block_id: NOTION_PAGE_ID,
        children: [
          {
            type: "heading_3",
            heading_3: {
              rich_text: [
                {
                  type: "text",
                  text: {
                    content: project.title
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
                    content: `**${project.subtitle}**`
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
                    content: project.description
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
                    content: `**기술 스택**: ${project.techStack}`
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
                    content: `**개발 기간**: ${project.period}`
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
                    content: `**담당 역할**: ${project.role}`
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
                    content: project.demoUrl ? 
                      `🔗 **Demo**: ${project.demoUrl}` : 
                      "🔗 **Demo**: 준비 중"
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
                    content: `📁 **GitHub**: ${project.githubUrl}`
                  }
                }
              ]
            }
          },
          {
            type: "divider",
            divider: {}
          }
        ]
      });
      
    } catch (error) {
      console.error(`❌ ${project.title} 카드 생성 실패:`, error.message);
    }
  }

  // 🎯 전체 시각적 포트폴리오 생성
  async createVisualPortfolio() {
    console.log("🎨 시각적 포트폴리오 생성 시작...");
    
    await this.recreateProjectSection();
    
    console.log("🎉 시각적 포트폴리오 생성 완료!");
    console.log("✨ 이제 진짜 포트폴리오처럼 보입니다!");
  }
}

// 실행
const creator = new VisualPortfolioCreator();
creator.createVisualPortfolio();
