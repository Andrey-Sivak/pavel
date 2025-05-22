<?php
$heading     = $attributes['heading'] ?? '';
$credentials = $attributes['credentials'] ?? array();

$wrapper_attributes = get_block_wrapper_attributes();
$base_class         = 'wp-block-pavel-home-certifications-education';
?>

<section <?php echo $wrapper_attributes; ?>>
	<div class="<?php echo esc_attr( $base_class . '__wrap pm-wrap' ); ?>">
		<div
			class="<?php echo esc_attr( $base_class . '__decor-top-left' ); ?>"
			data-parallax
			data-parallax-speed="0.1"
		>
			<?php get_template_part( '/vector-images/home-certifications-section-decor' ); ?>
		</div>

		<div class="<?php echo esc_attr( $base_class . '__content pm-container' ); ?>">
			<?php if ( ! empty( $heading ) ) : ?>
				<h2 class="<?php echo esc_attr( $base_class . '__heading pm-section-heading pm-animate' ); ?>">
					<?php echo wp_kses_post( $heading ); ?>
				</h2>
			<?php endif; ?>

			<?php if ( ! empty( $credentials ) ) : ?>
				<div class="<?php echo esc_attr( $base_class . '__credentials-grid' ); ?>">
					<?php foreach ( $credentials as $credential ) : ?>
						<?php if ( ! empty( $credential['title'] ) || ! empty( $credential['description'] ) || ! empty( $credential['institution'] ) ) : ?>
							<div class="<?php echo esc_attr( $base_class . '__credential-item pm-animate' ); ?>">
								<?php if ( ! empty( $credential['logo']['id'] ) ) : ?>
									<figure class="<?php echo esc_attr( $base_class . '__credential-logo' ); ?>">
										<?php
										echo wp_get_attachment_image(
											$credential['logo']['id'],
											'full',
											false,
											array(
												'class' => $base_class . '__logo-image',
											)
										);
										?>
									</figure>
								<?php endif; ?>

								<div class="<?php echo esc_attr( $base_class . '__credential-content' ); ?>">
									<?php if ( ! empty( $credential['title'] ) ) : ?>
										<h3 class="<?php echo esc_attr( $base_class . '__credential-title' ); ?>">
											<?php echo wp_kses_post( $credential['title'] ); ?>

											<?php if ( ! empty( $credential['status'] ) ) : ?>
												<span
													class="<?php echo esc_attr( $base_class . '__credential-status' ); ?>">(<?php echo wp_kses_post( $credential['status'] ); ?>)</span>
											<?php endif; ?>
										</h3>
									<?php endif; ?>

									<?php if ( ! empty( $credential['description'] ) ) : ?>
										<div class="<?php echo esc_attr( $base_class . '__credential-description' ); ?>">
											<?php echo wp_kses_post( $credential['description'] ); ?>
										</div>
									<?php endif; ?>

									<?php if ( ! empty( $credential['institution'] ) ) : ?>
										<div class="<?php echo esc_attr( $base_class . '__credential-institution' ); ?>">
											<?php echo '– ' . wp_kses_post( $credential['institution'] ); ?>
										</div>
									<?php endif; ?>
								</div>
							</div>
						<?php endif; ?>
					<?php endforeach; ?>
				</div>
			<?php endif; ?>
		</div>
	</div>
</section>
