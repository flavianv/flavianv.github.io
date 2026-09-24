# Flavian’s notes on AI

A dependency-free personal AI notebook for GitHub Pages. Open `index.html` through any static HTTP server:

```sh
python3 -m http.server 4173
```

The homepage supports text search and multiple topic selections (matching any selected topic). The initial entry embeds the published YouTube video https://www.youtube.com/watch?v=tHLlJn1RkWU, with a local poster and a written companion referencing primary research papers. Publication metadata: September 24, 2026; uploaded video duration: 6:53, verified against YouTube’s public player metadata (413 seconds).

The written companion is adapted from `2026_Q3_AITutorials/rlvr-grpo` narration. A second entry, *RLHF and PPO* (https://www.youtube.com/watch?v=xxCG4HDMu_8, 8:20), follows the same pattern and is adapted from `2026_Q3_AITutorials/rlhf-ppo`; each homepage card's player reads its YouTube ID from `data-youtube` on its `.video-shell`. The poster is extracted from the local film. That project was not modified. Numerical examples are illustrative. The video is hosted on YouTube and is not included in this site.

To add an entry, create an article under `articles/`, add a `.post` in `index.html` with pipe-separated `data-topics`, and place it in publication order (newest first). Update the notebook count. Use relative links and local assets.

No build step, external fonts, or runtime dependencies. Privacy-friendly, cookie-free Cloudflare Web Analytics is included on every page (the beacon snippet before </body>; dashboard: Cloudflare → Analytics & Logs → Web Analytics). To publish when ready, configure GitHub Pages to serve the repository root. This implementation does not change repository settings or publish remotely.

Favicon: the actual purple galaxy avatar from [Flavian’s Gradient Notes](https://www.youtube.com/channel/UCimRvh1gOtqmKlIVCfkYOYg), retrieved September 24, 2026. Resized without redesign into 16/32px PNG, multi-size ICO, and 180px Apple touch icon.
