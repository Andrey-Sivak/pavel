<?php
$heading = $attributes['heading'] ?? '';
$testimonials = $attributes['testimonials'] ?? [];
$block_id = $attributes['blockId'] ?? '';

$wrapper_attributes = get_block_wrapper_attributes([
	'id' => !empty($block_id) ? esc_attr($block_id) : null,
]);
$base_class = 'wp-block-pavel-home-testimonials-showcase';
?>

<section <?php echo $wrapper_attributes; ?>>
	<div class="<?php echo esc_attr($base_class . '__wrap pm-wrap'); ?>">
		<div class="<?php echo esc_attr($base_class . '__content pm-container'); ?>">

			<?php if (!empty($heading)) : ?>
				<h2 class="<?php echo esc_attr($base_class . '__heading pm-section-heading'); ?>">
					<?php echo wp_kses_post($heading); ?>
				</h2>
			<?php endif; ?>

			<?php if (!empty($testimonials)) : ?>
				<div
					class="<?php echo esc_attr($base_class . '__testimonials-grid' . (count($testimonials) > 3 ? '' : ' pm-items-' . count($testimonials))); ?>"
				>

					<?php if (count($testimonials) > 3) echo '<div class="swiper-wrapper" role="list">'; ?>

					<?php foreach ($testimonials as $testimonial) : ?>
						<?php if (!empty($testimonial['quote']) || !empty($testimonial['author'])) : ?>
							<div
								class="<?php echo esc_attr($base_class . '__testimonial-item' . (count($testimonials) > 3 ? ' swiper-slide' : '')); ?>">
								<div class="<?php echo esc_attr($base_class . '__testimonial-item-decor-bg'); ?>">
									<?php get_template_part('/vector-images/card-decor-border'); ?>
								</div>

								<div class="<?php echo esc_attr($base_class . '__testimonial-item-content'); ?>">
									<?php if (!empty($testimonial['rating'])) : ?>
										<div class="<?php echo esc_attr($base_class . '__rating'); ?>">
											<?php
											for ($i = 1; $i <= $testimonial['rating']; $i++) {
												get_template_part('/vector-images/rating-star');
											}
											?>
										</div>
									<?php endif; ?>

									<?php if (!empty($testimonial['quote'])) : ?>
										<blockquote class="<?php echo esc_attr($base_class . '__quote'); ?>">
											<?php echo '“' . wp_kses_post($testimonial['quote']) . '”'; ?>
										</blockquote>
									<?php endif; ?>

									<div class="<?php echo esc_attr($base_class . '__attribution'); ?>">
										<?php if (!empty($testimonial['author'])) : ?>
											<cite class="<?php echo esc_attr($base_class . '__author'); ?>">
												<?php echo '– ' . wp_kses_post($testimonial['author']); ?>
											</cite>
										<?php endif; ?>
									</div>
								</div>
							</div>
						<?php endif; ?>
					<?php endforeach; ?>

					<?php
					if (count($testimonials) > 3) {
						echo '</div>';
						echo '<div class="' . $base_class . '__pagination swiper-pagination' . '"></div>';
					}
					?>
				</div>
			<?php endif; ?>
		</div>
	</div>
</section>
