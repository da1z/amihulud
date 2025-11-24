# amihulud

Check if your GitHub repositories were affected by the [Sha1hulud supply chain attack](https://helixguard.ai/blog/malicious-sha1hulud-2025-11-24).

## What is this?

In November 2025, a malicious package called `sha1hulud` was discovered that injected harmful code into projects. This CLI tool scans your GitHub repositories to detect if you were affected.

## Requirements

- [GitHub CLI](https://cli.github.com/) installed and authenticated (`gh auth login`)

## Usage

Run directly with npx (no install required):

```bash
npx amihulud
```

## Output

If your repos are clean:

```
🔍 Checking repos for user: your-username
✅ OK: no matches for "Sha1-Hulud: The Second Coming"
   Your repositories do not appear to be affected by the Sha1hulud attack.
```

If affected:

```
🔍 Checking repos for user: your-username
❌ Affected: found 3 match(es) for "Sha1-Hulud: The Second Coming"
   Run this to see details:
   gh search code "Sha1-Hulud: The Second Coming" --owner your-username
```

## How it works

1. Uses the GitHub CLI to get your username
2. Searches your repos for the malicious payload signature `"Sha1-Hulud: The Second Coming"`
3. Reports if any matches are found

## License

MIT

