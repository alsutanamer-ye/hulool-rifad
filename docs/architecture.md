# Architecture

Rifad uses a static, registry-driven architecture. The browser fetches lightweight JSON indexes and opens source paths only when needed. This keeps content reviewable in Git and leaves room for a future search API without changing the content contract.

## Data flow

`library source → registry summary → schema validation → website cards → preview/customize/test`

Large image and video files are intentionally represented by metadata and future external URIs. Customized assets must store parent ID, parent version, variables, modifications, creator, and date.
