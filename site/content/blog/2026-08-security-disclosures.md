---
title: Security Disclosures - 2026-08
---

## Tree listing filters on the owner instead of the requester
User node tree access-control is filtered by the owner username not the requester username.

This allows for an unauthenticated party to get a users node tree. Requires that the owner username is listed in the access-control of a node to list related nodes.

Used correct variable, also adjusted variable names to make it more clear for future.

- affected versions: `>= 1.0.0, <= 1.0.2`
- patched versions: `>=1.0.3`
- cwe: `CWE-863`
- cve: ``
- score: `Low`
- credit:
    - [@arpitjain099](https://github.com/arpitjain099) (reporter)
- more info: <https://github.com/enchant97/note-mark/security/advisories/GHSA-7g73-5rrw-446p>
