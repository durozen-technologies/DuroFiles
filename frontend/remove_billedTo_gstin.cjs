const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'components', 'templates');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

files.forEach(f => {
    const file = path.join(dir, f);
    let content = fs.readFileSync(file, 'utf8');
    
    // We want to remove lines containing billedTo.gstin and EditableValue.
    // Let's split by newline, filter out the lines that match the condition, and join back.
    const lines = content.split('\n');
    const newLines = lines.filter(line => {
        if (line.includes('billedTo.gstin') && line.includes('EditableValue')) {
            return false; // exclude this line
        }
        return true;
    });
    
    fs.writeFileSync(file, newLines.join('\n'));
    console.log('Processed', f);
});
