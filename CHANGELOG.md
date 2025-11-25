## 2.0.0 (2025-11-25)

* fix(routes,uploads): correct asset upload param, improve route building logs, update file storage ([5a79d64](https://github.com/JoRouquette/scribe-ektaron/commit/5a79d64))
* Merge branch 'chore/migrate-to-nx' into release ([0e96c53](https://github.com/JoRouquette/scribe-ektaron/commit/0e96c53))
* Merge branch 'feature/add-batched-upload' into release ([7c77f8c](https://github.com/JoRouquette/scribe-ektaron/commit/7c77f8c))
* Merge branch 'fix/issues-semantic-versionning' into release ([f3d3bb9](https://github.com/JoRouquette/scribe-ektaron/commit/f3d3bb9))
* Merge branch 'fix/issues-with-routes-and-uploads' into release ([cbc5806](https://github.com/JoRouquette/scribe-ektaron/commit/cbc5806))
* Merge branch 'fix/tests-and-linting' into release ([18ee3ba](https://github.com/JoRouquette/scribe-ektaron/commit/18ee3ba))
* Merge branch 'release' ([197dba7](https://github.com/JoRouquette/scribe-ektaron/commit/197dba7))
* Merge branch 'release' ([63defbe](https://github.com/JoRouquette/scribe-ektaron/commit/63defbe))
* Merge branch 'release' ([82fb8d9](https://github.com/JoRouquette/scribe-ektaron/commit/82fb8d9))
* refactor(architecture)!: introduce CQRS handlers and feature ports ([eb7eddd](https://github.com/JoRouquette/scribe-ektaron/commit/eb7eddd))
* chore: change logger level ([67b19d6](https://github.com/JoRouquette/scribe-ektaron/commit/67b19d6))
* chore: fix build configuration ([0951cf7](https://github.com/JoRouquette/scribe-ektaron/commit/0951cf7))
* chore: proper docker config ([3796aa0](https://github.com/JoRouquette/scribe-ektaron/commit/3796aa0))
* chore: updating pre-push to include tests ([ae4bc7f](https://github.com/JoRouquette/scribe-ektaron/commit/ae4bc7f))
* chore(backend): add session lifecycle and filesystem repository ([b9323f6](https://github.com/JoRouquette/scribe-ektaron/commit/b9323f6))
* chore(ci): update release workflows to use Node.js 22.14.0 and optimize npm install ([105fa01](https://github.com/JoRouquette/scribe-ektaron/commit/105fa01))
* chore(lint): enforce layered eslint rules and add pre-push hook ([ca23781](https://github.com/JoRouquette/scribe-ektaron/commit/ca23781))
* chore(lint): migrate to flat config, add Nx plugin and enforce module boundaries ([cf43dcf](https://github.com/JoRouquette/scribe-ektaron/commit/cf43dcf))
* chore(publishing): add batched note upload and session-based manifest updates ([be2038f](https://github.com/JoRouquette/scribe-ektaron/commit/be2038f))
* test: implement jest.config.cjs files and update tsconfig files to reference them ([936a9af](https://github.com/JoRouquette/scribe-ektaron/commit/936a9af))
* test(core-domain): add unit tests for Asset, Manifest, Note, and Session entities ([761a975](https://github.com/JoRouquette/scribe-ektaron/commit/761a975))
* test(core-domain): refactor SessionError tests and update coverage config ([bb8991d](https://github.com/JoRouquette/scribe-ektaron/commit/bb8991d))
* test(node): add coverage for infra components ([83d8a6e](https://github.com/JoRouquette/scribe-ektaron/commit/83d8a6e))
* test(site): add unit coverage for queries and infra ([dde8fa5](https://github.com/JoRouquette/scribe-ektaron/commit/dde8fa5))
* refactor: migrate monorepo to nx workspace ([7696edb](https://github.com/JoRouquette/scribe-ektaron/commit/7696edb))
* refactor: rename NotesIndexPort to ManifestPort and update manifest structure ([23af6cc](https://github.com/JoRouquette/scribe-ektaron/commit/23af6cc))
* refactor: simplify note and manifest models, remove unused fields and utilities ([5fbf829](https://github.com/JoRouquette/scribe-ektaron/commit/5fbf829))
* refactor: unify content API, update config, and improve structure ([1822936](https://github.com/JoRouquette/scribe-ektaron/commit/1822936))
* refactor(backend): unify note and asset index ports, rename files and update use cases ([73c16a3](https://github.com/JoRouquette/scribe-ektaron/commit/73c16a3))
* refactor(core): update SiteIndexPort and PublishNotesUseCase to support logger injection ([7c25075](https://github.com/JoRouquette/scribe-ektaron/commit/7c25075))
* feat(backend): refactor publishing and session flows, update note and asset handling ([5eb4ffe](https://github.com/JoRouquette/scribe-ektaron/commit/5eb4ffe))
* fix: resolve static file serving, proxy config, and manifest loading ([d121460](https://github.com/JoRouquette/scribe-ektaron/commit/d121460))
* fix: simplify asset upload flow and DTOs ([8786b8b](https://github.com/JoRouquette/scribe-ektaron/commit/8786b8b))
* ci: unify env file naming, update Docker Compose and CI for multi-env support ([1554ee6](https://github.com/JoRouquette/scribe-ektaron/commit/1554ee6))


### BREAKING CHANGE

* legacy StoragePort/IndexPort and Upload*UseCase paths have been removed or moved,
impacting imports and tests.

## 1.2.0 (2025-11-17)

* chore:start implementing a better viewer ([e2940e8](https://github.com/JoRouquette/scribe-ektaron/commit/e2940e8))
* Merge branch 'feature/better-viewer' into release ([a1fd2ea](https://github.com/JoRouquette/scribe-ektaron/commit/a1fd2ea))
* Merge branch 'release' ([8ef89bf](https://github.com/JoRouquette/scribe-ektaron/commit/8ef89bf))
* fix: remove trailing slash from note URL in PublishNotesUseCase ([dd9950f](https://github.com/JoRouquette/scribe-ektaron/commit/dd9950f))
* fix(api): add health check endpoint and controller ([e0b1dee](https://github.com/JoRouquette/scribe-ektaron/commit/e0b1dee))
* fix(backend): add status field to /ping endpoint response in express app ([0ec4f16](https://github.com/JoRouquette/scribe-ektaron/commit/0ec4f16))
* fix(express): serve Angular UI and content directory as static assets ([0dc030d](https://github.com/JoRouquette/scribe-ektaron/commit/0dc030d))
* fix(logging): make logger optional and add structured logging to backend ([a1cfb14](https://github.com/JoRouquette/scribe-ektaron/commit/a1cfb14))
* build: add husky ([9eb7156](https://github.com/JoRouquette/scribe-ektaron/commit/9eb7156))
* build: complete dockerfile ([9b4820e](https://github.com/JoRouquette/scribe-ektaron/commit/9b4820e))
* feat(backend): add asset upload API, refactor storage ports, improve test setup ([7c2568f](https://github.com/JoRouquette/scribe-ektaron/commit/7c2568f))
* feat(ci): add GitHub Actions workflow to build and push Docker image ([6f930ee](https://github.com/JoRouquette/scribe-ektaron/commit/6f930ee))
* feat(docker): add assets volume and ASSETS_ROOT env to docker-compose.yml ([cc412ea](https://github.com/JoRouquette/scribe-ektaron/commit/cc412ea))
* feat(logging): add structured logger and propagate context across backend ([a3a114a](https://github.com/JoRouquette/scribe-ektaron/commit/a3a114a))
* feat(viewer): improve markdown layout and styling, add OnPush change detection ([2cf24a4](https://github.com/JoRouquette/scribe-ektaron/commit/2cf24a4))

## <small>1.1.5 (2025-11-13)</small>

* test: sementic commit message ([b3b460c](https://github.com/JoRouquette/scribe-ektaron/commit/b3b460c))
* fix: better release file ([c0fa39d](https://github.com/JoRouquette/scribe-ektaron/commit/c0fa39d))
* fix: injection issue locally ([83f31eb](https://github.com/JoRouquette/scribe-ektaron/commit/83f31eb))
* fix: vault explorer style and navigation ([faca1d4](https://github.com/JoRouquette/scribe-ektaron/commit/faca1d4))
* chore: add content to dockerignore ([626c9f0](https://github.com/JoRouquette/scribe-ektaron/commit/626c9f0))
* chore: add content to dockerignore ([3557163](https://github.com/JoRouquette/scribe-ektaron/commit/3557163))
* chore(release): 1.1.5 [skip ci] ([7bdd0e4](https://github.com/JoRouquette/scribe-ektaron/commit/7bdd0e4))
* chore(release): 1.1.5 [skip ci] ([a1808bd](https://github.com/JoRouquette/scribe-ektaron/commit/a1808bd))
* chore(release): 1.1.5 [skip ci] ([5d4fb78](https://github.com/JoRouquette/scribe-ektaron/commit/5d4fb78))
* style: improve display of main and vault-explorer grid area ([90ffd1b](https://github.com/JoRouquette/scribe-ektaron/commit/90ffd1b))
* refactor: update for improved file upload and explorer UI ([0871361](https://github.com/JoRouquette/scribe-ektaron/commit/0871361))

## <small>1.1.5 (2025-11-13)</small>

* style: improve display of main and vault-explorer grid area ([90ffd1b](https://github.com/JoRouquette/scribe-ektaron/commit/90ffd1b))
* chore: add content to dockerignore ([626c9f0](https://github.com/JoRouquette/scribe-ektaron/commit/626c9f0))
* chore: add content to dockerignore ([3557163](https://github.com/JoRouquette/scribe-ektaron/commit/3557163))
* chore(release): 1.1.5 [skip ci] ([a1808bd](https://github.com/JoRouquette/scribe-ektaron/commit/a1808bd))
* chore(release): 1.1.5 [skip ci] ([5d4fb78](https://github.com/JoRouquette/scribe-ektaron/commit/5d4fb78))
* fix: injection issue locally ([83f31eb](https://github.com/JoRouquette/scribe-ektaron/commit/83f31eb))
* fix: vault explorer style and navigation ([faca1d4](https://github.com/JoRouquette/scribe-ektaron/commit/faca1d4))
* refactor: update for improved file upload and explorer UI ([0871361](https://github.com/JoRouquette/scribe-ektaron/commit/0871361))

## <small>1.1.5 (2025-11-13)</small>

* fix: injection issue locally ([83f31eb](https://github.com/JoRouquette/scribe-ektaron/commit/83f31eb))
* fix: vault explorer style and navigation ([faca1d4](https://github.com/JoRouquette/scribe-ektaron/commit/faca1d4))
* chore: add content to dockerignore ([626c9f0](https://github.com/JoRouquette/scribe-ektaron/commit/626c9f0))
* chore: add content to dockerignore ([3557163](https://github.com/JoRouquette/scribe-ektaron/commit/3557163))
* chore(release): 1.1.5 [skip ci] ([5d4fb78](https://github.com/JoRouquette/scribe-ektaron/commit/5d4fb78))
* refactor: update for improved file upload and explorer UI ([0871361](https://github.com/JoRouquette/scribe-ektaron/commit/0871361))

## <small>1.1.5 (2025-11-12)</small>

* refactor: update for improved file upload and explorer UI ([0871361](https://github.com/JoRouquette/scribe-ektaron/commit/0871361))
* fix: injection issue locally ([83f31eb](https://github.com/JoRouquette/scribe-ektaron/commit/83f31eb))
* chore: add content to dockerignore ([626c9f0](https://github.com/JoRouquette/scribe-ektaron/commit/626c9f0))
* chore: add content to dockerignore ([3557163](https://github.com/JoRouquette/scribe-ektaron/commit/3557163))

## <small>1.1.4 (2025-11-11)</small>

* build: better docker ([e7ef3ae](https://github.com/JoRouquette/scribe-ektaron/commit/e7ef3ae))
* fix: site navigation throughout rendered markdown ([37ffbb0](https://github.com/JoRouquette/scribe-ektaron/commit/37ffbb0))
* Merge branch 'main' of https://github.com/JoRouquette/scribe-ektaron ([d242256](https://github.com/JoRouquette/scribe-ektaron/commit/d242256))
* chore: complete fix ([1085f2e](https://github.com/JoRouquette/scribe-ektaron/commit/1085f2e))

## <small>1.1.3 (2025-11-11)</small>

* fix: grid layout ([c447992](https://github.com/JoRouquette/scribe-ektaron/commit/c447992))

## <small>1.1.2 (2025-11-10)</small>

* fix: publish-frontend issues ([f761f1c](https://github.com/JoRouquette/scribe-ektaron/commit/f761f1c))
* Merge branch 'main' of https://github.com/JoRouquette/scribe-ektaron ([ef1350c](https://github.com/JoRouquette/scribe-ektaron/commit/ef1350c))
* chore: add favicon ([dde94b4](https://github.com/JoRouquette/scribe-ektaron/commit/dde94b4))

## <small>1.1.1 (2025-11-10)</small>

* fix: complete theming and grid ([ad07ee5](https://github.com/JoRouquette/scribe-ektaron/commit/ad07ee5))

## 1.1.0 (2025-11-10)

* feat: add theming and gridstyle ([53219e5](https://github.com/JoRouquette/scribe-ektaron/commit/53219e5))
* fix: docker and api routes ([9001a9f](https://github.com/JoRouquette/scribe-ektaron/commit/9001a9f))
* build: updating docker configuration ([e4b1617](https://github.com/JoRouquette/scribe-ektaron/commit/e4b1617))
* docs: update README ([1c492b5](https://github.com/JoRouquette/scribe-ektaron/commit/1c492b5))

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
