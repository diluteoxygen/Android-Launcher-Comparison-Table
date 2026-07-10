# Contributing to Android Launcher Comparison Table

Thank you for helping keep this comparison table accurate and comprehensive! This guide explains how to contribute.

---

## How to Add a Launcher

1. **Fork** this repository and clone your fork locally.
2. **Edit `launchers.json`** — add a new object to the array with all required fields (see below).
3. **Run the generator** to rebuild the HTML table:
   ```bash
   node scripts/generate.js
   ```
4. **Commit** both `launchers.json` and any generated files.
5. **Open a Pull Request** against the `main` branch.

> [!TIP]
> You can also use the **Submit a Launcher** issue template if you'd rather not edit JSON directly.

---

## Required Fields

Every launcher object in `launchers.json` must include **all** of the following fields:

| Field | Type | Allowed Values |
|-------|------|----------------|
| `name` | string | Launcher display name |
| `icon` | string | Filename in `App Icons/` (e.g. `"launcher.png"`) |
| `archived` | boolean | `true` / `false` |
| `price` | enum | `free`, `freemium`, `paid`, `trialware` |
| `ads` | enum | `none`, `mild`, `excessive`, `unknown` |
| `updateFrequency` | string | Star rating: `"⭐"` through `"⭐⭐⭐⭐"` |
| `customisability` | enum | `god_mode`, `advanced`, `intermediate`, `basic`, `less_than_basic` |
| `appDrawerStyle` | enum | `vertical`, `horizontal`, `multi_layout`, `other` |
| `klwp` | enum | `yes`, `no`, `partial`, `unknown`, `not_tested` |
| `widget` | enum | `yes`, `no`, `partial`, `unknown`, `not_tested` |
| `materialYou` | enum | `yes`, `no`, `partial`, `unknown`, `not_tested` |
| `landscape` | enum | `yes`, `no`, `partial`, `unknown`, `not_tested` |
| `foldable` | enum | `yes`, `no`, `partial`, `unknown`, `not_tested` |
| `code` | enum | `open`, `closed`, `partial`, `unknown` |
| `fdroid` | enum | `yes`, `no`, `partial`, `unknown`, `not_tested` |
| `quickswitch` | enum | `yes`, `no`, `partial`, `unknown`, `not_tested` |
| `androidVersion` | string | Minimum Android version (e.g. `"8.0+"`) |
| `privacyUrl` | string | URL to an Exodus Privacy report (or `""`) |
| `downloadUrl` | string | URL to download the launcher (Play Store, F-Droid, etc.) |

### Example Entry

```json
{
  "name": "Example Launcher",
  "icon": "example.png",
  "archived": false,
  "price": "free",
  "ads": "none",
  "updateFrequency": "⭐⭐⭐",
  "customisability": "advanced",
  "appDrawerStyle": "vertical",
  "klwp": "yes",
  "widget": "yes",
  "materialYou": "partial",
  "landscape": "not_tested",
  "foldable": "not_tested",
  "code": "open",
  "fdroid": "yes",
  "quickswitch": "no",
  "androidVersion": "8.0+",
  "privacyUrl": "https://reports.exodus-privacy.eu.org/en/reports/com.example.launcher/latest/",
  "downloadUrl": "https://play.google.com/store/apps/details?id=com.example.launcher"
}
```

---

## How to Find Correct Values

| Field | Where to Look |
|-------|---------------|
| **price** | Google Play Store or the launcher's website |
| **downloadUrl** | Play Store listing, F-Droid page, or GitHub releases |
| **fdroid** | Search [F-Droid](https://f-droid.org/) for the package name |
| **privacyUrl** | Search [Exodus Privacy](https://reports.exodus-privacy.eu.org/) by package name |
| **code** | Check if the launcher has a public GitHub/GitLab repository |
| **ads** | Install the launcher and observe, or check Exodus tracker report |
| **materialYou** | Check the launcher's feature list or test on Android 12+ |

---

## How to Report Issues

Use the provided **issue templates**:

- **Submit a Launcher** — suggest a new launcher to add.
- **Bug Report** — report incorrect data or site issues.

You can also open a blank issue for anything else.

---

## Code of Conduct

Be respectful and constructive. This is a community-maintained resource — treat other contributors with courtesy. Harassment, spam, and bad-faith contributions will not be tolerated.

---

## License

This project is licensed under the **GPL-3.0** license. By contributing, you agree that your contributions will be licensed under the same terms. See the [LICENSE](LICENSE) file for details.
