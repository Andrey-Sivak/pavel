<?php
/**
 * Theme functions and definitions
 *
 * This file sets up the theme by registering features, enqueuing assets, and defining
 * utility functions. It is loaded automatically by WordPress on every page load.
 *
 * @package Pavel
 */

declare(strict_types=1);

/**
 * The Pavel functions and definitions
 */

define( 'PAVEL_VERSION', '1.0.15' );

/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which
 * runs before the init hook. The init hook is too late for some features, such
 * as indicating support for post thumbnails.
 */
function pavel_setup(): void {
	// Make theme available for translation.
	load_theme_textdomain( 'pm', get_template_directory() . '/languages' );

	// Add default posts and comments RSS feed links to head.
	add_theme_support( 'automatic-feed-links' );

	// Let WordPress manage the document title.
	add_theme_support( 'title-tag' );

	// Enable support for Post Thumbnails.
	add_theme_support( 'post-thumbnails' );

	// Register navigation menus.
	register_nav_menus(
		array(
			'menu-1' => esc_html__( 'Primary', 'pm' ),
		),
	);

	// Switch core markup to HTML5.
	add_theme_support(
		'html5',
		array(
			'search-form',
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
			'style',
			'script',
		),
	);
}
add_action( 'after_setup_theme', 'pavel_setup' );

/**
 * Get ajax url
 *
 * @return string
 */
function pavel_get_ajax_url(): string {
	return get_template_directory_uri() . '/inc/front-ajax.php';
}

/**
 * Enqueue scripts and styles.
 */
function pavel_scripts(): void {
	$ajax_url = pavel_get_ajax_url();

	$pavel_options = array(
		'ajax_url' => $ajax_url,
		'home_url' => get_home_url(),
	);

	wp_dequeue_style( 'select2' );
	wp_dequeue_script( 'select2' );
	wp_deregister_script( 'select2' );

	wp_dequeue_script( 'jquery' );
	wp_deregister_script( 'jquery' );

	wp_enqueue_style( 'pavel-style', get_stylesheet_uri(), array(), PAVEL_VERSION );
	wp_enqueue_style( 'pavel-main-style', get_template_directory_uri() . '/dist/css/style.min.css', array(), PAVEL_VERSION );
	wp_enqueue_style( 'fonts-style', get_template_directory_uri() . '/fonts/fonts.css', array(), PAVEL_VERSION );

	$manifest_path = get_template_directory() . '/dist/js/manifest.json';

	if ( file_exists( $manifest_path ) ) {
		$manifest = json_decode( file_get_contents( $manifest_path ), true );

		if ( is_array( $manifest ) && ! empty( $manifest ) ) {
			foreach ( $manifest as $file ) {
				if ( str_contains( $file, '.js' ) ) {
					$chunk_handle = 'app-chunk-' . basename( $file, '.js' );
					$chunk_handle = str_replace( '.chunk', '', $chunk_handle );

					wp_enqueue_script( $chunk_handle, get_template_directory_uri() . $file, array(), PAVEL_VERSION, true );

					if ( str_contains( $file, 'app.min.js' ) ) {
						wp_localize_script( $chunk_handle, 'options', $pavel_options );
					}
				}
			}
		}
	}
}
add_action( 'wp_enqueue_scripts', 'pavel_scripts' );

add_action(
	'enqueue_block_assets',
	function () {
		wp_enqueue_style( 'pavel-admin-style', get_template_directory_uri() . '/dist/css/admin-styles.min.css', array(), PAVEL_VERSION );
		wp_enqueue_style( 'fonts-style', get_template_directory_uri() . '/fonts/fonts.css', array(), PAVEL_VERSION );
	}
);

require get_template_directory() . '/guten/guten.php';

/**
 * Add icon to Contact Form 7 submit buttons
 */
function pavel_add_icon_to_cf7_submit_button( $elements ) {
	return preg_replace_callback(
		'/<input[^>]+type=["\']submit["\'][^>]*>/i',
		function( $matches ) {
			preg_match( '/value=["\'](.*?)["\']/i', $matches[0], $value_match );
			$button_text = isset( $value_match[1] ) ? esc_html( $value_match[1] ) : 'Submit';

			preg_match( '/class=["\'](.*?)["\']/i', $matches[0], $class_match );
			$existing_classes = $class_match[1] ?? '';

			ob_start();
			?>
			<button type="submit" class="pm-button pm-button-primary <?php echo esc_attr( $existing_classes ); ?>">
				<span><?php echo $button_text; ?></span>
				<span class="pm-button__arrow"><?php get_template_part( '/vector-images/button-arrow' ); ?></span>
			</button>
			<?php
			return ob_get_clean();
		},
		$elements
	);
}
add_filter( 'wpcf7_form_elements', 'pavel_add_icon_to_cf7_submit_button' );

add_action(
	'init',
	function() {
		if ( function_exists( 'apply_filters' ) ) {
			$current_language = apply_filters( 'wpml_current_language', null );
			error_log( 'WPML API current language: ' . $current_language );

			if ( $current_language === 'cs' ) {
				global $locale;
				$locale = 'cs_CZ';

				unload_textdomain( 'pm' );
				load_textdomain( 'pm', get_template_directory() . '/languages/pm-cs_CZ.mo' );
			}
		}
	},
	0
);

/**
 * Retrieves the shortcode for a specific form type and language.
 *
 * @param string $form_type The type of form identifier.
 * @param string $language The language code to retrieve the shortcode for.
 * @param array  $form_shortcodes An associative array containing form shortcodes organized by form type and language.
 *
 * @return string The shortcode for the specified form type and language. If the language-specific shortcode is not available, the English ('en') shortcode is returned as the default.
 */
function pavel_get_form_shortcode( $form_type, $language, $form_shortcodes ) {
	if ( isset( $form_shortcodes[ $form_type ][ $language ] ) ) {
		return $form_shortcodes[ $form_type ][ $language ];
	}

	return $form_shortcodes[ $form_type ]['en'];
}
