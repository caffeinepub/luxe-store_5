# LUXE Store

## Current State
- Admin panel at `/admin` is fully open (no password protection) since the user previously requested removing the token.
- Product form in admin allows adding title, category, price, sizes, colors, etc., but no image upload capability.
- Product images are served from hardcoded static asset maps in `imageUtils.ts` based on product ID and color.
- The `Product` type already has an `images: string[]` field but it's never populated from admin.
- `blob-storage` component is now selected and available.

## Requested Changes (Diff)

### Add
- Password gate on the Admin page: show a simple login screen before the dashboard. Password is `Devang@947638`. Store auth state in `sessionStorage` so it persists across refreshes but clears on tab close.
- Image upload in the product add/edit form: admin can upload one or more product images using `ExternalBlob` from blob-storage. Show upload progress, preview thumbnails, and allow removing images.
- `getProductImage` and `getProductColorGallery` in `imageUtils.ts` should prefer `product.images[0]` (uploaded image) over the hardcoded map, so dynamically added products show their uploaded image everywhere.

### Modify
- `AdminPage.tsx`: Add password gate component rendered before the dashboard. Once password matches, show dashboard. Add image upload section to `ProductFormModal`.
- `imageUtils.ts`: Update `getProductImage` to check `product.images[0]` first. Update `getProductColorGallery` to use uploaded images when available.

### Remove
- Nothing removed — existing product data and sections remain intact.

## Implementation Plan
1. Update `imageUtils.ts` so `getProductImage(product)` returns `product.images[0]` if present, else falls back to hardcoded maps.
2. In `AdminPage.tsx`, add an `AdminPasswordGate` component:
   - Shows a full-screen glassmorphic password entry screen with neon cyberpunk styling.
   - On correct password (`Devang@947638`), saves `luxe_admin_auth=true` to sessionStorage and shows the dashboard.
   - On wrong password, shows error.
3. Wrap the existing admin dashboard JSX inside `AdminPasswordGate`.
4. Add image upload to `ProductFormModal`:
   - File input (accept images) that creates `ExternalBlob.fromBytes(data)` and uploads it.
   - Show upload progress bar.
   - Preview thumbnails of uploaded images with remove (×) button.
   - Uploaded image URLs stored in `form.images` array and saved with the product.
