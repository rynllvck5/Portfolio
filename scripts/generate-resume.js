/**
 * Optional script: open /resume in a browser and use Print → Save as PDF
 * to generate alternate resume PDFs from HTML variants.
 *
 * Usage: node scripts/generate-resume.js
 */
console.log(`
Resume PDF generation (manual)

The primary resume PDF lives at public/resume.pdf.

To create PDFs from HTML resume variants:
1. Run: npm run dev
2. Visit:
   - http://localhost:3000/resume          (software — primary)
   - http://localhost:3000/resume/software
   - http://localhost:3000/resume/it-support
   - http://localhost:3000/resume/networking
   - http://localhost:3000/resume/general-tech
3. Use browser Print → Save as PDF

Replace public/resume.pdf when you choose your preferred version.
`);
