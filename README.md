# 🍭 Auto Make Release

🤖 用于自动发布 release 的 GitHub Action

## 🚀 Usage

### Example

```yml
name: 🤖 Auto Make Release

on:
  create

jobs:
  release-helper:
    runs-on: ubuntu-latest
    steps:
      - name: make release
        if: github.event.ref_type == 'tag'
        uses: iwtem-actions/release
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          triger: 'tag'
          changelogs: 'CHANGELOG.md'
          branch: 'master'
```

### Inputs

| Name             | Desc                                                          | Type    | Required |
|------------------|---------------------------------------------------------------|---------|----------|
| token            | GitHub Token                                                  | string  | ✔        |
| trigger          | Triggering conditions                                         | string  | ✔        |
| changelogs       | The changelog file path                                       | string  | ✔        |
| branch           | The changelog file branch                                     | string  | ✔        |
| prerelease-flags | Version filter prerelease                                     | string  | ✖        |
