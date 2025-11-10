## 1.0.0 (2025-11-10)

* ci: add semver and conventionnal commits ([fb0ba94](https://github.com/JoRouquette/scribe-ektaron/commit/fb0ba94))
* build!: software architecture changes ([9b3875a](https://github.com/JoRouquette/scribe-ektaron/commit/9b3875a))
* feat: add complete upload ([0485d9d](https://github.com/JoRouquette/scribe-ektaron/commit/0485d9d))
* feat: add docker integration ([f301843](https://github.com/JoRouquette/scribe-ektaron/commit/f301843))
* feat: add site index ([9281e0a](https://github.com/JoRouquette/scribe-ektaron/commit/9281e0a))
* feat: allow for complete overide of site structure ([fd8e1b7](https://github.com/JoRouquette/scribe-ektaron/commit/fd8e1b7))
* feat: better static site ([f24588b](https://github.com/JoRouquette/scribe-ektaron/commit/f24588b))
* docs: add README ([bfec9af](https://github.com/JoRouquette/scribe-ektaron/commit/bfec9af))
* test: add several tests ([91f603d](https://github.com/JoRouquette/scribe-ektaron/commit/91f603d))
* chore: initialize repository ([72b3934](https://github.com/JoRouquette/scribe-ektaron/commit/72b3934))


### BREAKING CHANGE

* The project structure has changed significantly.
All backend code now resides in the `backend/` directory, and frontend
code is in the root `src/` directory. Import paths, build scripts, and
deployment processes must be updated accordingly.
