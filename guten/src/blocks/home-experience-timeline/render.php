<?php
$heading     = $attributes['heading'] ?? '';
$subheading  = $attributes['subheading'] ?? '';
$button      = $attributes['button'] ?? '';
$experiences = $attributes['experiences'] ?? array();
$block_id    = $attributes['blockId'] ?? '';

if ( ! empty( $experiences ) ) {
	$experiences = array_reverse( $experiences );
}

$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'class' => 'pm-wrap masked',
	)
);

$base_class = 'wp-block-pavel-home-experience-timeline';
?>

<section <?php echo $wrapper_attributes; ?>>
	<div
		class="<?php echo esc_attr( $base_class . '__decor-top-right' ); ?>"
		data-parallax
		data-parallax-speed="0.15"
		data-parallax-reverse="true"
	>
		<?php get_template_part( '/vector-images/home-experience-section-decor' ); ?>
	</div>

	<div
		class="<?php echo esc_attr( $base_class . '__content masked pm-container' ); ?>"
		id="<?php echo ! empty( $block_id ) ? esc_attr( $block_id ) : null; ?>"
	>

		<?php if ( ! empty( $heading ) ) : ?>
			<h2 class="<?php echo esc_attr( $base_class . '__heading pm-section-heading' ); ?>">
				<?php echo wp_kses_post( $heading ); ?>
			</h2>
		<?php endif; ?>

		<?php if ( ! empty( $subheading ) ) : ?>
			<h3 class="<?php echo esc_attr( $base_class . '__subheading' ); ?>">
				<?php echo wp_kses_post( $subheading ); ?>
			</h3>
		<?php endif; ?>

		<?php if ( ! empty( $experiences ) ) : ?>
			<div class="<?php echo esc_attr( $base_class . '__timeline' ); ?>">
				<?php
				$count = 0;
				foreach ( $experiences as $index => $experience ) :
					?>
					<?php if ( ! empty( $experience['timeline'] ) && ! empty( $experience['description'] ) ) : ?>
					<div class="<?php echo esc_attr( $base_class . '__experience-item' ); ?>">

						<div class="<?php echo esc_attr( $base_class . '__experience-content' ); ?>">
							<?php if ( ! empty( $experience['logo']['id'] ) ) : ?>
								<figure class="<?php echo esc_attr( $base_class . '__experience-logo' ); ?>">
									<?php echo wp_get_attachment_image( $experience['logo']['id'], 'full', false, array() ); ?>
								</figure>
							<?php endif; ?>

							<div class="<?php echo esc_attr( $base_class . '__experience-description' ); ?>">
								<?php echo wp_kses_post( $experience['description'] ); ?>
							</div>
						</div>

						<div class="<?php echo esc_attr( $base_class . '__experience-timeline' ); ?>">
							<div class="<?php echo esc_attr( $base_class . '__experience-timeline-text' ); ?>">
								<?php echo wp_kses_post( $experience['timeline'] ); ?>
							</div>
							<div class="<?php echo esc_attr( $base_class . '__experience-timeline-circle' ); ?>">
								<?php get_template_part( '/vector-images/ex-timl-decor-circle' ); ?>
							</div>
							<?php if ( $count !== count( $experiences ) - 1 ) : ?>
								<div class="<?php echo esc_attr( $base_class . '__experience-timeline-jumper' ); ?>">
									<?php get_template_part( '/vector-images/ex-timl-decor-jumper' ); ?>
								</div>
							<?php endif; ?>
						</div>
					</div>
				<?php endif; ?>
					<?php
					$count++;
				endforeach;
				?>
			</div>
		<?php endif; ?>

		<?php if ( ! empty( $button ) ) : ?>
			<a
				href="<?php echo esc_url( $button['url'] ); ?>"
				target="<?php echo esc_attr( $button['target'] ); ?>"
				class="<?php echo $base_class . '__button pm-button'; ?>"
				aria-label="<?php echo esc_attr( sprintf( 'Go to %s form', $button['text'] ) ); ?>"
				title="<?php echo esc_attr( $button['text'] ); ?>"
				itemprop="contactPoint"
				itemscope
				itemtype="https://schema.org/ContactPoint"
			>
				<span><?php echo esc_html( $button['text'] ); ?></span>
				<span class="pm-button__arrow"><?php get_template_part( '/vector-images/button-arrow' ); ?></span>
				<meta itemprop="contactType" content="customer support">
			</a>
		<?php endif; ?>
	</div>
</section>
