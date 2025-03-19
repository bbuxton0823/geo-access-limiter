/**
 * Simple build script for geo-access-limiter plugin
 * 
 * This script checks for common issues in the plugin files
 */

const fs = require('fs');
const path = require('path');

console.log('Starting validation of geo-access-limiter plugin...');
console.log('Working directory:', process.cwd());

// Directories to check
const directories = [
  'geo-access-limiter',
  'geo-access-limiter/includes',
  'geo-access-limiter/admin',
  'geo-access-limiter/public',
  'geo-access-limiter/public/js',
  'geo-access-limiter/public/css'
];

console.log('Checking directories...');
// Check if directories exist
let missingDirs = false;
directories.forEach(dir => {
  console.log('Checking directory:', dir);
  if (!fs.existsSync(dir)) {
    console.error(`ERROR: Directory ${dir} does not exist`);
    missingDirs = true;
  } else {
    console.log(`Directory ${dir} exists`);
  }
});

if (missingDirs) {
  console.error('ERROR: Required directories are missing. Build failed.');
  process.exit(1);
}

// Files to validate
const requiredFiles = [
  'geo-access-limiter/geo-access-limiter.php',
  'geo-access-limiter/includes/class-geo-access-limiter.php',
  'geo-access-limiter/includes/class-geo-access-limiter-api.php',
  'geo-access-limiter/admin/class-geo-access-limiter-admin.php',
  'geo-access-limiter/public/class-geo-access-limiter-public.php',
  'geo-access-limiter/public/js/geo-access-limiter.js',
  'geo-access-limiter/public/css/geo-access-limiter.css'
];

console.log('Checking files...');
// Check if required files exist
let missingFiles = false;
requiredFiles.forEach(file => {
  console.log('Checking file:', file);
  if (!fs.existsSync(file)) {
    console.error(`ERROR: Required file ${file} does not exist`);
    missingFiles = true;
  } else {
    console.log(`File ${file} exists`);
  }
});

if (missingFiles) {
  console.error('ERROR: Required files are missing. Build failed.');
  process.exit(1);
}

console.log('Validating file contents...');
// Basic content validation
let contentErrors = false;

// Check main plugin file
console.log('Validating main plugin file...');
const mainPlugin = fs.readFileSync('geo-access-limiter/geo-access-limiter.php', 'utf8');
if (!mainPlugin.includes('Plugin Name: Geo Access Limiter')) {
  console.error('ERROR: Main plugin file is missing plugin header');
  contentErrors = true;
}

// Check class files for expected content
const checkClass = (file, className) => {
  console.log(`Validating ${file} for class ${className}...`);
  const content = fs.readFileSync(file, 'utf8');
  if (!content.includes(`class ${className}`)) {
    console.error(`ERROR: ${file} does not contain the expected ${className} class`);
    contentErrors = true;
  }
};

checkClass('geo-access-limiter/includes/class-geo-access-limiter.php', 'Geo_Access_Limiter');
checkClass('geo-access-limiter/includes/class-geo-access-limiter-api.php', 'Geo_Access_Limiter_API');
checkClass('geo-access-limiter/admin/class-geo-access-limiter-admin.php', 'Geo_Access_Limiter_Admin');
checkClass('geo-access-limiter/public/class-geo-access-limiter-public.php', 'Geo_Access_Limiter_Public');

// Check JS file
console.log('Validating JS file...');
const jsFile = fs.readFileSync('geo-access-limiter/public/js/geo-access-limiter.js', 'utf8');
if (!jsFile.includes('initGeoAccessLimiter')) {
  console.error('ERROR: JS file is missing the initGeoAccessLimiter function');
  contentErrors = true;
}

// Check CSS file
console.log('Validating CSS file...');
const cssFile = fs.readFileSync('geo-access-limiter/public/css/geo-access-limiter.css', 'utf8');
if (!cssFile.includes('geo-access-error-container')) {
  console.error('ERROR: CSS file is missing the geo-access-error-container class');
  contentErrors = true;
}

if (contentErrors) {
  console.error('ERROR: Content validation failed. Build failed.');
  process.exit(1);
}

console.log('Validation completed successfully!');
console.log('Plugin build successful.'); 