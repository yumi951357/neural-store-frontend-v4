// ====== CONFIG ======
const API_URL = "https://fiverr-automation-backend.onrender.com";
const API_KEY = "brotherkey123";  // 与后端一致

// 显示 API 基址，便于排错
document.getElementById("apiLabel").textContent = API_URL.replace(/^https?:\/\//,'');

// 统一请求封装
async function call(endpoint, payload) {
  const res = await fetch(`${API_URL}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY
    },
    body: JSON.stringify(payload)
  });
  // Render/后端可能返回非 2xx 但带有 JSON
  let dataText = await res.text();
  try { dataText = JSON.parse(dataText); } catch(_) {}
  if (!res.ok) {
    const msg = (dataText && dataText.detail) || res.status + " " + res.statusText;
    throw new Error(`API ${endpoint} failed: ${msg}`);
  }
  return typeof dataText === "string" ? { output: dataText } : dataText;
}

// 参数拼装 → 给 generator 的 prompt 增强上下文

// 暴露函数到全局作用域
window.runPipeline = runPipeline;
console.log("✅ Neural Store Pipeline registered.");