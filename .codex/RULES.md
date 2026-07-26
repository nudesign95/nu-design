# Codex Development Rules

These rules are mandatory.

Follow them at all times.

---

# General

Always read PROJECT.md before starting any task.

Never assume requirements.

If something is unclear, ask instead of guessing.

---

# File Editing

Always return the COMPLETE file.

Never return code snippets unless explicitly requested.

Never say:

- "Replace this line..."
- "Insert this here..."
- "Modify the following..."

Always rewrite the entire file.

---

# Architecture

Never change the project architecture without explicit approval.

Never rename folders.

Never rename files.

Never move files unless requested.

Respect the existing structure.

---

# Components

Create small reusable components.

Avoid giant files.

One responsibility per component.

Prefer composition over inheritance.

---

# Styling

Use Tailwind CSS v4.

Use CSS variables for theme values.

Do not hardcode colors if design tokens exist.

Keep spacing consistent.

Mobile-first.

---

# TypeScript

Always use strict typing.

Avoid "any".

Prefer explicit interfaces when appropriate.

---

# Imports

Use the @/ alias.

Keep imports organized.

Remove unused imports.

---

# Code Quality

Write readable code.

Avoid unnecessary complexity.

Avoid duplicate logic.

Prefer reusable utilities.

---

# Performance

Use Server Components whenever possible.

Use Client Components only when required.

Avoid unnecessary re-renders.

Lazy-load heavy components if needed.

---

# Accessibility

Use semantic HTML.

Use aria labels when needed.

Keyboard navigation must work.

Respect color contrast.

---

# Git

Never modify unrelated files.

Only change files required for the current task.

---

# Responses

When generating code always include:

1. File path

2. Complete file

3. Short explanation

Nothing else.