# ひたすら旅する / Endless Wander

Seeded voxel scenery for relaxed, first-person exploration. This repository starts the maintained project at **map format v1 / save format v1 / terrain generator v1**. Earlier hosted prototypes are not imported into this clean edition.

## Editions

- **Browser**: GitHub Pages publishes `site/` from `main` after each change. <https://eruhitsuji.github.io/endless-wander/>.
- **Desktop**: Electron packages the same `site/index.html` for Windows, macOS, and Linux. Releases are built when a `v*` tag is pushed.

## Run locally

Requirements: Node.js 22 or later and npm.

```sh
npm install
npm start
```

## Desktop installer and automatic updates

Create and push a version tag after the source is ready:

```sh
git tag v1.0.0
git push origin v1.0.0
```

GitHub Actions builds a Windows NSIS installer and portable `.exe`, a macOS `.dmg` and update `.zip`, and Linux `.AppImage`/`.deb` packages. The installer builds are attached to a public GitHub Release. Packaged apps check for a newer release shortly after launch, download it in the background, and ask before restarting to install it. The portable Windows build is provided for convenience and does not support in-app updating.

For macOS auto-updates, configure these GitHub Actions repository secrets with an Apple Developer ID certificate and notarization credentials:

- `MACOS_CERTIFICATE`: base64-encoded Developer ID Application certificate (`.p12`)
- `MACOS_CERTIFICATE_PASSWORD`
- `APPLE_ID`
- `APPLE_APP_SPECIFIC_PASSWORD`
- `APPLE_TEAM_ID`

Without these secrets, GitHub Actions can create an unsigned macOS build, but macOS will not allow the app to auto-update. Windows installers are also unsigned unless a code-signing certificate is configured.

## License

This project is distributed under the MIT License. See [LICENSE](LICENSE).

## Map and save versions

- The world generator uses **terrain v1**. Its seed and integer coordinates determine the same terrain, including the biome choice at each biome site.
- Exported map files carry `mapFormatVersion: 1` and `saveFormatVersion: 1`.
- Local browser saves also use save format v1. Browser and desktop storage are separate; use map JSON export/import to move a map between them.
- The prototype formats are deliberately not migrated. Starting this repository creates a fresh v1 save set.

## Controls

W/A/S/D move, Space jumps or rises while flying, Ctrl+W/A/S/D runs, mouse moves the view, Esc/E pauses, Tab/M opens the route map, V checks whether the current area has been visited, and P saves a location. Settings and map management are in the pause screen.
