# No Flamingos Hockey (Jekyll / GitHub Pages)

This repo is a simple, responsive drill library for sharing with your team.

## Add a new drill (one file per drill)
1. Add your images:
   - Drill images: `assets/images/drills/<drill-slug>/image-1.png` (and 2/3 as needed)
   - Thumbnail image: `assets/images/drills/<drill-slug>/thumb.png`

2. Create a new markdown file:
   - `_drills/<drill-slug>.md`

3. Fill in YAML front matter (example below), then commit + push.

### Drill front matter template
```yaml
---
title: "Corner Battle to Net"
short_description: "Quick battle along the wall, drive the net for a shot."
thumbnail: "/assets/images/drills/corner-battle-to-net/thumb.png"
images:
  - "/assets/images/drills/corner-battle-to-net/1.png"
  - "/assets/images/drills/corner-battle-to-net/2.png"
setup: |
  Put two lines in opposite corners. Coach spots pucks to the wall.
full_description: |
  On whistle, players battle for possession and one attacks the net.
coaching_points:
  - "Inside hands / strong stick"
  - "Win body position before puck"
equipment:
  - "Pucks"
  - "2 nets"
categories:
  - "battle"
  - "offensive-zone"
variations: |
  Add a second puck. Make it 2v2.
youtube: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
---
```

## Categories
Edit `_data/categories.yml`. Slugs are used in drills; display names are shown on the site.

## Local preview (optional)
If you want to preview locally:
- Install Ruby + Bundler
- Run:
  - `bundle install`
  - `bundle exec jekyll serve`

Then open `http://localhost:4000`.
