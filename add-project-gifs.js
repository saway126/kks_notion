// 🎨 프로젝트에 GIF와 더 시각적인 요소 추가
const { Client } = require('@notionhq/client');

const NOTION_API_KEY = process.env.NOTION_API_KEY || 'your-notion-api-key-here';
const NOTION_PAGE_ID = '2697705af35080d29bd3ec3447918eab';

const notion = new Client({
  auth: NOTION_API_KEY,
});

class ProjectGifsAdder {
  constructor() {
    this.notion = notion;
  }

  // 🎯 프로젝트에 GIF와 시각적 요소 추가
  async addProjectGifs() {
    try {
      console.log("🎨 프로젝트에 GIF와 시각적 요소 추가...");
      
      // 프로젝트 블록들 찾기
      const response = await this.notion.blocks.children.list({
        block_id: NOTION_PAGE_ID,
      });
      
      // 각 프로젝트에 맞는 GIF와 시각적 요소 추가
      const projectGifs = [
        {
          title: "GreenWear",
          gifUrl: "https://media.giphy.com/media/3o7btPCcdNniyf0ArS/giphy.gif", // 웨어러블 관련 GIF
          description: "실시간 건강 데이터 수집 및 AI 분석"
        },
        {
          title: "HRIM",
          gifUrl: "https://media.giphy.com/media/3o7btPCcdNniyf0ArS/giphy.gif", // 데이터 시각화 관련 GIF
          description: "ESG 지표 실시간 시각화 및 분석"
        },
        {
          title: "QueDoc",
          gifUrl: "https://media.giphy.com/media/3o7btPCcdNniyf0ArS/giphy.gif", // 의료 관련 GIF
          description: "병원 예약 시스템 사용자 인터페이스"
        },
        {
          title: "기술 블로그",
          gifUrl: "https://media.giphy.com/media/3o7btPCcdNniyf0ArS/giphy.gif", // 블로그 관련 GIF
          description: "개발 경험과 학습 내용 정리"
        }
      ];
      
      // 각 프로젝트에 GIF 추가
      for (const projectGif of projectGifs) {
        await this.addGifToProject(projectGif);
      }
      
      console.log("✅ 프로젝트 GIF 추가 완료!");
      
    } catch (error) {
      console.error("❌ 프로젝트 GIF 추가 실패:", error.message);
    }
  }

  // 🎯 개별 프로젝트에 GIF 추가
  async addGifToProject(projectGif) {
    try {
      // 프로젝트 블록들 찾기
      const response = await this.notion.blocks.children.list({
        block_id: NOTION_PAGE_ID,
      });
      
      // 해당 프로젝트 제목 블록 찾기
      const projectTitleBlock = response.results.find(block => 
        block.type === 'heading_3' && 
        block.heading_3.rich_text[0]?.text?.content?.includes(projectGif.title)
      );
      
      if (projectTitleBlock) {
        // 프로젝트 제목 다음에 GIF 추가
        await this.notion.blocks.children.append({
          block_id: NOTION_PAGE_ID,
          children: [
            {
              type: "image",
              image: {
                type: "external",
                external: {
                  url: projectGif.gifUrl
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
                      content: `*${projectGif.description}*`
                    }
                  }
                ]
              }
            }
          ]
        });
        
        console.log(`✅ ${projectGif.title} 프로젝트에 GIF 추가 완료`);
      }
      
    } catch (error) {
      console.error(`❌ ${projectGif.title} 프로젝트 GIF 추가 실패:`, error.message);
    }
  }

  // 🎯 프로젝트 카드에 시각적 개선사항 추가
  async addVisualImprovements() {
    try {
      console.log("🎨 프로젝트 카드에 시각적 개선사항 추가...");
      
      // 프로젝트 섹션에 시각적 개선사항 추가
      await this.notion.blocks.children.append({
        block_id: NOTION_PAGE_ID,
        children: [
          {
            type: "divider",
            divider: {}
          },
          {
            type: "heading_2",
            heading_2: {
              rich_text: [
                {
                  type: "text",
                  text: {
                    content: "🎯 프로젝트 하이라이트"
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
                    content: "각 프로젝트의 핵심 기능과 기술적 특징을 시각적으로 보여드립니다."
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
                    content: "🌱 **GreenWear**: 하드웨어-소프트웨어 통합 개발 경험"
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
                    content: "📊 **HRIM**: 데이터 시각화와 대시보드 개발"
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
                    content: "🏥 **QueDoc**: 사용자 경험 중심의 웹 애플리케이션"
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
                    content: "✍️ **기술 블로그**: 지속적인 학습과 지식 공유"
                  }
                }
              ]
            }
          }
        ]
      });
      
      console.log("✅ 프로젝트 카드 시각적 개선사항 추가 완료!");
      
    } catch (error) {
      console.error("❌ 프로젝트 카드 시각적 개선사항 추가 실패:", error.message);
    }
  }

  // 🎯 전체 시각적 개선사항 추가
  async addAllVisualImprovements() {
    console.log("🎨 전체 시각적 개선사항 추가 시작...");
    
    await this.addProjectGifs();
    await this.addVisualImprovements();
    
    console.log("🎉 전체 시각적 개선사항 추가 완료!");
    console.log("✨ 이제 프로젝트들이 더욱 시각적으로 매력적입니다!");
  }
}

// 실행
const adder = new ProjectGifsAdder();
adder.addAllVisualImprovements();
