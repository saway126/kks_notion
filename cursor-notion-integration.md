# 🎯 Cursor를 통한 Notion 제어 및 자동화

## 🔧 **방법 1: Notion API + Cursor 자동화**

### **설정 단계**
1. **Notion Integration 생성**
   - https://www.notion.so/my-integrations 접속
   - "New integration" 클릭
   - 이름: "Cursor Portfolio Manager"
   - 워크스페이스 선택

2. **페이지 권한 부여**
   - 포트폴리오 페이지에서 "Share" → "Add people" → Integration 추가
   - 또는 페이지 URL에 `?v=` 파라미터로 권한 설정

3. **Cursor에서 환경변수 설정**
   ```bash
   # .env 파일 생성
   NOTION_API_KEY=secret_xxxxxxxxxxxxx
   NOTION_PAGE_ID=2697705af35080d29bd3ec3447918eab
   ```

### **자동화 스크립트 예시**
```javascript
// notion-auto-update.js
const { Client } = require('@notionhq/client');

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

async function updatePortfolio() {
  try {
    // 페이지 내용 업데이트
    await notion.pages.update({
      page_id: process.env.NOTION_PAGE_ID,
      properties: {
        title: {
          title: [
            {
              text: {
                content: "71_stars 기성이의 포토폴리오 - Full Stack Developer"
              }
            }
          ]
        }
      }
    });
    
    console.log("✅ 포트폴리오 업데이트 완료!");
  } catch (error) {
    console.error("❌ 업데이트 실패:", error);
  }
}

updatePortfolio();
```

## 🤖 **방법 2: Cursor AI 명령어로 Notion 제어**

### **Cursor 명령어 예시**
```
@notion-update "제목을 'Full Stack Developer'로 변경하고, 
Skills 섹션에 Backend, DevOps, Mobile & IoT 기술을 추가해줘"
```

### **자동화 워크플로우**
1. **포트폴리오 내용 수정** → Cursor에서 코드 작성
2. **자동 감지** → 변경사항을 Notion API로 전송
3. **실시간 업데이트** → Notion 페이지 자동 갱신

## 🔄 **방법 3: GitHub Actions + Cursor 연동**

### **워크플로우 설정**
```yaml
# .github/workflows/notion-sync.yml
name: Notion Portfolio Sync

on:
  push:
    paths:
      - 'portfolio-content/**'
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
      - name: Update Notion
        env:
          NOTION_API_KEY: ${{ secrets.NOTION_API_KEY }}
        run: node notion-auto-update.js
```

## 🎨 **방법 4: 디자인 보존 자동화**

### **스마트 업데이트 시스템**
```javascript
// smart-notion-update.js
class NotionPortfolioManager {
  constructor() {
    this.notion = new Client({ auth: process.env.NOTION_API_KEY });
  }

  async updateSection(sectionId, newContent) {
    // 기존 디자인 유지하면서 내용만 업데이트
    await this.notion.blocks.update({
      block_id: sectionId,
      [sectionId]: {
        type: "paragraph",
        paragraph: {
          rich_text: [
            {
              type: "text",
              text: { content: newContent }
            }
          ]
        }
      }
    });
  }

  async addNewSection(parentId, content) {
    // 새 섹션 추가 (기존 스타일 유지)
    await this.notion.blocks.children.append({
      block_id: parentId,
      children: [
        {
          type: "heading_2",
          heading_2: {
            rich_text: [
              {
                type: "text",
                text: { content: content.title }
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
                text: { content: content.description }
              }
            ]
          }
        }
      ]
    });
  }
}
```

## 🚀 **실제 구현 단계**

### **1단계: 기본 설정**
```bash
# 프로젝트 초기화
npm init -y
npm install @notionhq/client dotenv

# 환경변수 설정
echo "NOTION_API_KEY=your_api_key_here" > .env
echo "NOTION_PAGE_ID=2697705af35080d29bd3ec3447918eab" >> .env
```

### **2단계: Cursor에서 자동화 스크립트 작성**
- Cursor AI에게 "Notion API를 사용해서 포트폴리오를 자동 업데이트하는 스크립트를 만들어줘" 요청
- 기존 디자인을 유지하면서 내용만 변경하는 로직 구현

### **3단계: 실시간 동기화 설정**
- 파일 변경 감지 → 자동 Notion 업데이트
- Git 커밋 시 → 포트폴리오 자동 갱신
- 스케줄링 → 정기적 업데이트

## 💡 **Cursor AI 활용 팁**

### **효과적인 프롬프트**
```
"기존 Notion 페이지의 디자인을 완전히 보존하면서, 
포트폴리오 내용만 업데이트하는 자동화 스크립트를 만들어줘.
특히 그린 테마와 2열 레이아웃은 그대로 유지해야 해."
```

### **단계별 요청**
1. "Notion API 연결 스크립트 작성"
2. "기존 페이지 구조 분석 및 백업"
3. "스마트 업데이트 로직 구현"
4. "에러 처리 및 롤백 기능 추가"

## ✅ **장점**

- 🎨 **디자인 완전 보존**: 기존 아름다운 레이아웃 유지
- 🤖 **완전 자동화**: 한 번 설정하면 자동 업데이트
- 🔄 **실시간 동기화**: 코드 변경 시 즉시 반영
- 📱 **반응형 유지**: 모바일에서도 동일한 디자인
- 🛡️ **안전한 업데이트**: 백업 및 롤백 기능

## 🎯 **다음 단계**

1. **Notion Integration 생성** (5분)
2. **Cursor에서 자동화 스크립트 작성** (10분)
3. **테스트 실행** (5분)
4. **실제 포트폴리오 업데이트** (즉시!)

지금 바로 시작해볼까요? 🚀
