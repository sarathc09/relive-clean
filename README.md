# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


# ReLive Longevity Report Engine

Version **1.0.0**

A professional PDF report generation engine for personalized longevity assessments.

---

## Features

- Personalized Executive Summary
- Longevity Score
- Biological Age Assessment
- Health Snapshot
- AI Health Insights
- Projected Improvement
- 30-Day Action Plan
- Scientific References
- Professional PDF Layout
- Input Validation
- Error Handling

---

## Project Structure

```text
src/
├── constants/
│   └── reportConstants.js
│
├── data/
│   └── actionPlans.js
│
├── services/
│   └── pdfService.js
│
├── utils/
│   ├── reportEngine.js
│   ├── summaryEngine.js
│   └── reportValidator.js
```

---

## Technology Stack

- React
- JavaScript (ES6)
- pdfMake
- Tailwind CSS

---

## Report Sections

1. Cover Page
2. Overall Longevity Score
3. Executive Summary
4. Health Snapshot
5. AI Longevity Plan
6. Projected Improvement
7. 30-Day Action Plan
8. Scientific References
9. Final Health Summary

---

## Validation

The report validates:

- Participant name
- Longevity score
- Biological age
- Chronological age
- Health domains
- Executive summary
- Report structure

---

## Production Features

- Modular architecture
- Centralized constants
- Input validation
- Error handling
- Dynamic filenames
- Versioned report generation

---

## Version History

### v1.0.0

- Initial production release
- Executive Summary
- Health Snapshot
- Projected Improvement
- AI Recommendations
- 30-Day Action Plan
- Scientific References
- Professional PDF Layout

---

## Future Enhancements

- Biomarker charts
- Radar chart
- Trend reports
- QR code integration
- Digital signatures
- Multi-language support
- Lab data integration

---

## License

© ReLive Longevity. All rights reserved.