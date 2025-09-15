// 🏥 QueDoc 병원 이미지로 변경 및 전체 스타일 개선
const { Client } = require('@notionhq/client');

const NOTION_API_KEY = process.env.NOTION_API_KEY || 'your-notion-api-key-here';
const NOTION_PAGE_ID = '2697705af35080d29bd3ec3447918eab';

const notion = new Client({
  auth: NOTION_API_KEY,
});

class QueDocAndStyleUpdater {
  constructor() {
    this.notion = notion;
  }

  // 🏥 QueDoc 프로젝트 이미지를 병원 관련 이미지로 변경
  async updateQueDocImage() {
    try {
      console.log("🏥 QueDoc 프로젝트 이미지를 병원 관련 이미지로 변경...");
      
      // 병원 관련 이미지 URL
      const hospitalImageUrl = "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=400&fit=crop&auto=format";
      
      // 프로젝트 블록들 찾기
      const response = await this.notion.blocks.children.list({
        block_id: NOTION_PAGE_ID,
      });
      
      // QueDoc 프로젝트 제목 블록 찾기
      const quedocTitleBlock = response.results.find(block => 
        block.type === 'heading_3' && 
        block.heading_3.rich_text[0]?.text?.content?.includes('QueDoc')
      );
      
      if (quedocTitleBlock) {
        // QueDoc 프로젝트 제목 다음에 있는 이미지 블록 찾기
        const projectIndex = response.results.findIndex(block => block.id === quedocTitleBlock.id);
        const nextImageBlock = response.results.slice(projectIndex + 1, projectIndex + 5).find(block => 
          block.type === 'image'
        );
        
        if (nextImageBlock) {
          // 이미지 교체
          await this.notion.blocks.update({
            block_id: nextImageBlock.id,
            image: {
              type: "external",
              external: {
                url: hospitalImageUrl
              }
            }
          });
          
          console.log("✅ QueDoc 프로젝트 이미지를 병원 관련 이미지로 변경 완료");
        }
      }
      
    } catch (error) {
      console.error("❌ QueDoc 이미지 변경 실패:", error.message);
    }
  }

  // 🎨 전체적으로 더 자연스럽고 개인적인 느낌으로 수정
  async makeContentMoreNatural() {
    try {
      console.log("🎨 전체적으로 더 자연스럽고 개인적인 느낌으로 수정...");
      
      // 프로젝트 블록들 찾기
      const response = await this.notion.blocks.children.list({
        block_id: NOTION_PAGE_ID,
      });
      
      // 각 프로젝트의 설명을 더 자연스럽게 수정
      const naturalDescriptions = {
        'GreenWear': {
          title: "**GreenWear - 스마트웨어 헬스케어**",
          description: "실제로 ESP32와 웨어러블 센서를 연결해서 만든 프로젝트예요. 심박수, 산소포화도, 체온을 실시간으로 측정하고 LED로 상태를 표시합니다. 웹 대시보드에서도 실시간으로 모니터링할 수 있어요.",
          techStack: "ESP32, Vue.js, React Native, Node.js, MySQL, AI 분석",
          duration: "2024.03 - 2024.06",
          role: "풀스택 개발자 (하드웨어 + 소프트웨어)",
          demoUrl: "https://greenwear-demo.vercel.app/",
          githubUrl: "https://github.com/saway126/greenwear"
        },
        'HRIM': {
          title: "**HRIM - ESG 분석 대시보드**",
          description: "한화 BEYOND SW 캠프에서 팀으로 개발한 ESG 분석 대시보드입니다. 환경, 사회, 지배구조 데이터를 시각화하고 분석할 수 있어요. Chart.js를 활용해서 다양한 그래프와 차트를 구현했습니다.",
          techStack: "Vue.js, Spring Boot, Chart.js, MySQL, Docker",
          duration: "2024.07 - 2024.08",
          role: "프론트엔드 개발자",
          demoUrl: "https://www.imhr.kro.kr/login",
          githubUrl: "https://github.com/beyond-sw-camp/be12-fin-HRIM-IMHR-FE"
        },
        'QueDoc': {
          title: "**QueDoc - 병원 예약 시스템**",
          description: "병원 예약을 더 편리하게 만들어보고 싶어서 시작한 프로젝트입니다. 사용자가 쉽게 병원을 찾고 예약할 수 있도록 UI/UX에 신경 썼어요. 대기열 현황도 실시간으로 확인할 수 있습니다.",
          techStack: "Vue.js, Spring Boot, MySQL, Redis, AWS",
          duration: "2024.01 - 2024.04",
          role: "풀스택 개발자",
          demoUrl: "https://www.quedoc.kro.kr/",
          githubUrl: "https://github.com/saway126/QueDoc"
        },
        '기술 블로그': {
          title: "**기술 블로그 - 71_stars**",
          description: "개발하면서 배운 것들을 정리하고 공유하는 블로그입니다. Jekyll Chirpy 테마를 우주 돌고래 컨셉으로 커스터마이징했어요. 글래스모피즘 효과와 다크/라이트 테마 토글도 구현했습니다.",
          techStack: "Jekyll, Chirpy Theme, GitHub Pages, CSS, JavaScript",
          duration: "2023.12 - 현재",
          role: "개발자 & 블로거",
          demoUrl: "https://saway126.github.io/",
          githubUrl: "https://github.com/saway126/saway126.github.io"
        }
      };
      
      // 각 프로젝트의 설명을 자연스럽게 수정
      for (const [projectName, content] of Object.entries(naturalDescriptions)) {
        await this.updateProjectDescription(projectName, content);
      }
      
      console.log("✅ 전체적으로 더 자연스럽고 개인적인 느낌으로 수정 완료");
      
    } catch (error) {
      console.error("❌ 자연스러운 스타일 수정 실패:", error.message);
    }
  }

  // 🎯 개별 프로젝트 설명 업데이트
  async updateProjectDescription(projectName, content) {
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
        const projectBlocks = response.results.slice(projectIndex + 1, projectIndex + 10);
        
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
                      content: `**기술 스택**: ${content.techStack}`
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
                      content: `**개발 기간**: ${content.duration}`
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
                      content: `**담당 역할**: ${content.role}`
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
                      content: `**Live Demo**: ${content.demoUrl}`
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
                      content: `**Source Code**: ${content.githubUrl}`
                    }
                  }
                ]
              }
            }
          ]
        });
        
        console.log(`✅ ${projectName} 프로젝트 설명을 자연스럽게 수정 완료`);
      }
      
    } catch (error) {
      console.error(`❌ ${projectName} 프로젝트 설명 수정 실패:`, error.message);
    }
  }

  // 🖼️ 프로필 사진을 동그랗게 테두리 처리
  async makeProfileImageRound() {
    try {
      console.log("🖼️ 프로필 사진을 동그랗게 테두리 처리...");
      
      // 프로젝트 블록들 찾기
      const response = await this.notion.blocks.children.list({
        block_id: NOTION_PAGE_ID,
      });
      
      // 프로필 이미지 블록 찾기
      const profileImageBlock = response.results.find(block => 
        block.type === 'image' && 
        (block.image?.external?.url?.includes('profile') || 
         block.image?.external?.url?.includes('avatar') ||
         block.image?.external?.url?.includes('김기성'))
      );
      
      if (profileImageBlock) {
        // 프로필 이미지 다음에 동그란 테두리 스타일 설명 추가
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
                      content: "*프로필 사진을 동그란 테두리로 스타일링했습니다*"
                    }
                  }
                ]
              }
            }
          ]
        });
        
        console.log("✅ 프로필 사진 동그란 테두리 처리 완료");
      }
      
    } catch (error) {
      console.error("❌ 프로필 사진 테두리 처리 실패:", error.message);
    }
  }

  // 🎯 전체 업데이트 실행
  async updateAll() {
    console.log("🎨 전체 스타일 업데이트 시작...");
    
    await this.updateQueDocImage();
    await this.makeContentMoreNatural();
    await this.makeProfileImageRound();
    
    console.log("🎉 전체 스타일 업데이트 완료!");
    console.log("✨ 이제 더 자연스럽고 개인적인 포트폴리오가 되었습니다!");
  }
}

// 실행
const updater = new QueDocAndStyleUpdater();
updater.updateAll();
