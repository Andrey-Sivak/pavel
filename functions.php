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

define( 'PAVEL_VERSION', '1.0.17' );

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

function pavel_category_list(): void {
	$cat_slugs = isset( $_GET['cats'] ) ? array_filter( explode( ',', $_GET['cats'] ) ) : array();

	if ( is_category() ) {
		$queried_cat = get_queried_object();
		if ( $queried_cat && ! in_array( $queried_cat->slug, $cat_slugs, true ) ) {
			$cat_slugs[] = $queried_cat->slug;
		}
	}

	$cat_ids = array();
	foreach ( $cat_slugs as $slug ) {
		$term = get_category_by_slug( sanitize_title( $slug ) );
		if ( $term ) {
			$cat_ids[] = $term->term_id;
		}
	}

	$categories = get_categories(
		array(
			'hide_empty' => false,
			'exclude'    => get_cat_ID( 'Uncategorized' ),
		)
	);

	echo '<nav class="mb-7.5">';
	echo '<ul class="pm-blog__category-list flex items-center flex-wrap gap-y-1.5 gap-x-3.5">';

	$base_btn_class  = 'pm-blog__category-item leading-none cursor-pointer py-2 px-4 block rounded-[6px] border border-[#003459] bg-transparent transition-all duration-300 hover:border-white';
	$btn_inner_class = 'leading-[1.2]';

	$active_btn_class = $base_btn_class . ' active';

	$all_btn_class = empty( $cat_ids ) ? $active_btn_class : $base_btn_class;
	echo '<li class="whitespace-nowrap shrink-0 grow-0">
            <a class="' . $all_btn_class . '" href="' . get_home_url() . '" data-category-slug="all" data-category-id="0">
                <span class="' . $btn_inner_class . '">' . esc_html__( 'All', 'pm' ) . '</span>
            </a>
        </li>';

	foreach ( $categories as $category ) :
		$is_active          = in_array( $category->term_id, $cat_ids, true );
		$category_btn_class = $is_active ? $active_btn_class : $base_btn_class;
		echo '<li class="whitespace-nowrap shrink-0 grow-0">
                <a class="' . $category_btn_class . '" href="' . esc_url( get_category_link( $category->term_id ) ) . '" data-category-slug="' . $category->slug . '" data-category-id="' . $category->term_id . '">
                    <span class="' . $btn_inner_class . '">' . esc_html( $category->name ) . '</span>
                </a>
            </li>';
	endforeach;

	echo '</ul>';
	echo '</nav>';
}

function pavel_ajax_load_more_posts(): void {
	$paged    = isset( $_POST['paged'] ) ? absint( $_POST['paged'] ) : 1;
	$category = isset( $_POST['category'] ) ? json_decode( wp_unslash( $_POST['category'] ), true ) : array();

	$show_excerpt    = get_option( 'pm_post_show_excerpt', true );
	$show_thumbnail  = get_option( 'pm_post_show_thumb', true );
	$show_date       = get_option( 'pm_post_show_date', true );
	$show_categories = get_option( 'pm_post_show_categories', true );

	$args = array(
		'post_type'      => 'post',
		'post_status'    => 'publish',
		'paged'          => $paged,
		'posts_per_page' => 6,
	);

	if ( ! empty( $category ) ) {
		$args['category__in'] = array_map( 'absint', $category );
	}

	$query = new WP_Query( $args );

	ob_start();

	if ( $query->have_posts() ) {
		while ( $query->have_posts() ) {
			$query->the_post();
			get_template_part(
				'/template-parts/post-card',
				null,
				array(
					'base_class'     => 'wp-block-pavel-post-list',
					'showExcerpt'    => $show_excerpt,
					'showThumb'      => $show_thumbnail,
					'showDate'       => $show_date,
					'showCategories' => $show_categories,
				)
			);
		}
	} else {
		$archive_not_found_text = '<p class="text-center text-xl font-medium col-span-full">' . esc_html__( 'No posts found matching your query', 'pm' ) . '<br>' . esc_html__( 'Please try different filters or return to the ', 'pm' ) . '<a href="' . get_home_url() . '/blog" class="text-primary hover:underline">' . esc_html__( 'Blog', 'pm' ) . '</a></p>';

		echo $archive_not_found_text;
	}

	wp_reset_postdata();

	$html = ob_get_clean();

	$pagination_html = pavel_generate_pagination_html( $paged, $query->max_num_pages );

	$response = array(
		'html'         => $html,
		'pagination'   => $pagination_html,
		'max_pages'    => $query->max_num_pages,
		'current_page' => $paged,
	);

	wp_send_json_success( $response );
}

add_action( 'wp_ajax_pavel_ajax_load_more_posts', 'pavel_ajax_load_more_posts' );
add_action( 'wp_ajax_nopriv_pavel_ajax_load_more_posts', 'pavel_ajax_load_more_posts' );

function pavel_register_post_list_options() {
	$options_label = 'pavel_options';
	register_setting(
		$options_label,
		'pm_post_layout',
		array(
			'type'              => 'integer',
			'default'           => 2,
			'description'       => 'Post list layout columns for the entire site',
			'show_in_rest'      => array(
				'name'   => 'pm_post_layout',
				'schema' => array(
					'type'        => 'integer',
					'enum'        => array( 2, 3 ),
					'description' => 'Number of columns for post list blocks (2 or 3)',
				),
			),
			'sanitize_callback' => function( $value ) {
				return in_array( (int) $value, array( 2, 3 ) ) ? (int) $value : 2;
			},
		)
	);

	register_setting(
		$options_label,
		'pm_post_show_excerpt',
		array(
			'type'              => 'boolean',
			'default'           => true,
			'description'       => 'Show excerpt in post list blocks',
			'show_in_rest'      => array(
				'name'   => 'pm_post_show_excerpt',
				'schema' => array(
					'type'        => 'boolean',
					'description' => 'Whether to show post excerpts',
				),
			),
			'sanitize_callback' => 'rest_sanitize_boolean',
		)
	);

	// Show thumbnail
	register_setting(
		$options_label,
		'pm_post_show_thumb',
		array(
			'type'              => 'boolean',
			'default'           => true,
			'description'       => 'Show thumbnail in post list blocks',
			'show_in_rest'      => array(
				'name'   => 'pm_post_show_thumb',
				'schema' => array(
					'type'        => 'boolean',
					'description' => 'Whether to show post thumbnails',
				),
			),
			'sanitize_callback' => 'rest_sanitize_boolean',
		)
	);

	// Show date
	register_setting(
		$options_label,
		'pm_post_show_date',
		array(
			'type'              => 'boolean',
			'default'           => true,
			'description'       => 'Show date in post list blocks',
			'show_in_rest'      => array(
				'name'   => 'pm_post_show_date',
				'schema' => array(
					'type'        => 'boolean',
					'description' => 'Whether to show post dates',
				),
			),
			'sanitize_callback' => 'rest_sanitize_boolean',
		)
	);

	// Show categories
	register_setting(
		$options_label,
		'pm_post_show_categories',
		array(
			'type'              => 'boolean',
			'default'           => true,
			'description'       => 'Show categories in post list blocks',
			'show_in_rest'      => array(
				'name'   => 'pm_post_show_categories',
				'schema' => array(
					'type'        => 'boolean',
					'description' => 'Whether to show post categories',
				),
			),
			'sanitize_callback' => 'rest_sanitize_boolean',
		)
	);
}
add_action( 'init', 'pavel_register_post_list_options' );

function pavel_register_rest_routes() {
	register_rest_route(
		'pavel/v1',
		'/post-settings',
		array(
			'methods'             => 'GET',
			'callback'            => 'pavel_get_post_settings',
			'permission_callback' => '__return_true',
		)
	);

	register_rest_route(
		'pavel/v1',
		'/post-settings',
		array(
			'methods'             => 'POST',
			'callback'            => 'pavel_update_post_settings',
			'permission_callback' => function() {
				return current_user_can( 'edit_posts' );
			},
			'args'                => array(
				'pm_post_layout'          => array(
					'type'              => 'integer',
					'validate_callback' => function( $value ) {
						return in_array( (int) $value, array( 2, 3 ) );
					},
				),
				'pm_post_show_excerpt'    => array(
					'type' => 'boolean',
				),
				'pm_post_show_thumb'      => array(
					'type' => 'boolean',
				),
				'pm_post_show_date'       => array(
					'type' => 'boolean',
				),
				'pm_post_show_categories' => array(
					'type' => 'boolean',
				),
			),
		)
	);
}
add_action( 'rest_api_init', 'pavel_register_rest_routes' );

function pavel_get_post_settings() {
	return array(
		'pm_post_layout'          => (int) get_option( 'pm_post_layout', 2 ),
		'pm_post_show_excerpt'    => (bool) get_option( 'pm_post_show_excerpt', true ),
		'pm_post_show_thumb'      => (bool) get_option( 'pm_post_show_thumb', true ),
		'pm_post_show_date'       => (bool) get_option( 'pm_post_show_date', true ),
		'pm_post_show_categories' => (bool) get_option( 'pm_post_show_categories', true ),
	);
}

function pavel_update_post_settings( $request ) {
	$settings = array();
	$success  = true;

	if ( $request->has_param( 'pm_post_layout' ) ) {
		$layout                     = (int) $request->get_param( 'pm_post_layout' );
		$settings['pm_post_layout'] = $layout;
		$success                    = $success && update_option( 'pm_post_layout', $layout );
	}

	if ( $request->has_param( 'pm_post_show_excerpt' ) ) {
		$show_excerpt                     = $request->get_param( 'pm_post_show_excerpt' );
		$settings['pm_post_show_excerpt'] = $show_excerpt;
		$success                          = $success && update_option( 'pm_post_show_excerpt', $show_excerpt );
	}

	if ( $request->has_param( 'pm_post_show_thumb' ) ) {
		$show_thumb                     = $request->get_param( 'pm_post_show_thumb' );
		$settings['pm_post_show_thumb'] = $show_thumb;
		$success                        = $success && update_option( 'pm_post_show_thumb', $show_thumb );
	}

	if ( $request->has_param( 'pm_post_show_date' ) ) {
		$show_date                     = $request->get_param( 'pm_post_show_date' );
		$settings['pm_post_show_date'] = $show_date;
		$success                       = $success && update_option( 'pm_post_show_date', $show_date );
	}

	if ( $request->has_param( 'pm_post_show_categories' ) ) {
		$show_categories                     = $request->get_param( 'pm_post_show_categories' );
		$settings['pm_post_show_categories'] = $show_categories;
		$success                             = $success && update_option( 'pm_post_show_categories', $show_categories );
	}

	return array(
		'success'  => $success,
		'settings' => $settings,
	);
}

function pavel_generate_pagination_html( $current_page, $max_pages, $base_class = 'wp-block-pavel-post-list' ) {
	if ( $max_pages < 1 ) {
		$max_pages = 1;
	}

	$delta = 2; // Number of pages to show on each side of current page
	$pages = array();

	// Generate page numbers
	if ( $max_pages <= 7 ) {
		// Show all pages if total is 7 or less
		for ( $i = 1; $i <= $max_pages; $i++ ) {
			$pages[] = $i;
		}
	} else {
		// Show first page
		$pages[] = 1;

		// Add ellipsis if needed
		if ( $current_page - $delta > 2 ) {
			$pages[] = '...';
		}

		// Add pages around current page
		$start = max( 2, $current_page - $delta );
		$end   = min( $max_pages - 1, $current_page + $delta );

		for ( $i = $start; $i <= $end; $i++ ) {
			$pages[] = $i;
		}

		// Add ellipsis if needed
		if ( $current_page + $delta < $max_pages - 1 ) {
			$pages[] = '...';
		}

		// Show last page
		if ( $max_pages > 1 ) {
			$pages[] = $max_pages;
		}
	}

	// Generate HTML
	$html  = '<nav class="pagination-nav" aria-label="' . esc_attr__( 'Posts pagination', 'pm' ) . '">';
	$html .= '<ul class="pm-pagination-list">';

	// Previous button
	if ( $current_page > 1 && $max_pages > 1 ) {
		$html .= '<li class="pm-pagination-item">';
		$html .= '<button class="pm-pagination-btn pm-pagination-btn--prev" data-page="' . ( $current_page - 1 ) . '" aria-label="' . esc_attr__( 'Previous page', 'pm' ) . '">';
		$html .= '<svg width="10" viewBox="0 0 19 34" fill="none">
<path d="M16.8765 2.70847L2.29313 17.2918L16.8765 31.8751" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
</svg>';
		$html .= '</button>';
		$html .= '</li>';
	}

	// Page numbers
	foreach ( $pages as $page ) {
		if ( $page === '...' ) {
			$html .= '<li class="pm-pagination-item pm-pagination-item--ellipsis"><span>...</span></li>';
		} else {
			$is_active    = ( $page === $current_page );
			$active_class = $is_active ? ' pm-pagination-btn--active' : '';
			$aria_label   = $is_active ? sprintf( esc_attr__( 'Current page, page %d', 'pm' ), $page ) : sprintf( esc_attr__( 'Go to page %d', 'pm' ), $page );
			$aria_current = $is_active ? ' aria-current="page"' : '';
			$disabled     = ( $is_active || $max_pages === 1 ) ? ' disabled' : '';

			$html .= '<li class="pm-pagination-item">';
			$html .= '<button class="pm-pagination-btn' . $active_class . '" data-page="' . $page . '" aria-label="' . $aria_label . '"' . $aria_current . $disabled . '>';
			$html .= $page;
			$html .= '</button>';
			$html .= '</li>';
		}
	}

	if ( $current_page < $max_pages && $max_pages > 1 ) {
		$html .= '<li class="pm-pagination-item">';
		$html .= '<button class="pm-pagination-btn pm-pagination-btn--next" data-page="' . ( $current_page + 1 ) . '" aria-label="' . esc_attr__( 'Next page', 'pm' ) . '">';
		$html .= '<svg width="10" viewBox="0 0 19 34" fill="none">
<path d="M2.2915 31.875L16.8748 17.2917L2.2915 2.70833" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
</svg>';
		$html .= '</button>';
		$html .= '</li>';
	}

	$html .= '</ul>';
	$html .= '</nav>';

	return $html;
}

function pavel_get_reusable_block_content( $title ) {
	$block_post = get_page_by_title( $title, OBJECT, 'wp_block' );

	if ( $block_post ) {
		return $block_post->post_content;
	}

	return '';
}

function pavel_render_contact_block() {
	$block_content = pavel_get_reusable_block_content( 'Contact Block (En)' );

	if ( $block_content ) {
		echo do_blocks( $block_content );
	} else {
		echo '<!-- Contact block not found -->';
	}
}

