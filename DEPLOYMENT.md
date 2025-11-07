# 部署指南

本文档提供了将动态数据可视化平台部署到不同环境的详细指南。

## 目录

1. [本地部署](#本地部署)
2. [云平台部署](#云平台部署)
3. [服务器部署](#服务器部署)
4. [容器化部署](#容器化部署)
5. [常见问题](#常见问题)

## 本地部署

### 方法一：直接打开HTML文件
最简单的方式是直接用浏览器打开`完整动态数据可视化平台.html`文件：
1. 找到项目文件夹中的`完整动态数据可视化平台.html`
2. 双击文件或右键选择"打开方式" → 选择浏览器

### 方法二：使用本地服务器
推荐使用本地服务器运行，以避免一些跨域问题：

#### 使用Python
```bash
# Python 3
cd /path/to/project
python -m http.server 8080

# 访问 http://localhost:8080/完整动态数据可视化平台.html
```

#### 使用Node.js
```bash
# 安装serve (如未安装)
npm install -g serve

# 运行服务器
cd /path/to/project
npx serve -p 8080

# 访问 http://localhost:8080/完整动态数据可视化平台.html
```

#### 使用PHP
```bash
cd /path/to/project
php -S localhost:8080

# 访问 http://localhost:8080/完整动态数据可视化平台.html
```

## 云平台部署

### GitHub Pages
1. 创建GitHub仓库并上传项目文件
2. 进入仓库设置(Settings)
3. 找到Pages选项
4. 在Source中选择"Deploy from a branch"
5. 选择主分支和/(root)文件夹
6. 点击Save
7. 几分钟后，通过提供的URL访问应用

### Netlify
1. 将项目上传到GitHub仓库
2. 访问[Netlify](https://www.netlify.com/)
3. 点击"New site from Git"
4. 选择GitHub并授权
5. 选择你的仓库
6. 构建设置留空（静态文件）
7. 点击"Deploy site"
8. 部署完成后，获得访问URL

### Vercel
1. 将项目上传到GitHub仓库
2. 访问[Vercel](https://vercel.com/)
3. 点击"New Project"
4. 导入GitHub仓库
5. 预设选择"Other"
6. 点击"Deploy"
7. 部署完成后，获得访问URL

### CloudStudio (已部署)
项目已成功部署到CloudStudio，可通过以下链接访问：
[动态数据可视化平台在线演示](http://52f79f2099be459faa925a032752f859.codebuddy.cloudstudio.run)

## 服务器部署

### Apache服务器
1. 将项目文件复制到Apache的网站根目录（如/var/www/html/）
2. 确保Apache已启动并运行
3. 通过浏览器访问服务器IP/域名/完整动态数据可视化平台.html

### Nginx服务器
1. 将项目文件复制到Nginx的网站根目录（如/usr/share/nginx/html/）
2. 配置Nginx服务器：
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       root /path/to/project;
       index 完整动态数据可视化平台.html;
       
       location / {
           try_files $uri $uri/ =404;
       }
   }
   ```
3. 重启Nginx服务
4. 通过浏览器访问服务器IP/域名

## 容器化部署

### Docker部署
1. 创建Dockerfile：
   ```dockerfile
   FROM nginx:alpine
   COPY . /usr/share/nginx/html
   EXPOSE 80
   ```
2. 构建镜像：
   ```bash
   docker build -t data-visualization-platform .
   ```
3. 运行容器：
   ```bash
   docker run -d -p 80:80 --name visualization-platform data-visualization-platform
   ```
4. 访问 http://localhost

### Docker Compose部署
1. 创建docker-compose.yml：
   ```yaml
   version: '3'
   services:
     web:
       image: nginx:alpine
       ports:
         - "80:80"
       volumes:
         - .:/usr/share/nginx/html
   ```
2. 运行：
   ```bash
   docker-compose up -d
   ```
3. 访问 http://localhost

## 常见问题

### 问题1：图表不显示
- **原因**：可能是加载顺序问题或CDN资源加载失败
- **解决**：使用本地服务器运行，确保网络连接正常

### 问题2：Excel文件导入失败
- **原因**：文件格式不符合要求或文件过大
- **解决**：检查文件格式是否符合页面说明，尝试使用较小的文件

### 问题3：导出图片功能不工作
- **原因**：浏览器安全策略限制
- **解决**：使用现代浏览器，确保在服务器环境下运行而非直接打开文件

### 问题4：在移动设备上显示异常
- **原因**：响应式布局问题
- **解决**：尝试刷新页面或使用横屏模式

## 性能优化建议

1. **压缩资源**：使用Gzip压缩HTML、CSS和JavaScript文件
2. **使用CDN**：将静态资源部署到CDN加速访问
3. **缓存策略**：设置适当的浏览器缓存头
4. **代码拆分**：如果项目扩大，考虑按需加载图表

## 维护与更新

1. **定期更新依赖**：检查并更新ECharts和其他库的版本
2. **监控日志**：定期检查服务器访问日志，发现异常情况
3. **备份数据**：定期备份项目文件和配置

---

如需其他部署方式的帮助，请提交Issue或联系项目维护者。