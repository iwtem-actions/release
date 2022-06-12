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
          trigger: 'tag'
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

## 工作流程

1. 本地创建一个 tag

```shell
git tag -a -m 'Version x.x.x' x.x.x
```

2. 推送到 GitHub 仓库

```shell
git push --follow-tags
```

3. 新 tag 的创建触发 Action

4. Action 执行自动发布 release

## LICENSE

[MIT](https://github.com/iwtem-actions/release/blob/master/LICENSE)
