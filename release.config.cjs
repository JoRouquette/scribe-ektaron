module.exports = {
  branches: [{ name: 'main' }], // trunk-based: une seule branche
  plugins: [
    [
      '@semantic-release/commit-analyzer',
      {
        preset: 'conventionalcommits',
        releaseRules: [
          { type: 'feat', release: 'minor' },
          { type: 'fix', release: 'patch' },
          { type: 'hotfix', release: 'patch' },
          { type: 'perf', release: 'patch' },
          { type: 'refactor', release: 'patch' },
          { type: 'build', release: false },
          { type: 'ci', release: false },
          { type: 'docs', release: false },
          { type: 'style', release: false },
          { type: 'test', release: false },
          { type: 'chore', release: false },
        ],
      },
    ],
    ['@semantic-release/release-notes-generator', { preset: 'conventionalcommits' }],
    ['@semantic-release/changelog', { changelogFile: 'CHANGELOG.md' }],
    [
      '@semantic-release/exec',
      {
        prepareCmd: 'RELEASE_VERSION=${nextRelease.version} node scripts/sync-version.mjs',
      },
    ],
    [
      '@semantic-release/git',
      {
        assets: ['CHANGELOG.md', 'package.json', 'apps/**/package.json', 'apps/**/src/version.ts'],
        message: 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
      },
    ],
    ['@semantic-release/npm', { npmPublish: false }],
  ],
};
