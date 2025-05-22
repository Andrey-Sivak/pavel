<?php
/**
 * Registers and initializes a custom Gutenberg block.
 *
 * This function sets up the custom Gutenberg block by registering
 * its scripts, styles, and other necessary assets for proper rendering
 * and functionality within the WordPress block editor.
 *
 * @package Pavel
 */

/**
 * Initializes the custom Gutenberg block for Pavel.
 *
 * Registers and enqueues all necessary assets and configurations
 * required for the custom Gutenberg block functionality.
 *
 * @return void
 */
function pavel_custom_gutenberg_block_init(): void {
	register_block_type( __DIR__ . '/build/test-block' );
	register_block_type( __DIR__ . '/build/home-hero-section' );
	register_block_type( __DIR__ . '/build/home-statistics-showcase' );
	register_block_type( __DIR__ . '/build/home-services-showcase' );
	register_block_type( __DIR__ . '/build/home-certifications-education' );
	register_block_type( __DIR__ . '/build/home-testimonials-showcase' );
	register_block_type( __DIR__ . '/build/home-experience-timeline' );
	register_block_type( __DIR__ . '/build/contact-section' );
}

add_action( 'init', 'pavel_custom_gutenberg_block_init' );

// function pavel_enqueue_regenerator_runtime()
// {
// wp_enqueue_script(
// 'regenerator-runtime',
// 'https://cdnjs.cloudflare.com/ajax/libs/regenerator-runtime/0.13.7/regenerator-runtime.min.js',
// array('wp-polyfill'),
// '0.13.7',
// true
// );
// }

// add_action('wp_enqueue_scripts', 'pavel_enqueue_regenerator_runtime');
