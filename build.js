// build.js
const fs = require('fs');
const path = require('path');
const talksData = require('./talks');
const generateSchedule = require('./generateSchedule');

const build = () => {
    // 1. Read template.html
    let html = fs.readFileSync(path.join(__dirname, 'template.html'), 'utf8');

    // 2. Read style.css and inject it
    const css = fs.readFileSync(path.join(__dirname, 'style.css'), 'utf8');
    html = html.replace('<!-- Styles will be injected here -->', `<style>${css}</style>`);

    // 3. Read script.js
    const js = fs.readFileSync(path.join(__dirname, 'script.js'), 'utf8');

    // 4. Generate the schedule data
    const schedule = generateSchedule(talksData);

    // 5. Inject the generated schedule data and script.js
    const scriptInjection = `
    <script>
        const schedule = ${JSON.stringify(schedule, null, 2)};
        ${js}
    </script>
    `;
    html = html.replace('<!-- Scripts will be injected here -->', scriptInjection);

    // Write the final combined HTML to index.html
    fs.writeFileSync(path.join(__dirname, 'index.html'), html, 'utf8');
    console.log('Successfully generated index.html');
};

build();