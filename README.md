# YuZero 煜零科技门户网站

煜零科技（YuZero）企业门户网站，使用 Next.js 构建，并通过 GitHub Actions 自动发布到 GitHub Pages。

## 本地开发

```bash
pnpm install
pnpm dev
```

浏览器访问 `http://localhost:3000`。

## 更新线上网站

完成本地修改后，将代码推送到 `main` 分支：

```bash
git add -A
git commit -m "更新网站"
git push origin main
```

推送完成后，GitHub Actions 会自动构建并发布网站，无需手动上传文件。

## 自定义域名

线上域名规划为 `www.yuzero.com`。GitHub 仓库的 Pages 设置中需要填写该域名，同时在域名服务商处添加以下解析：

| 类型 | 主机记录 | 记录值 |
| --- | --- | --- |
| CNAME | www | whoamiARC.github.io |

DNS 生效并签发证书后，可在 GitHub Pages 中启用 HTTPS。

## 构建方式

- `pnpm build`：构建 Sites / Cloudflare Worker 版本。
- `pnpm build:pages`：生成 GitHub Pages 使用的静态文件到 `out/`。
