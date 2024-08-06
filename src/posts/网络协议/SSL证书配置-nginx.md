# SSL 证书配置-nginx

SSL 证书对网站安全性的提升是至关重要的，本文主要介绍如何配置 SSL 证书。平台选择的是阿里云 SSL 证书。

## 一、 申请证书

在阿里云的`数字证书管理服务`中，找到`SSL证书管理`，有免费证书（个人测试证书）和付费证书，其中免费证书最多可申请 20 个，有效期 3 个月，到期后继续申请，下载，更新原域名的证书。资金充足的话，建议购买付费证书。

这里我选择申请个人测试证书（免费）：

- 个人测试证书 tab 选择创建证书

![证书管理](https://blog.mocaii.cn/ssl/证书管理.png)

- 填写域名和数量，然后勾选‘快捷签发’，继续完善信息

![证书申请](https://blog.mocaii.cn/ssl/证书申请.png)

- 核对联系人、所在地信息，其它信息可以按系统默认即可，点击提交审核

![证书审核](https://blog.mocaii.cn/ssl/证书审核.png)

- 一般 30 分钟内审核通过，然后下发证书。

## 二.证书配置

### 1.下载证书

- 审核通过后，列表会出现下载按钮，点击下载，根据自己的服务器类型选择下载，不通的服务器类型，证书格式不一样。这里我选择下载 nginx 类型的证书。

![证书下载](https://blog.mocaii.cn/ssl/证书下载.png)

- 下载完成后解压，得到两个文件

![证书解压](https://blog.mocaii.cn/ssl/证书解压.png)

### 2.上传证书到服务器

将解压后的两个文件上传到服务器的 `/etc/nginx/cert` 目录下（实际路径以自己服务器为准）。可以通过 SFTP 命令或 SCP 命令上传，也可以使用 Alibaba Cloud Client 桌面应用上传。

```bash
# scp上传本地文件/文件夹到云服务器
scp -r 本地文件/文件夹的绝对路径 云服务器用户名@云服务器实例公网IP地址:云服务器文件保存根目录

# sftp 登录云服务器
sftp [云服务器登录名]@[云服务器公网IP地址]
# sftp上传文件到云服务器
put -r 本地主机文件/文件夹的绝对路径 云服务器文件保存根目录
```

### 3.修改服务器 nginx 配置

修改 nginx 配置文件，将证书和私钥文件路径替换成实际路径。

```bash
http {
  # ...
  server {
        listen       443 ssl; # 监听 443 端口
        server_name  xxx.com; # 域名 xxx.com
        ssl_certificate /etc/nginx/cert/xxx.com.pem; # 证书文件, 路径根据实际情况填写
        ssl_certificate_key /etc/nginx/cert/xxx.com.key; # 私钥文件, 路径根据实际情况填写
        ssl_session_cache shared:SSL:1m; # 缓存大小
        ssl_session_timeout 5m; # 超时时间
        ssl_ciphers PROFILE=SYSTEM; # 加密算法
        ssl_prefer_server_ciphers on; # 优先使用服务器端密码套件

        location / { # 监听 / 路径
            root /yourProject/dist; # 静态资源路径
            try_files $uri /index.html; # 尝试访问 index.html
            index  index.html index.htm; # 默认首页
        }


        # Load configuration files for the default server block.
        include /etc/nginx/default.d/*.conf; # 默认配置文件

        error_page 404 /404.html;# 404 页面
            location = /40x.html {
        }

        error_page 500 502 503 504 /50x.html;# 50x 页面
            location = /50x.html {
        }
    }
    # ...

    # 监听 80 端口，将所有 HTTP 请求重定向到 HTTPS
    server {
      listen 80; # 监听端口
      #填写证书绑定的域名
      server_name xxx.com;# 域名
      #将所有HTTP请求通过rewrite指令重定向到HTTPS。
      rewrite ^(.*)$ https://$host$1;
      location / {
        root /yourProject/dist;
        try_files $uri /index.html;
        index  index.html index.htm;
        }

      # Load configuration files for the default server block.
      include /etc/nginx/default.d/*.conf;

      error_page 404 /404.html;
          location = /40x.html {
      }

      error_page 500 502 503 504 /50x.html;
          location = /50x.html {
      }
  }
}
```

修改完成后，重启 nginx 服务器。用 `https://域名访问`，如果可以正常访问，则说明配置成功。

## 三、证书替换

- 证书到期后，需要重新申请证书。重复上面申请证书的步骤即可。
- 申请完成后，下载证书，把解压得到的两个文件上传到服务器。先删除原来的证书，再上传新的证书。
- 上传完成后，重启 nginx 服务器即可。
