# Cloudflare 官网部署

## 发布目标

- Cloudflare Pages 项目：`yuzero`
- 生产分支标记：`main`
- 默认生产地址：`https://yuzero.pages.dev`
- 正式域名：`www.yuzero.com`
- 发布目录：`out/`；使用 `YUZERO_PAGES_BASE_PATH=/` 导出四个独立静态页面。
- 部署方式：Wrangler Direct Upload。可在本地运行 `corepack pnpm@11 run deploy:cloudflare`，包含构建与产物检查。

## 迁移前核实的解析（2026-09-11）

`www.yuzero.com` 的 CNAME 为 `whoamiarc.github.io`，TTL 为 600 秒；权威名称服务器为 `antonio.dnspod.net` 和 `susan.dnspod.net`。

这说明旧官网使用 GitHub Pages 提供内容，DNS 则由腾讯云 DNSPod 管理。此次发布采用 Cloudflare Pages，无需迁移整个域名的名称服务器；只需在 Cloudflare 关联 `www.yuzero.com` 后更新其 CNAME。

| 类型 | 主机记录 | 原记录值 | 新记录值 |
| --- | --- | --- | --- |
| CNAME | `www` | `whoamiarc.github.io` | `yuzero.pages.dev` |

DNS 切换后，应确认 Cloudflare 自定义域名状态为 active，HTTPS 可用，四个页面均可直接打开和刷新。

域名注册、其他子域名和邮件解析不属于此次迁移。不要删除其他记录。根域 `yuzero.com` 的处理应依据其现有用途单独决定。

## 回退

旧 GitHub Pages 工作流与原地址保留。若需回退域名，可将 `www` 的 CNAME 恢复为上表原值，并等待 DNS 缓存更新。Cloudflare 后续版本也可在项目 Deployments 中回退到已成功的旧版本。

参考：[Cloudflare Pages 自定义域名](https://developers.cloudflare.com/pages/configuration/custom-domains/)、[Direct Upload](https://developers.cloudflare.com/pages/get-started/direct-upload/)。
