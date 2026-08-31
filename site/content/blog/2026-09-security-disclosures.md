---
title: Security Disclosures - 2026-09
---

## No username validation on OIDC username
When accepting username from OIDC provider there is no validation on username.

If a provider is exploited it is possible that the username could be used to perform directory traversal.

Added checks to username in OIDC step and elsewhere.

- affected versions: `>= 1.0.0, <= 1.0.3`
- patched versions: `>=1.1.0`
- cwe: `CWE-22`
- cve: `6.4/10`
- score: `Moderate`
- credit:
    - [@Moritz-cmd](https://github.com/Moritz-cmd) (reporter)
- more info: <https://github.com/enchant97/note-mark/security/advisories/GHSA-4937-wfv8-7crc>
