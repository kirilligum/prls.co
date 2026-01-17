# SEO Ops Scripts (local)

These scripts run locally and invoke Codex CLI for GSC tasks.

## Files
- `urls_priority.txt`: Canonical URL list for inspections.
- `inspect_gsc.fish`: Inspect URLs via GSC API and write a report.
- `request_indexing.fish`: Use Playwright GUI to request indexing.
- `recheck_gsc.fish`: Inspect + request indexing where needed.

## Usage
```sh
# Inspect URLs and create a report in seo_ops/reports/
./seo_ops/scripts/inspect_gsc.fish

# Request indexing for priority URLs via GSC GUI
./seo_ops/scripts/request_indexing.fish

# Inspect and request indexing if needed
./seo_ops/scripts/recheck_gsc.fish
```

## Notes
- GSC "Request indexing" is **not** available via API; GUI automation is required.
- These scripts call `codex exec` with `-a never --sandbox danger-full-access`.
- Ensure you are authenticated to GSC before running.
