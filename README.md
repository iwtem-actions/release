# π­ Auto Make Release

π€ η¨δΊθͺε¨εεΈ release η GitHub Action

## π Usage

### Example

```yml
name: π€ Auto Make Release

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
| token            | GitHub Token                                                  | string  | β        |
| trigger          | Triggering conditions                                         | string  | β        |
| changelogs       | The changelog file path                                       | string  | β        |
| branch           | The changelog file branch                                     | string  | β        |
| prerelease-flags | Version filter prerelease                                     | string  | β        |

## ε·₯δ½ζ΅η¨

1. ζ¬ε°εε»ΊδΈδΈͺ tag

```shell
git tag -a -m 'Version x.x.x' x.x.x
```

2. ζ¨ιε° GitHub δ»εΊ

```shell
git push --follow-tags
```

3. ζ° tag ηεε»Ίθ§¦ε Action

4. Action ζ§θ‘θͺε¨εεΈ release

## LICENSE

[MIT](https://github.com/iwtem-actions/release/blob/master/LICENSE)
