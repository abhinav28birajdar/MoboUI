const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

function walk(dir) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stats = fs.statSync(filePath);
        if (stats.isDirectory()) {
            walk(filePath);
        } else if (stats.isFile() && /\.(tsx|ts|css|html|js|mjs)$/.test(filePath)) {
            let content = fs.readFileSync(filePath, 'utf8');
            const original = content;

            // Replace colors
            content = content.replace(/84CC16/gi, 'D97706'); // lime-500 -> amber-600
            content = content.replace(/lime-500/g, 'amber-600');
            content = content.replace(/lime-400/g, 'amber-500');
            content = content.replace(/lime-600/g, 'amber-700');
            content = content.replace(/lime-/g, 'amber-');
            content = content.replace(/glow-lime/g, 'glow-amber');
            content = content.replace(/shadow-glow-lime/g, 'shadow-glow-amber');

            // Remove italics where common
            content = content.replace(/\bitalic\b/g, '');

            // Remove excessive uppercase from classes if common (selective)
            // content = content.replace(/\buppercase\b/g, '');

            if (content !== original) {
                fs.writeFileSync(filePath, content, 'utf8');
                console.log(`Updated: ${filePath}`);
            }
        }
    });
}

walk(srcDir);
console.log('Done replacement.');
