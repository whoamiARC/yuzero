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

这说明旧官网使用 GitHub Pages 提供内容，DNS 则由腾讯云 DNSPod 管理。部署过程中，用户已将名称服务器迁移到 Cloudflare，域名区域现为 active：`harlee.ns.cloudflare.com`、`nash.ns.cloudflare.com`。后续官网解析在 Cloudflare 管理。

| 类型 | 主机记录 | 原记录值 | 新记录值 |
| --- | --- | --- | --- |
| CNAME | `www` | `whoamiarc.github.io` | `yuzero.pages.dev` |

已在 Cloudflare 完成上表 CNAME 切换，保留代理开启和自动 TTL。自定义域名、所有权验证与 HTTPS 验证均为 active。

## 本次发布结果（2026-09-11）

- Cloudflare 生产部署状态：success。
- 部署标识：`78678313-4e02-4431-8207-052af4c9dbd0`。
- 对应应用源码提交：`1b8a965e3de772500428b108fbbdbfabe82f5183`。
- 不可变部署地址：`https://78678313.yuzero.pages.dev`。
- 已在正式域名通过 HTTPS 检查首页、产品、了解我们、联系我们四页，均返回 HTTP 200。
- 已验证产品页包含 CET通 1.0（.cn）、2.0（.com）及 CoFate 入口；静态导航数据和 CoFate 图片也返回 HTTP 200。
- 13 项静态发布检查通过。

域名注册、其他子域名和邮件解析不属于此次迁移。不要删除其他记录。根域 `yuzero.com` 的处理应依据其现有用途单独决定。

## 回退

旧 GitHub Pages 工作流与原地址保留。若需回退域名，可将 `www` 的 CNAME 恢复为上表原值，并等待 DNS 缓存更新。Cloudflare 后续版本也可在项目 Deployments 中回退到已成功的旧版本。

参考：[Cloudflare Pages 自定义域名](https://developers.cloudflare.com/pages/configuration/custom-domains/)、[Direct Upload](https://developers.cloudflare.com/pages/get-started/direct-upload/)。
