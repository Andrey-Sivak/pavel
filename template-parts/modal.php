<?php
$shortcode   = $args['shortcode'] ?? null;
$modal_id    = $args['modal_id'] ?? null;
$modal_title = $args['modal_title'] ?? esc_html__( 'Contact me', 'pm' );

if ( $shortcode && $modal_id ) :
	?>

	<div
		id="<?php echo esc_attr( $modal_id ); ?>"
		class="pm-modal fixed top-0 left-0 bg-black/75 w-full h-full flex items-center justify-center transition-all duration-500 opacity-0 -z-50"
	>
		<div
			class="pm-modal__inner w-full bg-[#003459] md:max-w-[750px] max-w-[90%] relative xl:rounded-[60px] md:rounded-[40px] rounded-[20px] lg:py-10 md:py-10 py-7.5 md:px-12.5 px-4 transition-all duration-500 pm-form-wrap">
			<div class="pm-form-loading" role="status" aria-live="polite">
				<?php get_template_part( '/vector-images/loader' ); ?>
				<span class="screen-reader-text"><?php echo esc_html__( 'Requesting..', 'pm' ); ?></span>
			</div>
			<div class="pm-form-success" role="status" aria-live="polite">
				<?php get_template_part( '/vector-images/success' ); ?>
				<span
					class="pm-form-success-text"><?php echo esc_html__( 'Your request has been sent successfully!', 'pm' ); ?></span>
				<span
					class="pm-form-success-subtext"><?php echo esc_html__( 'We will contact you as soon as possible.', 'pm' ); ?></span>
				<button class="pm-form-success-btn pm-button pm-button-primary">
					<span><?php echo esc_html__( 'Back to home', 'pm' ); ?></span>
					<span
						class="pm-button__arrow"><?php get_template_part( '/vector-images/button-arrow' ); ?></span>
				</button>
			</div>
			<div
				class="pm-modal__close absolute z-20 block cursor-pointer xl:top-15 md:top-10 top-5 xl:right-15 md:right-10 right-5 md:w-auto w-4 left-auto"
				title="<?php echo esc_attr__( 'Close', 'pm' ); ?>"
			>
				<svg class="block max-w-full" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
					<path
						d="M22.124 0.446289C22.4942 0.0762413 23.0794 0.0531781 23.4766 0.376953L23.5537 0.446289C23.924 0.816609 23.9472 1.40259 23.623 1.7998L23.5537 1.87598L13.5361 11.8936L13.4307 12L13.5361 12.1064L23.5537 22.124C23.9237 22.4942 23.9468 23.0794 23.623 23.4766L23.5537 23.5537C23.1834 23.924 22.5974 23.9472 22.2002 23.623L22.124 23.5537L12.1064 13.5361L12 13.4307L11.8936 13.5361L1.87598 23.5537C1.50576 23.9237 0.920579 23.9468 0.523437 23.623L0.446289 23.5537C0.0759952 23.1834 0.0528185 22.5974 0.376953 22.2002L0.446289 22.124L10.4639 12.1064L10.5693 12L10.4639 11.8936L0.446289 1.87598C0.0762454 1.50577 0.0531772 0.920586 0.376953 0.523438L0.446289 0.446289C0.816608 0.075972 1.40259 0.0527942 1.7998 0.376953L1.87598 0.446289L12 10.5703L22.124 0.446289Z"
						stroke-width="0.3" stroke-linecap="round"
						class="fill-white stroke-white"/>
				</svg>
			</div>
			<div class="relative z-10">
				<p class="md:mb-7.5 mb-5 font-bold text-center text-white pm-form-title">
					<?php echo esc_html( $modal_title ); ?>
				</p>
			</div>
			<?php echo do_shortcode( $shortcode ); ?>
		</div>
	</div>

<?php endif; ?>
