from PIL import Image
import os

# 读取原图
input_path = "c:/Users/91875/WorkBuddy/20260422101700/dog3.jpeg"
output_path = "c:/Users/91875/WorkBuddy/20260422101700/dog3_cropped.jpeg"

img = Image.open(input_path)
print(f"原图尺寸: {img.size}")

# 获取原图尺寸
width, height = img.size

# 裁剪保留中间区域（去掉上下各30%）
top = int(height * 0.25)
bottom = height - int(height * 0.15)

# 确保裁剪区域有效
if bottom <= top:
    bottom = height
    top = 0

print(f"裁剪区域: top={top}, bottom={bottom}")

# 裁剪
cropped = img.crop((0, top, width, bottom))
print(f"裁剪后尺寸: {cropped.size}")

# 调整为适合微信分享的正方形尺寸
target_size = 500

# 如果裁剪后图片宽高比接近正方形，直接缩放
if abs(cropped.size[0] - cropped.size[1]) / cropped.size[0] < 0.3:
    # 接近正方形，直接resize
    final = cropped.resize((target_size, target_size), Image.LANCZOS)
else:
    # 长方形图片，填充白色背景
    # 先调整为合适大小，保持比例
    if cropped.size[0] > cropped.size[1]:
        new_width = target_size
        new_height = int(target_size * cropped.size[1] / cropped.size[0])
    else:
        new_height = target_size
        new_width = int(target_size * cropped.size[1] / cropped.size[0])
    
    resized = cropped.resize((new_width, new_height), Image.LANCZOS)
    
    # 创建正方形画布
    final = Image.new('RGB', (target_size, target_size), (255, 255, 255))
    paste_x = (target_size - new_width) // 2
    paste_y = (target_size - new_height) // 2
    final.paste(resized, (paste_x, paste_y))

# 保存
final.save(output_path, 'JPEG', quality=95)
print(f"已保存到: {output_path}")
print(f"最终尺寸: {final.size}")
