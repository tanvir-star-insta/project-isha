# Expense Reimbursement System - Design Guidelines

## Design Approach

**Selected Approach:** Design System (Utility-Focused)

**Primary References:** Linear's clean productivity UI + Notion's data organization + Material Design's information hierarchy

**Key Principles:**
- Clarity over decoration - every element serves a functional purpose
- Data-first design - information hierarchy optimized for scanning and decision-making
- Role-specific experiences - dashboards tailored to Admin/Manager/Employee workflows
- Trust and transparency - clear status indicators and audit trails

---

## Core Design Elements

### A. Color Palette

**Light Mode:**
- Primary: 220 90% 56% (Professional blue for primary actions)
- Secondary: 220 15% 25% (Dark slate for text and headers)
- Success: 142 76% 36% (Approval states)
- Warning: 38 92% 50% (Pending/review states)
- Danger: 0 84% 60% (Rejection states)
- Background: 0 0% 100% (White)
- Surface: 220 13% 97% (Light gray for cards)
- Border: 220 13% 91% (Subtle borders)

**Dark Mode:**
- Primary: 220 90% 56% (Same blue, maintains brand consistency)
- Secondary: 220 15% 85% (Light text on dark)
- Success: 142 76% 45% (Slightly brighter for visibility)
- Warning: 38 92% 55%
- Danger: 0 84% 65%
- Background: 220 15% 9% (Deep charcoal)
- Surface: 220 13% 13% (Elevated surfaces)
- Border: 220 13% 20% (Subtle dark borders)

### B. Typography

**Font Families:**
- Primary: Inter (UI, buttons, labels) - professional and highly legible
- Monospace: JetBrains Mono (currency amounts, IDs, codes)

**Type Scale:**
- Headings: font-semibold (Dashboard titles: text-2xl, Section headers: text-xl, Card headers: text-lg)
- Body: font-normal text-sm (Forms, tables, descriptions)
- Labels: font-medium text-xs (Form labels, table headers, status badges)
- Data: font-mono text-sm (Currency amounts, dates, reference numbers)

### C. Layout System

**Spacing Primitives:** Use Tailwind units of 2, 4, 6, 8, 12, 16 consistently
- Component padding: p-4 to p-6
- Section spacing: gap-6 to gap-8
- Container margins: mx-4 to mx-8
- Card spacing: p-6 with gap-4 for content

**Grid System:**
- Dashboard layouts: 12-column responsive grid
- Form layouts: Single column max-w-2xl centered
- Table layouts: Full-width with horizontal scroll on mobile
- Cards: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 for status cards

### D. Component Library

**Navigation:**
- Sidebar navigation (fixed left, collapsible on mobile): 64px wide icons-only collapsed, 240px expanded
- Top bar: User profile, notifications, company switcher, role indicator badge
- Breadcrumbs for multi-step workflows

**Data Display:**
- Tables with sticky headers, alternating row backgrounds, hover states
- Status badges: pill-shaped with dot indicators (Pending: warning, Approved: success, Rejected: danger)
- Currency displays: Always monospace, right-aligned in tables, with conversion indicators
- Timeline components for approval chains with step indicators and connector lines

**Forms:**
- Structured sections with clear labels above inputs
- File upload with drag-and-drop zones, preview thumbnails for receipts
- Multi-step forms with progress indicators for approval configuration
- Inline validation with error messages below fields

**Cards:**
- Elevated surfaces with subtle shadows (shadow-sm)
- Expense cards: Amount (large mono), category icon, date, status badge, action buttons
- Stat cards: Large number display, trend indicators, context labels
- Approval cards: Requester info, amount, current step indicator, approve/reject buttons

**Buttons:**
- Primary: Filled background, medium weight text
- Secondary: Outline with background on hover
- Ghost: Text-only for tertiary actions
- Sizes: sm for inline actions, md for forms, lg for primary CTAs

**Overlays:**
- Modals for expense details, receipt preview, approval history
- Slide-over panels for filters, settings, quick actions
- Toast notifications for action confirmations (top-right)

### E. Animations

Use sparingly for feedback only:
- Button click feedback: subtle scale (scale-95)
- Status changes: smooth color transitions (transition-colors duration-200)
- Loading states: skeleton screens for tables, spinner for button actions
- No scroll-triggered or decorative animations

---

## Role-Specific Dashboards

**Admin Dashboard:**
- Top stat cards: Total expenses, pending approvals, employees, approval rate
- Main content: Two-column layout (left: recent activity feed, right: configuration shortcuts)
- Action-oriented: Quick access to create employee, configure rules, view reports

**Manager Dashboard:**
- Pending approvals prominently displayed as list with quick approve/reject
- Team expense overview: Grouped by employee with totals
- Approval queue with filters (amount range, category, date)

**Employee Dashboard:**
- Expense submission CTA (large, primary button)
- Recent submissions as cards with status progression
- Reimbursement summary: Total pending, total approved, payment status

---

## Specific Feature Designs

**Expense Submission Form:**
- Single-column layout, max-w-2xl centered
- Receipt upload zone: Large dashed border area with camera icon, OCR status indicator
- Currency selector with conversion preview in real-time
- Category selection with icon picker
- Date picker with calendar dropdown

**Approval Workflow Interface:**
- Visual flow diagram showing approval chain steps (horizontal stepper)
- Current approver highlighted, completed steps with checkmarks
- Approval actions in fixed bottom bar (approve/reject with comment field)
- Historical approvals as collapsible timeline on right sidebar

**OCR Receipt Processing:**
- Split-view: Receipt image on left, extracted fields on right
- Editable fields with confidence indicators (high/medium/low accuracy)
- Field mapping with ability to correct OCR mistakes inline

**Audit Trail:**
- Chronological timeline with user avatars, actions, timestamps
- Filterable by action type, user, date range
- Expandable entries showing before/after states for changes

---

## Images

**No hero images** - This is a utility application, not marketing.

**Functional Images:**
- Receipt thumbnails in expense cards and detail views
- User avatars throughout (profile, approval history, audit trail)
- Empty state illustrations for no expenses, no pending approvals (simple, minimalist line art)
- Company logo in top navigation bar

---

## Accessibility & Dark Mode

- Consistent dark mode throughout all interfaces including forms, tables, modals
- High contrast ratios for text (WCAG AA compliance)
- Form inputs maintain visibility in dark mode with proper borders
- Status colors remain distinguishable in both modes
- Keyboard navigation support for all interactive elements