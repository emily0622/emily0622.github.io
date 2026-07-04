# Emily Traynor — Portfolio

Personal portfolio for Emily Traynor (software engineer), built on the same static
editorial template as the Kate Traynor site. Plain HTML/CSS/JS, no build step.

## Structure
```
index.html   — all markup (single page)
styles.css   — shared editorial template + Emily-specific additions at the bottom
script.js    — interactions (nav, reveal, filtering, counters, modals, form)
assets/      — favicon.png ("ET" in Fraunces)
```

## Run locally
```bash
cd Emily_Portfolio
python3 -m http.server 4322   # http://localhost:4322
```

## Highlights
- Two-column hero: headline + animated `orchestrator.py` code card (MCP / multi-agent)
- Filterable project grid → case-study modals (compute-engine PR links out to GitHub)
- Animated stats, AI "current focus" band, experience timeline, contact form (mailto)
- AI/agents emphasis throughout: hero, intro, highlighted capability column, AI band

## Hosting on GitHub Pages
For a personal site, the simplest is a **user site repo** named `emily0622.github.io`
(must be public for free Pages) → served at `https://emily0622.github.io` with zero config.
1. Create the repo `emily0622.github.io`.
2. Push these files to `main`.
3. Repo → Settings → Pages → Source: Deploy from branch → `main` / root.

## TODO / options
- [ ] Optional headshot in the hero (currently the code card — swap to a photo like Kate's if preferred)
- [ ] Wire contact form to a real handler (Formspree / Supabase) instead of mailto
- [ ] Phone number intentionally left off the public page (privacy) — add if desired
- [ ] The "Agentic AI & MCP" card is framed as current focus; point it at a concrete repo when ready
