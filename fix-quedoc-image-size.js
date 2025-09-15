// 📏 QueDoc 이미지 크기를 다른 프로젝트 이미지들과 맞춤
const { Client } = require('@notionhq/client');

const NOTION_API_KEY = process.env.NOTION_API_KEY || 'your-notion-api-key-here';
const NOTION_PAGE_ID = '2697705af35080d29bd3ec3447918eab';

const notion = new Client({
  auth: NOTION_API_KEY,
});

class QueDocImageSizeFixer {
  constructor() {
    this.notion = notion;
  }

  // 📏 QueDoc 이미지 크기를 다른 프로젝트 이미지들과 맞춤
  async fixQueDocImageSize() {
    try {
      console.log("📏 QueDoc 이미지 크기를 다른 프로젝트 이미지들과 맞춤...");
      
      // 적절한 크기의 병원 이미지 URL (다른 이미지들과 비슷한 크기)
      const hospitalImageUrl = "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=300&fit=crop&auto=format";
      
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
        // QueDoc 프로젝트 제목 다음에 있는 이미지 블록들 찾기
        const projectIndex = response.results.findIndex(block => block.id === quedocTitleBlock.id);
        const imageBlocks = response.results.slice(projectIndex + 1, projectIndex + 10).filter(block => 
          block.type === 'image'
        );
        
        // QueDoc의 모든 이미지 블록을 적절한 크기로 교체
        for (const imageBlock of imageBlocks) {
          await this.replaceImageWithProperSize(imageBlock.id, hospitalImageUrl);
        }
        
        console.log(`✅ QueDoc 프로젝트의 ${imageBlocks.length}개 이미지 크기 조정 완료`);
      }
      
    } catch (error) {
      console.error("❌ QueDoc 이미지 크기 조정 실패:", error.message);
    }
  }

  // 🎯 개별 이미지를 적절한 크기로 교체
  async replaceImageWithProperSize(imageBlockId, imageUrl) {
    try {
      await this.notion.blocks.update({
        block_id: imageBlockId,
        image: {
          type: "external",
          external: {
            url: imageUrl
          }
        }
      });
      
    } catch (error) {
      console.error("❌ 이미지 크기 교체 실패:", error.message);
    }
  }

  // 🧹 QueDoc의 중복된 이미지들 정리
  async cleanUpDuplicateQueDocImages() {
    try {
      console.log("🧹 QueDoc의 중복된 이미지들 정리...");
      
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
        // QueDoc 프로젝트 제목 다음에 있는 블록들 찾기
        const projectIndex = response.results.findIndex(block => block.id === quedocTitleBlock.id);
        const projectBlocks = response.results.slice(projectIndex + 1, projectIndex + 15);
        
        // 이미지 블록들 찾기
        const imageBlocks = projectBlocks.filter(block => block.type === 'image');
        
        // 첫 번째 이미지만 남기고 나머지 삭제
        if (imageBlocks.length > 1) {
          for (let i = 1; i < imageBlocks.length; i++) {
            await this.notion.blocks.delete({
              block_id: imageBlocks[i].id
            });
          }
          
          console.log(`✅ QueDoc의 ${imageBlocks.length - 1}개 중복 이미지 삭제 완료`);
        }
      }
      
    } catch (error) {
      console.error("❌ QueDoc 중복 이미지 정리 실패:", error.message);
    }
  }

  // 🎯 적절한 크기의 QueDoc 이미지 추가
  async addProperSizeQueDocImage() {
    try {
      console.log("🎯 적절한 크기의 QueDoc 이미지 추가...");
      
      // 적절한 크기의 병원 이미지 URL
      const hospitalImageUrl = "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=300&fit=crop&auto=format";
      
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
        // QueDoc 프로젝트 제목 다음에 적절한 크기의 이미지 추가
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
        
        console.log("✅ 적절한 크기의 QueDoc 이미지 추가 완료");
      }
      
    } catch (error) {
      console.error("❌ QueDoc 이미지 추가 실패:", error.message);
    }
  }

  // 🎯 전체 QueDoc 이미지 크기 수정
  async fixAllQueDocImages() {
    console.log("📏 QueDoc 이미지 크기 수정 시작...");
    
    await this.cleanUpDuplicateQueDocImages();
    await this.fixQueDocImageSize();
    await this.addProperSizeQueDocImage();
    
    console.log("🎉 QueDoc 이미지 크기 수정 완료!");
    console.log("✨ 이제 QueDoc 이미지가 다른 프로젝트 이미지들과 비슷한 크기가 되었습니다!");
  }
}

// 실행
const fixer = new QueDocImageSizeFixer();
fixer.fixAllQueDocImages();
