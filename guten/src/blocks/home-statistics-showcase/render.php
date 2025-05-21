<?php
$stats = $attributes['stats'] ?? [];
$block_id = $attributes['blockId'] ?? '';

$wrapper_attributes = get_block_wrapper_attributes([
	'class' => 'pm-wrap',
	'id' => !empty($block_id) ? esc_attr($block_id) : null,
]);

$base_class = 'wp-block-pavel-home-statistics-showcase';

if (empty($stats)) {
	return;
}
?>

<section <?php echo $wrapper_attributes; ?>>
	<div
		class="<?php echo esc_attr($base_class . '__decor-bottom-left'); ?>"
		data-parallax
		data-parallax-speed="0.15"
	>
		<?php get_template_part( '/vector-images/home-statistic-block-decor' ); ?>
	</div>

	<div class="<?php echo esc_attr($base_class . '__content pm-container'); ?>">
		<?php foreach ($stats as $stat) : ?>
			<div class="<?php echo esc_attr($base_class . '__item'); ?>">
				<div class="<?php echo esc_attr($base_class . '__item-decor-bg'); ?>">
					<?php get_template_part('/vector-images/card-decor-border'); ?>
				</div>
				<div class="<?php echo esc_attr($base_class . '__item-content'); ?>">
					<div class="<?php echo esc_attr($base_class . '__number pm-section-heading'); ?>">
						<?php echo wp_kses_post($stat['number']); ?>
					</div>
					<?php if (!empty($stat['unit'])) : ?>
						<div class="<?php echo esc_attr($base_class . '__unit'); ?>">
							<?php echo wp_kses_post($stat['unit']); ?>
						</div>
					<?php endif; ?>
					<div class="<?php echo esc_attr($base_class . '__description'); ?>">
						<?php echo wp_kses_post($stat['description']); ?>
					</div>
				</div>
			</div>
		<?php endforeach; ?>
	</div>
</section>
