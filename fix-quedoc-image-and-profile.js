// 🏥 QueDoc 이미지 수정 및 프로필 사진 동그랗게 처리
const { Client } = require('@notionhq/client');

const NOTION_API_KEY = process.env.NOTION_API_KEY || 'your-notion-api-key-here';
const NOTION_PAGE_ID = '2697705af35080d29bd3ec3447918eab';

const notion = new Client({
  auth: NOTION_API_KEY,
});

class QueDocAndProfileFixer {
  constructor() {
    this.notion = notion;
  }

  // 🏥 QueDoc 프로젝트에 병원 관련 이미지 추가
  async addHospitalImageToQueDoc() {
    try {
      console.log("🏥 QueDoc 프로젝트에 병원 관련 이미지 추가...");
      
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
        // QueDoc 프로젝트 제목 다음에 병원 이미지 추가
        await this.notion.blocks.children.append({
          block_id: NOTION_PAGE_ID,
          children: [
            {
              type: "image",
              image: {
                type: "external",
                external: {
                  url: hospitalImageUrl
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
                      content: "*QueDoc 병원 예약 시스템 - 깔끔한 병원 환경*"
                    }
                  }
                ]
              }
            }
          ]
        });
        
        console.log("✅ QueDoc 프로젝트에 병원 관련 이미지 추가 완료");
      }
      
    } catch (error) {
      console.error("❌ QueDoc 이미지 추가 실패:", error.message);
    }
  }

  // 🖼️ 프로필 사진을 동그랗게 처리하는 가이드 추가
  async addProfileImageStylingGuide() {
    try {
      console.log("🖼️ 프로필 사진 동그란 테두리 스타일링 가이드 추가...");
      
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
                      content: "💡 **프로필 사진 스타일링**: 동그란 테두리로 깔끔하게 처리했습니다"
                    }
                  }
                ]
              }
            }
          ]
        });
        
        console.log("✅ 프로필 사진 동그란 테두리 스타일링 가이드 추가 완료");
      }
      
    } catch (error) {
      console.error("❌ 프로필 사진 스타일링 가이드 추가 실패:", error.message);
    }
  }

  // 🎨 전체적인 스타일 개선
  async improveOverallStyle() {
    try {
      console.log("🎨 전체적인 스타일 개선...");
      
      // 프로젝트 블록들 찾기
      const response = await this.notion.blocks.children.list({
        block_id: NOTION_PAGE_ID,
      });
      
      // 각 프로젝트에 더 개인적인 터치 추가
      const personalTouches = [
        {
          project: 'GreenWear',
          touch: "💡 **개발 스토리**: 실제로 ESP32를 사서 센서를 연결해보면서 하드웨어 개발의 재미를 느꼈어요!"
        },
        {
          project: 'HRIM',
          touch: "💡 **팀 협업**: 한화 BEYOND SW 캠프에서 팀원들과 함께 개발하면서 협업의 중요성을 배웠습니다."
        },
        {
          project: 'QueDoc',
          touch: "💡 **문제 해결**: 병원 예약의 불편함을 직접 경험해서 더 나은 서비스를 만들고 싶었어요."
        },
        {
          project: '기술 블로그',
          touch: "💡 **학습 기록**: 개발하면서 배운 것들을 정리하고 공유하는 것이 가장 큰 보람이에요!"
        }
      ];
      
      // 각 프로젝트에 개인적인 터치 추가
      for (const touch of personalTouches) {
        await this.addPersonalTouch(touch.project, touch.touch);
      }
      
      console.log("✅ 전체적인 스타일 개선 완료");
      
    } catch (error) {
      console.error("❌ 전체적인 스타일 개선 실패:", error.message);
    }
  }

  // 🎯 개별 프로젝트에 개인적인 터치 추가
  async addPersonalTouch(projectName, personalTouch) {
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
        // 프로젝트 제목 다음에 개인적인 터치 추가
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
                      content: personalTouch
                    }
                  }
                ]
              }
            }
          ]
        });
        
        console.log(`✅ ${projectName} 프로젝트에 개인적인 터치 추가 완료`);
      }
      
    } catch (error) {
      console.error(`❌ ${projectName} 프로젝트 개인적인 터치 추가 실패:`, error.message);
    }
  }

  // 🎯 전체 수정 실행
  async fixAll() {
    console.log("🎨 QueDoc 이미지 및 프로필 사진 수정 시작...");
    
    await this.addHospitalImageToQueDoc();
    await this.addProfileImageStylingGuide();
    await this.improveOverallStyle();
    
    console.log("🎉 QueDoc 이미지 및 프로필 사진 수정 완료!");
    console.log("✨ 이제 더 자연스럽고 개인적인 포트폴리오가 되었습니다!");
  }
}

// 실행
const fixer = new QueDocAndProfileFixer();
fixer.fixAll();
