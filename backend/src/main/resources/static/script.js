const apiBase = '/api/experiences';

document.getElementById('submitBtn').addEventListener('click', async () => {
  const city = document.getElementById('city').value.trim();
  const title = document.getElementById('title').value.trim();
  const content = document.getElementById('content').value.trim();
  const author = document.getElementById('author').value.trim() || 'Anonymous';

  if (!city || !title || !content) {
    showMsg('Please fill all required fields.', true);
    return;
  }

  const payload = { city, title, content, author };

  try {
    const res = await fetch(apiBase, {
      method: 'POST',
      headers: { 'Content-Type':'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('Network error ' + res.status);
    const data = await res.json();
    showMsg('Feedback collected. Thanks for sharing!', false);
    document.getElementById('expForm').reset();
  } catch (err) {
    console.error(err);
    showMsg('Could not submit. Try again later.', true);
  }
});

document.getElementById('searchBtn').addEventListener('click', async () => {
  const q = document.getElementById('searchInput').value.trim();
  if (!q) { showMsg('Type a city or place to search.', true); return; }
  try {
    const res = await fetch(apiBase + '/search?q=' + encodeURIComponent(q));
    if (!res.ok) throw new Error('Search failed');
    const list = await res.json();
    renderResults(list);
  } catch (err) {
    console.error(err);
    showMsg('Search failed. Try again later.', true);
  }
});

function showMsg(text, isError=false){
  const el = document.getElementById('msg');
  el.textContent = text;
  el.style.background = isError ? '#ffe6e6' : '#e6ffed';
  el.style.borderColor = isError ? '#f5b6b6' : '#b7f0c6';
  el.classList.remove('hidden');
  setTimeout(()=> el.classList.add('hidden'), 4000);
}

function renderResults(list){
  const wrap = document.getElementById('results');
  wrap.innerHTML = '';
  if (!list || list.length===0) { wrap.innerHTML = '<p>No experiences found.</p>'; return; }
  list.forEach(item=>{
    const div = document.createElement('div');
    div.className = 'exp-card';
    div.innerHTML = `<div class="exp-meta"><strong>${escapeHtml(item.title)}</strong> — ${escapeHtml(item.city)} · by ${escapeHtml(item.author)} · ${new Date(item.createdAt).toLocaleString()}</div>
                     <p>${escapeHtml(item.content)}</p>`;
    wrap.appendChild(div);
  });
}

function escapeHtml(s){ return String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;'); }
