---
title: git的基本命令
---

# git命令

* 版本检查

  ```bash
  $ git --version
  ```

* 配置用户名与账号

  ```bash
  $ git config [--global] user.email "1690150504@qq.com"
  $ git config [--global] user.name "sineava"

  // 列举git配置
  $ git config --list
  ```

* 初始化版本库

  ```bash
  $ git init

  // 显示隐藏的文件夹与文件
  $ ls -a
  ```

* 克隆git项目

  ```bash
  $ git clone project_url
  ```

* 常规命令workflow=&gt;项目提交

  ```bash
  $ touch readme.md
  $ git add .
  $ git commit -m "msg"
  ```

* 状态查看

  ```bash
  $ git status
  // Untracked files => 等待提交到暂存区(未add)
  // Changes not staged for commit => 版本已有文件遭到修改但是还没提交到暂存区
  // Changes to be committed => 已提交到暂存区
  ```

* 文件忽略提
* 发布压缩包

  ```bash
  $ git archive master --prefix="稳定版app" --form=zip > app.zip // 此时会多出app.zip
  ```

* git rebase

  > **公共分支禁止使用rebase**
  >
  > 场景一: develop分支进行了提交,接着master分支进行了提交,此时master分支限于develop分支,此时Merge会混乱git commit记录

  ```bash
  // 模拟环境
  $ git init
  $ touch master.html
  $ git add .
  $ git commit -m "master"
  $ git checkout -b ask
  $ touch ask.html
  $ git add .
  $ git commit -m "ask"
  $ git checkout master
  $ touch m2.php
  $ git add .
  $ git commit -m "master m2"
  // 如果此时git merge ask分支,就会出现图一的git log(较混乱) => 此时master分支比ask分支提前

  // git rebase
  $ git checkout ask
  $ git rebase master
  // 此时git commit记录更为干净=>子分支的基础点移到主分支后边
  ```

git log前后对比\(git rebase后提交记录更加清晰\)

* ssh/https连接

  > 对比: ssh连接可以进行无密码连接,但是需要配置密钥
  >
  > =&gt; 不同于https连接,不需要git remote add origin master操作,会直接进行配置

  ```bash
  // 密钥配置
  $ cd ~/.ssh
  $ vim id_rsa.pub // 复制公钥内容=>粘贴到github>setting>ssh and gpg keys>new ssh key

  // ssh情况下推送(初次)
  $ git clone git@github.com:sineava/git-release.git 
  $ touch readme.md
  $ git add .
  $ git commit -m "docs readme.md"
  $ git push // 省去配置
  ```

* 远程仓库

  ```bash
  // 本地版本库主动进行远程关联(初次)
  $ git remote add origin git@github.com:sineava/git-release.git
  $ git push -u origin master // 推送到远程服务器master分支

  // 查看远程仓库
  git remote -v
  ```

* git常规操作

  ```bash
  $ git clone https://github.com/sineava/git-release.git test => 将项目clone到test目录
  $ git branch -a
  $ git pull origin ask:ask // 将远程ask分支pull到本地,形成ask分支
  $ git push --set-upstream origin ask
  ```

参考资料

[git下载-macos/liux/window](https://git-scm.com/download)

[廖雪峰-集中式vs分布式](https://www.liaoxuefeng.com/wiki/896043488029600/896202780297248)

[后盾人-git视频教程](https://www.bilibili.com/video/av56582999?from=search&seid=8645296339130960606)

[win10 git bash 设置别名](https://blog.csdn.net/geol200709/article/details/96335072)

[彻底搞懂git rebase](http://jartto.wang/2018/12/11/git-rebase/)

[git hook实现自动化部署](https://blog.csdn.net/weixin_34128534/article/details/88748810)
