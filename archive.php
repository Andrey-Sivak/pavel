<?php
/**
 * Template file for archive.php
 *
 * This file is part of the Pavel theme.
 *
 * @package Pavel
 */

declare(strict_types=1);

$columns         = get_option( 'pm_post_layout', 2 );
$show_excerpt    = get_option( 'pm_post_show_excerpt', true );
$show_thumbnail  = get_option( 'pm_post_show_thumb', true );
$show_date       = get_option( 'pm_post_show_date', true );
$show_categories = get_option( 'pm_post_show_categories', true );

global $wp_query;
$current_page = get_query_var( 'paged' ) ? get_query_var( 'paged' ) : 1;
$cats         = isset( $_GET['cats'] ) ? explode( ',', $_GET['cats'] ) : array();

if ( count( $cats ) ) {
	$current_page = 1;
}

$cat_ids = array();
foreach ( $cats as $slug ) {
	$term = get_category_by_slug( sanitize_title( $slug ) );
	if ( $term ) {
		$cat_ids[] = $term->term_id;
	}
}

if ( is_category() ) {
	$queried_cat_id = get_queried_object_id();
	if ( $queried_cat_id && ! in_array( $queried_cat_id, $cat_ids, true ) ) {
		$cat_ids[] = $queried_cat_id;
	}
}

$args = array(
	'post_type'        => 'post',
	'posts_per_page'   => 6,
	'post_status'      => 'publish',
	'paged'            => $current_page,
	'suppress_filters' => false,
);

if ( ! empty( $cat_ids ) ) {
	$args['category__in'] = $cat_ids;
}

$posts_query = new WP_Query( $args );
$total_pages = $posts_query->max_num_pages;

$base_class = 'pm-archive';

get_header();
?>

	<main class="relative z-20 overflow-x-hidden">
		<header class="pt-45 pm-wrap mb-20">
			<div class="max-w-[1220px] mx-auto text-center">
				<h1 class="pm-section-heading pm-archive-heading">
					<?php
					$title = get_the_archive_title();
					$title = preg_replace( '/^[^:]+: /', '', $title );
					echo $title;
					?>
				</h1>
				<div class="text-[30px] leading-[1.2] font-medium mt-7.5">
					<?php echo get_the_archive_description(); ?>
				</div>
			</div>
		</header>

		<div class="pm__posts-grid_wrap columns--<?php echo esc_attr( $columns ); ?>">
			<?php
			$current_category = get_queried_object() ? get_queried_object()->term_id : null;
			pavel_category_list();
			?>

			<div class="pm__posts-grid pm-post-list">
				<?php
				if ( $posts_query->have_posts() ) :
					while ( $posts_query->have_posts() ) {
						$posts_query->the_post();
						get_template_part(
							'/template-parts/post-card',
							null,
							array(
								'showExcerpt'    => $show_excerpt,
								'showThumb'      => $show_thumbnail,
								'showDate'       => $show_date,
								'showCategories' => $show_categories,
							)
						);
					}
					wp_reset_postdata();
				else :
					?>
					<p class="text-center text-xl font-medium col-span-full">
						<?php echo esc_html__( 'No posts found matching your query', 'pm' ); ?>
						<br>
						<?php echo esc_html__( 'Please try different filters or return to the ', 'pm' ); ?> <a
							href="<?php echo get_home_url(); ?>/blog"
							class="text-primary hover:underline"><?php echo esc_html__( 'Blog', 'pm' ); ?></a>
					</p>
				<?php endif; ?>
			</div>
			<?php
			$category_data = array(
				'category' => $cat_ids,
			);
			?>
			<div
				class="pm-posts-loader max-w-[150px] mx-auto hidden"
				data-current-page="<?php echo esc_attr( $current_page ); ?>"
				data-max-pages="<?php echo esc_attr( $total_pages ); ?>"
				data-category="<?php echo esc_attr( json_encode( $category_data ) ); ?>"
			>
				<?php get_template_part( '/vector-images/post-loader' ); ?>
			</div>

			<div class="pm-pagination">
				<?php echo pavel_generate_pagination_html( $current_page, $total_pages, $base_class ); ?>
			</div>
		</div>

		<?php pavel_render_contact_block(); ?>
	</main>

<?php
get_footer();
