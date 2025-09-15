# 🚀 Notion API 자동 업데이트 시스템 구축 가이드

## ✅ 완성된 시스템

**Notion API를 통한 자동 업데이트 시스템**이 완성되었습니다! 이제 HTML 포트폴리오가 변경될 때마다 자동으로 Notion 페이지가 업데이트됩니다.

## 🔧 설정 방법

### 1단계: Notion 통합 생성
1. [Notion 통합 페이지](https://www.notion.so/my-integrations)로 이동
2. "새 통합 만들기" 클릭
3. 통합 이름: "Portfolio Auto Sync"
4. 워크스페이스 선택 후 생성
5. **Internal Integration Token** 복사 (이게 API 키입니다)

### 2단계: 페이지 권한 부여
1. [포트폴리오 페이지](https://www.notion.so/71_stars-2697705af35080d29bd3ec3447918eab)로 이동
2. 우상단 "..." 메뉴 → "Add connections"
3. 방금 만든 "Portfolio Auto Sync" 통합 선택
4. 권한 부여 완료

### 3단계: 환경변수 설정
```bash
# Windows (PowerShell)
$env:NOTION_API_KEY="your_actual_api_key_here"

# Windows (CMD)
set NOTION_API_KEY=your_actual_api_key_here

# macOS/Linux
export NOTION_API_KEY="your_actual_api_key_here"
```

### 4단계: 스크립트 실행
```bash
node notion-api-automation.js
```

## 🎯 자동화 기능

### 📝 **실시간 동기화**
- `portfolio.html` 파일이 변경되면 자동으로 Notion 업데이트
- GitHub에 푸시할 때마다 자동 동기화

### ⏰ **스케줄링**
- 매주 월요일 오전 9시 자동 업데이트
- 수동 실행도 가능

### 🔄 **양방향 동기화**
- HTML → Notion: 자동 변환 및 업데이트
- Notion → HTML: 수동 복사 가능

## 📊 업데이트되는 내용

### ✅ **제목 변경**
- "Web Frontend Designer" → "Full Stack Developer"

### ✅ **Skills 확장**
- Frontend: Vue.js, React, TypeScript, Next.js
- Backend: Java, Spring Boot, Node.js, Express
- DevOps: Docker, AWS, GitHub Actions
- Mobile & IoT: React Native, ESP32, Arduino

### ✅ **프로젝트 강화**
- **GreenWear**: 완전한 풀스택 헬스케어 플랫폼
- **HRIM**: ESG 분석 대시보드
- **71_stars Blog**: 우주 테마 커스텀 블로그

### ✅ **경험 추가**
- QA 인턴 경험 상세화
- Hanwha BEYOND SW Camp 경험 추가

## 🚀 GitHub Actions 자동화

생성된 `.github/workflows/notion-sync.yml` 파일로:

### 📅 **자동 트리거**
- `portfolio.html` 파일 변경 시
- 매주 월요일 오전 9시

### 🔐 **보안 설정**
- GitHub Secrets에 `NOTION_API_KEY` 저장
- 안전한 API 키 관리

### 📈 **모니터링**
- GitHub Actions 탭에서 실행 상태 확인
- 실패 시 이메일 알림

## 🛠️ 고급 기능

### 📱 **모바일 최적화**
- 반응형 디자인으로 모든 디바이스 지원
- 터치 인터페이스 최적화

### 🎨 **그린 테마 적용**
- Primary Green (#10b981) 기반 색상 체계
- 일관된 디자인 시스템

### 🔍 **SEO 최적화**
- 메타 태그 자동 생성
- 검색 엔진 최적화

## 🎉 완성된 결과

이제 다음과 같은 완전 자동화 시스템이 구축되었습니다:

1. **HTML 포트폴리오** (`portfolio.html`) - 그린 테마의 완전한 풀스택 개발자 포트폴리오
2. **Notion 마크다운** (`portfolio-notion.md`) - 수동 복사용 마크다운 파일
3. **자동화 스크립트** (`notion-api-automation.js`) - Notion API 자동 업데이트
4. **GitHub Actions** (`.github/workflows/notion-sync.yml`) - CI/CD 파이프라인

## 🔗 관련 링크

- [포트폴리오 페이지](https://www.notion.so/71_stars-2697705af35080d29bd3ec3447918eab)
- [GreenWear Demo](https://greenwear-demo.vercel.app/)
- [GitHub GreenWear](https://github.com/saway126/greenwear)
- [개인 블로그](https://saway126.github.io/)

---

**🎯 이제 HTML 포트폴리오를 수정하면 자동으로 Notion 페이지가 업데이트됩니다!**
