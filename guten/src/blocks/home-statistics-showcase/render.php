<?php
$stats = $attributes['stats'] ?? [];
$wrapper_attributes = get_block_wrapper_attributes([
	'class' => 'pm-wrap'
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
	<div class="<?php echo esc_attr($base_class . '__content pm-container'); ?>">
		<?php foreach ($stats as $stat) : ?>
			<div class="<?php echo esc_attr($base_class . '__item'); ?>">
				<div class="<?php echo esc_attr($base_class . '__item-decor-bg'); ?>">
					<svg preserveAspectRatio="none" viewBox="0 0 336 381" fill="none">
						<path
							d="M330 25C330 14.5066 321.493 6 311 6H214.704L219.262 0H311L311.646 0.0078125C324.94 0.344757 335.655 11.0602 335.992 24.3545L336 25V101.937L330 109.837V25ZM24.3545 380.992C10.8457 380.65 0 369.591 0 356V288.696L6 280.797V356C6 366.33 14.2429 374.734 24.5098 374.994L25 375H128.609L124.053 381H25L24.3545 380.992Z"
							fill="url(#paint0_linear_22_659)"/>
						<defs>
							<linearGradient id="paint0_linear_22_659" x1="1.27078e-07" y1="190.5" x2="325.763"
											y2="190.5" gradientUnits="userSpaceOnUse">
								<stop stop-color="#007EA7"/>
								<stop offset="1" stop-color="#00477A"/>
							</linearGradient>
						</defs>
					</svg>

				</div>
				<div class="<?php echo esc_attr($base_class . '__item-content'); ?>">
					<div class="<?php echo esc_attr($base_class . '__number'); ?>">
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
