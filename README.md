# 🌟 Notion 포트폴리오 자동화 시스템

> Notion API를 활용한 포트폴리오 자동 업데이트 및 관리 시스템입니다.

## 🚀 주요 기능

- **Notion API 연동**: 포트폴리오 페이지 자동 업데이트
- **프로젝트 관리**: 각 프로젝트별 설명, 이미지, 링크 관리
- **모바일 최적화**: 반응형 디자인 및 모바일 친화적 구조
- **CI/CD 파이프라인**: GitHub Actions를 통한 자동화
- **HTML 생성**: 포트폴리오 웹사이트 자동 생성

## 📋 프로젝트 목록

### GreenWear
- **설명**: 스마트 웨어러블 헬스케어 플랫폼
- **기술 스택**: ESP32, Vue.js, React Native, Node.js, MySQL, AI 분석
- **개발 기간**: 2024.03 - 2024.06
- **담당 역할**: 풀스택 개발자
- **Live Demo**: [https://greenwear-demo.vercel.app/](https://greenwear-demo.vercel.app/)
- **Source Code**: [https://github.com/saway126/greenwear](https://github.com/saway126/greenwear)

### HRIM
- **설명**: ESG 분석 대시보드
- **기술 스택**: Vue.js, Spring Boot, Chart.js, MySQL, Docker
- **개발 기간**: 2024.07 - 2024.08
- **담당 역할**: 프론트엔드 개발자
- **Live Demo**: [https://www.imhr.kro.kr/login](https://www.imhr.kro.kr/login)
- **Source Code**: [https://github.com/beyond-sw-camp/be12-fin-HRIM-IMHR-FE](https://github.com/beyond-sw-camp/be12-fin-HRIM-IMHR-FE)

### QueDoc
- **설명**: 병원 예약 시스템
- **기술 스택**: Vue.js, Spring Boot, MySQL, Redis, AWS
- **개발 기간**: 2024.01 - 2024.04
- **담당 역할**: 풀스택 개발자
- **Live Demo**: [https://www.quedoc.kro.kr/](https://www.quedoc.kro.kr/)
- **Source Code**: [https://github.com/saway126/QueDoc](https://github.com/saway126/QueDoc)

### 기술 블로그
- **설명**: 71_stars 개발 블로그
- **기술 스택**: Jekyll, Chirpy Theme, GitHub Pages, CSS, JavaScript
- **개발 기간**: 2023.12 - 현재
- **담당 역할**: 개발자 & 블로거
- **Live Demo**: [https://saway126.github.io/](https://saway126.github.io/)
- **Source Code**: [https://github.com/saway126/saway126.github.io](https://github.com/saway126/saway126.github.io)

## 🛠️ 기술 스택

- **Backend**: Node.js, Express
- **API**: Notion API
- **Frontend**: HTML, CSS, JavaScript
- **CI/CD**: GitHub Actions
- **Package Manager**: npm

## 📦 설치 및 실행

### 1. 저장소 클론
```bash
git clone https://github.com/saway126/kks_notion.git
cd kks_notion
```

### 2. 의존성 설치
```bash
npm install
```

### 3. 환경변수 설정
```bash
# .env 파일 생성
cp env-example.txt .env

# .env 파일에 실제 값 입력
NOTION_API_KEY=your-notion-api-key-here
NOTION_PAGE_ID=your-notion-page-id-here
```

### 4. 실행
```bash
# 포트폴리오 업데이트
node add-project-links.js

# 모바일 최적화
node mobile-optimize.js
```

## 🔧 주요 스크립트

- `add-project-links.js`: 프로젝트 링크 추가
- `mobile-optimize.js`: 모바일 최적화
- `portfolio.html`: 포트폴리오 웹사이트
- `notion-api-automation.js`: Notion API 자동화

## 📱 모바일 최적화

- 반응형 디자인 적용
- 텍스트 길이 최적화
- 터치 친화적 인터페이스
- 빠른 로딩 속도

## 🔐 보안

- API 키는 환경변수로 관리
- GitHub Secret Scanning 적용
- 민감한 정보 보호

## 📄 라이선스

MIT License

## 👨‍💻 개발자

김기성 (Ki-sung Kim)
- GitHub: [@saway126](https://github.com/saway126)
- Portfolio: [https://saway126.github.io/](https://saway126.github.io/)
- Blog: [https://blog.naver.com/71_stars](https://blog.naver.com/71_stars)
