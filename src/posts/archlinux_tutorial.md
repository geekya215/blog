---
date: 2021-01-19
categories:
  - Linux
tags:
  - 总结思考
author: geekya215
---

# Arch Linux 完全指北

此文为博主自身在安装 Arch Linux 过程中的总结。主要参考 [Arch Wiki](https://wiki.archlinux.org/)，本文章具有一定时效性，里面的内容可能在以后的某个时间失效。
如果遇到错误，请参考最新版本的官方文档，或通过通过网络寻求帮助。

**本文默认安装单系统，有线网络环境，系统使用 UEFI 模式启动，禁用 Secure Boot。**

## 安装前准备

- 下载安装镜像，推荐使用国内清华大学镜像站（[TUNA](https://mirrors.tuna.tsinghua.edu.cn/archlinux/iso/latest/)），也可以通过 [Arch 官方下载页面](https://archlinux.org/download/)，选择最符合自己网络状况的镜像站。
- 下载完毕后，需要将镜像文件刻录至U盘中，Linux 下可以使用 `dd` 命令完成，Windows 平台下推荐使用 [Rufus](https://rufus.ie/)。


## 开始安装

插入刚刚完成刻录的U盘，在开机时选择从U盘启动。通过 Arch 的引导界面进入 Live 环境。

### 网络检查

进入环境后，检查网络接口
```
# ip link
```

使用 `ping` 命令检查网络
```
# ping www.baidu.com
```

### 同步系统时间

更新系统时钟
```
# timedatectl set-ntp true
```

完成设置后可以使用如下命令查看服务状态
```
# timedatectl status
```

### 分区格式化及挂载

查看系统磁盘当前状态
```
# fdisk -l
```
或者
```
# lsblk
```

如果硬盘被成功识别，会出现 `/dev/sda`， `/dev/nvme0n1` 之类的硬盘设备文件。这里假设硬盘设备为 `/dev/sda`。采用最基本的分区方式。

使用 `cfdisk` 命令进行分区，也可使用 `parted`，根据个人喜好选择。
```
# cfdisk /dev/sda
```

分区方式如下：

分区类型|分区|分区大小
----|----|----
efi分区 |  /dev/sda1   | 512M
swap分区|  /dev/sda2   | 实际内存大小
root分区|  /dev/sda3   | 磁盘剩余空间

格式化分区
```
# mkfs.vfat -F32 /dev/sda1
# mkfs.swap /dev/sda2
# swapon /dev/sda2
# mkfs.ext4 /dev/sda3
```

挂载格式化完成的分区
```
# mount /dev/sda3 /mnt
# mkdir /mnt/boot
# mount /dev/sda1 /mnt/boot
```

挂载完毕后可以使用 `df` 命令查看挂载是否正确

### 更改镜像源

查看 `/etc/pacman.d/mirrorlist` 文件，将最符合当前网络状况的镜像网址放在列表的最前。

### 安装系统

```
# pacstrap /mnt base linux linux-firmware
```

### 配置系统

生成 fstab 文件
```
# genfstab -U /mnt >> /mnt/etc/fstab
```

查看生成的 fstab 文件是否正确
```
# cat /mnt/etc/fstab
```

进入新安装的系统环境
```
# arch-chroot /mnt
```

> 因为后面有些配置需要操作文本，这里可以先安装 vim 方便后面编辑

设置时区
```
# ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
```

生成 `/etc/adjtime`
```
# hwclock --systohc
```

编辑 `/etc/locale.gen`，去掉 `en_US.UTF-8 UTF-8` 这一行的注释。

> 因为使用中文字体会导致 tty 出现错误，这里只使用英文字体

生成 locale 信息
```
# locale-gen
```

创建 `locale.conf` 并在文件中加入 `LANG=en_US.UTF-8`

### 网络配置

设置主机名
```
# echo hostname >> /etc/hostname
```

创建 `/etc/hosts` 并加入以下内容
```
127.0.0.1	localhost
::1		localhost
127.0.1.1	myhostname.localdomain	myhostname
```

安装 `dhcpcd` 并启用
```
# pacman -S dhcpcd
# systemctl enable dhcpcd
# systemctl start dhcpcd
```

### 引导配置

安装引导工具包以及 CPU 微码。微码需要根据自己使用的 CPU 来选择。Intel 用户安装 `intel-ucode`，AMD 用户安装 `amd-ucode`。

```
# pacman -S grub efibootmgr
# pacman -S amd-ucode
```

安装 GRUB
```
# grub-install --target=x86_64-efi --efi-directory=/boot --bootloader-id=GRUB
```

生成主配置文件
```
# grub-mkconfig -o /boot/grub/grub.cfg
```

### 杂项

给 root 用户设置密码以便重启后登陆
```
# passwd
```

退出 chroot 环境
```
# exit
```

卸载挂载的分区
```
# umount -R /mnt
```

重启系统
```
# reboot
```


## 新系统的基本配置

重启完成后使用 root 账户和刚刚设置的密码进入系统，首先通过 `ping` 命令测试网络是否已连接，如果未能连接，查看 `dhcpcd` 的服务是否正常运行。

更新软件仓库
```
# pacman -Syyu
```

### 配置 Archlinuxcn 仓库

在 `/etc/pacman.conf` 文件底部加入以下内容
```
[archlinuxcn]
Server = https://mirrors.tuna.tsinghua.edu.cn/archlinuxcn/$arch
```

刷新软件仓库并安装 `archlinuxcn-keyring` 导入 `GPG-key`
```
# pacman -Syyu
# pacman -S archlinux-keyring
```

### 用户以及权限配置

添加用户
```
# useradd -m -G wheel username
```

设置用户的密码
```
# passwd username
```

安装 `sudo` 并使用 `visudo` 命令编辑 `/etc/sudoers` 文件，由于 `visudo` 命令默认使用的是 `vi` 来编辑，而系统中没有安装 `vi`，可以使用如下命令来指定 `visudo` 命令启动的编辑器
```
# EDITOR=vim visudo
```
此时会使用 `vim` 打开 `/etc/sudoers` 文件，需要将 `# %whell ALL=(ALL)` 这一行取消注释
> 建议不要直接编辑 `sudoers` 文件，使用 `visudo` 命令完成编辑退出时会自动检测文件的格式，确保 `sudo` 命令能够正常运行，否则可能会导致不可预料的错误。


退出 root 账户，使用新创建的账户进入系统。

## 图形环境配置

安装 Xorg 相关组件
```
$ sudo pacman -S xorg
```
> 这里采用默认安装，可能会安装一些不需要的包，可根据自身需要精简。

安装相应的显卡驱动，根据显卡型号选择，AMD 安装 `xf86-video-amdgpu`，Nvidia 安装 `nvidia`
```
$ sudo pacman -S nvidia
```

这里使用 Suckless 的窗口管理器 [dwm](https://dwm.suckless.org/)，由于需要编译，安装必要的工具链。
```
$ sudo pacman -S make gcc pkg-config libxft git
```

从 Suckless 官网克隆 dwm 的最新源码
```
$ git clone https://git.suckless.org/dwm
```

进入 dwm 目录，由于不需要多屏幕支持，将 `config.mk` 文件中以下几行注释掉
```
XINERAMALIBS  = -lXinerama
XINERAMAFLAGS = -DXINERAMA
```

dwm 默认只提供最基本的功能，推荐使用以下 patch 获取更好的用户体验
- **[alpha](https://dwm.suckless.org/patches/alpha/)** - 使状态栏拥有透明效果
- **[autostart](https://dwm.suckless.org/patches/autostart/)** - dwm 启动时可以运行用户自定义的脚本
- **[awesomebar](https://dwm.suckless.org/patches/awesomebar/)** - 让任务栏拥有类似 awesome 的功能
- **[fullscreen](https://dwm.suckless.org/patches/fullscreen/)** - 使窗口拥有全屏功能
- **[hide vacant tags](https://dwm.suckless.org/patches/hide_vacant_tags/)** - 隐藏空标签
- **[noborder](https://dwm.suckless.org/patches/noborder/)** - 当前面屏幕只有一个窗口时隐藏边界
- **[pertag](https://dwm.suckless.org/patches/pertag/)** - 使不同标签下的窗口拥有不同的布局方式
- **[vanitygaps](https://dwm.suckless.org/patches/vanitygaps/)** - 让窗口拥有类似 i3-gaps 的功能

编译源码完成安装
```
$ sudo make && make clean install
```

编辑 `～/.xinitrc` 加入以下内容
```
exec dwm
```

如果希望登陆时自动 X，可以采用以下方式
- 如果使用 Bash，编辑 `～/.bash_profile`
- 如果使用 zsh，编辑 `～/.zprofile`

加入以下内容
```
if [[ ! $DISPLAY && $XDG_VTNR -eq 1 ]]; then
  exec startx
fi
```

启动 X
```
$ startx
```

## 中文输入法配置

安装 fcitx5
```
$ sudo pacman -S fcitx5
```

安装中文输入法引擎
```
$ sudo pacman -S fcitx5-chinese-addons
```

如果需要支持 Qt 或 GTK 程序，需要额外安装以下包
```
$ sudo pacman -S fcitx5-qt fcitx5-gtk
```

添加中文词库
```
$ sudo pacman -S fcitx5-pinyin-zhwiki fcitx5-pinyin-moegirl
```

安装 fcitx5 GUI 客户端配置工具
```
$ sudo pacman -S fcitx5-configtool
```
> fcitx5 的配置文件位于 `～/.config/fcitx5`，如果有需要可以手动编辑。

安装 fcitx5 的备选主题
```
$ sudo pacman -S fcitx5-material-color
```
安装完成后可以在 fcitx5 的图形化配置界面更改主题

配置 fcitx5 环境变量，在 `～/pam_environment` 文件中添加以下内容
```
GTK_IM_MODULE DEFAULT=fcitx
QT_IM_MODULE  DEFAULT=fcitx
XMODIFIERS    DEFAULT=\@im=fcitx
```

将 fcitx5 设置为随 X 一起启动，在 `~/.xinitrc` 中添加以下内容
```
fcitx5 &
sleep 2
```

**fcitx5 在 IntelliJ 系列软件的 IDE 中会出现输入框位置不正确的错误，解决方式可参考以下链接**
- [fcitx输入法在Intellij IDEA开发工具中输入法候选框无法跟随光标](https://bbs.archlinuxcn.org/viewtopic.php?pid=43982#p43982)
- [intellij 系列的 ide 中输入框位置不正确](https://github.com/fcitx/fcitx5/issues/79)

## 软件包

以下为我自己在使用 Arch Linux 系统中常用的软件包

### 字体
- **wqy-mircohei**
- **nerd-fonts-hack**
- **ttf-joypixels**
- **ttf-symbola**

**终端相关**
- **alacritty**
- **ranger**
- **lazygit**
- **lazydocker**
- **neofetch**
- **htop**
- **mosh**
- **tmux**
- **ueberzug**
- **highlight**
- **fzf**
- **bc**
- **mdp**
- **ripgrep**

### 桌面显示
- **feh**
- **picom**

**编辑器**
- **neovim**
- **emacs**

**科学上网**
- **clash**
- **proxychians-ng**

**聊天工具**
- **telegram**
- **discord**

**其他**
- **screenkey**
- **albert**
- **aria2**
- **yay**
- **trayer**

以上某些软件包需要配置，具体的配置方法可参考 [dotfiles](https://github.com/geekya215/dotfiles)
