# Jialong Huang · Personal NFC business card

A single-screen business card built with HTML, CSS, and vanilla JavaScript. It uses the original WebP illustration, local SVG icons, and system fonts. GitHub Pages can serve the files directly.

## Preview locally

From the extracted `personal-hub` folder, run:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Open [http://127.0.0.1:8000/](http://127.0.0.1:8000/). Refresh after saving changes. Press **Ctrl+C** to stop the server.

To test a GitHub Pages-style repository path, run the same command from the folder containing `personal-hub` and open [http://127.0.0.1:8000/personal-hub/](http://127.0.0.1:8000/personal-hub/).

## Edit your identity and links

Open `config.js`. Edit the display name, title, short bio, and monogram under `profile`. Set `profile.avatar.enabled` to `false` to hide the mark, or set `profile.avatar.image` to the relative path of an optional local avatar.

Each entry in `links` has a `label`, an `icon`, and a `url`. The array order is the button order. Use a complete HTTPS URL for a website and a `mailto:` URL for email. Remove an entry to hide its button. Valid icon keys include `linkedin`, `scholar`, `instagram`, `whatsapp`, and `email`.

## Replace the illustration

Replace `assets/images/personal-world.webp`, or point `background.image` in `config.js` to another local file in `assets/images/`. A portrait WebP works well for phone screens. The navy fallback appears if the image is missing.

Under `background.mobile` and `background.desktop`, use `position` to choose the focus point (for example, `"50% 29%"`). Use `fit: "cover"` to fill the frame or `fit: "contain"` to show the entire illustration. For desktop landscape screens, `width` controls the width of the sharp art layer. Adjust `overlayOpacity` from `0` to `1` and preview on a phone and desktop after changing it.

## Publish on GitHub Pages

1. Extract `personal-hub.zip` and open the resulting `personal-hub` folder.
2. Sign in to GitHub. If you already have a repository for this card, open it. Otherwise, choose **+ → New repository**, enter `personal-hub`, select **Public**, turn on **Add README**, and click **Create repository**. GitHub Free supports Pages in public repositories. [Create a GitHub repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository)
3. In the repository’s **Code** tab, choose **Add file → Upload files**. Drag the contents of the extracted folder into the browser, including the `assets` folder. The upload list should show `index.html` at the root and `assets/images/personal-world.webp` under `assets`. On macOS, press **Command+Shift+Period** in Finder to reveal `.nojekyll` and `.gitignore` before selecting the files. [Upload files to GitHub](https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository)
4. Enter a commit message such as `Publish NFC digital business card`. Select **Commit directly to the main branch** and commit. If the repository requires a pull request, upload to a new branch and merge the pull request into `main`. Check that `.nojekyll` is visible in the repository root. If it was omitted, use **Add file → Create new file**, name it `.nojekyll`, and commit it.
5. Open **Settings → Pages**. Under **Build and deployment**, set **Source** to **Deploy from a branch**, choose **main** and **/(root)**, and click **Save**. [Configure the publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
6. After the Pages deployment succeeds, return to **Settings → Pages** and click **Visit site**. For a repository named `personal-hub`, the default URL is `https://YOUR-USERNAME.github.io/personal-hub/`. A repository named `YOUR-USERNAME.github.io` uses `https://YOUR-USERNAME.github.io/`. Open the actual HTTPS URL on your phone and verify the six buttons. [View the published site](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site#viewing-your-published-site)

For future updates, commit the changed files to the same publishing branch. GitHub Pages deploys the update to the same URL.

## Write the website URL to an NFC tag

1. Copy the HTTPS URL from **Visit site**, including the repository path.
2. Open a compatible NFC writer app and add a **URL/URI** record containing that address.
3. Select **Write** and hold a writable NFC tag near the phone’s NFC reader until the app confirms the write.
4. Test the tag with an NFC-capable phone outside the writer app. Keep the tag writable if you may change the public URL later. Changes to the site at the same URL require no tag rewrite.

[NFC TagWriter by NXP](https://www.nxp.com/design/design-center/software/rfid-developer-resources/nfc-tagwriter-app-by-nxp:NFC-TAGWRITER)
