'use client';
import type { ComponentProps } from 'react';

// Native links keep page navigation and browser history predictable.
// Content and accessible labels are supplied by the caller through props.
/* oxlint-disable next/no-html-link-for-pages, jsx-a11y/anchor-has-content */
export default function Link(props: ComponentProps<'a'>) {
  return <a {...props} />;
}
