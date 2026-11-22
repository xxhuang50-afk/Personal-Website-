"use strict";

const config = window.cardConfig;
const svgNamespace = "http://www.w3.org/2000/svg";
const socialIcons = new Set(["linkedin", "scholar", "instagram", "whatsapp", "email", "github", "researchgate", "orcid", "cv", "projects"]);

function element(tag, className = "", text = "") {
  const node = document.createElement(tag);
  node.className = className;
  node.textContent = text;
  return node;
}

function icon(name, className = "") {
  const svg = document.createElementNS(svgNamespace, "svg");
  const use = document.createElementNS(svgNamespace, "use");
  svg.setAttribute("class", className ? `icon ${className}` : "icon");
  svg.setAttribute("aria-hidden", "true");
  svg.setAttribute("focusable", "false");
  use.setAttribute("href", `./assets/icons/sprite.svg#${name}`);
  svg.append(use);
  return svg;
}

function clean(value) {
  return typeof value === "string" ? value.trim() : "";
}

function text(id, value) {
  const node = document.getElementById(id);
  node.textContent = value;
  node.hidden = !value;
}

function assetPath(value) {
  const path = clean(value);
  // Keep site assets relative to the repository root.
  return /^(?:\.\/)?assets\//.test(path) && !path.split("/").includes("..") &&
    !path.includes("\\") ? path : "";
}

function linkDestination(value) {
  const address = clean(value);
  if (!/^(https?:\/\/|mailto:|tel:|\.\.?\/|#)/i.test(address)) return null;

  try {
    const url = new URL(address, document.baseURI);
    if (["mailto:", "tel:"].includes(url.protocol)) {
      return url.pathname ? { href: url.href, external: false } : null;
    }
    if (["http:", "https:"].includes(url.protocol) && !url.username && !url.password) {
      return { href: url.href, external: url.origin !== window.location.origin };
    }
    if (url.protocol === "file:" && window.location.protocol === "file:" &&
        /^(\.\.?\/|#)/.test(address)) {
      return { href: url.href, external: false };
    }
  } catch {
    // Ignore URLs that cannot be parsed.
  }
  return null;
}

function renderProfile(profile) {
  const name = clean(profile.name) || "Your Name";
  const subtitle = clean(profile.subtitle);
  const tagline = clean(profile.tagline);
  text("profile-name", name);
  text("profile-subtitle", subtitle);
  text("profile-tagline", tagline);
  document.title = `${name} · Digital Business Card`;
  document.querySelector('meta[name="description"]').content =
    [name, subtitle, tagline].filter(Boolean).join(" — ");

  if (!profile.avatar?.enabled) return;

  const avatar = document.getElementById("avatar");
  const initials = name.split(/\s+/u).slice(0, 2).map(word => [...word][0]).join("");
  text("monogram", (clean(profile.avatar.monogram) || initials).toUpperCase());
  avatar.hidden = false;

  const src = assetPath(profile.avatar.image);
  if (src) {
    const image = new Image();
    image.alt = "";
    image.decoding = "async";
    image.addEventListener("load", () => avatar.replaceChildren(image), { once: true });
    image.src = src;
  }
}

function renderLinks(links) {
  const list = document.getElementById("social-links");
  for (const link of links) {
    const label = clean(link?.label);
    const destination = linkDestination(link?.url);
    if (!label || !destination) continue;

    const row = element("li");
    const tile = element("a", "link-tile");
    tile.href = destination.href;
    if (destination.external) {
      tile.target = "_blank";
      tile.rel = "noopener noreferrer";
    }

    const symbol = element("span", "link-icon");
    symbol.append(icon(socialIcons.has(link.icon) ? link.icon : "external"));
    tile.append(symbol, element("span", "link-label", label));
    tile.append(icon(destination.external ? "external" : "arrow", "link-end"));
    row.append(tile);
    list.append(row);
  }

  document.getElementById("connections").hidden = !list.childElementCount;
}

function renderBackground(settings) {
  const src = assetPath(settings.image);
  if (!src) return;

  const world = document.getElementById("world");
  if (typeof settings.overlayOpacity === "number" && Number.isFinite(settings.overlayOpacity)) {
    world.style.setProperty("--art-overlay", Math.min(1, Math.max(0, settings.overlayOpacity)));
  }
  for (const screen of ["mobile", "desktop"]) {
    const { position, width, fit } = settings[screen] || {};
    if (CSS.supports("object-position", position)) {
      world.style.setProperty(`--art-${screen}-position`, position);
    }
    if (CSS.supports("width", `min(100%, ${width})`)) {
      world.style.setProperty(`--art-${screen}-width`, width);
    }
    if (fit === "cover" || fit === "contain") {
      world.style.setProperty(`--art-${screen}-fit`, fit);
    }
  }

  const art = new Image();
  art.className = "world__art";
  art.alt = "";
  art.decoding = "async";
  art.fetchPriority = "high";
  art.addEventListener("load", () => {
    const wash = art.cloneNode();
    wash.className = "world__wash";
    world.append(wash, art);
  }, { once: true });
  art.src = src;
}

if (config) {
  const { profile = {}, links = [], background = {} } = config;
  renderProfile(profile);
  renderLinks(links);
  renderBackground(background);
  document.getElementById("card").hidden = false;
} else {
  document.getElementById("config-error").hidden = false;
}
