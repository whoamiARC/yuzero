# YuZero 煜零科技官网

公司官网介绍 YuZero、旗下产品及合作方式。采用公司提供的深蓝 / 青绿色 Logo，包含桌面与手机布局、移动导航、键盘操作及减少动态效果支持。

## 独立页面

| 页面 | 路径 | 内容 |
| --- | --- | --- |
| 首页 | `/` | 品牌介绍与主要入口 |
| 公司产品 | `/products/` | YuZero Go、CET通 1.0 / 2.0、CoFate 因果 |
| 了解我们 | `/about/` | 公司理念、技术能力、产品方法 |
| 联系我们 | `/contact/` | 商务合作与联系邮箱 |

所有页面共用导航和页脚，导航高亮当前页。页面可单独访问、刷新及分享；每页提供独立标题、描述与 canonical 地址。

## 产品与品牌

- **YuZero**：公司主品牌，官网为 `https://www.yuzero.com`。
- **YuZero Go**：面向埃塞俄比亚的餐饮、超市配送产品。当前显示“开发中”；`go.yuzero.com` 是待启用的产品域名，未配置为可点击的上线入口。
- **CET通 1.0**：四六级试卷、答案和听力资料下载，`https://www.cettong.cn`。
- **CET通 2.0**：英语四、六级备考平台，`https://www.cettong.com`。
- **CoFate 因果**：AI 多人叙事社交，当前公开测试，`https://www.cofate.com`。
- 商务邮箱沿用原官网的 `hello@yuzero.cn`，统一配置在 `lib/site.ts`。

## 文件结构

- `app/page.tsx`：首页品牌展示与分页入口。
- `app/products/page.tsx`：公司产品页。
- `app/about/page.tsx`：了解我们页。
- `app/contact/page.tsx`：联系我们页。
- `components/site-shell.tsx`：共享导航、当前页状态、移动菜单与页脚。
- `components/brand.tsx`：共享 Logo 和箭头组件。
- `lib/site.ts`：导航、商务邮箱和静态图片地址配置。
- `app/globals.css`：品牌色、排版与响应式样式。
- `app/layout.tsx`：站点标题、描述、语言与图标。
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

`test` 先执行真实 Next.js 静态导出，再检查四个页面的 HTML。13 项检查覆盖各页标题和 canonical、当前页导航、跨页链接、内部锚点、移动菜单初始状态、产品上线状态及图片、CSS、JS、图标文件。

单独执行 `corepack pnpm@11 run build:pages` 可生成 `out/`。未设置 `YUZERO_PAGES_BASE_PATH` 时默认前缀为 `/yuzero`，适用于仓库型 GitHub Pages 地址；自定义域名使用 `/`。框架资源、产品图片与网站图标共同使用该前缀。

站内页面链接使用 Next `Link`，由框架自动附加部署前缀；不要给页面链接调用 `asset()`。静态导出包含 `out/products/index.html`、`out/about/index.html`、`out/contact/index.html`，支持分页地址直接访问。

## 发布

本次官网发布目标为用户 Cloudflare 账号中的 Pages 项目 `yuzero`，默认地址 `https://yuzero.pages.dev`，正式域名为 `https://www.yuzero.com`。

```powershell
# 已登录具有 Pages 权限的 Cloudflare 账号后执行
corepack pnpm@11 run deploy:cloudflare
```

此命令会用根路径配置重新构建、运行发布检查，然后直接上传到 Cloudflare 的生产环境。域名切换与原托管信息见 `docs/DEPLOYMENT.md`。

仓库原有 GitHub Pages 工作流继续保留；它只更新旧 GitHub Pages 地址，不会自动更新 Cloudflare。后续发布 Cloudflare 请使用上面的命令。

`go.yuzero.com` 需要为外卖产品单独配置 DNS 和部署目标，公司官网的产品展示不会自动创建子域名或发布外卖应用。
