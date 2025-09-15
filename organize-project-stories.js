// 📝 각 프로젝트의 개발 스토리를 해당 프로젝트 밑에 알맞게 배치
const { Client } = require('@notionhq/client');

const NOTION_API_KEY = process.env.NOTION_API_KEY || 'your-notion-api-key-here';
const NOTION_PAGE_ID = '2697705af35080d29bd3ec3447918eab';

const notion = new Client({
  auth: NOTION_API_KEY,
});

class ProjectStoriesOrganizer {
  constructor() {
    this.notion = notion;
  }

  // 🎯 각 프로젝트의 개발 스토리를 해당 프로젝트 밑에 배치
  async organizeProjectStories() {
    try {
      console.log("📝 각 프로젝트의 개발 스토리를 해당 프로젝트 밑에 배치...");
      
      // 프로젝트별 개발 스토리
      const projectStories = {
        'GreenWear': {
          story: "💡 **개발 스토리**: 실제로 ESP32를 사서 센서를 연결해보면서 하드웨어 개발의 재미를 느꼈어요! 처음에는 전자부품도 잘 몰랐는데, 하나씩 연결해보면서 동작하는 걸 보니 정말 신기했어요."
        },
        'HRIM': {
          story: "💡 **팀 협업**: 한화 BEYOND SW 캠프에서 팀원들과 함께 개발하면서 협업의 중요성을 배웠습니다. 프론트엔드 담당으로 Chart.js를 활용해서 데이터 시각화에 집중했어요."
        },
        'QueDoc': {
          story: "💡 **문제 해결**: 병원 예약의 불편함을 직접 경험해서 더 나은 서비스를 만들고 싶었어요. 사용자 입장에서 생각해보니 예약 과정이 너무 복잡했거든요."
        },
        '기술 블로그': {
          story: "💡 **학습 기록**: 개발하면서 배운 것들을 정리하고 공유하는 것이 가장 큰 보람이에요! Jekyll 테마를 커스터마이징하면서 CSS와 JavaScript도 많이 배웠습니다."
        }
      };
      
      // 각 프로젝트에 맞는 개발 스토리 배치
      for (const [projectName, story] of Object.entries(projectStories)) {
        await this.placeStoryUnderProject(projectName, story.story);
      }
      
      console.log("✅ 각 프로젝트의 개발 스토리 배치 완료!");
      
    } catch (error) {
      console.error("❌ 프로젝트 스토리 배치 실패:", error.message);
    }
  }

  // 🎯 개별 프로젝트 밑에 개발 스토리 배치
  async placeStoryUnderProject(projectName, story) {
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
        // 프로젝트 제목 다음에 개발 스토리 추가
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
                      content: story
                    }
                  }
                ]
              }
            }
          ]
        });
        
        console.log(`✅ ${projectName} 프로젝트 밑에 개발 스토리 배치 완료`);
      }
      
    } catch (error) {
      console.error(`❌ ${projectName} 프로젝트 스토리 배치 실패:`, error.message);
    }
  }

  // 🧹 기존에 잘못 배치된 스토리들 정리
  async cleanUpMisplacedStories() {
    try {
      console.log("🧹 기존에 잘못 배치된 스토리들 정리...");
      
      // 프로젝트 블록들 찾기
      const response = await this.notion.blocks.children.list({
        block_id: NOTION_PAGE_ID,
      });
      
      // 잘못 배치된 스토리 블록들 찾기
      const misplacedStories = response.results.filter(block => 
        block.type === 'paragraph' && 
        block.paragraph?.rich_text[0]?.text?.content?.includes('💡 **개발 스토리**') ||
        block.paragraph?.rich_text[0]?.text?.content?.includes('💡 **팀 협업**') ||
        block.paragraph?.rich_text[0]?.text?.content?.includes('💡 **문제 해결**') ||
        block.paragraph?.rich_text[0]?.text?.content?.includes('💡 **학습 기록**')
      );
      
      // 잘못 배치된 스토리들 삭제
      for (const storyBlock of misplacedStories) {
        await this.notion.blocks.delete({
          block_id: storyBlock.id
        });
      }
      
      console.log(`✅ ${misplacedStories.length}개의 잘못 배치된 스토리 정리 완료`);
      
    } catch (error) {
      console.error("❌ 잘못 배치된 스토리 정리 실패:", error.message);
    }
  }

  // 🎯 프로젝트별 추가 정보 정리
  async addProjectAdditionalInfo() {
    try {
      console.log("📋 프로젝트별 추가 정보 정리...");
      
      // 프로젝트별 추가 정보
      const additionalInfo = {
        'GreenWear': {
          info: "🔧 **기술적 도전**: 하드웨어와 소프트웨어를 연결하는 것이 가장 어려웠어요. ESP32에서 데이터를 보내고 웹에서 받아서 처리하는 과정에서 많은 시행착오가 있었습니다."
        },
        'HRIM': {
          info: "📊 **데이터 시각화**: Chart.js를 활용해서 ESG 데이터를 직관적으로 표현하는 것에 집중했어요. 사용자가 한눈에 이해할 수 있도록 다양한 차트 타입을 활용했습니다."
        },
        'QueDoc': {
          info: "🏥 **사용자 경험**: 병원 예약 과정을 단순화하고 사용자가 쉽게 이해할 수 있도록 UI/UX를 설계했어요. 대기열 현황도 실시간으로 보여주는 것이 핵심이었습니다."
        },
        '기술 블로그': {
          info: "🎨 **디자인 커스터마이징**: Jekyll Chirpy 테마를 우주 돌고래 컨셉으로 완전히 바꿔봤어요. 글래스모피즘 효과와 다크/라이트 테마 토글도 직접 구현했습니다."
        }
      };
      
      // 각 프로젝트에 추가 정보 배치
      for (const [projectName, info] of Object.entries(additionalInfo)) {
        await this.placeInfoUnderProject(projectName, info.info);
      }
      
      console.log("✅ 프로젝트별 추가 정보 정리 완료");
      
    } catch (error) {
      console.error("❌ 프로젝트별 추가 정보 정리 실패:", error.message);
    }
  }

  // 🎯 개별 프로젝트 밑에 추가 정보 배치
  async placeInfoUnderProject(projectName, info) {
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
        // 프로젝트 제목 다음에 추가 정보 추가
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
                      content: info
                    }
                  }
                ]
              }
            }
          ]
        });
        
        console.log(`✅ ${projectName} 프로젝트 밑에 추가 정보 배치 완료`);
      }
      
    } catch (error) {
      console.error(`❌ ${projectName} 프로젝트 추가 정보 배치 실패:`, error.message);
    }
  }

  // 🎯 전체 정리 실행
  async organizeAll() {
    console.log("📝 프로젝트 스토리 전체 정리 시작...");
    
    await this.cleanUpMisplacedStories();
    await this.organizeProjectStories();
    await this.addProjectAdditionalInfo();
    
    console.log("🎉 프로젝트 스토리 전체 정리 완료!");
    console.log("✨ 이제 각 프로젝트 밑에 알맞은 개발 스토리가 배치되었습니다!");
  }
}

// 실행
const organizer = new ProjectStoriesOrganizer();
organizer.organizeAll();
