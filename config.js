// This file contains public profile and contact information.
window.cardConfig = {
  profile: {
    name: "Jialong Huang",
    subtitle: "Purdue PhD Candidate (MSE)",
    tagline: "Materials science research · Semiconductor engineering",
    avatar: {
      enabled: true,
      monogram: "JH",
      image: "", // Optional local image, such as "./assets/images/avatar.webp".
    },
  },

  // Buttons appear in this order. Remove an entry to hide it.
  links: [
    { label: "LinkedIn", icon: "linkedin", url: "https://www.linkedin.com/in/jialong-huang" },
    { label: "Google Scholar", icon: "scholar", url: "https://scholar.google.com/citations?user=WhJF1pYAAAAJ&hl=en" },
    { label: "Instagram", icon: "instagram", url: "https://www.instagram.com/jloong_h/" },
    { label: "WhatsApp", icon: "whatsapp", url: "https://wa.me/17654769686" },
    { label: "Purdue Email", icon: "email", url: "mailto:huan1893@purdue.edu" },
    { label: "Gmail", icon: "email", url: "mailto:xxhuang50@gmail.com" },
  ],

  background: {
    image: "./assets/images/personal-world.webp",
    overlayOpacity: 0.26, // 0 is transparent. 1 is fully opaque.
    mobile: { position: "50% 49%", fit: "cover" },
    desktop: { position: "50% 29%", width: "53rem", fit: "cover" },
  },
};
