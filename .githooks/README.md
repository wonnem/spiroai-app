# Git hooks

This repo's hooks live in this tracked folder instead of the untracked
`.git/hooks/`, so they can be committed and shared.

## What's here

- `pre-commit` — scans staged changes for likely secrets (API keys, tokens,
  private key blocks, `.env`-style files, service-account JSON, etc.) and
  blocks the commit if it finds a match.

## One-time setup (each clone/machine)

Git does not enable a tracked hooks folder automatically. Run this once per
clone:

```
git config core.hooksPath .githooks
```

(On Windows this repo already has it set for the current clone.)

To bypass the hook for a confirmed false positive:

```
git commit --no-verify
```
