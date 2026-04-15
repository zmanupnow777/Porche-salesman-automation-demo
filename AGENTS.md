# Repository Guidelines

## Project Structure & Module Organization
This repository is currently a spec bundle for the Porsche sales follow-up automation demo. The root contains two source-of-truth briefs: `# demo_requirements.md` defines the feature scope and demo narrative, and `# prospect_context_steffan_semurath.md` defines prospect context, tone, and personalization defaults. Keep future implementation out of the root. If code is added, place app logic in `src/`, automated checks in `tests/`, mock data in `data/`, and static media in `assets/`.

## Build, Test, and Development Commands
No build system or test runner is configured in this export. Current useful commands are inspection-oriented:

- `Get-ChildItem -Force` to verify the repository contents
- `Get-Content '.\\# demo_requirements.md'` to review feature requirements
- `Get-Content '.\\# prospect_context_steffan_semurath.md'` to review tone, constraints, and personalization values

If you add an app, define repeatable scripts in the chosen toolchain such as `npm run dev` or `npm test`, then document them here and in the main README.

## Coding Style & Naming Conventions
Keep all deliverables demo-safe, easy to explain, and aligned with a premium automotive tone. Prefer small, direct modules over heavy abstraction. Use lowercase `snake_case` or `kebab-case` for new filenames; avoid leading symbols or spaces even though the current brief filenames are legacy exceptions. Keep editable business rules, email subjects, and dealership defaults in a single obvious config location.

## Testing Guidelines
No testing framework is present yet. When code is introduced, cover the critical demo flows: lead capture validation, scoring, tagging, sequence timing, notification triggers, and reply-stop behavior. Use deterministic sample leads. Name tests by behavior, for example `lead_scoring.test.ts` or `test_reply_handling.py`.

## Commit & Pull Request Guidelines
No Git history is bundled with this repository, so no local commit convention can be inferred. Use short imperative commits with a scope, for example `docs: tighten demo assumptions` or `feat: add mock lead tracker`. Pull requests should include a brief summary, the requirement sections affected, screenshots for UI work, and a note confirming the demo remains mock-only with no implied access to Porsche or dealership systems.

## Security & Demo Boundaries
Treat both Markdown files as public-context demo guidance, not verified operational truth. Do not add live credentials, real customer data, inbox integrations, or claims of access to internal Porsche or dealership tools.
