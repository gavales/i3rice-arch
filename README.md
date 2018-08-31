# Scrots

![Workspace 1](ws1.png "Workspace 1")

![Workspace 2](ws2.png "Workspace 2")

![Workspace 3](ws3.png "Workspace 3")

![Workspace 4](ws4.png "Workspace 4")

![Workspace 5](ws5.png "Workspace 5")

# Main Install

First check UEFI:

```
ls /sys/firmware/efi/efivars
```

Connect to internet via ethernet or ```wifi-menu```.

Run ```timedatectl set-ntp true```.

Partition drive using fdisk or gdisk.

+ For GPT: BOOT, ROOT, SWAP, HOME
+ For MBR: BOOT, SWAP, ROOT, HOME

Make filesystems:

+ ```mkfs.ext4 /dev/sd**``` for BOOT, ROOT & HOME
+ ```mkswap /dev/sd**``` for SWAP, then ```swapon /dev/sd**```

Mount filesystems:

+ ```mount /dev/sdROOT /mnt```
+ ```mkdir boot```
+ ```mkdir home```
+ ```mount /dev/sdBOOT /mnt/boot```
+ ```mount /dev/sdHOME /mnt/home```

Install Arch:

+ ```pacstrap /mnt base base-devel git wget vim```

Make ```/etc/fstab```:

```
genfstab -U /mnt >> /mnt/etc/fstab
```

Install GRUB:

+ First ```arch-chroot /mnt```
+ ```pacman -S grub```
+ ```grub-install --target=i386-pc /dev/sdDRIVE```
+ ```grub-mkconfig -o /boot/grub/grub.cfg```

Generate locale:

+ ```vim /etc/locale.gen```
+ Uncomment your locale
+ Run ```locale-gen```
+ ```echo LANG=en_GB.UTF-8 >> /etc/locale.conf```
+ ```ln -sf /usr/share/zoneinfo/GMT /etc/localtime```

Hostname & Password

+ ```echo HOSTNAME /etc/hostname```
+ ```passwd```

Add User & User Password:

+ ```useradd -m -g wheel gavarch```
+ ```passwd gavarch```

Then...

```cd /etc```
```rm sudoers```
```wget https://raw.githubusercontent.com/StillANixRookie/i3rice-arch/master/sudoers```

For installing apps and configs:

```cd /home/gavarch```
```wget https://raw.githubusercontent.com/StillANixRookie/i3rice-arch/master/postarch```
```sudo bash postarch```

Install cli-visualizer from [here](https://github.com/dpayne/cli-visualizer).

Make a Matlab desktop icon:

```
sudo wget  https://apprecs.org/gp/images/app-icons/300/c4/in.pxlcraft.matlabexpo.jpg -O /usr/share/icons/matlab.png
sudo wget 'https://help.ubuntu.com/community/MATLAB?action=AttachFile&do=get&target=matlab-r2012a.desktop' -O /usr/share/applications/matlab.desktop
```
