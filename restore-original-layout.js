// 🔄 원래 레이아웃 완전 복원 - 각 프로젝트별 설명과 구분선 복원
const { Client } = require('@notionhq/client');

const NOTION_API_KEY = process.env.NOTION_API_KEY || 'your-notion-api-key-here';
const NOTION_PAGE_ID = '2697705af35080d29bd3ec3447918eab';

const notion = new Client({
  auth: NOTION_API_KEY,
});

class OriginalLayoutRestorer {
  constructor() {
    this.notion = notion;
  }

  // 🔄 원래 레이아웃 완전 복원
  async restoreOriginalLayout() {
    try {
      console.log("🔄 원래 레이아웃 완전 복원...");
      
      // 프로젝트 블록들 찾기
      const response = await this.notion.blocks.children.list({
        block_id: NOTION_PAGE_ID,
      });
      
      // 현재 프로젝트 섹션들 정리
      await this.cleanCurrentProjectSections();
      
      // 원래 레이아웃으로 복원
      await this.restoreOriginalProjectLayout();
      
      console.log("✅ 원래 레이아웃 완전 복원 완료");
      
    } catch (error) {
      console.error("❌ 원래 레이아웃 복원 실패:", error.message);
    }
  }

  // 🧹 현재 프로젝트 섹션들 정리
  async cleanCurrentProjectSections() {
    try {
      console.log("🧹 현재 프로젝트 섹션들 정리...");
      
      // 프로젝트 블록들 찾기
      const response = await this.notion.blocks.children.list({
        block_id: NOTION_PAGE_ID,
      });
      
      // Featured Projects 섹션 찾기
      const featuredProjectsBlock = response.results.find(block => 
        block.type === 'heading_2' && 
        block.heading_2.rich_text[0]?.text?.content?.includes('Featured Projects')
      );
      
      if (featuredProjectsBlock) {
        // Featured Projects 다음에 있는 모든 블록들 찾기
        const featuredIndex = response.results.findIndex(block => block.id === featuredProjectsBlock.id);
        const projectBlocks = response.results.slice(featuredIndex + 1);
        
        // 프로젝트 관련 블록들 삭제
        for (const block of projectBlocks) {
          if (block.type === 'heading_3' || 
              block.type === 'paragraph' || 
              block.type === 'bulleted_list_item' ||
              block.type === 'image') {
            await this.notion.blocks.delete({
              block_id: block.id
            });
          }
        }
        
        console.log("✅ 현재 프로젝트 섹션들 정리 완료");
      }
      
    } catch (error) {
      console.error("❌ 현재 프로젝트 섹션 정리 실패:", error.message);
    }
  }

  // 🎯 원래 프로젝트 레이아웃 복원
  async restoreOriginalProjectLayout() {
    try {
      console.log("🎯 원래 프로젝트 레이아웃 복원...");
      
      // 원래 프로젝트 레이아웃 구조
      const originalProjects = [
        {
          title: "GreenWear",
          subtitle: "스마트 웨어러블 헬스케어 플랫폼",
          description: "실시간 건강 데이터 수집 및 AI 분석을 통한 웨어러블 헬스케어 솔루션입니다. ESP32 기반 하드웨어와 Vue.js 웹 애플리케이션, React Native 모바일 앱을 통합한 풀스택 프로젝트입니다.",
          image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=300&fit=crop&auto=format",
          techStack: "ESP32, Vue.js, React Native, Node.js, MySQL, AI 분석",
          duration: "2024.03 - 2024.06",
          role: "풀스택 개발자",
          demo: "https://greenwear-demo.vercel.app/",
          github: "https://github.com/saway126/greenwear"
        },
        {
          title: "HRIM",
          subtitle: "ESG 분석 대시보드",
          description: "Hanwha BEYOND SW Camp에서 개발한 ESG 분석 대시보드입니다. 환경, 사회, 지배구조 데이터를 시각화하고 분석할 수 있는 웹 애플리케이션입니다.",
          image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=300&fit=crop&auto=format",
          techStack: "Vue.js, Spring Boot, Chart.js, MySQL, Docker",
          duration: "2024.07 - 2024.08",
          role: "프론트엔드 개발자",
          demo: "https://www.imhr.kro.kr/login",
          github: "https://github.com/beyond-sw-camp/be12-fin-HRIM-IMHR-FE"
        },
        {
          title: "QueDoc",
          subtitle: "병원 예약 시스템",
          description: "병원 예약을 더 편리하게 만들어보고 싶어서 시작한 프로젝트입니다. 사용자가 쉽게 병원을 찾고 예약할 수 있도록 UI/UX에 신경 썼어요.",
          image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=300&fit=crop&auto=format",
          techStack: "Vue.js, Spring Boot, MySQL, Redis, AWS",
          duration: "2024.01 - 2024.04",
          role: "풀스택 개발자",
          demo: "https://www.quedoc.kro.kr/",
          github: "https://github.com/saway126/QueDoc"
        },
        {
          title: "기술 블로그",
          subtitle: "71_stars 개발 블로그",
          description: "개발하면서 배운 것들을 정리하고 공유하는 블로그입니다. Jekyll Chirpy 테마를 우주 돌고래 컨셉으로 커스터마이징했어요.",
          image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&h=300&fit=crop&auto=format",
          techStack: "Jekyll, Chirpy Theme, GitHub Pages, CSS, JavaScript",
          duration: "2023.12 - 현재",
          role: "개발자 & 블로거",
          demo: "https://saway126.github.io/",
          github: "https://github.com/saway126/saway126.github.io"
        }
      ];
      
      // 각 프로젝트를 원래 레이아웃으로 복원
      for (const project of originalProjects) {
        await this.createProjectSection(project);
      }
      
      console.log("✅ 원래 프로젝트 레이아웃 복원 완료");
      
    } catch (error) {
      console.error("❌ 원래 프로젝트 레이아웃 복원 실패:", error.message);
    }
  }

  // 🎯 개별 프로젝트 섹션 생성
  async createProjectSection(project) {
    try {
      // 프로젝트 섹션 생성
      await this.notion.blocks.children.append({
        block_id: NOTION_PAGE_ID,
        children: [
          // 구분선
          {
            type: "divider"
          },
          // 프로젝트 제목
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
          // 프로젝트 부제목
          {
            type: "paragraph",
            paragraph: {
              rich_text: [
                {
                  type: "text",
                  text: {
                    content: project.subtitle
                  }
                }
              ]
            }
          },
          // 프로젝트 이미지
          {
            type: "image",
            image: {
              type: "external",
              external: {
                url: project.image
              }
            }
          },
          // 프로젝트 설명
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
          // 기술 스택
          {
            type: "bulleted_list_item",
            bulleted_list_item: {
              rich_text: [
                {
                  type: "text",
                  text: {
                    content: `기술 스택: ${project.techStack}`
                  }
                }
              ]
            }
          },
          // 개발 기간
          {
            type: "bulleted_list_item",
            bulleted_list_item: {
              rich_text: [
                {
                  type: "text",
                  text: {
                    content: `개발 기간: ${project.duration}`
                  }
                }
              ]
            }
          },
          // 담당 역할
          {
            type: "bulleted_list_item",
            bulleted_list_item: {
              rich_text: [
                {
                  type: "text",
                  text: {
                    content: `담당 역할: ${project.role}`
                  }
                }
              ]
            }
          },
          // Live Demo
          {
            type: "bulleted_list_item",
            bulleted_list_item: {
              rich_text: [
                {
                  type: "text",
                  text: {
                    content: `Live Demo: ${project.demo}`
                  }
                }
              ]
            }
          },
          // Source Code
          {
            type: "bulleted_list_item",
            bulleted_list_item: {
              rich_text: [
                {
                  type: "text",
                  text: {
                    content: `Source Code: ${project.github}`
                  }
                }
              ]
            }
          }
        ]
      });
      
      console.log(`✅ ${project.title} 프로젝트 섹션 생성 완료`);
      
    } catch (error) {
      console.error(`❌ ${project.title} 프로젝트 섹션 생성 실패:`, error.message);
    }
  }

  // 🎯 전체 복원 실행
  async restoreAll() {
    console.log("🔄 원래 레이아웃 완전 복원 시작...");
    
    await this.restoreOriginalLayout();
    
    console.log("🎉 원래 레이아웃 완전 복원 완료!");
    console.log("✨ 이제 원래의 각 프로젝트별 설명과 구분선이 모두 복원되었습니다!");
  }
}

// 실행
const restorer = new OriginalLayoutRestorer();
restorer.restoreAll();
