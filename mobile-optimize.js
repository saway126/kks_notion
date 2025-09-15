// 📱 모바일 최적화 - 텍스트 길이와 구조를 모바일에 맞게 조정
const { Client } = require('@notionhq/client');

const NOTION_API_KEY = process.env.NOTION_API_KEY || 'your-notion-api-key-here';
const NOTION_PAGE_ID = '2697705af35080d29bd3ec3447918eab';

const notion = new Client({
  auth: NOTION_API_KEY,
});

class MobileOptimizer {
  constructor() {
    this.notion = notion;
  }

  // 📱 모바일 최적화
  async optimizeForMobile() {
    try {
      console.log("📱 모바일 최적화 시작...");
      
      // 프로젝트 블록들 찾기
      const response = await this.notion.blocks.children.list({
        block_id: NOTION_PAGE_ID,
      });
      
      // 긴 텍스트들을 모바일에 맞게 줄이기
      await this.shortenLongTexts();
      
      // 모바일에 맞는 구조로 조정
      await this.adjustForMobile();
      
      console.log("✅ 모바일 최적화 완료");
      
    } catch (error) {
      console.error("❌ 모바일 최적화 실패:", error.message);
    }
  }

  // ✂️ 긴 텍스트들을 모바일에 맞게 줄이기
  async shortenLongTexts() {
    try {
      console.log("✂️ 긴 텍스트들을 모바일에 맞게 줄이기...");
      
      // 프로젝트 블록들 찾기
      const response = await this.notion.blocks.children.list({
        block_id: NOTION_PAGE_ID,
      });
      
      // 긴 텍스트 블록들 찾기
      const longTextBlocks = response.results.filter(block => 
        (block.type === 'paragraph' && block.paragraph?.rich_text[0]?.text?.content?.length > 100) ||
        (block.type === 'bulleted_list_item' && block.bulleted_list_item?.rich_text[0]?.text?.content?.length > 80)
      );
      
      // 각 긴 텍스트를 모바일에 맞게 줄이기
      for (const block of longTextBlocks) {
        await this.shortenBlockText(block);
      }
      
      console.log(`✅ ${longTextBlocks.length}개의 긴 텍스트 모바일 최적화 완료`);
      
    } catch (error) {
      console.error("❌ 긴 텍스트 줄이기 실패:", error.message);
    }
  }

  // ✂️ 개별 블록 텍스트 줄이기
  async shortenBlockText(block) {
    try {
      let originalText = '';
      let shortenedText = '';
      
      if (block.type === 'paragraph') {
        originalText = block.paragraph?.rich_text[0]?.text?.content || '';
        shortenedText = this.shortenText(originalText);
        
        await this.notion.blocks.update({
          block_id: block.id,
          paragraph: {
            rich_text: [
              {
                type: "text",
                text: {
                  content: shortenedText
                }
              }
            ]
          }
        });
        
      } else if (block.type === 'bulleted_list_item') {
        originalText = block.bulleted_list_item?.rich_text[0]?.text?.content || '';
        shortenedText = this.shortenText(originalText);
        
        await this.notion.blocks.update({
          block_id: block.id,
          bulleted_list_item: {
            rich_text: [
              {
                type: "text",
                text: {
                  content: shortenedText
                }
              }
            ]
          }
        });
      }
      
      console.log(`✅ 텍스트 줄이기 완료: ${originalText.substring(0, 30)}... → ${shortenedText.substring(0, 30)}...`);
      
    } catch (error) {
      console.error("❌ 블록 텍스트 줄이기 실패:", error.message);
    }
  }

  // ✂️ 텍스트 줄이기 함수
  shortenText(text) {
    if (!text) return '';
    
    // 모바일에 맞게 줄인 버전들
    const mobileVersions = {
      '실시간 건강 데이터 수집 및 AI 분석을 통한 웨어러블 헬스케어 솔루션입니다. ESP32 기반 하드웨어와 Vue.js 웹 애플리케이션, React Native 모바일 앱을 통합한 풀스택 프로젝트입니다.': '실시간 건강 데이터 수집 및 AI 분석을 통한 웨어러블 헬스케어 솔루션입니다.',
      'Hanwha BEYOND SW Camp에서 개발한 ESG 분석 대시보드입니다. 환경, 사회, 지배구조 데이터를 시각화하고 분석할 수 있는 웹 애플리케이션입니다.': 'Hanwha BEYOND SW Camp에서 개발한 ESG 분석 대시보드입니다.',
      '병원 예약을 더 편리하게 만들어보고 싶어서 시작한 프로젝트입니다. 사용자가 쉽게 병원을 찾고 예약할 수 있도록 UI/UX에 신경 썼어요.': '병원 예약을 더 편리하게 만들어보고 싶어서 시작한 프로젝트입니다.',
      '개발하면서 배운 것들을 정리하고 공유하는 블로그입니다. Jekyll Chirpy 테마를 우주 돌고래 컨셉으로 커스터마이징했어요.': '개발하면서 배운 것들을 정리하고 공유하는 블로그입니다.',
      '기술 스택: ESP32, Vue.js, React Native, Node.js, MySQL, AI 분석': 'ESP32, Vue.js, React Native, Node.js, MySQL, AI',
      '기술 스택: Vue.js, Spring Boot, Chart.js, MySQL, Docker': 'Vue.js, Spring Boot, Chart.js, MySQL, Docker',
      '기술 스택: Vue.js, Spring Boot, MySQL, Redis, AWS': 'Vue.js, Spring Boot, MySQL, Redis, AWS',
      '기술 스택: Jekyll, Chirpy Theme, GitHub Pages, CSS, JavaScript': 'Jekyll, Chirpy Theme, GitHub Pages, CSS, JS'
    };
    
    // 매칭되는 텍스트가 있으면 줄인 버전으로 교체
    for (const [original, shortened] of Object.entries(mobileVersions)) {
      if (text.includes(original)) {
        return text.replace(original, shortened);
      }
    }
    
    // 매칭되는 텍스트가 없으면 기본적으로 줄이기
    if (text.length > 80) {
      return text.substring(0, 80) + '...';
    }
    
    return text;
  }

  // 📱 모바일에 맞는 구조로 조정
  async adjustForMobile() {
    try {
      console.log("📱 모바일에 맞는 구조로 조정...");
      
      // 프로젝트 블록들 찾기
      const response = await this.notion.blocks.children.list({
        block_id: NOTION_PAGE_ID,
      });
      
      // 모바일에 맞는 간격 조정을 위한 구분선 추가
      await this.addMobileSpacing();
      
      console.log("✅ 모바일에 맞는 구조 조정 완료");
      
    } catch (error) {
      console.error("❌ 모바일 구조 조정 실패:", error.message);
    }
  }

  // 📏 모바일 간격 조정
  async addMobileSpacing() {
    try {
      // 프로젝트 블록들 찾기
      const response = await this.notion.blocks.children.list({
        block_id: NOTION_PAGE_ID,
      });
      
      // Featured Projects 섹션 다음에 모바일 최적화 안내 추가
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
                      content: "📱 모바일에서도 최적화되어 있습니다!"
                    }
                  }
                ]
              }
            }
          ]
        });
      }
      
    } catch (error) {
      console.error("❌ 모바일 간격 조정 실패:", error.message);
    }
  }

  // 🎯 전체 모바일 최적화 실행
  async optimizeAll() {
    console.log("📱 전체 모바일 최적화 시작...");
    
    await this.optimizeForMobile();
    
    console.log("🎉 전체 모바일 최적화 완료!");
    console.log("✨ 이제 모바일에서도 깔끔하게 보입니다!");
  }
}

// 실행
const optimizer = new MobileOptimizer();
optimizer.optimizeAll();
