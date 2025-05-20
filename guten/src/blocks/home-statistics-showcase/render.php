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
	<div class="<?php echo esc_attr($base_class . '__bg '); ?>" aria-hidden="true">
		<svg preserveAspectRatio="none" viewBox="0 0 1920 900" fill="none">
			<path d="M1920 680.646C1920 738.479 1875.23 785.361 1820 785.361H1145.49C1116.68 785.361 1100 808.051 1080.57 832.16C1066.81 851.93 1043.46 874.085 1016.5 887.007C997.286 896.216 974.251 900 957 900C915.542 900 869.5 872.016 839.429 832.16C819.274 805.447 803.323 785.361 774.512 785.361H100C44.7715 785.361 2.819e-06 738.479 0 680.646V0H1920V680.646Z" fill="#00171F"/>
		</svg>
	</div>

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
