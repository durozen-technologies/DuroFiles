const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'components', 'templates');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

files.forEach(f => {
    const file = path.join(dir, f);
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace data.billedBy.gstin && ...
    // If it already has showGst && after it, just remove data.billedBy.gstin &&
    content = content.replace(/\{data\.billedBy\.gstin && showGst &&/g, '{showGst &&');
    content = content.replace(/\{data\.billedBy\.gstin && (!data\.hiddenFields\?\.includes\('[^']+'\)) && showGst &&/g, '{$1 && showGst &&');
    
    // Replace data.billedTo.gstin && ...
    // Case 1: has showGst &&
    content = content.replace(/\{data\.billedTo\.gstin && showGst &&/g, '{showGst &&');
    // Case 2: has !data.hiddenFields... && showGst &&
    content = content.replace(/\{data\.billedTo\.gstin && (!data\.hiddenFields\?\.includes\('[^']+'\)) && showGst &&/g, '{$1 && showGst &&');
    // Case 3: has !data.hiddenFields... && (NO showGst)
    content = content.replace(/\{data\.billedTo\.gstin && (!data\.hiddenFields\?\.includes\('[^']+'\)) &&/g, '{$1 && showGst &&');
    // Case 4: JUST data.billedTo.gstin &&
    content = content.replace(/\{data\.billedTo\.gstin && </g, '{showGst && <');

    fs.writeFileSync(file, content);
    console.log('Fixed', f);
});
