## 杂记

### 工程化

初始化项目
```shell
create-react-app lan --template typescript
```

安装`vscode-styled-components`插件，提供`styled`的展示与编码提示。

```shell
yarn build-sbs
git add .
git commit -m 'deploy: generate static page by storybook'
git subtree push --prefix build orign gh-pages
```