# GridGo Interiors - Component Library Documentation

## Overview

This document provides comprehensive documentation for all custom components developed during the UI/UX enhancement phases (Phases 1-8). These components follow accessibility best practices (WCAG AA), responsive design patterns, and performance optimization standards.

**Total Components: 9 custom components** across form elements, layout containers, and loading states.

---

## Table of Contents

1. [Form Components](#form-components)
   - FormInput
   - FormLabel
   - FormTextarea
   - FormSelect
2. [Layout Components](#layout-components)
   - Container
   - Section
   - Card
3. [Utility Components](#utility-components)
   - PageLoader
   - StaggerContainer

---

## Form Components

### FormInput

**Purpose:** Accessible text input field with error handling and validation styling.

**Location:** `src/components/ui/FormInput.tsx`

**Props:**

```typescript
interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;           // Error message to display
  errorId?: string;         // Custom error message ID (auto-generated if not provided)
}
```

**Features:**

- ✓ WCAG AA compliant with `aria-invalid`, `aria-required`, `aria-describedby`
- ✓ Error state with red border (`rgb(255,107,53)`) and alert role
- ✓ Focus states with teal ring effect (`rgb(0,255,136)`)
- ✓ Min-height 44px for touch accessibility
- ✓ Disabled state styling
- ✓ Responsive padding

**Styling:**

- Default: `bg-white/5 border border-white/10 text-white`
- Focus: `border-[rgb(0,255,136)] ring-2 ring-[rgb(0,255,136)]/20`
- Error: `border-[rgb(255,107,53)] ring-[rgb(255,107,53)]/20`
- Hover: `border-white/20`

**Usage Example:**

```tsx
import FormInput from '@/components/ui/FormInput';

export function ContactForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setEmail(e.target.value);
    setError('');
  };

  return (
    <FormInput
      id="email"
      type="email"
      placeholder="Enter your email"
      value={email}
      onChange={handleChange}
      error={error}
      required
    />
  );
}
```

**Accessibility Notes:**

- Automatically associates error messages with input using `aria-describedby`
- Error text marked with `role="alert"` for screen reader announcement
- `aria-invalid="true"` when error present
- `aria-required="true"` for required fields
- Supports keyboard navigation (Tab, Shift+Tab)
- Min-height 44px meets touch target guidelines

---

### FormLabel

**Purpose:** Semantic label component with visual indicator for required fields.

**Location:** `src/components/ui/FormLabel.tsx`

**Props:**

```typescript
interface FormLabelProps {
  children: React.ReactNode;  // Label text content
  required?: boolean;         // Show required indicator (*)
  htmlFor?: string;          // Associate with input id
}
```

**Features:**

- ✓ Semantic `<label>` element
- ✓ Visual indicator for required fields (green asterisk)
- ✓ Proper color contrast for accessibility
- ✓ Responsive sizing (sm text on mobile, adjusts for readability)

**Styling:**

- Color: `text-text-secondary` (design token)
- Size: `text-sm font-medium`
- Required indicator: `text-[rgb(0,255,136)]` (matches accent color)

**Usage Example:**

```tsx
import FormLabel from '@/components/ui/FormLabel';
import FormInput from '@/components/ui/FormInput';

export function ContactForm() {
  return (
    <div>
      <FormLabel htmlFor="name" required>
        Full Name
      </FormLabel>
      <FormInput
        id="name"
        type="text"
        placeholder="John Doe"
        required
      />
    </div>
  );
}
```

**Accessibility Notes:**

- `htmlFor` properly associates label with input
- High contrast text color for WCAG AA compliance
- Works with keyboard navigation
- Screen readers announce required status

---

### FormTextarea

**Purpose:** Accessible textarea component with error handling and resize prevention.

**Location:** `src/components/ui/FormTextarea.tsx`

**Props:**

```typescript
interface FormTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;           // Error message to display
  errorId?: string;         // Custom error message ID
}
```

**Features:**

- ✓ Same accessibility features as FormInput
- ✓ Min-height 120px for comfortable text entry
- ✓ Resize disabled (controlled via `resize-none` class)
- ✓ Error state with alert role
- ✓ Focus ring effect with teal accent
- ✓ Responsive padding

**Styling:**

- Min-height: 120px
- Default: `bg-white/5 border border-white/10`
- Focus: `border-[rgb(0,255,136)] ring-2 ring-[rgb(0,255,136)]/20`
- Error: `border-[rgb(255,107,53)] ring-[rgb(255,107,53)]/20`

**Usage Example:**

```tsx
import FormTextarea from '@/components/ui/FormTextarea';

export function ContactForm() {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setMessage(e.target.value);
    if (e.target.value.length > 500) {
      setError('Message must be 500 characters or less');
    }
  };

  return (
    <FormTextarea
      id="message"
      placeholder="Your message here..."
      value={message}
      onChange={handleChange}
      error={error}
      required
    />
  );
}
```

**Accessibility Notes:**

- All FormInput accessibility features apply
- Appropriate height for text content visibility
- Disabled resize prevents accidental layout breaks
- Screen readers announce character limits if specified

---

### FormSelect

**Purpose:** Accessible select dropdown with error handling and custom options support.

**Location:** `src/components/ui/FormSelect.tsx`

**Props:**

```typescript
interface FormSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: string;                              // Error message
  errorId?: string;                            // Custom error message ID
  options?: { value: string; label: string }[]; // Array of options (optional)
}
```

**Features:**

- ✓ WCAG AA compliant with proper ARIA attributes
- ✓ Error state with visual feedback
- ✓ Custom options array support (or use children for custom options)
- ✓ Focus ring effect
- ✓ Disabled state styling
- ✓ Touch-friendly (44px min-height)

**Styling:**

- Default: `bg-white/5 border border-white/10 text-white`
- Focus: `border-[rgb(0,255,136)] ring-2 ring-[rgb(0,255,136)]/20`
- Error: `border-[rgb(255,107,53)] ring-[rgb(255,107,53)]/20`

**Usage Example - With Options Prop:**

```tsx
import FormSelect from '@/components/ui/FormSelect';

export function ServiceSelector() {
  const [service, setService] = useState('');

  const services = [
    { value: 'interior-design', label: 'Interior Design' },
    { value: 'fabrication', label: 'Steel Fabrication' },
    { value: 'marble', label: 'Marble Craftsmanship' },
    { value: 'furniture', label: 'Bespoke Furniture' },
  ];

  return (
    <FormSelect
      id="service"
      value={service}
      onChange={(e) => setService(e.target.value)}
      options={services}
      required
    />
  );
}
```

**Usage Example - With Children:**

```tsx
import FormSelect from '@/components/ui/FormSelect';

export function CitySelector() {
  return (
    <FormSelect id="city" defaultValue="">
      <option value="">Select a city</option>
      <option value="mumbai">Mumbai</option>
      <option value="delhi">Delhi</option>
      <option value="bangalore">Bangalore</option>
    </FormSelect>
  );
}
```

**Accessibility Notes:**

- Same aria attributes as FormInput for consistency
- Keyboard accessible with arrow keys
- Screen readers announce selected value
- Works with standard HTML select behavior

---

## Layout Components

### Container

**Purpose:** Responsive layout wrapper with max-width constraints and automatic margin centering.

**Location:** `src/components/ui/Container.tsx`

**Props:**

```typescript
interface ContainerProps {
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full'; // Default: 'xl'
  className?: string;                             // Additional classes
}
```

**Max-Width Map:**

- `sm`: `max-w-2xl` (40rem / 640px)
- `md`: `max-w-3xl` (48rem / 768px)
- `lg`: `max-w-4xl` (56rem / 896px)
- `xl`: `max-w-[1400px]` (1400px - custom)
- `full`: `max-w-full` (100% width)

**Responsive Padding:**

- Mobile: `px-4` (16px)
- Small: `sm:px-6` (24px)
- Medium+: `md:px-8` (32px)

**Features:**

- ✓ Single source of truth for max-widths
- ✓ Automatic horizontal centering (`mx-auto`)
- ✓ Responsive padding across breakpoints
- ✓ Can combine with className for additional styling

**Usage Example:**

```tsx
import Container from '@/components/ui/Container';

export function ServiceSection() {
  return (
    <Container maxWidth="lg">
      <div className="space-y-8">
        <h2 className="text-3xl font-bold">Our Services</h2>
        <p>Service description content...</p>
      </div>
    </Container>
  );
}
```

**Responsive Behavior:**

- Mobile (default): Full width with 16px padding
- Tablet (640px+): sm max-width with 24px padding
- Desktop (896px+): lg max-width with 32px padding
- Large (1400px+): Caps at 1400px with consistent centering

---

### Section

**Purpose:** Semantic section wrapper with spacing, background options, and scroll animation.

**Location:** `src/components/ui/Section.tsx`

**Props:**

```typescript
interface SectionProps {
  children: React.ReactNode;
  spacing?: 'sm' | 'md' | 'lg' | 'xl';  // Default: 'md'
  background?: 'primary' | 'secondary' | 'gradient' | 'none'; // Default: 'none'
  className?: string;
  id?: string;
  animate?: boolean;                     // Default: true
}
```

**Spacing Map (Vertical Padding):**

- `sm`: `py-12 md:py-16` (48px → 64px)
- `md`: `py-16 md:py-24` (64px → 96px)
- `lg`: `py-24 md:py-32` (96px → 128px)
- `xl`: `py-32 md:py-40` (128px → 160px)

**Background Map:**

- `primary`: `bg-background-primary` (Dark blue)
- `secondary`: `bg-background-secondary` (Slightly lighter)
- `gradient`: Gradient from secondary to primary
- `none`: No background

**Features:**

- ✓ Semantic `<section>` HTML element
- ✓ Built-in scroll animation via Intersection Observer
- ✓ Responsive spacing that scales with viewport
- ✓ Optional background colors/gradients
- ✓ Can be disabled for performance

**Usage Example:**

```tsx
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';

export function PortfolioSection() {
  return (
    <Section 
      spacing="lg" 
      background="gradient"
      id="portfolio"
    >
      <Container maxWidth="lg">
        <h2 className="text-4xl font-bold mb-8">Our Portfolio</h2>
        {/* Portfolio items */}
      </Container>
    </Section>
  );
}
```

**Scroll Animation:**

- Uses Intersection Observer with 10% threshold
- Triggers `animate-fade-in-up` when visible
- Can be disabled with `animate={false}`
- Performance optimized (doesn't animate off-screen elements)

**Accessibility Notes:**

- Semantic `<section>` improves document structure
- Optional id allows for skip-to-section navigation
- Animations don't interfere with assistive technologies
- Can disable animations for users with motion preferences

---

### Card

**Purpose:** Reusable card component with glass morphism, hover effects, and padding variants.

**Location:** `src/components/ui/Card.tsx`

**Props:**

```typescript
interface CardProps {
  children: React.ReactNode;
  padding?: 'none' | 'sm' | 'md' | 'lg'; // Default: 'md'
  glass?: boolean;                         // Default: false
  hover?: boolean;                         // Default: true
  className?: string;
}
```

**Padding Map:**

- `none`: No padding
- `sm`: `p-4 md:p-6` (16px → 24px)
- `md`: `p-6 md:p-8` (24px → 32px)
- `lg`: `p-8 md:p-12` (32px → 48px)

**Features:**

- ✓ Glass morphism effect option (frosted glass look)
- ✓ Smooth hover effects with scale and glow
- ✓ Border and shadow customization
- ✓ Responsive padding

**Styling:**

- Border: `border border-white/10`
- Radius: `rounded-radius-lg` (custom token)
- Hover (enabled): 
  - Scale: `scale-[1.02]` (2% upscale)
  - Glow: `shadow-lg shadow-[rgb(0,255,136)]/10`
  - Border: `border-[rgb(0,255,136)]/50`
- Transition: `transition-all duration-300`

**Usage Example - Basic Card:**

```tsx
import Card from '@/components/ui/Card';

export function ServiceCard({ title, description, icon }) {
  return (
    <Card padding="md" hover>
      <div className="flex gap-4">
        <div className="text-2xl">{icon}</div>
        <div>
          <h3 className="font-bold mb-2">{title}</h3>
          <p className="text-gray-300">{description}</p>
        </div>
      </div>
    </Card>
  );
}
```

**Usage Example - Glass Effect:**

```tsx
import Card from '@/components/ui/Card';

export function PriceCard({ tier, price, features }) {
  return (
    <Card padding="lg" glass hover>
      <h3 className="text-2xl font-bold mb-2">{tier}</h3>
      <p className="text-3xl font-bold text-[rgb(0,255,136)] mb-4">
        ${price}
      </p>
      <ul className="space-y-2">
        {features.map((feature) => (
          <li key={feature} className="flex items-center gap-2">
            <span className="text-[rgb(0,255,136)]">✓</span>
            {feature}
          </li>
        ))}
      </ul>
    </Card>
  );
}
```

**Accessibility Notes:**

- Hover effects don't block interaction on mobile
- Scale effect is subtle (doesn't cause layout shift)
- Glow color provides visual feedback for interactive states
- Can wrap interactive elements (buttons, links)

---

## Utility Components

### PageLoader

**Purpose:** Loading indicator displayed when page code is being fetched (code splitting fallback).

**Location:** `src/components/PageLoader.tsx`

**Props:** None

**Features:**

- ✓ Animated spinning loader
- ✓ Centered layout filling full viewport
- ✓ Clear user feedback during page transitions
- ✓ Accessible text label
- ✓ Performance optimized (minimal DOM)

**Styling:**

- Spinner: 48px × 48px border animation
- Color: `border-[rgb(0,255,136)]` (accent green)
- Loading text: `text-text-secondary` (secondary text color)

**Usage Example:**

```tsx
import { lazy, Suspense } from 'react';
import PageLoader from '@/components/PageLoader';

const Portfolio = lazy(() => import('@/pages/Portfolio'));

export function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Portfolio />
    </Suspense>
  );
}
```

**Accessibility Notes:**

- Includes "Loading page..." text for screen readers
- Visible loading state prevents confusion during transitions
- Non-blocking animation doesn't interfere with other content

---

### StaggerContainer

**Purpose:** Container component that animates children with staggered delay for engaging list animations.

**Location:** `src/components/StaggerContainer.tsx`

**Props:**

```typescript
interface StaggerContainerProps {
  children: React.ReactNode;
  staggerDelay?: number;  // Delay between animations in ms (default: 100)
  className?: string;
  once?: boolean;         // Only animate once (default: true)
}
```

**Features:**

- ✓ Automatic staggered animation of children
- ✓ Uses Intersection Observer for scroll-triggered animation
- ✓ Optional one-time animation (`once` prop)
- ✓ Customizable delay between items
- ✓ Responsive threshold (10%)

**Animation Behavior:**

- Each child animates with `animate-fade-in-up`
- Delay: `animationDelay = index * staggerDelay`
- Example: 3 items, 100ms delay = 0ms, 100ms, 200ms

**Usage Example:**

```tsx
import StaggerContainer from '@/components/StaggerContainer';
import Card from '@/components/ui/Card';

export function ProjectList({ projects }) {
  return (
    <StaggerContainer staggerDelay={150} className="grid gap-6 md:grid-cols-3">
      {projects.map((project) => (
        <Card key={project.id} padding="md">
          <img src={project.image} alt={project.title} />
          <h3 className="font-bold mt-4">{project.title}</h3>
          <p className="text-gray-400 text-sm mt-2">
            {project.description}
          </p>
        </Card>
      ))}
    </StaggerContainer>
  );
}
```

**Scroll Animation Details:**

- Triggers when container enters viewport
- Threshold: 10% of container visible
- Animation runs on scroll-in (Intersection Observer)
- Smooth fade-in + upward motion effect
- Can re-trigger if `once={false}`

**Performance Optimization:**

- Only animates visible items
- Intersection Observer prevents off-screen rendering
- Efficient cleanup on unmount
- Works with virtual scrolling lists

**Accessibility Notes:**

- Animations are smooth and don't cause motion sickness
- Can be disabled via `prefers-reduced-motion` media query
- Text remains readable during animation
- Works with screen readers (semantic HTML)

---

## Design Tokens Used

All components use centralized design tokens from CSS variables:

**Colors:**

- Primary accent: `rgb(0,255,136)` (teal/green)
- Error: `rgb(255,107,53)` (orange)
- Background primary: `#0a0e27` (dark blue)
- Text secondary: Design token variable
- Text tertiary: Design token variable

**Spacing:**

- 44px: Touch target minimum (buttons, inputs)
- 120px: Textarea min-height
- 12px-32px: Responsive padding map

**Borders & Radius:**

- Border: `border-white/10` default, `white/20` on hover
- Radius: `rounded-lg` or `rounded-radius-lg`

**Transitions:**

- Duration: `duration-200` to `duration-300`
- Property: `transition-all`

---

## Accessibility Compliance

**WCAG AA Standards Met:**

- ✓ Keyboard navigation on all interactive elements
- ✓ Screen reader support with semantic HTML
- ✓ ARIA attributes (aria-invalid, aria-required, aria-describedby, role="alert")
- ✓ Color contrast ratios ≥ 4.5:1
- ✓ Focus indicators visible (ring effect)
- ✓ Min touch target size: 44px × 44px
- ✓ Error messages associated with inputs
- ✓ Form labels properly associated (htmlFor)

---

## Browser Support

All components support:

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Mobile)

**CSS Features Used:**

- CSS Grid/Flexbox
- CSS Variables (Custom Properties)
- Backdrop-filter (for glass effect)
- Intersection Observer API

---

## Performance Notes

**Bundle Impact:**

- FormInput: ~0.88 KB (gzipped)
- FormLabel: Minimal (no JS, CSS only)
- FormTextarea: ~1.14 KB (gzipped)
- FormSelect: ~0.7 KB (gzipped)
- Container: ~0.4 KB (gzipped)
- Section: ~1.07 KB (gzipped)
- Card: ~0.50 KB (gzipped)
- PageLoader: Minimal (CSS animation)
- StaggerContainer: Uses native browser APIs

**Optimization Strategies:**

- Code splitting: Page chunks lazy-loaded on demand
- Scroll animations: Intersection Observer (not scroll events)
- No external dependencies beyond React
- CSS animations via GPU (transform, opacity)

---

## Common Patterns

### Form with Validation

```tsx
import { useState } from 'react';
import FormLabel from '@/components/ui/FormLabel';
import FormInput from '@/components/ui/FormInput';
import FormTextarea from '@/components/ui/FormTextarea';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.message) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    
    if (Object.keys(newErrors).length === 0) {
      // Submit form
      console.log('Form submitted:', formData);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <FormLabel htmlFor="name" required>
          Your Name
        </FormLabel>
        <FormInput
          id="name"
          type="text"
          placeholder="John Doe"
          value={formData.name}
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
          }
          error={errors.name}
          required
        />
      </div>

      <div>
        <FormLabel htmlFor="email" required>
          Email Address
        </FormLabel>
        <FormInput
          id="email"
          type="email"
          placeholder="john@example.com"
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
          error={errors.email}
          required
        />
      </div>

      <div>
        <FormLabel htmlFor="message" required>
          Message
        </FormLabel>
        <FormTextarea
          id="message"
          placeholder="Your message..."
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
          error={errors.message}
          required
        />
      </div>

      <button
        type="submit"
        className="w-full px-6 py-3 bg-[rgb(0,255,136)] text-black font-bold rounded-lg hover:bg-[rgb(0,230,120)] transition-colors"
      >
        Send Message
      </button>
    </form>
  );
}
```

### Responsive Grid with Stagger Animation

```tsx
import StaggerContainer from '@/components/StaggerContainer';
import Card from '@/components/ui/Card';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';

export function PortfolioGrid({ items }) {
  return (
    <Section spacing="lg" background="gradient">
      <Container maxWidth="lg">
        <h2 className="text-4xl font-bold mb-12">Featured Projects</h2>
        
        <StaggerContainer 
          staggerDelay={150}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {items.map((item) => (
            <Card key={item.id} padding="md" glass hover>
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-text-secondary">{item.description}</p>
            </Card>
          ))}
        </StaggerContainer>
      </Container>
    </Section>
  );
}
```

---

## Troubleshooting

### Form Input Not Showing Error

**Issue:** Error message not visible

**Solution:**
- Ensure `error` prop is passed as non-empty string
- Check that `errorId` is properly set (auto-generated if using `id` prop)
- Verify CSS is loaded (check for missing Tailwind classes)

### Section Animation Not Triggering

**Issue:** Section content not animating on scroll

**Solution:**
- Ensure `animate={true}` (default)
- Check viewport height and threshold (10% of section must be visible)
- Verify `animate-fade-in-up` class is available in Tailwind CSS

### Container Max-Width Not Working

**Issue:** Container wider than expected

**Solution:**
- Verify `maxWidth` prop value is one of: sm, md, lg, xl, full
- Check parent element isn't constrained wider than max-width
- Ensure Tailwind CSS is processing max-width classes

### StaggerContainer Not Staggering

**Issue:** All children animate at same time

**Solution:**
- Verify children are direct array items (not wrapped in extra divs)
- Increase `staggerDelay` to see effect better
- Check that `isVisible` state is becoming true (inspect in DevTools)

---

## Version History

- **Phase 5:** FormInput, FormLabel, FormTextarea, FormSelect created
- **Phase 6:** Card, Section, Container component enhancements
- **Phase 8:** PageLoader created for code splitting; StaggerContainer refined
- **Phase 9:** Documentation completed

---

## Contributing

When adding new components:

1. Follow the existing naming convention (PascalCase)
2. Ensure WCAG AA accessibility compliance
3. Use design tokens from CSS variables
4. Add TypeScript interfaces
5. Include comments for complex logic
6. Test with screen readers and keyboard navigation
7. Update this documentation

---

## Support

For questions or issues with components:

1. Check troubleshooting section
2. Review component usage examples
3. Test in browser DevTools (accessibility tree)
4. Run lighthouse audit for performance

---

**Last Updated:** November 23, 2025

**Maintained By:** GridGo Interiors Development Team
