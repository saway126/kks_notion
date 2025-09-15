// HTML to Notion Markdown Converter
// 포트폴리오 HTML을 Notion 마크다운 형식으로 변환

const fs = require('fs');
const path = require('path');

// HTML 파일 읽기
const htmlContent = fs.readFileSync('portfolio.html', 'utf8');

// 간단한 HTML 파서 (실제로는 cheerio 같은 라이브러리 사용 권장)
function htmlToNotionMarkdown(html) {
    let markdown = '';
    
    // 헤더 섹션
    markdown += `# 김기성 - Full Stack Developer\n\n`;
    markdown += `**프론트엔드부터 백엔드까지 전체 시스템을 설계하고 구현합니다.**\n`;
    markdown += `Vue/React 기반 UI 개발, Spring Boot 백엔드, 데이터베이스 설계, 클라우드 배포까지 풀스택 역량을 보유합니다.\n\n`;
    
    // About 섹션
    markdown += `## About Me\n\n`;
    markdown += `### 문제 해결 중심의 풀스택 개발자\n\n`;
    markdown += `- 문제 정의 → 가설 → 실험 → 검증의 빌드 루프로 빠르게 학습합니다.\n`;
    markdown += `- Vue/React · Spring Boot · MySQL로 풀스택 웹 애플리케이션을 개발합니다.\n`;
    markdown += `- 접근성, 성능, 테스트, CI/CD 기준을 문서화해 팀의 일관성을 지킵니다.\n\n`;
    markdown += `프론트엔드와 백엔드의 경계를 넘나들며 전체 시스템을 이해하고, 데이터베이스 쿼리부터 프론트엔드 렌더링까지 전반적인 성능을 고려합니다.\n\n`;
    
    // Skills 섹션
    markdown += `## Skills\n\n`;
    markdown += `### Frontend Skills\n`;
    markdown += `- **Framework**: Vue.js, React, TypeScript, Next.js\n`;
    markdown += `- **UI/UX**: 디자인 토큰, 반응형 레이아웃, 다크모드, 접근성(ARIA)\n`;
    markdown += `- **상태 관리**: Pinia, Redux, Zustand, Context API\n`;
    markdown += `- **스타일링**: Tailwind CSS, Styled Components, CSS Modules\n`;
    markdown += `- **테스트**: Vitest, Jest, Cypress, Storybook\n\n`;
    
    markdown += `### Backend Skills\n`;
    markdown += `- **Language**: Java, Python, Node.js, TypeScript\n`;
    markdown += `- **Framework**: Spring Boot, Express.js, FastAPI\n`;
    markdown += `- **Database**: MySQL, PostgreSQL, MongoDB, Redis\n`;
    markdown += `- **API**: REST API, GraphQL, Swagger/OpenAPI\n`;
    markdown += `- **DevOps**: Docker, AWS, GitHub Actions, CI/CD\n\n`;
    
    markdown += `### DevOps\n`;
    markdown += `- **Container**: Docker, Kubernetes\n`;
    markdown += `- **Cloud**: AWS, Vercel, Railway\n`;
    markdown += `- **CI/CD**: GitHub Actions, 자동 배포 파이프라인\n`;
    markdown += `- **Monitoring**: 로깅 및 성능 모니터링\n\n`;
    
    markdown += `### Mobile & IoT\n`;
    markdown += `- **Mobile**: React Native 크로스 플랫폼\n`;
    markdown += `- **Hardware**: ESP32, Arduino\n`;
    markdown += `- **Communication**: WebSocket, MQTT\n`;
    markdown += `- **Real-time**: 실시간 데이터 처리\n`;
    markdown += `- **Integration**: 하드웨어 연동\n\n`;
    
    // Projects 섹션
    markdown += `## Featured Projects\n\n`;
    
    // GreenWear 프로젝트
    markdown += `### 🌱 GreenWear\n\n`;
    markdown += `**완전한 스마트 웨어러블 헬스케어 플랫폼**\n\n`;
    markdown += `ESP32 기반 하드웨어부터 Vue.js 웹앱, React Native 모바일앱, Node.js 백엔드, AI 분석까지 풀스택으로 구현한 통합 솔루션입니다.\n\n`;
    markdown += `**Tech Stack:**\n`;
    markdown += `- Frontend: Vue.js, TypeScript, Pinia\n`;
    markdown += `- Backend: Node.js, Express, AI/ML 모델\n`;
    markdown += `- Mobile: React Native\n`;
    markdown += `- Hardware: ESP32, Arduino\n`;
    markdown += `- Cloud: AWS, Vercel, Railway\n\n`;
    markdown += `**Links:**\n`;
    markdown += `- [Live Demo](https://greenwear-demo.vercel.app/)\n`;
    markdown += `- [GitHub Repository](https://github.com/saway126/greenwear)\n\n`;
    
    // HRIM 프로젝트
    markdown += `### 🏢 HRIM\n\n`;
    markdown += `**ESG 지표 분석 대시보드**\n\n`;
    markdown += `연도와 회사 파라미터에 따라 동적으로 ESG 지표가 반영되는 데이터 시각화 플랫폼입니다. Hanwha BEYOND SW Camp 최종 프로젝트로 개발했습니다.\n\n`;
    markdown += `**Tech Stack:**\n`;
    markdown += `- Frontend: Vue.js, TypeScript, Chart.js\n`;
    markdown += `- Backend: Java, Spring Boot, JPA\n`;
    markdown += `- Database: MariaDB\n`;
    markdown += `- Features: 데이터 시각화, 필터링, 엑셀 내보내기\n\n`;
    markdown += `**Links:**\n`;
    markdown += `- [Frontend Repository](https://github.com/beyond-sw-camp/be12-fin-HRIM-IMHR-FE)\n`;
    markdown += `- [Backend Repository](https://github.com/beyond-sw-camp/be12-fin-HRIM-IMHR-BE)\n\n`;
    
    // 블로그 프로젝트
    markdown += `### 🪐 71_stars Blog\n\n`;
    markdown += `**Jekyll 기반 우주 테마 커스텀 블로그**\n\n`;
    markdown += `200+ 포스팅과 함께 개발 회고록과 기술 블로그를 운영하고 있습니다. 다크모드, 검색 기능, 댓글 시스템을 구현했습니다.\n\n`;
    markdown += `**Tech Stack:**\n`;
    markdown += `- Framework: Jekyll, Liquid\n`;
    markdown += `- Styling: CSS, JavaScript\n`;
    markdown += `- Hosting: GitHub Pages\n`;
    markdown += `- Features: 다크모드, 검색, 댓글 시스템\n\n`;
    markdown += `**Links:**\n`;
    markdown += `- [Visit Blog](https://saway126.github.io/)\n`;
    markdown += `- [Source Code](https://github.com/saway126/saway126.github.io)\n\n`;
    
    // Experience 섹션
    markdown += `## Experience\n\n`;
    markdown += `### QA 인턴 - 포스트 미디어\n`;
    markdown += `**2024.09 - 2024.11**\n\n`;
    markdown += `- 사용자 시나리오 기반 테스트 케이스 설계 및 실행\n`;
    markdown += `- 버그 추적·우선순위화로 안정성 향상, 회귀 테스트 시나리오 문서화\n`;
    markdown += `- 풀스택 애플리케이션 테스트 자동화 도구 개발\n\n`;
    
    markdown += `### Hanwha BEYOND SW Camp\n`;
    markdown += `**풀스택 웹 개발 과정 - 2024**\n\n`;
    markdown += `- 풀스택 웹 개발 과정 수료\n`;
    markdown += `- 최종 프로젝트: HRIM (ESG 분석 대시보드)\n`;
    markdown += `- 팀 프로젝트 리더 경험\n\n`;
    
    // Contact 섹션
    markdown += `## Contact\n\n`;
    markdown += `새로운 프로젝트나 협업 기회에 대해 이야기해보세요.\n\n`;
    markdown += `- **Email**: [skwak12346@gmail.com](mailto:skwak12346@gmail.com)\n`;
    markdown += `- **GitHub**: [github.com/saway126](https://github.com/saway126)\n`;
    markdown += `- **Blog**: [saway126.github.io](https://saway126.github.io/)\n`;
    markdown += `- **Naver Blog**: [blog.naver.com/71_stars](https://blog.naver.com/71_stars)\n\n`;
    
    // Philosophy 섹션
    markdown += `## Full Stack Development Philosophy\n\n`;
    markdown += `- **문제 해결 중심**: 사용자 요구사항을 정확히 파악하고 최적의 솔루션을 설계합니다\n`;
    markdown += `- **기술 통합**: 프론트엔드와 백엔드의 경계를 넘나들며 전체 시스템을 이해합니다\n`;
    markdown += `- **성능 최적화**: 데이터베이스 쿼리부터 프론트엔드 렌더링까지 전반적인 성능을 고려합니다\n`;
    markdown += `- **확장성**: 마이크로서비스 아키텍처와 클라우드 기술을 활용해 확장 가능한 시스템을 구축합니다\n`;
    markdown += `- **품질 보증**: 테스트 자동화와 CI/CD 파이프라인으로 안정적인 서비스를 제공합니다\n\n`;
    
    return markdown;
}

// 변환 실행
const notionMarkdown = htmlToNotionMarkdown(htmlContent);

// 결과를 파일로 저장
fs.writeFileSync('portfolio-notion.md', notionMarkdown, 'utf8');

console.log('✅ HTML을 Notion 마크다운으로 변환 완료!');
console.log('📄 portfolio-notion.md 파일을 확인하세요.');
console.log('\n📋 다음 단계:');
console.log('1. portfolio-notion.md 파일을 열어서 내용 확인');
console.log('2. Notion 페이지에 복사-붙여넣기');
console.log('3. 필요에 따라 이미지나 링크 추가');
