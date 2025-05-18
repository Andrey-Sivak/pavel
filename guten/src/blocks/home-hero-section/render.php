<?php
$title = $attributes['title'] ?? '';
$subtitle = $attributes['subtitle'] ?? '';
$image = $attributes['image'] ?? null;
$button = $attributes['button'] ?? '';

$wrapper_attributes = get_block_wrapper_attributes([
	'class' => 'pm-wrap'
]);
$base_class = 'wp-block-pavel-home-hero-section';

if (!function_exists('get_bg_svg')) {
	function get_bg_svg($start_color, $end_color)
	{
		return '<svg preserveAspectRatio="none" viewBox="0 0 1920 900" fill="none">
<path d="M1920 680.646C1920 738.479 1875.23 785.361 1820 785.361H1145.49C1116.68 785.361 1100 808.051 1080.57 832.16C1066.81 851.93 1043.46 874.085 1016.5 887.007C997.286 896.216 974.251 900 957 900C915.542 900 869.5 872.016 839.429 832.16C819.274 805.447 803.323 785.361 774.512 785.361H100C44.7715 785.361 2.819e-06 738.479 0 680.646V0H1920V680.646Z" fill="url(#paint0_linear_3_637)"/>
<defs>
<linearGradient id="paint0_linear_3_637" x1="1780" y1="656.106" x2="275.966" y2="60.7112" gradientUnits="userSpaceOnUse">
<stop stop-color="' . $start_color . '"/>
<stop offset="1" stop-color="' . $end_color . '"/>
</linearGradient>
</defs>
</svg>';
	}
}

?>

<section
	<?php echo $wrapper_attributes; ?>
>
	<div class="<?php echo esc_attr($base_class . '__bg ' . $base_class . '__bg-overlay-1') ?>" aria-hidden="true">
		<?php echo get_bg_svg('#007EA7', '#003459'); ?>
	</div>
	<div class="<?php echo esc_attr($base_class . '__bg ' . $base_class . '__bg-overlay-2') ?>" aria-hidden="true">
		<?php echo get_bg_svg('#00A8E8', '#00A8E8'); ?>
	</div>
	<div class="<?php echo esc_attr($base_class . '__bg ' . $base_class . '__bg-overlay-3') ?>" aria-hidden="true">
		<?php echo get_bg_svg('#00A8E8', '#00A8E8'); ?>
	</div>
	<div class="<?php echo esc_attr($base_class . '__arrow-to-bottom') ?>">
		<svg width="70" height="70" viewBox="0 0 70 70" fill="none">
			<path d="M20.4167 27.7084L35 42.2917L49.5834 27.7084" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
		</svg>
	</div>


	<div class="<?php echo esc_attr($base_class . '__content pm-container') ?>">
		<div class="<?php echo esc_attr($base_class . '__content_text') ?>">
			<h1 class="<?php echo esc_attr($base_class . '__title') ?>">
				<?php echo wp_kses_post($title); ?>
			</h1>
			<?php if ($subtitle) : ?>
				<p class="<?php echo esc_attr($base_class . '__subtitle') ?>">
					<?php echo wp_kses_post($subtitle); ?>
				</p>
			<?php endif; ?>
			<?php if (!empty($button)) : ?>
				<a
					href="<?php echo esc_url($button['url']); ?>"
					target="<?php echo esc_attr($button['target']); ?>"
					class="<?php echo $base_class . '__button pm-button'; ?>"
					aria-label="<?php echo esc_attr(sprintf('Go to %s form', $button['text'])); ?>"
					title="<?php echo esc_attr($button['text']); ?>"
					itemprop="contactPoint"
					itemscope
					itemtype="https://schema.org/ContactPoint"
				>
					<span>Let’s connect</span>
					<span class="pm-button__arrow"><?php get_template_part( '/vector-images/button-arrow' ); ?></span>
					<meta itemprop="contactType" content="customer support">
				</a>
			<?php endif; ?>
		</div>

		<?php if ($image['id']) : ?>
			<figure class="<?php echo esc_attr($base_class . '__image') ?>">
				<?php echo wp_get_attachment_image($image['id'], 'full', false, []); ?>
				<span class="<?php echo esc_attr($base_class . '__image-shadow') ?>"><?php get_template_part('/vector-images/home-hero-photo-shadow') ?></span>
				<span class="<?php echo esc_attr($base_class . '__image-decor') ?>"><?php get_template_part('/vector-images/home-hero-photo-bg') ?></span>
			</figure>
		<?php endif; ?>

	</div>
</section>
