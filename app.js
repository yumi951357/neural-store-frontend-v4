const API_URL = "https://fiverr-automation-backend.onrender.com";

async function runPipeline() {
  const task = document.getElementById('task').value.trim();
  const status = document.getElementById('status');
  const result = document.getElementById('result');

  if (!task) {
    status.innerText = "Please enter a task first.";
    return;
  }

  status.innerText = "Agent 1: Generating content...";

  try {
    // 只调用 generator，不链式调用
    const response = await fetch(`${API_URL}/neural/generator`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "brotherkey123"
      },
      body: JSON.stringify({ prompt: task })
    });
    
    const data = await response.json();
    status.innerText = "✅ Complete.";
    result.innerText = data.output || "No output received.";

  } catch (err) {
    status.innerText = "❌ Error";
    result.innerText = "Error: " + err.message;
  }
}

window.runPipeline = runPipeline;