// Simple test to verify the motion presets structure
// Reads the TypeScript file as text to verify structure

import fs from 'fs';
import path from 'path';

const testFile = fs.readFileSync(path.join(process.cwd(), 'lib/motion-presets.ts'), 'utf-8');

// Basic assertions
function assert(condition, message) {
  if (!condition) {
    throw new Error(`Assertion failed: ${message}`);
  }
}

function testExportsExist() {
  assert(testFile.includes('export const discoveryCard'), 'discoveryCard export should exist');
  assert(testFile.includes('export const commitmentButton'), 'commitmentButton export should exist');
  assert(testFile.includes('export const cycleMotion'), 'cycleMotion export should exist');
  assert(testFile.includes('export const cyclePulse'), 'cyclePulse export should exist');
  assert(testFile.includes('export const revealContent'), 'revealContent export should exist');
  assert(testFile.includes('export const staggerContainer'), 'staggerContainer export should exist');
  assert(testFile.includes('export const timelineDot'), 'timelineDot export should exist');
  assert(testFile.includes('export const engagementFocus'), 'engagementFocus export should exist');
  assert(testFile.includes('export const respectReducedMotion'), 'respectReducedMotion export should exist');
}

function testDiscoveryCardStructure() {
  assert(testFile.includes('discoveryCard: Variants'), 'discoveryCard should be Variants type');
  assert(testFile.includes('hover:'), 'discoveryCard should have hover state');
  assert(testFile.includes('y: -4'), 'discoveryCard hover should have y: -4');
  assert(testFile.includes('x: 0'), 'discoveryCard hover should have x: 0');
  assert(testFile.includes('duration: 0.3'), 'discoveryCard should have duration 0.3');
}

function testCommitmentButtonStructure() {
  assert(testFile.includes('commitmentButton: Variants'), 'commitmentButton should be Variants type');
  assert(testFile.includes('tap: {'), 'commitmentButton should have tap state');
  assert(testFile.includes('scale: 0.98'), 'commitmentButton tap should have scale: 0.98');
  assert(testFile.includes('duration: 0.25'), 'commitmentButton should have duration 0.25');
}

function testCycleMotionStructure() {
  assert(testFile.includes('export const cycleMotion'), 'cycleMotion should be exported');
  assert(testFile.includes('rotate: [0, 1, 0, -1, 0]'), 'cycleMotion should have rotation array');
  assert(testFile.includes('duration: 8'), 'cycleMotion should have duration 8');
  assert(testFile.includes('repeat: Infinity'), 'cycleMotion should have infinite repeat');
}

function testCyclePulseStructure() {
  assert(testFile.includes('cyclePulse: Variants'), 'cyclePulse should be Variants type');
  assert(testFile.includes('animate: {'), 'cyclePulse should have animate state');
  assert(testFile.includes('duration: 3'), 'cyclePulse should have duration 3');
}

function testRevealContentStructure() {
  assert(testFile.includes('revealContent: Variants'), 'revealContent should be Variants type');
  assert(testFile.includes('hidden:'), 'revealContent should have hidden state');
  assert(testFile.includes('visible:'), 'revealContent should have visible state');
  assert(testFile.includes('opacity: 0, y: 20'), 'revealContent hidden should have opacity 0 and y 20');
  assert(testFile.includes('opacity: 1'), 'revealContent visible should have opacity 1');
}

function testStaggerContainerStructure() {
  assert(testFile.includes('staggerContainer: Variants'), 'staggerContainer should be Variants type');
  assert(testFile.includes('staggerChildren: 0.1'), 'staggerContainer should have staggerChildren 0.1');
  assert(testFile.includes('delayChildren: 0.1'), 'staggerContainer should have delayChildren 0.1');
}

function testTimelineDotStructure() {
  assert(testFile.includes('timelineDot: Variants'), 'timelineDot should be Variants type');
  assert(testFile.includes('scale: 0.5'), 'timelineDot should have scale 0.5');
  assert(testFile.includes('duration: 0.4'), 'timelineDot should have duration 0.4');
}

function testEngagementFocusStructure() {
  assert(testFile.includes('engagementFocus: Variants'), 'engagementFocus should be Variants type');
  assert(testFile.includes('focus: {'), 'engagementFocus should have focus state');
  assert(testFile.includes('duration: 0.15'), 'engagementFocus should have duration 0.15');
}

function testRespectReducedMotion() {
  assert(testFile.includes('export const respectReducedMotion'), 'respectReducedMotion should be exported');
  assert(testFile.includes('prefers-reduced-motion'), 'respectReducedMotion should check prefers-reduced-motion');
  assert(testFile.includes('window.matchMedia'), 'respectReducedMotion should use matchMedia');
}

function testImportsFramerMotion() {
  assert(testFile.includes("import { Variants } from 'framer-motion'"), 'Should import Variants from framer-motion');
}

// Run all tests
const tests = [
  { name: 'testImportsFramerMotion', fn: testImportsFramerMotion },
  { name: 'testExportsExist', fn: testExportsExist },
  { name: 'testDiscoveryCardStructure', fn: testDiscoveryCardStructure },
  { name: 'testCommitmentButtonStructure', fn: testCommitmentButtonStructure },
  { name: 'testCycleMotionStructure', fn: testCycleMotionStructure },
  { name: 'testCyclePulseStructure', fn: testCyclePulseStructure },
  { name: 'testRevealContentStructure', fn: testRevealContentStructure },
  { name: 'testStaggerContainerStructure', fn: testStaggerContainerStructure },
  { name: 'testTimelineDotStructure', fn: testTimelineDotStructure },
  { name: 'testEngagementFocusStructure', fn: testEngagementFocusStructure },
  { name: 'testRespectReducedMotion', fn: testRespectReducedMotion },
];

let passed = 0;
let failed = 0;

for (const test of tests) {
  try {
    test.fn();
    console.log(`✓ ${test.name}`);
    passed++;
  } catch (error) {
    console.log(`✗ ${test.name}: ${error.message}`);
    failed++;
  }
}

console.log(`\n${passed} passed, ${failed} failed`);

if (failed > 0) {
  process.exit(1);
}
