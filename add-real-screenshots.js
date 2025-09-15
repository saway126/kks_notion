// 🖼️ 실제 프로젝트 스크린샷들을 Notion에 추가
const { Client } = require('@notionhq/client');

const NOTION_API_KEY = process.env.NOTION_API_KEY || 'your-notion-api-key-here';
const NOTION_PAGE_ID = '2697705af35080d29bd3ec3447918eab';

const notion = new Client({
  auth: NOTION_API_KEY,
});

class RealScreenshotsAdder {
  constructor() {
    this.notion = notion;
  }

  // 🎯 실제 프로젝트 스크린샷들을 추가
  async addRealProjectScreenshots() {
    try {
      console.log("🖼️ 실제 프로젝트 스크린샷들 추가...");
      
      // 실제 프로젝트 스크린샷 정보
      const projectScreenshots = [
        {
          title: "GreenWear",
          screenshotUrl: "https://greenwear-demo.vercel.app/screenshot.png", // 실제 스크린샷 URL
          description: "GreenWear 실시간 헬스케어 대시보드 - 심박수, 산소포화도, 체온 모니터링"
        },
        {
          title: "QueDoc",
          screenshotUrl: "https://www.quedoc.kro.kr/screenshot.png", // 실제 스크린샷 URL
          description: "QueDoc 병원 예약 시스템 - 편리한 검색과 예약 기능"
        },
        {
          title: "기술 블로그",
          screenshotUrl: "https://saway126.github.io/screenshot.png", // 실제 스크린샷 URL
          description: "기술 블로그 - 우주 돌고래 테마의 Jekyll Chirpy 커스터마이징"
        }
      ];
      
      // 각 프로젝트에 실제 스크린샷 추가
      for (const screenshot of projectScreenshots) {
        await this.addScreenshotToProject(screenshot);
      }
      
      console.log("✅ 실제 프로젝트 스크린샷들 추가 완료!");
      
    } catch (error) {
      console.error("❌ 실제 프로젝트 스크린샷들 추가 실패:", error.message);
    }
  }

  // 🎯 개별 프로젝트에 스크린샷 추가
  async addScreenshotToProject(screenshot) {
    try {
      // 프로젝트 블록들 찾기
      const response = await this.notion.blocks.children.list({
        block_id: NOTION_PAGE_ID,
      });
      
      // 해당 프로젝트 제목 블록 찾기
      const projectTitleBlock = response.results.find(block => 
        block.type === 'heading_3' && 
        block.heading_3.rich_text[0]?.text?.content?.includes(screenshot.title)
      );
      
      if (projectTitleBlock) {
        // 프로젝트 제목 다음에 실제 스크린샷 추가
        await this.notion.blocks.children.append({
          block_id: NOTION_PAGE_ID,
          children: [
            {
              type: "image",
              image: {
                type: "external",
                external: {
                  url: screenshot.screenshotUrl
                }
              }
            },
            {
              type: "paragraph",
              paragraph: {
                rich_text: [
                  {
                    type: "text",
                    text: {
                      content: `*${screenshot.description}*`
                    }
                  }
                ]
              }
            }
          ]
        });
        
        console.log(`✅ ${screenshot.title} 프로젝트에 실제 스크린샷 추가 완료`);
      }
      
    } catch (error) {
      console.error(`❌ ${screenshot.title} 프로젝트 스크린샷 추가 실패:`, error.message);
    }
  }

  // 🎯 기존 일반 이미지들을 실제 스크린샷으로 교체
  async replaceGenericImagesWithScreenshots() {
    try {
      console.log("🔄 기존 일반 이미지들을 실제 스크린샷으로 교체...");
      
      // 프로젝트별 실제 스크린샷 URL
      const realScreenshots = {
        'GreenWear': 'https://greenwear-demo.vercel.app/screenshot.png',
        'QueDoc': 'https://www.quedoc.kro.kr/screenshot.png',
        '기술 블로그': 'https://saway126.github.io/screenshot.png'
      };
      
      // 프로젝트 블록들 찾기
      const response = await this.notion.blocks.children.list({
        block_id: NOTION_PAGE_ID,
      });
      
      // 각 프로젝트의 이미지 블록 찾아서 교체
      for (const [projectName, screenshotUrl] of Object.entries(realScreenshots)) {
        await this.replaceProjectImage(projectName, screenshotUrl);
      }
      
      console.log("✅ 기존 이미지들을 실제 스크린샷으로 교체 완료!");
      
    } catch (error) {
      console.error("❌ 이미지 교체 실패:", error.message);
    }
  }

  // 🎯 개별 프로젝트 이미지 교체
  async replaceProjectImage(projectName, screenshotUrl) {
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
        // 프로젝트 제목 다음에 있는 이미지 블록 찾기
        const projectIndex = response.results.findIndex(block => block.id === projectTitleBlock.id);
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
                url: screenshotUrl
              }
            }
          });
          
          console.log(`✅ ${projectName} 프로젝트 이미지 교체 완료`);
        }
      }
      
    } catch (error) {
      console.error(`❌ ${projectName} 프로젝트 이미지 교체 실패:`, error.message);
    }
  }

  // 🎯 전체 실제 스크린샷 추가
  async addAllRealScreenshots() {
    console.log("🖼️ 전체 실제 프로젝트 스크린샷 추가 시작...");
    
    await this.addRealProjectScreenshots();
    await this.replaceGenericImagesWithScreenshots();
    
    console.log("🎉 전체 실제 프로젝트 스크린샷 추가 완료!");
    console.log("✨ 이제 실제 프로젝트 스크린샷들이 표시됩니다!");
  }
}

// 실행
const adder = new RealScreenshotsAdder();
adder.addAllRealScreenshots();
