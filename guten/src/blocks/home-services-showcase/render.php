<?php
$heading       = $attributes['heading'] ?? '';
$subheading    = $attributes['subheading'] ?? '';
$description   = $attributes['description'] ?? '';
$servicesLabel = $attributes['servicesLabel'] ?? '';
$services      = $attributes['services'] ?? array();
$block_id      = $attributes['blockId'] ?? '';

$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'id' => ! empty( $block_id ) ? esc_attr( $block_id ) : null,
	)
);

$base_class = 'wp-block-pavel-home-services-showcase';
?>

<section <?php echo $wrapper_attributes; ?>>
	<div class="<?php echo esc_attr( $base_class . '__wrap pm-wrap' ); ?>">
		<div class="<?php echo esc_attr( $base_class . '__content pm-container' ); ?>">
			<?php if ( ! empty( $heading ) ) : ?>
				<h2 class="<?php echo esc_attr( $base_class . '__heading pm-section-heading pm-animate' ); ?>">
					<?php echo wp_kses_post( $heading ); ?>
				</h2>
			<?php endif; ?>

			<?php if ( ! empty( $subheading ) ) : ?>
				<h3 class="<?php echo esc_attr( $base_class . '__subheading pm-animate' ); ?>">
					<?php echo wp_kses_post( $subheading ); ?>
				</h3>
			<?php endif; ?>

			<?php if ( ! empty( $description ) ) : ?>
				<div class="<?php echo esc_attr( $base_class . '__description pm-animate' ); ?>">
					<?php echo wp_kses_post( $description ); ?>
				</div>
			<?php endif; ?>

			<?php if ( ! empty( $services ) ) : ?>
				<div class="<?php echo esc_attr( $base_class . '__services' ); ?>">
					<?php if ( ! empty( $servicesLabel ) ) : ?>
						<h3 class="<?php echo esc_attr( $base_class . '__services-label pm-animate' ); ?>">
							<?php echo wp_kses_post( $servicesLabel ); ?>
						</h3>
					<?php endif; ?>

					<div class="<?php echo esc_attr( $base_class . '__services-grid' ); ?>">
						<?php foreach ( $services as $service ) : ?>
							<?php if ( ! empty( $service['title'] ) || ! empty( $service['description'] ) ) : ?>
								<div class="<?php echo esc_attr( $base_class . '__service-item pm-animate' ); ?>">
									<?php if ( ! empty( $service['title'] ) ) : ?>
										<h4 class="<?php echo esc_attr( $base_class . '__service-title' ); ?>">
											<?php echo wp_kses_post( $service['title'] ); ?>
										</h4>
									<?php endif; ?>

									<?php if ( ! empty( $service['description'] ) ) : ?>
										<div class="<?php echo esc_attr( $base_class . '__service-description' ); ?>">
											<?php echo wp_kses_post( $service['description'] ); ?>
										</div>
									<?php endif; ?>
								</div>
							<?php endif; ?>
						<?php endforeach; ?>
					</div>
				</div>
			<?php endif; ?>
		</div>
	</div>
</section>
