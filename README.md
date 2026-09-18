# 🖼️ ImageShrink

A web application to compress images and reduce file size while maintaining quality. All processing happens in the browser — no server uploads required.

แอปพลิเคชันเว็บสำหรับบีบอัดไฟล์ภาพให้ขนาดเล็กลง โดยยังคงคุณภาพไว้เท่าเดิม ประมวลผลทั้งหมดในเบราว์เซอร์ ไม่มีการอัพโหลดไฟล์ไปยังเซิร์ฟเวอร์

![Version](https://img.shields.io/badge/version-1.0.0-e95f3d)
![License](https://img.shields.io/badge/license-MIT-blue)

---

## 🇬🇧 English

### ✨ Features

- 🖼️ **Multiple formats** — JPG, PNG, WebP
- 📦 **Batch compression** — Drag & drop or select multiple files at once
- 🎚️ **Adjustable quality** — Set quality from 10-100%
- 📐 **Size limits** — Set maximum width/height
- 🔄 **Format conversion** — Convert between WebP, JPEG, and PNG
- 📊 **Live statistics** — Compare before/after sizes in real-time
- 🔒 **100% private** — All processing happens in your browser
- ⚡ **Lightning fast** — No upload/download to server needed
- 📱 **Responsive** — Works on desktop and mobile
- 🌙 **Dark theme** — Flat design with a comfortable dark UI

### 🛠️ Tech Stack

- **React 18** — UI Framework
- **TypeScript** — Type Safety
- **Vite** — Build Tool
- **Tailwind CSS** — Styling
- **Canvas API** — In-browser image processing

### 📦 Installation

#### Prerequisites

- Node.js 18+
- npm or yarn

#### Steps

```bash
# Clone the repository
git clone <repository-url>
cd imageshrink

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

### 🚀 Usage

#### 1. Add Image Files

- **Drag and drop** image files into the Drop Zone
- Or **click the Drop Zone** to select files from your device
- Multiple files are supported

#### 2. Configure Compression

- **Quality** — Adjust slider from 10-100% (70-85% recommended for balance)
- **Max dimensions** — Set maximum width/height (px)
- **Output format** — Choose WebP (recommended), JPEG, or PNG

#### 3. Compress and Download

- Click **"Compress All"** to process every file
- Or click **"Compress"** on each card to process individually
- Click **"Download"** to save a compressed file
- Or click **"Download All"** in the header

### 📁 Project Structure

```
imageshrink/
├── src/
│   ├── components/
│   │   ├── DropZone.tsx            # File drag & drop area
│   │   ├── CompressionControls.tsx # Compression settings
│   │   ├── ImageCard.tsx           # Individual image card
│   │   └── StatsBar.tsx            # Total statistics bar
│   ├── hooks/
│   │   └── useImageCompression.ts  # Compression logic hook
│   ├── App.tsx                     # Main component
│   ├── main.tsx                    # Entry point
│   └── index.css                   # Global styles
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.js
└── README.md
```

### 🎨 Design

- **Flat Design** — Clean, minimal, no heavy gradients or shadows
- **Dark Theme** — Easy on the eyes
- **Pill Buttons** — Capsule-shaped buttons (`rounded-full`)
- **Accent Color** — Primary color `#e95f3d` (orange-red)
- **Responsive** — Adapts to all screen sizes

### 🔧 Customization

#### Change Primary Color

Edit `#e95f3d` in these files:

- `src/App.tsx`
- `src/components/*.tsx`
- `src/index.css`

#### Change Default Settings

Edit `src/hooks/useImageCompression.ts`:

```typescript
const [options, setOptions] = useState<CompressionOptions>({
  quality: 80,                 // Default quality
  maxWidth: 4096,              // Max width
  maxHeight: 4096,             // Max height
  outputFormat: 'image/webp',  // Default format
});
```

### 🌐 Deployment

#### Vercel

```bash
npm install -g vercel
vercel
```

#### Netlify

```bash
npm run build
# Upload the dist/ folder to Netlify
```

#### GitHub Pages

```bash
npm run build
# Upload the dist/ folder to GitHub Pages
```

### 📊 Recommendations

#### Quality Settings

| Quality | File Size | Use Case |
|---------|-----------|----------|
| 90-100% | Large | Print, important work |
| 70-85%  | Medium | Websites, social media (recommended) |
| 50-70%  | Small | Thumbnails, previews |
| 30-50%  | Very small | Low bandwidth, mobile |

#### Format Selection

| Format | Pros | Cons | Use Case |
|--------|------|------|----------|
| **WebP** | Smallest size, great quality | Older browsers may not support | Modern websites (recommended) |
| **JPEG** | Universal compatibility | No transparency | General photos |
| **PNG** | Lossless, supports transparency | Larger file size | Logos, icons, graphics |

### 🐛 Troubleshooting

#### Image size doesn't decrease after compression

- Try lowering the quality (70-80% recommended)
- Check if the original image is already compressed
- Try converting to WebP format

#### Browser freezes with large images

- Reduce max dimensions (maxWidth/maxHeight)
- Process files one at a time instead of all at once
- Use a newer browser (Chrome, Firefox, Edge)

#### WebP format not supported

- Switch to JPEG format
- Update your browser

### 📝 License

MIT License — Free to use

### 🤝 Contributing

Contributions are welcome! You can:

- Report issues
- Suggest new features
- Submit pull requests

---

## 🇹🇭 ภาษาไทย

### ✨ ฟีเจอร์

- 🖼️ **รองรับหลายรูปแบบ** — JPG, PNG, WebP
- 📦 **บีบอัดหลายไฟล์พร้อมกัน** — ลากวางหรือเลือกไฟล์ทีละหลายๆ ไฟล์
- 🎚️ **ปรับคุณภาพได้** — ตั้งค่าคุณภาพตั้งแต่ 10-100%
- 📐 **จำกัดขนาดภาพ** — กำหนดความกว้าง/สูงสูงสุดได้
- 🔄 **แปลงรูปแบบไฟล์** — แปลงระหว่าง WebP, JPEG, PNG
- 📊 **แสดงสถิติ** — เปรียบเทียบขนาดก่อน/หลังบีบอัดแบบเรียลไทม์
- 🔒 **ปลอดภัย 100%** — ประมวลผลในเบราว์เซอร์ ไม่อัพโหลดไปที่ไหน
- ⚡ **รวดเร็ว** — ไม่ต้องรออัพโหลด/ดาวน์โหลดจากเซิร์ฟเวอร์
- 📱 **Responsive** — ใช้งานได้ทั้งบน Desktop และ Mobile
- 🌙 **ธีมมืด** — ดีไซน์ Flat Design ธีมมืด สบายตา

### 🛠️ เทคโนโลยี

- **React 18** — UI Framework
- **TypeScript** — Type Safety
- **Vite** — Build Tool
- **Tailwind CSS** — Styling
- **Canvas API** — ประมวลผลภาพในเบราว์เซอร์

### 📦 การติดตั้ง

#### ความต้องการของระบบ

- Node.js 18+
- npm หรือ yarn

#### ขั้นตอนการติดตั้ง

```bash
# Clone โปรเจกต์
git clone <repository-url>
cd imageshrink

# ติดตั้ง dependencies
npm install

# รัน development server
npm run dev

# Build สำหรับ production
npm run build
```

### 🚀 การใช้งาน

#### 1. เพิ่มไฟล์ภาพ

- **ลากไฟล์ภาพ** มาวางในบริเวณ Drop Zone
- หรือ **คลิกที่ Drop Zone** เพื่อเลือกไฟล์จากเครื่อง
- รองรับหลายไฟล์พร้อมกัน

#### 2. ตั้งค่าการบีบอัด

- **คุณภาพ** — ปรับ slider จาก 10-100% (แนะนำ 70-85% สำหรับสมดุลระหว่างขนาดและคุณภาพ)
- **ขนาดสูงสุด** — กำหนดความกว้าง/สูงสูงสุด (px)
- **รูปแบบไฟล์** — เลือก WebP (แนะนำ), JPEG, หรือ PNG

#### 3. บีบอัดและดาวน์โหลด

- คลิก **"บีบอัดทั้งหมด"** เพื่อประมวลผลทุกไฟล์
- หรือคลิก **"บีบอัด"** ในแต่ละการ์ดเพื่อประมวลผลทีละไฟล์
- คลิก **"ดาวน์โหลด"** เพื่อดาวน์โหลดไฟล์ที่บีบอัดแล้ว
- หรือคลิก **"ดาวน์โหลดทั้งหมด"** ที่ header

### 📁 โครงสร้างโปรเจกต์

```
imageshrink/
├── src/
│   ├── components/
│   │   ├── DropZone.tsx           # ส่วนลากวางไฟล์
│   │   ├── CompressionControls.tsx # ตั้งค่าการบีบอัด
│   │   ├── ImageCard.tsx          # การ์ดแสดงภาพแต่ละรูป
│   │   └── StatsBar.tsx           # แถบแสดงสถิติรวม
│   ├── hooks/
│   │   └── useImageCompression.ts # Custom hook สำหรับบีบอัดภาพ
│   ├── App.tsx                    # Component หลัก
│   ├── main.tsx                   # Entry point
│   └── index.css                  # Global styles
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.js
└── README.md
```

### 🎨 ดีไซน์

- **Flat Design** — เรียบง่าย ไม่ใช้ gradient หรือ shadow มาก
- **ธีมมืด** — สบายตา
- **ปุ่มทรง Pill** — ปุ่มทรงแคปซูล (`rounded-full`)
- **สีหลัก** — `#e95f3d` (ส้มแดง)
- **Responsive** — รองรับทุกขนาดหน้าจอ

### 🔧 การปรับแต่ง

#### เปลี่ยนสีหลัก

แก้ไขสี `#e95f3d` ในไฟล์ต่างๆ:

- `src/App.tsx`
- `src/components/*.tsx`
- `src/index.css`

#### เปลี่ยนค่าเริ่มต้น

แก้ไขใน `src/hooks/useImageCompression.ts`:

```typescript
const [options, setOptions] = useState<CompressionOptions>({
  quality: 80,                 // คุณภาพเริ่มต้น
  maxWidth: 4096,              // ความกว้างสูงสุด
  maxHeight: 4096,             // ความสูงสูงสุด
  outputFormat: 'image/webp',  // รูปแบบไฟล์เริ่มต้น
});
```

### 🌐 การ Deploy

#### Vercel

```bash
npm install -g vercel
vercel
```

#### Netlify

```bash
npm run build
# อัปโหลดโฟลเดอร์ dist/ ไปยัง Netlify
```

#### GitHub Pages

```bash
npm run build
# อัปโหลดโฟลเดอร์ dist/ ไปยัง GitHub Pages
```

### 📊 ข้อแนะนำการใช้งาน

#### การตั้งค่าคุณภาพ

| คุณภาพ | ขนาดไฟล์ | การใช้งาน |
|--------|----------|-----------|
| 90-100% | ใหญ่ | ภาพสำหรับพิมพ์, งานสำคัญ |
| 70-85% | ปานกลาง | เว็บไซต์, โซเชียลมีเดีย (แนะนำ) |
| 50-70% | เล็ก | Thumbnail, Preview |
| 30-50% | เล็กมาก | Low bandwidth, Mobile |

#### การเลือกรูปแบบไฟล์

| รูปแบบ | ข้อดี | ข้อเสีย | การใช้งาน |
|--------|-------|---------|-----------|
| **WebP** | ขนาดเล็กที่สุด, คุณภาพดี | เบราว์เซอร์เก่าไม่รองรับ | เว็บไซต์สมัยใหม่ (แนะนำ) |
| **JPEG** | เข้ากันได้ทุกที่ | ไม่รองรับ transparency | ภาพถ่ายทั่วไป |
| **PNG** | ไม่สูญเสียคุณภาพ, รองรับ transparency | ขนาดใหญ่ | โลโก้, ไอคอน, ภาพกราฟิก |

### 🐛 การแก้ปัญหา

#### ภาพไม่ลดลงหลังบีบอัด

- ลองลดคุณภาพลง (แนะนำ 70-80%)
- ตรวจสอบว่าภาพต้นฉบับไม่ได้ถูกบีบอัดมาแล้ว
- ลองเปลี่ยนรูปแบบไฟล์เป็น WebP

### เบราว์เซอร์ค้างเมื่อประมวลผลภาพใหญ่

- ลดขนาดสูงสุด (maxWidth/maxHeight) ลง
- ประมวลผลทีละไฟล์แทนการบีบอัดทั้งหมด
- ใช้เบราว์เซอร์ที่ใหม่กว่า (Chrome, Firefox, Edge)

#### รูปแบบ WebP ไม่รองรับ

- เปลี่ยนรูปแบบไฟล์เป็น JPEG
- อัปเดตเบราว์เซอร์ให้ใหม่กว่า

### 📝 License

MIT License — ใช้งานได้อย่างอิสระ

### 🤝 การมีส่วนร่วม

ยินดีต้อนรับการมีส่วนร่วม! คุณสามารถ:

- รายงานปัญหา (Issues)
- เสนอฟีเจอร์ใหม่
- ส่ง Pull Request

---

**Made with ❤️ using React + TypeScript + Tailwind CSS**
