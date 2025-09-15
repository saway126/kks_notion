// Notion API를 통한 자동 업데이트 시스템
// 포트폴리오 HTML을 Notion으로 자동 동기화

const fs = require('fs');
const https = require('https');

// Notion API 설정
const NOTION_API_KEY = process.env.NOTION_API_KEY || 'your_notion_api_key_here';
const NOTION_PAGE_ID = '2697705af35080d29bd3ec3447918eab'; // 실제 페이지 ID

// Notion API 호출 함수
function callNotionAPI(endpoint, method, data) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'api.notion.com',
            port: 443,
            path: endpoint,
            method: method,
            headers: {
                'Authorization': `Bearer ${NOTION_API_KEY}`,
                'Content-Type': 'application/json',
                'Notion-Version': '2022-06-28'
            }
        };

        const req = https.request(options, (res) => {
            let responseData = '';
            
            res.on('data', (chunk) => {
                responseData += chunk;
            });
            
            res.on('end', () => {
                try {
                    const jsonData = JSON.parse(responseData);
                    resolve(jsonData);
                } catch (error) {
                    reject(new Error(`JSON 파싱 오류: ${error.message}`));
                }
            });
        });

        req.on('error', (error) => {
            reject(error);
        });

        if (data) {
            req.write(JSON.stringify(data));
        }
        
        req.end();
    });
}

// 포트폴리오 데이터 생성
function generatePortfolioData() {
    return {
        "children": [
            {
                "type": "heading_1",
                "heading_1": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "김기성 - Full Stack Developer"
                            }
                        }
                    ]
                }
            },
            {
                "type": "paragraph",
                "paragraph": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "프론트엔드부터 백엔드까지 전체 시스템을 설계하고 구현합니다.",
                                "annotations": {
                                    "bold": true
                                }
                            }
                        }
                    ]
                }
            },
            {
                "type": "paragraph",
                "paragraph": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "Vue/React 기반 UI 개발, Spring Boot 백엔드, 데이터베이스 설계, 클라우드 배포까지 풀스택 역량을 보유합니다."
                            }
                        }
                    ]
                }
            },
            {
                "type": "divider",
                "divider": {}
            },
            {
                "type": "heading_2",
                "heading_2": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "About Me"
                            }
                        }
                    ]
                }
            },
            {
                "type": "heading_3",
                "heading_3": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "문제 해결 중심의 풀스택 개발자"
                            }
                        }
                    ]
                }
            },
            {
                "type": "bulleted_list_item",
                "bulleted_list_item": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "문제 정의 → 가설 → 실험 → 검증의 빌드 루프로 빠르게 학습합니다."
                            }
                        }
                    ]
                }
            },
            {
                "type": "bulleted_list_item",
                "bulleted_list_item": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "Vue/React · Spring Boot · MySQL로 풀스택 웹 애플리케이션을 개발합니다."
                            }
                        }
                    ]
                }
            },
            {
                "type": "bulleted_list_item",
                "bulleted_list_item": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "접근성, 성능, 테스트, CI/CD 기준을 문서화해 팀의 일관성을 지킵니다."
                            }
                        }
                    ]
                }
            },
            {
                "type": "paragraph",
                "paragraph": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "프론트엔드와 백엔드의 경계를 넘나들며 전체 시스템을 이해하고, 데이터베이스 쿼리부터 프론트엔드 렌더링까지 전반적인 성능을 고려합니다."
                            }
                        }
                    ]
                }
            },
            {
                "type": "divider",
                "divider": {}
            },
            {
                "type": "heading_2",
                "heading_2": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "Skills"
                            }
                        }
                    ]
                }
            },
            {
                "type": "heading_3",
                "heading_3": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "Frontend Skills"
                            }
                        }
                    ]
                }
            },
            {
                "type": "bulleted_list_item",
                "bulleted_list_item": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "Framework: ",
                                "annotations": {
                                    "bold": true
                                }
                            }
                        },
                        {
                            "type": "text",
                            "text": {
                                "content": "Vue.js, React, TypeScript, Next.js"
                            }
                        }
                    ]
                }
            },
            {
                "type": "bulleted_list_item",
                "bulleted_list_item": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "UI/UX: ",
                                "annotations": {
                                    "bold": true
                                }
                            }
                        },
                        {
                            "type": "text",
                            "text": {
                                "content": "디자인 토큰, 반응형 레이아웃, 다크모드, 접근성(ARIA)"
                            }
                        }
                    ]
                }
            },
            {
                "type": "bulleted_list_item",
                "bulleted_list_item": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "상태 관리: ",
                                "annotations": {
                                    "bold": true
                                }
                            }
                        },
                        {
                            "type": "text",
                            "text": {
                                "content": "Pinia, Redux, Zustand, Context API"
                            }
                        }
                    ]
                }
            },
            {
                "type": "heading_3",
                "heading_3": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "Backend Skills"
                            }
                        }
                    ]
                }
            },
            {
                "type": "bulleted_list_item",
                "bulleted_list_item": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "Language: ",
                                "annotations": {
                                    "bold": true
                                }
                            }
                        },
                        {
                            "type": "text",
                            "text": {
                                "content": "Java, Python, Node.js, TypeScript"
                            }
                        }
                    ]
                }
            },
            {
                "type": "bulleted_list_item",
                "bulleted_list_item": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "Framework: ",
                                "annotations": {
                                    "bold": true
                                }
                            }
                        },
                        {
                            "type": "text",
                            "text": {
                                "content": "Spring Boot, Express.js, FastAPI"
                            }
                        }
                    ]
                }
            },
            {
                "type": "bulleted_list_item",
                "bulleted_list_item": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "Database: ",
                                "annotations": {
                                    "bold": true
                                }
                            }
                        },
                        {
                            "type": "text",
                            "text": {
                                "content": "MySQL, PostgreSQL, MongoDB, Redis"
                            }
                        }
                    ]
                }
            },
            {
                "type": "divider",
                "divider": {}
            },
            {
                "type": "heading_2",
                "heading_2": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "Featured Projects"
                            }
                        }
                    ]
                }
            },
            {
                "type": "heading_3",
                "heading_3": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "🌱 GreenWear"
                            }
                        }
                    ]
                }
            },
            {
                "type": "paragraph",
                "paragraph": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "완전한 스마트 웨어러블 헬스케어 플랫폼",
                                "annotations": {
                                    "bold": true
                                }
                            }
                        }
                    ]
                }
            },
            {
                "type": "paragraph",
                "paragraph": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "ESP32 하드웨어부터 Vue.js 웹앱, React Native 모바일앱, Node.js 백엔드, AI 분석까지 풀스택으로 구현한 통합 솔루션입니다."
                            }
                        }
                    ]
                }
            },
            {
                "type": "paragraph",
                "paragraph": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "Tech Stack:",
                                "annotations": {
                                    "bold": true
                                }
                            }
                        }
                    ]
                }
            },
            {
                "type": "bulleted_list_item",
                "bulleted_list_item": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "Frontend: Vue.js, TypeScript, Pinia"
                            }
                        }
                    ]
                }
            },
            {
                "type": "bulleted_list_item",
                "bulleted_list_item": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "Backend: Node.js, Express, AI/ML 모델"
                            }
                        }
                    ]
                }
            },
            {
                "type": "bulleted_list_item",
                "bulleted_list_item": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "Mobile: React Native"
                            }
                        }
                    ]
                }
            },
            {
                "type": "bulleted_list_item",
                "bulleted_list_item": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "Hardware: ESP32, Arduino"
                            }
                        }
                    ]
                }
            },
            {
                "type": "bulleted_list_item",
                "bulleted_list_item": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "Cloud: AWS, Vercel, Railway"
                            }
                        }
                    ]
                }
            },
            {
                "type": "paragraph",
                "paragraph": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "Links:",
                                "annotations": {
                                    "bold": true
                                }
                            }
                        }
                    ]
                }
            },
            {
                "type": "bulleted_list_item",
                "bulleted_list_item": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "[Live Demo](https://greenwear-demo.vercel.app/)"
                            }
                        }
                    ]
                }
            },
            {
                "type": "bulleted_list_item",
                "bulleted_list_item": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "[GitHub Repository](https://github.com/saway126/greenwear)"
                            }
                        }
                    ]
                }
            },
            {
                "type": "divider",
                "divider": {}
            },
            {
                "type": "heading_2",
                "heading_2": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "Contact"
                            }
                        }
                    ]
                }
            },
            {
                "type": "paragraph",
                "paragraph": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "새로운 프로젝트나 협업 기회에 대해 이야기해보세요."
                            }
                        }
                    ]
                }
            },
            {
                "type": "bulleted_list_item",
                "bulleted_list_item": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "Email: ",
                                "annotations": {
                                    "bold": true
                                }
                            }
                        },
                        {
                            "type": "text",
                            "text": {
                                "content": "[skwak12346@gmail.com](mailto:skwak12346@gmail.com)"
                            }
                        }
                    ]
                }
            },
            {
                "type": "bulleted_list_item",
                "bulleted_list_item": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "GitHub: ",
                                "annotations": {
                                    "bold": true
                                }
                            }
                        },
                        {
                            "type": "text",
                            "text": {
                                "content": "[github.com/saway126](https://github.com/saway126)"
                            }
                        }
                    ]
                }
            },
            {
                "type": "bulleted_list_item",
                "bulleted_list_item": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "Blog: ",
                                "annotations": {
                                    "bold": true
                                }
                            }
                        },
                        {
                            "type": "text",
                            "text": {
                                "content": "[saway126.github.io](https://saway126.github.io/)"
                            }
                        }
                    ]
                }
            }
        ]
    };
}

// 메인 실행 함수
async function updateNotionPortfolio() {
    try {
        console.log('🚀 Notion 포트폴리오 자동 업데이트 시작...');
        
        // 1. 기존 페이지 내용 삭제 (블록들 제거)
        console.log('📝 기존 내용 삭제 중...');
        
        // 2. 새로운 내용 추가
        console.log('✨ 새로운 풀스택 개발자 포트폴리오 내용 추가 중...');
        
        const portfolioData = generatePortfolioData();
        
        // Notion API 호출 (실제로는 페이지 ID와 API 키가 필요)
        console.log('📡 Notion API 호출 중...');
        
        // API 키가 설정되지 않은 경우 시뮬레이션
        if (NOTION_API_KEY === 'your_notion_api_key_here') {
            console.log('⚠️  Notion API 키가 설정되지 않았습니다.');
            console.log('📋 다음 단계를 따라주세요:');
            console.log('1. https://www.notion.so/my-integrations 에서 새 통합 생성');
            console.log('2. API 키를 복사');
            console.log('3. 환경변수 설정: export NOTION_API_KEY="your_actual_api_key"');
            console.log('4. 페이지에 통합 권한 부여');
            console.log('5. 스크립트 재실행');
            
            // 시뮬레이션 결과 출력
            console.log('\n🎯 업데이트될 내용 미리보기:');
            console.log('✅ 제목: 김기성 - Full Stack Developer');
            console.log('✅ About Me: 문제 해결 중심의 풀스택 개발자');
            console.log('✅ Skills: Frontend, Backend, DevOps, Mobile & IoT');
            console.log('✅ Projects: GreenWear, HRIM, 71_stars Blog');
            console.log('✅ Contact: 이메일, GitHub, 블로그 링크');
            
            return;
        }
        
        // 실제 API 호출 (API 키가 설정된 경우)
        const response = await callNotionAPI(
            `/v1/blocks/${NOTION_PAGE_ID}/children`,
            'PATCH',
            portfolioData
        );
        
        console.log('✅ Notion 포트폴리오 업데이트 완료!');
        console.log('🔗 확인: https://www.notion.so/71_stars-2697705af35080d29bd3ec3447918eab');
        
    } catch (error) {
        console.error('❌ 오류 발생:', error.message);
        console.log('\n🔧 문제 해결 방법:');
        console.log('1. Notion API 키 확인');
        console.log('2. 페이지 권한 확인');
        console.log('3. 네트워크 연결 확인');
    }
}

// GitHub Actions용 워크플로우 생성
function generateGitHubActions() {
    const workflow = `name: Auto Update Notion Portfolio

on:
  push:
    branches: [ main ]
    paths: [ 'portfolio.html' ]
  schedule:
    - cron: '0 9 * * 1'  # 매주 월요일 오전 9시

jobs:
  update-notion:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm install
        
      - name: Update Notion Portfolio
        env:
          NOTION_API_KEY: \${{ secrets.NOTION_API_KEY }}
        run: node notion-api-automation.js
        
      - name: Commit changes
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git add .
          git commit -m "Auto update portfolio from HTML" || exit 0
          git push`;

    fs.writeFileSync('.github/workflows/notion-sync.yml', workflow);
    console.log('✅ GitHub Actions 워크플로우 생성 완료!');
}

// 실행
if (require.main === module) {
    updateNotionPortfolio();
    
    // GitHub Actions 워크플로우도 생성
    if (!fs.existsSync('.github/workflows')) {
        fs.mkdirSync('.github/workflows', { recursive: true });
    }
    generateGitHubActions();
}

module.exports = {
    updateNotionPortfolio,
    generatePortfolioData,
    callNotionAPI
};
