# 3D Models Directory

This directory contains your 3D Blender models (`.glb` files) and thumbnail images for your portfolio.

## How to Add Your 3D Models:

1. **Export from Blender:**
   - Open your project in Blender
   - Go to `File > Export > glTF 2.0 (.glb/.gltf)`
   - Select format: `glTF Binary (.glb)`
   - Choose a name and save

2. **Create a thumbnail image (recommended):**
   - In Blender, render a nice view of your 3D model
   - Save the render as `.jpg`, `.png`, or `.webp`
   - Recommended size: 600x400 or similar aspect ratio

3. **Add to this directory:**
   - Copy your exported `.glb` file to this `public/models/` folder
   - Copy your thumbnail image to this folder as well

4. **Update your portfolio:**
   - Open `src/app/page.tsx`
   - Find the `projects3D` array (around line 113)
   - Replace the example projects with your own:

```typescript
const projects3D = [
  {
    id: 101,
    title: 'Your 3D Model Name',
    description: 'Description of your 3D project...',
    modelUrl: '/models/your-model-file.glb',  // Your .glb file path
    image: '/models/your-thumbnail.jpg',      // Your thumbnail image (optional)
    scale: 1,  // Adjust scale if needed (0.5 = half size, 2 = double size)
    technologies: ['Blender', '3D Modeling', 'Texturing', 'Lighting'],
  },
  // Add more projects as needed...
]
```

## Tips for Best Performance:

- **Keep .glb file size under 50MB** for faster loading
- **Optimize textures** before exporting
- **Reduce polygon count** where possible
- **Use materials** efficiently
- **Thumbnail images**: Keep under 500KB, use WebP format for best compression
- **Test in browser** after adding to ensure proper display

## Model Requirements:

- Format: `.glb` (GLB Binary) or `.gltf` (GLTF JSON)
- Textures should be embedded in the `.glb` file
- Model should be centered at origin (0, 0, 0)
- Reasonable scale for web viewing

## Thumbnail Images (Optional but Recommended):

- **Formats**: `.jpg`, `.png`, `.webp` (WebP recommended for best compression)
- **Size**: 600x400px recommended (will be resized to fit card)
- **Content**: A nice render of your 3D model showing its best angle
- **Optional**: If no image is provided, a box icon placeholder will be shown

## Example:

```
public/models/
├── sci-fi-robot.glb           # Your 3D model
├── sci-fi-robot-thumb.jpg     # Thumbnail image
├── medieval-sword.glb
├── medieval-sword-thumb.png
└── README.md
```
