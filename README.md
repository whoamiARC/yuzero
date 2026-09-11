# YuZero 煜零科技官网

公司官网介绍 YuZero、旗下产品及合作方式。采用公司提供的深蓝 / 青绿色 Logo，包含桌面与手机布局、移动导航、键盘操作及减少动态效果支持。

## 独立页面

| 页面 | 中文路径 | 英文路径 | 内容 |
| --- | --- | --- | --- |
| 首页 | `/` | `/en/` | 品牌介绍与主要入口 |
| 公司产品 | `/products/` | `/en/products/` | YuZero Go、CET通 1.0 / 2.0、CoFate 因果 |
| 了解我们 | `/about/` | `/en/about/` | 公司理念、技术能力、产品方法 |
| 联系我们 | `/contact/` | `/en/contact/` | 商务合作与联系邮箱 |

所有页面共用导航和页脚，导航高亮当前页。页面可单独访问、刷新及分享；每页提供独立标题、描述与 canonical 地址。

桌面和手机顶部的 English / 中文链接切换到当前页面的另一语言，站内导航继续使用当前语言。语言由 URL 确定，刷新、分享和浏览器返回均保留对应版本；不会根据 IP 自动跳转。中文和英文分别输出正确的 `html lang`，每页提供双向 `hreflang` 和中文 `x-default`。语言切换使用原生链接跨根布局完整导航，无需等待 JavaScript；现有中文产品品牌和官方图片保持原样。

## 产品与品牌

- **YuZero**：公司主品牌，官网为 `https://www.yuzero.com`。
- **YuZero Go**：面向埃塞俄比亚的餐饮、超市配送产品。`https://go.yuzero.com` 为公开体验版，产品卡提供真实入口；演示不收取款项或安排真实配送。
- **CET通 1.0**：四六级试卷、答案和听力资料下载，`https://www.cettong.cn`。
- **CET通 2.0**：英语四、六级备考平台，`https://www.cettong.com`。
- **CoFate 因果**：AI 多人叙事社交，当前公开测试，`https://www.cofate.com`。
- 商务邮箱沿用原官网的 `hello@yuzero.cn`，统一配置在 `lib/site.ts`。

## 文件结构

- `app/(zh)/`：中文四页路由及中文根布局。
- `app/(en)/en/`：英文四页路由及英文根布局。
- `components/pages/`：两种语言共用的页面结构。
- `components/site-shell.tsx`：共享导航、当前页状态、移动菜单与页脚。
- `components/brand.tsx`：共享 Logo 和箭头组件。
- `lib/site.ts`：商务邮箱、静态图片和原生链接地址配置。
- `lib/i18n.ts`：语言类型、对应路径、共享导航和辅助文案。
- `lib/copy.ts`：页面中英文内容，仅在服务器渲染时使用。
- `lib/metadata.ts`：每页中英文标题、描述、canonical、语言替代地址与图标。
- `app/globals.css`：品牌色、排版与响应式样式。
- `public/`：本地品牌及产品素材，来源见 `docs/ASSETS.md`。
- `scripts/build-pages.mjs`：GitHub Pages 静态导出。
- `scripts/deploy-cloudflare.mjs`：构建、检查后发布到用户 Cloudflare Pages。
- `tests/rendered-html.test.mjs`：发布产物中的导航、状态及资源路径检查。
- `.github/workflows/`：保留原有 GitHub Pages 自动发布配置。

## 本地开发

使用 Node.js 22.13+ 和 pnpm 11；仓库保留现有依赖与锁文件。若本机没有正确配置 pnpm，可通过 Corepack 运行：

```powershell
corepack pnpm@11 install --frozen-lockfile
corepack pnpm@11 run dev --port 5180
```

打开 `http://localhost:5180/`。预览与外卖应用的 5173 端口互相独立。

## 构建与验证

```powershell
# 现有 Sites / Cloudflare Worker 构建
corepack pnpm@11 run build

# 自定义域名 www.yuzero.com 的静态导出及产物检查
$env:YUZERO_PAGES_BASE_PATH='/'
corepack pnpm@11 test
```

`test` 先执行真实 Next.js 静态导出，再检查中英两套、共八个页面的 HTML。34 项检查覆盖页面语言与翻译遗漏、标题和 canonical、双向 hreflang、切换到对应页面、站内语言保持、当前页导航、跨页链接、内部锚点、移动菜单初始状态、产品上线状态及图片、CSS、JS、图标文件。

单独执行 `corepack pnpm@11 run build:pages` 可生成 `out/`。未设置 `YUZERO_PAGES_BASE_PATH` 时默认前缀为 `/yuzero`，适用于仓库型 GitHub Pages 地址；自定义域名使用 `/`。框架资源、产品图片与网站图标共同使用该前缀。

站内页面链接使用 Next `Link`，由框架自动附加部署前缀；不要给页面链接调用 `asset()`。跨语言原生链接通过 `siteHref()` 附加前缀。静态导出包含中文页面与对应的 `out/en/` 页面，支持分页地址直接访问。

## 发布

本次官网发布目标为用户 Cloudflare 账号中的 Pages 项目 `yuzero`，默认地址 `https://yuzero.pages.dev`，正式域名为 `https://www.yuzero.com`。

```powershell
# 已登录具有 Pages 权限的 Cloudflare 账号后执行
corepack pnpm@11 run deploy:cloudflare
```

此命令会用根路径配置重新构建、运行发布检查，然后直接上传到 Cloudflare 的生产环境。域名切换与原托管信息见 `docs/DEPLOYMENT.md`。

仓库原有 GitHub Pages 工作流继续保留；它只更新旧 GitHub Pages 地址，不会自动更新 Cloudflare。后续发布 Cloudflare 请使用上面的命令。

`go.yuzero.com` 由外卖项目的独立 Cloudflare Worker 提供服务，公司官网只展示产品入口。更新公司官网不会替代 Go 应用的部署。
