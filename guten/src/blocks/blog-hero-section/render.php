<?php
$title    = $attributes['title'] ?? '';
$subtitle = $attributes['subtitle'] ?? '';
$button   = $attributes['button'] ?? '';

$wrapper_attributes = get_block_wrapper_attributes();

$base_class = 'wp-block-pavel-blog-hero-section';
?>

<section
	<?php echo $wrapper_attributes; ?>
>

	<div class="<?php echo esc_attr( $base_class . '__bg ' . $base_class . '__bg-overlay-1' ); ?>" aria-hidden="true"></div>
	<div class="<?php echo esc_attr( $base_class . '__bg ' . $base_class . '__bg-overlay-2' ); ?>" aria-hidden="true"></div>

	<div class="<?php echo esc_attr( $base_class . '__wrapper pm-wrap' ); ?>">

		<div class="<?php echo esc_attr( $base_class . '__decor-top-left' ); ?>">
			<?php get_template_part( '/vector-images/hero-section-decor' ); ?>
		</div>

		<div class="<?php echo esc_attr( $base_class . '__arrow-to-bottom' ); ?>">
			<svg width="70" height="70" viewBox="0 0 70 70" fill="none">
				<path d="M20.4167 27.7084L35 42.2917L49.5834 27.7084" stroke="white" stroke-width="4" stroke-linecap="round"
					  stroke-linejoin="round"/>
			</svg>
		</div>

		<div class="<?php echo esc_attr( $base_class . '__content pm-container' ); ?>">
			<div class="<?php echo esc_attr( $base_class . '__content_text' ); ?>">
				<h1 class="<?php echo esc_attr( $base_class . '__title' ); ?>">
					<?php echo wp_kses_post( $title ); ?>
				</h1>
				<?php if ( $subtitle ) : ?>
					<p class="<?php echo esc_attr( $base_class . '__subtitle' ); ?>">
						<?php echo wp_kses_post( $subtitle ); ?>
					</p>
				<?php endif; ?>
				<?php if ( ! empty( $button ) ) : ?>
					<a
						href="<?php echo esc_url( $button['url'] ); ?>"
						target="<?php echo esc_attr( $button['target'] ); ?>"
						class="<?php echo $base_class . '__button pm-button pm-button-primary'; ?>"
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
		</div>
	</div>
</section>
