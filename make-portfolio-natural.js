// 🌿 포트폴리오를 자연스럽고 일관성 있게 수정
const { Client } = require('@notionhq/client');

const NOTION_API_KEY = process.env.NOTION_API_KEY || 'your-notion-api-key-here';
const NOTION_PAGE_ID = '2697705af35080d29bd3ec3447918eab';

const notion = new Client({
  auth: NOTION_API_KEY,
});

class NaturalPortfolioMaker {
  constructor() {
    this.notion = notion;
  }

  // 🧹 중복된 QueDoc 섹션 정리
  async cleanUpDuplicateQueDoc() {
    try {
      console.log("🧹 중복된 QueDoc 섹션 정리...");
      
      // 프로젝트 블록들 찾기
      const response = await this.notion.blocks.children.list({
        block_id: NOTION_PAGE_ID,
      });
      
      // QueDoc 관련 블록들 찾기
      const quedocBlocks = response.results.filter(block => 
        (block.type === 'heading_3' && block.heading_3?.rich_text[0]?.text?.content?.includes('QueDoc')) ||
        (block.type === 'paragraph' && block.paragraph?.rich_text[0]?.text?.content?.includes('QueDoc')) ||
        (block.type === 'image' && block.image?.external?.url?.includes('quedoc'))
      );
      
      console.log(`📄 ${quedocBlocks.length}개의 QueDoc 관련 블록 발견`);
      
      // 중복된 QueDoc 블록들 삭제 (첫 번째만 남기고)
      for (let i = 1; i < quedocBlocks.length; i++) {
        await this.notion.blocks.delete({
          block_id: quedocBlocks[i].id
        });
      }
      
      console.log(`✅ ${quedocBlocks.length - 1}개의 중복 QueDoc 블록 삭제 완료`);
      
    } catch (error) {
      console.error("❌ 중복 QueDoc 섹션 정리 실패:", error.message);
    }
  }

  // 🎨 일관된 이미지 스타일로 통일
  async unifyImageStyles() {
    try {
      console.log("🎨 일관된 이미지 스타일로 통일...");
      
      // 프로젝트별 일관된 이미지 URL (모두 비슷한 스타일로)
      const unifiedImages = {
        'GreenWear': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=300&fit=crop&auto=format', // 헬스케어/기술
        'HRIM': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=300&fit=crop&auto=format', // 대시보드/데이터
        'QueDoc': 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=300&fit=crop&auto=format', // 병원/의료
        '기술 블로그': 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&h=300&fit=crop&auto=format' // 개발/블로그
      };
      
      // 각 프로젝트의 이미지를 일관된 스타일로 교체
      for (const [projectName, imageUrl] of Object.entries(unifiedImages)) {
        await this.replaceProjectImage(projectName, imageUrl);
      }
      
      console.log("✅ 일관된 이미지 스타일로 통일 완료");
      
    } catch (error) {
      console.error("❌ 이미지 스타일 통일 실패:", error.message);
    }
  }

  // 🎯 개별 프로젝트 이미지 교체
  async replaceProjectImage(projectName, imageUrl) {
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
                url: imageUrl
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

  // 🌊 자연스러운 연결고리 추가
  async addNaturalTransitions() {
    try {
      console.log("🌊 자연스러운 연결고리 추가...");
      
      // 프로젝트 간 자연스러운 연결 문구들
      const transitions = [
        {
          after: 'GreenWear',
          text: "💡 **다음으로는 팀 프로젝트를 소개해드릴게요!**"
        },
        {
          after: 'HRIM', 
          text: "🏥 **개인 프로젝트로는 병원 예약 시스템을 만들어봤어요**"
        },
        {
          after: 'QueDoc',
          text: "📝 **그리고 개발하면서 배운 것들을 정리하는 블로그도 운영하고 있어요**"
        }
      ];
      
      // 각 전환점에 자연스러운 연결고리 추가
      for (const transition of transitions) {
        await this.addTransitionAfterProject(transition.after, transition.text);
      }
      
      console.log("✅ 자연스러운 연결고리 추가 완료");
      
    } catch (error) {
      console.error("❌ 자연스러운 연결고리 추가 실패:", error.message);
    }
  }

  // 🎯 프로젝트 다음에 전환 문구 추가
  async addTransitionAfterProject(projectName, transitionText) {
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
        // 프로젝트 제목 다음에 전환 문구 추가
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
                      content: transitionText
                    }
                  }
                ]
              }
            }
          ]
        });
        
        console.log(`✅ ${projectName} 프로젝트 다음에 전환 문구 추가 완료`);
      }
      
    } catch (error) {
      console.error(`❌ ${projectName} 프로젝트 전환 문구 추가 실패:`, error.message);
    }
  }

  // 🎨 전체적인 자연스러운 스타일 개선
  async improveOverallNaturalness() {
    try {
      console.log("🎨 전체적인 자연스러운 스타일 개선...");
      
      // 프로젝트 블록들 찾기
      const response = await this.notion.blocks.children.list({
        block_id: NOTION_PAGE_ID,
      });
      
      // 자연스러운 소개 문구 추가
      const naturalIntro = "안녕하세요! 👋 개발하면서 만든 프로젝트들을 소개해드릴게요. 각각 다른 도전과 배움이 있었어요.";
      
      // Featured Projects 제목 다음에 자연스러운 소개 추가
      const featuredProjectsBlock = response.results.find(block => 
        block.type === 'heading_2' && 
        block.heading_2.rich_text[0]?.text?.content?.includes('Featured Projects')
      );
      
      if (featuredProjectsBlock) {
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
                      content: naturalIntro
                    }
                  }
                ]
              }
            }
          ]
        });
        
        console.log("✅ 자연스러운 소개 문구 추가 완료");
      }
      
    } catch (error) {
      console.error("❌ 자연스러운 스타일 개선 실패:", error.message);
    }
  }

  // 🎯 전체 자연스러운 포트폴리오 만들기
  async makePortfolioNatural() {
    console.log("🌿 자연스러운 포트폴리오 만들기 시작...");
    
    await this.cleanUpDuplicateQueDoc();
    await this.unifyImageStyles();
    await this.addNaturalTransitions();
    await this.improveOverallNaturalness();
    
    console.log("🎉 자연스러운 포트폴리오 만들기 완료!");
    console.log("✨ 이제 훨씬 더 자연스럽고 일관성 있는 포트폴리오가 되었습니다!");
  }
}

// 실행
const maker = new NaturalPortfolioMaker();
maker.makePortfolioNatural();
