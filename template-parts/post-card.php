<?php
/**
 * Template part for post card.
 *
 * @package Pavel
 */

$show_excerpt    = $args['showExcerpt'] ?? true;
$show_thumbnail  = $args['showThumb'] ?? true;
$show_date       = $args['showDate'] ?? true;
$show_categories = $args['showCategories'] ?? true;

?>

<article class="pm__post-item">

	<div class="pm__post-item-decor-bg">
		<?php get_template_part( '/vector-images/card-decor-border' ); ?>
	</div>

	<div class="pm__post-item-content">

		<?php if ( has_post_thumbnail() && $show_thumbnail ) : ?>
		<a href="<?php the_permalink(); ?>">
			<figure class="pm__post-image">
					<?php the_post_thumbnail( 'large' ); ?>
			</figure>
		</a>
		<?php endif; ?>

		<div class="pm__post-content">

			<?php if ( $show_date ) : ?>
				<div class="pm__post-date">
					<?php echo get_the_date(); ?>
				</div>
			<?php endif; ?>

			<h3 class="pm__post-title line-clamp-3">
				<a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
			</h3>

			<?php if ( $show_categories ) : ?>
				<?php $categories = get_the_category(); ?>
				<?php if ( ! empty( $categories ) ) : ?>
					<div class="pm__post-categories">
						<?php foreach ( $categories as $category ) : ?>
							<span class="pm__post-category"><?php echo esc_html( $category->name ); ?></span>
						<?php endforeach; ?>
					</div>
				<?php endif; ?>
			<?php endif; ?>

			<?php if ( $show_excerpt ) : ?>
				<div class="pm__post-excerpt line-clamp-3">
					<?php the_excerpt(); ?>
				</div>
			<?php endif; ?>

			<a href="<?php the_permalink(); ?>"
			   class="pm__post-link">
				<span><?php echo esc_html__( 'Read more', 'pm' ); ?></span>
				<svg width="25" height="24" viewBox="0 0 25 24" fill="none">
					<path d="M7.5 9.5L12.5 14.5L17.5 9.5" stroke="url(#paint0_linear_156_613)" stroke-width="1.5"
						  stroke-linecap="round" stroke-linejoin="round"/>
					<defs>
						<linearGradient id="paint0_linear_156_613" x1="7.5" y1="11.3333" x2="17.2207" y2="12.171"
										gradientUnits="userSpaceOnUse">
							<stop stop-color="#00A8E8"/>
							<stop offset="0.516359" stop-color="#D0F1FD"/>
							<stop offset="1" stop-color="#00A8E8"/>
						</linearGradient>
					</defs>
				</svg>
			</a>
		</div>
	</div>
</article>
