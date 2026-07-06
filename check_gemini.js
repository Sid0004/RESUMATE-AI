const fs = require('fs');
const envLines = fs.readFileSync('.env', 'utf8').split('\n');
const apiKeyLine = envLines.find(line => line.toLowerCase().startsWith('gemini_api_key='));
const env = apiKeyLine ? apiKeyLine.split('=')[1].trim() : null;

async function check() {
  if (!env) return console.log("API key not found");
  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${env}`);
  const data = await res.json();
  if (data.models) {
    console.log("AVAILABLE MODELS:", data.models.map(m => m.name).join('\n'));
  } else {
    console.log("ERROR:", data);
  }
}
check();
