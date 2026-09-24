const selected = new Set();
const search = document.querySelector('#search');
const buttons = [...document.querySelectorAll('[data-topic]')];
const posts = [...document.querySelectorAll('.post')];
function update() {
  const query = search.value.trim().toLowerCase();
  let count = 0;
  for (const post of posts) {
    const topics = post.dataset.topics.split('|');
    const matches = (!selected.size || [...selected].some(topic => topics.includes(topic))) && post.textContent.toLowerCase().includes(query);
    post.hidden = !matches;
    if (matches) count++;
    else { const frame = post.querySelector('iframe'); if (frame) frame.src = frame.src.replace('?autoplay=1', ''); }
  }
  buttons.forEach(button => button.setAttribute('aria-pressed', button.dataset.topic === 'all' ? !selected.size : selected.has(button.dataset.topic)));
  document.querySelector('#results').textContent = `${count} ${count === 1 ? 'entry' : 'entries'} · ${selected.size > 1 ? 'Matching any selected topic' : 'Latest first'}`;
  document.querySelector('#empty').hidden = count !== 0;
}
buttons.forEach(button => button.addEventListener('click', () => {
  const topic = button.dataset.topic;
  if (topic === 'all') selected.clear();
  else if (selected.has(topic)) selected.delete(topic);
  else selected.add(topic);
  update();
}));
search.addEventListener('input', update);
document.querySelector('#reset').addEventListener('click', () => {selected.clear(); search.value = ''; update(); search.focus();});
document.querySelector('.play').addEventListener('click', () => {
  const frame = document.createElement('iframe');
  frame.src = 'https://www.youtube-nocookie.com/embed/ebKDoRdeUVg?autoplay=1';
  frame.title = 'RLVR with GRPO fine-tuning: A short tutorial';
  frame.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
  frame.allowFullscreen = true;
  frame.referrerPolicy = 'strict-origin-when-cross-origin';
  document.querySelector('.video-shell').replaceChildren(frame);
  frame.focus();
});
