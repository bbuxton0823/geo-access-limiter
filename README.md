# Geo Access Limiter

A WordPress plugin that restricts access to your website based on the user's geographical location. It uses both server-side IP-based geolocation and client-side browser geolocation API for more accurate results.

## Features

- Restrict access to your WordPress site based on countries/regions
- Easy-to-use admin interface for configuration
- Customizable access denied message
- Uses IP-based geolocation with fallback to browser's Geolocation API
- Admin users are exempt from restrictions

## Requirements

- WordPress 5.0 or higher
- PHP 7.0 or higher
- A geolocation API key (e.g., from [ipinfo.io](https://ipinfo.io/))

## Installation

1. Upload the `geo-access-limiter` folder to the `/wp-content/plugins/` directory
2. Activate the plugin through the 'Plugins' menu in WordPress
3. Go to Settings > Geo Access Limiter to configure the plugin

## Configuration

1. Enter your geolocation API key
2. Select the countries where your site should be accessible
3. Customize the message shown to users from restricted locations
4. Check the "Enable geo-restriction" box to activate the functionality

## How It Works

The plugin combines two methods to determine a user's location:

1. **Server-side IP geolocation**: Uses the user's IP address to determine their location through a geolocation API. This is the primary method.
2. **Browser geolocation**: As a secondary method, the plugin can also use the browser's Geolocation API (if the user allows it).

When a user visits your site, the plugin:

1. Checks if the user is an admin (admins always have access)
2. Gets the user's location from their IP address
3. Compares the location against your allowed locations list
4. If access is allowed, the user continues normally
5. If access is denied, the user sees your custom restriction message

## API Integration

This plugin uses [ipinfo.io](https://ipinfo.io/) for geolocation by default, but you can modify the code to use any geolocation API of your choice.

## Developer Information

### Project Structure

- `geo-access-limiter.php` - Main plugin file with plugin information and setup
- `includes/` - Core plugin classes
  - `class-geo-access-limiter.php` - Main plugin class
  - `class-geo-access-limiter-api.php` - API handler for geolocation
- `admin/` - Admin-specific functionality
  - `class-geo-access-limiter-admin.php` - Admin settings page
- `public/` - Public-facing functionality
  - `class-geo-access-limiter-public.php` - Public-facing class
  - `js/geo-access-limiter.js` - Client-side geolocation
  - `css/geo-access-limiter.css` - Styling for public and admin views

### Build System

The plugin includes a simple build system that validates the plugin structure and files:

```
npm run build
```

## Note on Mobile Devices

On mobile devices, this plugin works in two ways:

1. It detects the user's location based on their IP address (works regardless of GPS settings)
2. If the user grants location permission, it can use more precise GPS coordinates for verification

## Privacy Considerations

This plugin collects geolocation data from users. Make sure to:

1. Update your privacy policy to inform users about this data collection
2. Only use this plugin when necessary and in compliance with local laws
3. Consider whether you need to obtain consent before collecting location data

## License

This plugin is licensed under the GPL v2 or later. 