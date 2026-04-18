# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Toolchain: **Vite+** (`vite-plus`) — unified CLI (`vp`) wrapping Vite, Vitest, oxlint, oxfmt, and tsdown-based library packing. All lint/fmt/build config lives in [vite.config.ts](vite.config.ts).

- `pnpm build` — `tsc` (type-check) then `vp pack` (bundles `dist/index.mjs` + `dist/index.cjs` with rolled-up `dist/index.d.mts` / `dist/index.d.cts`).
- `pnpm test` — `vp test` (runs `*.spec.ts`). Import test APIs from `vite-plus/test`, not `vitest`.
- `pnpm check` / `pnpm exec vp check --fix` — format + lint + type-check in one pass.
- `pnpm lint` / `pnpm format` — individual steps.
- `pnpm docs:dev` / `pnpm docs:build` / `pnpm docs:preview` — VitePress site in `.docs/`. Includes an interactive sandbox under [.docs/sandbox/](.docs/sandbox/) (Vue 3 + UnoCSS).

## Architecture

The library generates perceptually uniform color shades using the **Oklab** color model. The flow is:

`palitra()` → per-color `scaleColor()` → for each shade, `shade()` binary-searches HSL lightness to hit a target Oklab L (perceptual brightness, "pbr").

Key pieces:

- [src/palitra.ts](src/palitra.ts) — top-level entry. Takes a map of `name → color|config`, merges per-color options over defaults with `defu`, calls `scaleColor` per entry, then flattens shades into a `{name-suffix: shade}` record. Also attaches a `toStrings()` serializer and a middle-shade alias under the bare name.
- [src/scale-color.ts](src/scale-color.ts) — builds three parallel arrays across the shade range (luminance, vivid hue-shift, saturation), then materializes each shade via `shade()`. The arrays are stitched from two `interpolateArray` halves (dark→middle and middle→light) with independent slope controls, giving the "fromDark"/"fromLight" knobs.
- [src/utils/shade.ts](src/utils/shade.ts) — iterative solver: adjusts HSL `l` until the resulting Oklab L matches the target within `sigma=0.002` (max 16 iterations, with a retry from a different starting `l`). This is the core trick that makes shades perceptually uniform rather than HSL-uniform.
- [src/utils/oklab.ts](src/utils/oklab.ts) — hand-rolled sRGB ↔ Oklab conversion (with gamma correction). No external color dep (previously used chroma-js, removed per commit `69da22e`).
- [src/utils/colors.ts](src/utils/colors.ts) — self-contained `color()` factory supporting hex / rgb(a) / hsl(a) / named-CSS strings and numeric constructors for `'hsl' | 'rgb' | 'oklab'`. Returns a uniform accessor interface (`rgb/rgba/hex/oklab/hsl`). This is the only color primitive used internally.
- [src/utils/utils.ts](src/utils/utils.ts) — `interpolate` uses a quadratic Bézier (`b1/b2/b3`) with a middle control point controlled by `slope`, so slopes > 0.5 bias toward one end. `getVividDist` finds the nearest "pure" hue at 0/60/120/… and returns the signed distance (capped at 30°) — this is what "vivid" rotation pushes toward. `adjustLumArray` is only used when `preserveInputColor: true`: it shifts the luminance curve so the input color itself lands exactly on the closest slot.
- [src/types.ts](src/types.ts) — public types. `TDetailedPalitra` / `TDetailedColorScale` are indexed records/arrays that also carry a `toStrings()` method; when iterating, skip function values.

Options deep-merge order: per-color config → global `palitra()` second arg → `defaultOptions` → `defaultSuffixes`. Default shade count is 10, default suffixes are Tailwind-style `900..50` (darkest first).

## Conventions

- Single-package, single-entry library (`src/index.ts`). No workspaces.
- Build externalizes `defu` (the only runtime dep); everything else is bundled.
- Tests are colocated: `foo.ts` ↔ `foo.spec.ts` under `src/`.
- `.docs/` doubles as documentation source and a live sandbox — changes to public API should be reflected in `.docs/doc/` Markdown and, if relevant, the Vue components under `.docs/sandbox/components/`.

<!--VITE PLUS START-->

# Using Vite+, the Unified Toolchain for the Web

This project is using Vite+, a unified toolchain built on top of Vite, Rolldown, Vitest, tsdown, Oxlint, Oxfmt, and Vite Task. Vite+ wraps runtime management, package management, and frontend tooling in a single global CLI called `vp`. Vite+ is distinct from Vite, but it invokes Vite through `vp dev` and `vp build`.

## Vite+ Workflow

`vp` is a global binary that handles the full development lifecycle. Run `vp help` to print a list of commands and `vp <command> --help` for information about a specific command.

### Start

- create - Create a new project from a template
- migrate - Migrate an existing project to Vite+
- config - Configure hooks and agent integration
- staged - Run linters on staged files
- install (`i`) - Install dependencies
- env - Manage Node.js versions

### Develop

- dev - Run the development server
- check - Run format, lint, and TypeScript type checks
- lint - Lint code
- fmt - Format code
- test - Run tests

### Execute

- run - Run monorepo tasks
- exec - Execute a command from local `node_modules/.bin`
- dlx - Execute a package binary without installing it as a dependency
- cache - Manage the task cache

### Build

- build - Build for production
- pack - Build libraries
- preview - Preview production build

### Manage Dependencies

Vite+ automatically detects and wraps the underlying package manager such as pnpm, npm, or Yarn through the `packageManager` field in `package.json` or package manager-specific lockfiles.

- add - Add packages to dependencies
- remove (`rm`, `un`, `uninstall`) - Remove packages from dependencies
- update (`up`) - Update packages to latest versions
- dedupe - Deduplicate dependencies
- outdated - Check for outdated packages
- list (`ls`) - List installed packages
- why (`explain`) - Show why a package is installed
- info (`view`, `show`) - View package information from the registry
- link (`ln`) / unlink - Manage local package links
- pm - Forward a command to the package manager

### Maintain

- upgrade - Update `vp` itself to the latest version

These commands map to their corresponding tools. For example, `vp dev --port 3000` runs Vite's dev server and works the same as Vite. `vp test` runs JavaScript tests through the bundled Vitest. The version of all tools can be checked using `vp --version`. This is useful when researching documentation, features, and bugs.

## Common Pitfalls

- **Using the package manager directly:** Do not use pnpm, npm, or Yarn directly. Vite+ can handle all package manager operations.
- **Always use Vite commands to run tools:** Don't attempt to run `vp vitest` or `vp oxlint`. They do not exist. Use `vp test` and `vp lint` instead.
- **Running scripts:** Vite+ built-in commands (`vp dev`, `vp build`, `vp test`, etc.) always run the Vite+ built-in tool, not any `package.json` script of the same name. To run a custom script that shares a name with a built-in command, use `vp run <script>`. For example, if you have a custom `dev` script that runs multiple services concurrently, run it with `vp run dev`, not `vp dev` (which always starts Vite's dev server).
- **Do not install Vitest, Oxlint, Oxfmt, or tsdown directly:** Vite+ wraps these tools. They must not be installed directly. You cannot upgrade these tools by installing their latest versions. Always use Vite+ commands.
- **Use Vite+ wrappers for one-off binaries:** Use `vp dlx` instead of package-manager-specific `dlx`/`npx` commands.
- **Import JavaScript modules from `vite-plus`:** Instead of importing from `vite` or `vitest`, all modules should be imported from the project's `vite-plus` dependency. For example, `import { defineConfig } from 'vite-plus';` or `import { expect, test, vi } from 'vite-plus/test';`. You must not install `vitest` to import test utilities.
- **Type-Aware Linting:** There is no need to install `oxlint-tsgolint`, `vp lint --type-aware` works out of the box.

## CI Integration

For GitHub Actions, consider using [`voidzero-dev/setup-vp`](https://github.com/voidzero-dev/setup-vp) to replace separate `actions/setup-node`, package-manager setup, cache, and install steps with a single action.

```yaml
- uses: voidzero-dev/setup-vp@v1
  with:
    cache: true
- run: vp check
- run: vp test
```

## Review Checklist for Agents

- [ ] Run `vp install` after pulling remote changes and before getting started.
- [ ] Run `vp check` and `vp test` to validate changes.
<!--VITE PLUS END-->
