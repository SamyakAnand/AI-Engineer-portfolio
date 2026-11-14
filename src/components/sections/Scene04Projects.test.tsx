import React from 'react';
import { render, screen, fireEvent, waitForElementToBeRemoved } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Scene04Projects from './Scene04Projects';

describe('Scene04Projects — Case Study Modal & Interactions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
  });

  it('renders project cards and opens case study modal on card click', () => {
    render(<Scene04Projects />);

    // Check that flagship projects exist in the document
    const nexusCards = screen.getAllByText(/NEXUS — Autonomous Data Analyst/i);
    expect(nexusCards.length).toBeGreaterThan(0);

    // Open NEXUS modal
    const nexusCard = nexusCards[0].closest('article');
    expect(nexusCard).toBeInTheDocument();
    fireEvent.click(nexusCard!);

    // Dialog should now be open
    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAttribute('aria-labelledby', 'case-study-title');

    // Title inside modal should be present
    const title = document.getElementById('case-study-title');
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(/NEXUS — Autonomous Data Analyst/i);
  });

  it('closes modal when clicking the dark backdrop outside the modal dialog panel', async () => {
    render(<Scene04Projects />);

    // Open a project modal
    const card = screen.getAllByText(/ARGUS AI — Evidence-Oriented Knowledge Workspace/i)[0].closest('article');
    fireEvent.click(card!);

    const overlay = document.getElementById('case-study-modal-overlay');
    expect(overlay).toBeInTheDocument();

    // Click on the overlay backdrop itself
    fireEvent.click(overlay!);

    // Modal should be removed after exit animation
    await waitForElementToBeRemoved(() => screen.queryByRole('dialog'));
  });

  it('keeps modal open when clicking inside the modal content', () => {
    render(<Scene04Projects />);

    // Open a project modal
    const card = screen.getAllByText(/ARGUS AI — Evidence-Oriented Knowledge Workspace/i)[0].closest('article');
    fireEvent.click(card!);

    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();

    // Click inside dialog content
    fireEvent.click(dialog);

    // Modal should still remain open
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('closes modal when pressing the Escape key', async () => {
    render(<Scene04Projects />);

    const card = screen.getAllByText(/SHIRO CodeMind — Source-Grounded Code Intelligence/i)[0].closest('article');
    fireEvent.click(card!);

    expect(screen.getByRole('dialog')).toBeInTheDocument();

    // Fire Escape key
    fireEvent.keyDown(window, { key: 'Escape' });

    // Modal should close after exit animation
    await waitForElementToBeRemoved(() => screen.queryByRole('dialog'));
  });

  it('navigates to next and previous projects without stacking dialog overlays', () => {
    render(<Scene04Projects />);

    // Open ARGUS AI
    const argusCard = screen.getAllByText(/ARGUS AI — Evidence-Oriented Knowledge Workspace/i)[0].closest('article');
    fireEvent.click(argusCard!);

    expect(screen.getAllByRole('dialog').length).toBe(1);

    // Click "Next Project" button
    const nextButtons = screen.getAllByRole('button', { name: /Next project/i });
    fireEvent.click(nextButtons[0]);

    // Still exactly one dialog, content updated
    expect(screen.getAllByRole('dialog').length).toBe(1);
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    // Click "Prev Project" button
    const prevButtons = screen.getAllByRole('button', { name: /Previous project/i });
    fireEvent.click(prevButtons[0]);

    // Still exactly one dialog
    expect(screen.getAllByRole('dialog').length).toBe(1);
  });

  it('restores body overflow and scroll lock after closing', async () => {
    render(<Scene04Projects />);

    const card = screen.getAllByText(/NEXUS — Autonomous Data Analyst/i)[0].closest('article');
    fireEvent.click(card!);

    // Body overflow should be locked to hidden
    expect(document.body.style.overflow).toBe('hidden');

    // Close via close button
    const closeButtons = screen.getAllByRole('button', { name: /Close Case Study/i });
    fireEvent.click(closeButtons[0]);

    // Body overflow should be restored
    await waitForElementToBeRemoved(() => screen.queryByRole('dialog'));
    expect(document.body.style.overflow).toBe('');
  });

  it('filters projects by category tab and search input', () => {
    render(<Scene04Projects />);

    // Click "AI & LLM Agents" tab
    const aiTab = screen.getByRole('button', { name: /AI & LLM Agents/i });
    fireEvent.click(aiTab);

    // Flagship AI/ML should be visible
    expect(screen.getAllByText(/NEXUS — Autonomous Data Analyst/i).length).toBeGreaterThan(0);

    // Switch back to "All Projects" tab before searching across whole catalog
    const allTab = screen.getByRole('button', { name: /All Projects/i });
    fireEvent.click(allTab);

    // Filter by search input
    const searchInput = screen.getByPlaceholderText(/Search stack/i);
    fireEvent.change(searchInput, { target: { value: 'PostgreSQL' } });

    // Projects with PostgreSQL should match
    expect(screen.getAllByText(/Credit Card Financial Analytics/i).length).toBeGreaterThan(0);
  });
});
