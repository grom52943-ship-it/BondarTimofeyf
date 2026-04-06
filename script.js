function fetchWithTimeout(url, timeout) {
  return Promise.race([
    fetch(url),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Request timeout")), timeout)
    )
  ]);
}

async function fetchData() {
  const results = await Promise.allSettled([
    fetchWithTimeout("https://jsonplaceholder.typicode.com/posts/1", 2000),
    fetchWithTimeout("https://jsonplaceholder.typicode.com/users/1", 2000)
  ]);

  for (const result of results) {
    if (result.status === "rejected" && result.reason.message === "Request timeout") {
      return "Request timeout";
    }
  }

  const data = await Promise.all(
    results.map(res => res.value.json())
  );

  return data;
}

document.getElementById("loadBtn").addEventListener("click", async () => {
  const output = document.getElementById("output");
  const result = await fetchData();
  output.textContent = typeof result === "string" ? result : JSON.stringify(result, null, 2);
});