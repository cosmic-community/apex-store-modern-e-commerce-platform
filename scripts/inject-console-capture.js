const fs = require('fs');
const path = require('path');

const distDir = path.join(process.cwd(), '.next', 'server', 'app');

function injectScriptToHtml(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    if (content.includes('dashboard-console-capture.js')) {
      return;
    }
    
    const scriptTag = '<script src="/dashboard-console-capture.js"></script>';
    
    if (content.includes('</head>')) {
      content = content.replace('</head>', `${scriptTag}</head>`);
    } else if (content.includes('<head>')) {
      content = content.replace('<head>', `<head>${scriptTag}`);
    }
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Injected console capture script into: ${filePath}`);
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
  }
}

function walkDirectory(dir) {
  if (!fs.existsSync(dir)) {
    console.log(`Directory ${dir} does not exist, skipping...`);
    return;
  }
  
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      walkDirectory(filePath);
    } else if (file.endsWith('.html')) {
      injectScriptToHtml(filePath);
    }
  });
}

console.log('Injecting console capture script into build output...');
walkDirectory(distDir);
console.log('Console capture script injection complete!');