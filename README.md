# Yifan Xu's personal website

这是 Yifan Xu（Ivan）的纯静态个人学术主页。个人简介、研究兴趣和教育经历已经填入；项目、联系方式、CV 与头像目前仍使用占位内容。

## 本地预览

在仓库根目录运行：

```bash
python3 -m http.server 8000
```

然后访问 <http://localhost:8000>。完成查看后，在终端按 `Ctrl+C` 停止服务。

## 接下来如何填写

1. 在 `index.html` 中搜索 `[`，逐项替换姓名、简介、研究方向、项目、动态和经历。
2. 将头像、项目图片和 CV 放入 `assets/`，再把对应路径添加到 `index.html`。
3. 更新页面顶部的 title、description、author 和社交分享信息。
4. 准备公开发布时，删除 `index.html` 中的 `noindex, nofollow` robots 设置。

更完整的资料清单见 `CONTENT.md`。

## 文件结构

```text
index.html       页面内容与结构
stylesheet.css  页面视觉与响应式样式
CONTENT.md       待填写资料清单
assets/          后续放置个人图片、项目媒体和文档
.nojekyll        让 GitHub Pages 直接发布静态文件
```

默认部署地址为 <https://aprilavrilivan.github.io/>。如果以后使用自定义域名，再创建 `CNAME` 文件并填入自己的域名。
