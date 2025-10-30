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
    const genRes = await fetch(`${API_URL}/neural/generator`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "brotherkey123"
      },
      body: JSON.stringify({ prompt: task })
    });
    const gen = await genRes.json();

    status.innerText = "Agent 2: Refining content...";

    const refRes = await fetch(`${API_URL}/neural/refiner`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "brotherkey123"
      },
      body: JSON.stringify({ text: gen.output })
    });
    const ref = await refRes.json();

    status.innerText = "Agent 3: Verifying output...";

    const verRes = await fetch(`${API_URL}/neural/verifier`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "brotherkey123"
      },
      body: JSON.stringify({ text: ref.output })
    });
    const ver = await verRes.json();

    status.innerText = "✅ Complete.";
    result.innerText = ver.output || "No output received.";

  } catch (err) {
    status.innerText = "❌ Error";
    result.innerText = "Error: " + err.message;
  }
}

window.runPipeline = runPipeline;
