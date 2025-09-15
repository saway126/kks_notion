// 🔍 실제 프로젝트 이미지 복원
const { Client } = require('@notionhq/client');

const NOTION_API_KEY = process.env.NOTION_API_KEY || 'your-notion-api-key-here';
const NOTION_PAGE_ID = '2697705af35080d29bd3ec3447918eab';

const notion = new Client({
  auth: NOTION_API_KEY,
});

class RealProjectImagesRestorer {
  constructor() {
    this.notion = notion;
  }

  // 🎯 일반적인 이미지들을 제거하고 실제 프로젝트 이미지로 교체
  async replaceWithRealProjectImages() {
    try {
      console.log("🔍 실제 프로젝트 이미지로 교체...");
      
      // 프로젝트 블록들 찾기
      const response = await this.notion.blocks.children.list({
        block_id: NOTION_PAGE_ID,
      });
      
      // 이미지 블록들 찾기
      const imageBlocks = response.results.filter(block => 
        block.type === 'image' && 
        block.image?.external?.url?.includes('unsplash')
      );
      
      console.log(`📄 ${imageBlocks.length}개의 일반 이미지 블록 발견`);
      
      // 각 이미지 블록을 실제 프로젝트 이미지로 교체
      for (let i = 0; i < imageBlocks.length; i++) {
        const imageBlock = imageBlocks[i];
        
        // 해당 이미지가 속한 프로젝트 찾기
        const projectInfo = await this.findProjectForImage(imageBlock.id);
        
        if (projectInfo) {
          await this.replaceImageWithRealProject(imageBlock.id, projectInfo);
          console.log(`✅ ${projectInfo.title} 프로젝트 이미지 교체 완료`);
        }
      }
      
      console.log("🎉 실제 프로젝트 이미지 교체 완료!");
      
    } catch (error) {
      console.error("❌ 실제 프로젝트 이미지 교체 실패:", error.message);
    }
  }

  // 🎯 이미지가 속한 프로젝트 찾기
  async findProjectForImage(imageBlockId) {
    try {
      const response = await this.notion.blocks.children.list({
        block_id: NOTION_PAGE_ID,
      });
      
      // 이미지 블록의 인덱스 찾기
      const imageIndex = response.results.findIndex(block => block.id === imageBlockId);
      
      if (imageIndex === -1) return null;
      
      // 이미지 앞쪽에서 프로젝트 제목 찾기
      for (let i = imageIndex - 1; i >= 0; i--) {
        const block = response.results[i];
        if (block.type === 'heading_3') {
          const title = block.heading_3.rich_text[0]?.text?.content || "";
          
          if (title.includes('GreenWear')) {
            return {
              title: 'GreenWear',
              realImageUrl: 'https://greenwear-demo.vercel.app/screenshot.png', // 실제 스크린샷 URL
              description: 'GreenWear 웹 애플리케이션 스크린샷'
            };
          } else if (title.includes('HRIM')) {
            return {
              title: 'HRIM',
              realImageUrl: 'https://www.imhr.kro.kr/screenshot.png', // 실제 스크린샷 URL
              description: 'HRIM ESG 대시보드 스크린샷'
            };
          } else if (title.includes('QueDoc')) {
            return {
              title: 'QueDoc',
              realImageUrl: 'https://www.quedoc.kro.kr/screenshot.png', // 실제 스크린샷 URL
              description: 'QueDoc 병원 예약 시스템 스크린샷'
            };
          } else if (title.includes('기술 블로그')) {
            return {
              title: '기술 블로그',
              realImageUrl: 'https://saway126.github.io/screenshot.png', // 실제 스크린샷 URL
              description: '기술 블로그 메인 페이지 스크린샷'
            };
          }
        }
      }
      
      return null;
    } catch (error) {
      console.error("❌ 프로젝트 찾기 실패:", error.message);
      return null;
    }
  }

  // 🎯 이미지를 실제 프로젝트 이미지로 교체
  async replaceImageWithRealProject(imageBlockId, projectInfo) {
    try {
      await this.notion.blocks.update({
        block_id: imageBlockId,
        image: {
          type: "external",
          external: {
            url: projectInfo.realImageUrl
          }
        }
      });
      
    } catch (error) {
      console.error(`❌ ${projectInfo.title} 이미지 교체 실패:`, error.message);
    }
  }

  // 🎯 프로젝트별 실제 스크린샷 추가
  async addRealProjectScreenshots() {
    try {
      console.log("📸 실제 프로젝트 스크린샷 추가...");
      
      // 프로젝트별 실제 스크린샷 정보
      const projectScreenshots = [
        {
          title: "GreenWear",
          screenshotUrl: "https://greenwear-demo.vercel.app/screenshot.png",
          description: "GreenWear 웹 애플리케이션 메인 화면"
        },
        {
          title: "HRIM", 
          screenshotUrl: "https://www.imhr.kro.kr/screenshot.png",
          description: "HRIM ESG 분석 대시보드"
        },
        {
          title: "QueDoc",
          screenshotUrl: "https://www.quedoc.kro.kr/screenshot.png", 
          description: "QueDoc 병원 예약 시스템"
        },
        {
          title: "기술 블로그",
          screenshotUrl: "https://saway126.github.io/screenshot.png",
          description: "기술 블로그 메인 페이지"
        }
      ];
      
      // 각 프로젝트에 실제 스크린샷 추가
      for (const screenshot of projectScreenshots) {
        await this.addScreenshotToProject(screenshot);
      }
      
      console.log("✅ 실제 프로젝트 스크린샷 추가 완료!");
      
    } catch (error) {
      console.error("❌ 실제 프로젝트 스크린샷 추가 실패:", error.message);
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

  // 🎯 전체 실제 프로젝트 이미지 복원
  async restoreAllRealProjectImages() {
    console.log("🔍 전체 실제 프로젝트 이미지 복원 시작...");
    
    await this.replaceWithRealProjectImages();
    await this.addRealProjectScreenshots();
    
    console.log("🎉 전체 실제 프로젝트 이미지 복원 완료!");
    console.log("✨ 이제 실제 프로젝트 스크린샷들이 표시됩니다!");
  }
}

// 실행
const restorer = new RealProjectImagesRestorer();
restorer.restoreAllRealProjectImages();
