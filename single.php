<?php
/**
 * Template file for single.php
 *
 * This file is part of the Pavel theme.
 *
 * @package Pavel
 */

declare(strict_types=1);

get_header();
?>

	<main class="relative z-20 overflow-x-hidden pt-45">
		<header class="pm-wrap text-center">
			<div class="pm-container">
				<h1 class="pm-section-heading pm-archive-heading">
					<?php the_title(); ?>
				</h1>

				<?php if ( has_excerpt() ) : ?>
					<div class="mt-12.5 font-medium text-[40px] leading-[1.2]">
						<?php the_excerpt(); ?>
					</div>
				<?php endif; ?>
			</div>
		</header>

		<?php if ( has_post_thumbnail() ) : ?>
			<div class="mt-12.5">
				<figure class="w-full pm-thumbnail-container">
					<?php the_post_thumbnail( 'full', array( 'class' => 'pm-image' ) ); ?>
				</figure>
			</div>
		<?php endif; ?>

		<div class="pm-wrap mt-8">

			<div class="pm-container mb-12.5 w-full flex items-center justify-between gap-5">
				<?php $categories = get_the_category(); ?>
				<?php if ( ! empty( $categories ) ) : ?>
					<div class="flex items-start gap-5 flex-wrap">
						<?php foreach ( $categories as $category ) : ?>
							<span class="pm-single-post-cat"><?php echo esc_html( $category->name ); ?></span>
						<?php endforeach; ?>
					</div>
				<?php endif; ?>

				<div class="shrink-0 md:block flex gap-2 text-xl">
					<span><?php echo esc_html__( 'Published: ', 'pm' ) . get_the_date(); ?></span>
				</div>
			</div>

			<div class="pm-container pm-post-content">
				<?php the_content(); ?>
			</div>
		</div>
		<?php pavel_render_contact_block(); ?>
	</main>

<?php
get_footer();
