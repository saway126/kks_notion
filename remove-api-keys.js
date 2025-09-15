// 🔐 API 키 제거 및 환경변수로 변경
const fs = require('fs');
const path = require('path');

// API 키가 포함된 파일들
const filesWithApiKeys = [
  'add-real-screenshots.js',
  'make-portfolio-natural.js', 
  'restore-real-project-images.js',
  'restore-visual-cards.js',
  'update-quedoc-info.js',
  'add-project-gifs.js',
  'add-project-links.js',
  'add-quedoc-details.js',
  'analyze-current-design.js',
  'analyze-current-portfolio.js',
  'analyze-project-layout.js',
  'clean-text-formatting.js',
  'create-project-cards.js',
  'create-visual-portfolio.js',
  'direct-page-test.js',
  'extract-page-id.js',
  'final-design-polish.js',
  'final-ui-ux-polish.js',
  'find-page-id.js',
  'fix-project-images.js',
  'fix-project-layout.js',
  'fix-project-order-and-links.js',
  'fix-quedoc-image-and-profile.js',
  'fix-quedoc-image-size.js',
  'get-correct-page-id.js',
  'html-to-notion-converter.js',
  'mobile-optimize.js',
  'modernize-portfolio.js',
  'notion-api-automation.js',
  'organize-project-stories.js',
  'quick-notion-setup.js',
  'restore-before-clean-text.js',
  'restore-before-polish.js',
  'restore-original-images.js',
  'restore-original-layout.js',
  'simple-restore-layout.js',
  'test-integration-access.js',
  'test-notion-connection.js',
  'update-quedoc-and-style.js',
  'upgrade-portfolio-style.js'
];

// 각 파일에서 API 키를 환경변수로 변경
filesWithApiKeys.forEach(filename => {
  try {
    const filePath = path.join(__dirname, filename);
    
    if (fs.existsSync(filePath)) {
      let content = fs.readFileSync(filePath, 'utf8');
      
      // API 키를 환경변수로 변경
      content = content.replace(
        /const NOTION_API_KEY = '[^']+';/g,
        "const NOTION_API_KEY = process.env.NOTION_API_KEY || 'your-notion-api-key-here';"
      );
      
      fs.writeFileSync(filePath, content);
      console.log(`✅ ${filename} API 키 제거 완료`);
    }
  } catch (error) {
    console.error(`❌ ${filename} 처리 실패:`, error.message);
  }
});

console.log("🔐 모든 API 키 제거 완료!");
