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
    else {
      const frame = post.querySelector('iframe');
      // Pause hidden media without navigating the iframe or losing playback position.
      frame?.contentWindow?.postMessage(JSON.stringify({event: 'command', func: 'pauseVideo', args: []}), 'https://www.youtube-nocookie.com');
    }
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
  frame.src = `https://www.youtube-nocookie.com/embed/tHLlJn1RkWU?autoplay=1&enablejsapi=1&origin=${encodeURIComponent(location.origin)}`;
  frame.title = 'Fine-tuning reasoning LLM agents with RLVR and GRPO';
  frame.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
  frame.allowFullscreen = true;
  frame.referrerPolicy = 'strict-origin-when-cross-origin';
  document.querySelector('.video-shell').replaceChildren(frame);
  frame.focus();
});
