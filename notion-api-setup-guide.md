# 🔧 Notion API 설정 가이드 (5분 완성)

## 📋 **1단계: Notion Integration 생성 (2분)**

1. **Notion Integration 페이지 접속**
   - https://www.notion.so/my-integrations
   - "New integration" 클릭

2. **Integration 정보 입력**
   ```
   Name: Cursor Portfolio Manager
   Logo: (선택사항)
   Associated workspace: 71_stars 워크스페이스 선택
   ```

3. **API Key 복사**
   - 생성된 Integration에서 "Internal Integration Token" 복사
   - `secret_xxxxxxxxxxxxx` 형태의 키

## 🔑 **2단계: 페이지 권한 부여 (1분)**

### **방법 A: 페이지에서 직접 권한 부여**
1. 포트폴리오 페이지 열기
2. 우측 상단 "Share" 버튼 클릭
3. "Add people" → "Add more" → "Add an integration"
4. "Cursor Portfolio Manager" 검색 후 추가

### **방법 B: URL로 권한 부여**
```
https://www.notion.so/71_stars-2697705af35080d29bd3ec3447918eab?v=integration_id
```

## ⚙️ **3단계: Cursor에서 환경 설정 (2분)**

### **패키지 설치**
```bash
npm init -y
npm install @notionhq/client dotenv
```

### **환경변수 파일 생성**
```bash
# .env 파일 생성
echo "NOTION_API_KEY=secret_xxxxxxxxxxxxx" > .env
echo "NOTION_PAGE_ID=2697705af35080d29bd3ec3447918eab" >> .env
```

### **실행 스크립트 생성**
```bash
# quick-notion-setup.js 파일의 API 키 부분 수정
# NOTION_API_KEY = 'your_notion_api_key_here'; 
# ↓ 실제 키로 교체
# NOTION_API_KEY = 'secret_xxxxxxxxxxxxx';
```

## 🚀 **4단계: 실행 및 테스트**

### **스크립트 실행**
```bash
node quick-notion-setup.js
```

### **예상 결과**
```
🚀 포트폴리오 업데이트 시작...
✅ 제목 업데이트 완료!
✅ 한 줄 요약 업데이트 완료!
✅ 새 기술 추가 완료!
🎉 모든 업데이트 완료!
```

## 🎯 **Cursor AI 활용 팁**

### **효과적인 프롬프트**
```
"Notion API를 사용해서 내 포트폴리오 페이지를 자동으로 업데이트하는 
스크립트를 만들어줘. 기존 디자인은 그대로 유지하고 내용만 바꿔줘."
```

### **단계별 요청**
1. "Notion API 연결 테스트 스크립트 작성"
2. "페이지 구조 분석 및 블록 ID 찾기"
3. "안전한 업데이트 로직 구현"
4. "에러 처리 및 롤백 기능 추가"

## ✅ **완료 체크리스트**

- [ ] Notion Integration 생성 완료
- [ ] API Key 복사 완료
- [ ] 페이지 권한 부여 완료
- [ ] 환경변수 설정 완료
- [ ] 스크립트 실행 성공
- [ ] Notion 페이지 업데이트 확인

## 🆘 **문제 해결**

### **권한 오류 발생 시**
```
Error: Unauthorized
```
→ 페이지 권한 부여 다시 확인

### **블록 ID 오류 시**
```
Error: Invalid block ID
```
→ 페이지 구조 분석 후 올바른 블록 ID 사용

### **API 키 오류 시**
```
Error: Invalid API key
```
→ Integration에서 새 API 키 생성

## 🎉 **성공 후 다음 단계**

1. **자동화 스케줄링**: GitHub Actions 설정
2. **실시간 동기화**: 파일 변경 감지
3. **고급 기능**: 이미지 자동 업로드, 테이블 생성
4. **모니터링**: 업데이트 로그 및 알림

**총 소요 시간: 5분 이내!** 🚀
