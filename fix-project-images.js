// 🔍 프로젝트 이미지 수정 - 실제 프로젝트에 맞는 이미지로 교체
const { Client } = require('@notionhq/client');

const NOTION_API_KEY = process.env.NOTION_API_KEY || 'your-notion-api-key-here';
const NOTION_PAGE_ID = '2697705af35080d29bd3ec3447918eab';

const notion = new Client({
  auth: NOTION_API_KEY,
});

class ProjectImagesFixer {
  constructor() {
    this.notion = notion;
  }

  // 🎯 프로젝트 이미지를 실제 프로젝트에 맞게 수정
  async fixProjectImages() {
    try {
      console.log("🔍 프로젝트 이미지 수정...");
      
      // 프로젝트별 실제 이미지 URL (실제 프로젝트에 맞는 이미지들)
      const projectImages = {
        'GreenWear': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop&auto=format', // 웨어러블/헬스케어
        'HRIM': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop&auto=format', // 대시보드/데이터
        'QueDoc': 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=400&fit=crop&auto=format', // 의료/병원
        '기술 블로그': 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=400&fit=crop&auto=format' // 블로그/개발
      };
      
      // 프로젝트 블록들 찾기
      const response = await this.notion.blocks.children.list({
        block_id: NOTION_PAGE_ID,
      });
      
      // 각 프로젝트의 이미지 블록 찾아서 수정
      for (const [projectName, imageUrl] of Object.entries(projectImages)) {
        await this.updateProjectImage(projectName, imageUrl);
      }
      
      console.log("✅ 프로젝트 이미지 수정 완료!");
      
    } catch (error) {
      console.error("❌ 프로젝트 이미지 수정 실패:", error.message);
    }
  }

  // 🎯 개별 프로젝트 이미지 업데이트
  async updateProjectImage(projectName, imageUrl) {
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
          // 이미지 업데이트
          await this.notion.blocks.update({
            block_id: nextImageBlock.id,
            image: {
              type: "external",
              external: {
                url: imageUrl
              }
            }
          });
          
          console.log(`✅ ${projectName} 프로젝트 이미지 업데이트 완료`);
        }
      }
      
    } catch (error) {
      console.error(`❌ ${projectName} 프로젝트 이미지 업데이트 실패:`, error.message);
    }
  }

  // 🎯 프로젝트 설명에 실제 링크 정보 추가
  async addRealProjectLinks() {
    try {
      console.log("🔗 실제 프로젝트 링크 정보 추가...");
      
      // 프로젝트별 실제 링크 정보
      const projectLinks = [
        {
          name: 'GreenWear',
          demoUrl: 'https://greenwear-demo.vercel.app/',
          githubUrl: 'https://github.com/saway126/greenwear',
          description: '실제 동작하는 GreenWear 웹 애플리케이션'
        },
        {
          name: 'HRIM',
          demoUrl: 'https://www.imhr.kro.kr/login',
          githubUrl: 'https://github.com/beyond-sw-camp/be12-fin-HRIM-IMHR-FE',
          description: '실제 동작하는 HRIM ESG 대시보드'
        },
        {
          name: 'QueDoc',
          demoUrl: 'https://www.quedoc.kro.kr/',
          githubUrl: 'https://github.com/saway126/QueDoc',
          description: '실제 동작하는 QueDoc 병원 예약 시스템'
        },
        {
          name: '기술 블로그',
          demoUrl: 'https://saway126.github.io/',
          githubUrl: 'https://github.com/saway126/saway126.github.io',
          description: '실제 동작하는 기술 블로그'
        }
      ];
      
      // 각 프로젝트에 실제 링크 정보 추가
      for (const project of projectLinks) {
        await this.addProjectLinkInfo(project);
      }
      
      console.log("✅ 실제 프로젝트 링크 정보 추가 완료!");
      
    } catch (error) {
      console.error("❌ 실제 프로젝트 링크 정보 추가 실패:", error.message);
    }
  }

  // 🎯 개별 프로젝트에 링크 정보 추가
  async addProjectLinkInfo(project) {
    try {
      // 프로젝트 블록들 찾기
      const response = await this.notion.blocks.children.list({
        block_id: NOTION_PAGE_ID,
      });
      
      // 해당 프로젝트 제목 블록 찾기
      const projectTitleBlock = response.results.find(block => 
        block.type === 'heading_3' && 
        block.heading_3.rich_text[0]?.text?.content?.includes(project.name)
      );
      
      if (projectTitleBlock) {
        // 프로젝트 제목 다음에 실제 링크 정보 추가
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
                      content: `🔗 **${project.description}**`
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
                      content: `🌐 **Live Demo**: ${project.demoUrl}`
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
                      content: `💻 **Source Code**: ${project.githubUrl}`
                    }
                  }
                ]
              }
            }
          ]
        });
        
        console.log(`✅ ${project.name} 프로젝트 링크 정보 추가 완료`);
      }
      
    } catch (error) {
      console.error(`❌ ${project.name} 프로젝트 링크 정보 추가 실패:`, error.message);
    }
  }

  // 🎯 전체 프로젝트 이미지 수정
  async fixAllProjectImages() {
    console.log("🔍 전체 프로젝트 이미지 수정 시작...");
    
    await this.fixProjectImages();
    await this.addRealProjectLinks();
    
    console.log("🎉 전체 프로젝트 이미지 수정 완료!");
    console.log("✨ 이제 실제 프로젝트에 맞는 이미지와 링크가 표시됩니다!");
  }
}

// 실행
const fixer = new ProjectImagesFixer();
fixer.fixAllProjectImages();
