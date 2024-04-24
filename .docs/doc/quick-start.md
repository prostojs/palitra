# Quick Start

## Installation

Install `@prostojs/palitra` using npm:

```bash
npm install @prostojs/palitra
```

Or using pnpm:

```bash
pnpm add @prostojs/palitra
```

## Usage

Below are examples of how to use the library to generate color palettes:

### Basic Palette Generation

Generate a basic palette for a single color:

```typescript
import { palitra } from '@prostojs/palitra'

const palette = palitra({
  'my-color': '#7552cc',
  'my-color2': '#00a0af',
  // ...
})

console.log(palette)
```
