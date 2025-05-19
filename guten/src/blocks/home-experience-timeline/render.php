<?php
$heading = $attributes['heading'] ?? '';
$subheading = $attributes['subheading'] ?? '';
$button = $attributes['button'] ?? '';
$experiences = $attributes['experiences'] ?? [];

if (!empty($experiences)) {
	$experiences = array_reverse($experiences);
}

$wrapper_attributes = get_block_wrapper_attributes([
	'class' => 'pm-wrap'
]);
$base_class = 'wp-block-pavel-home-experience-timeline';
?>

<section <?php echo $wrapper_attributes; ?>>
	<div class="<?php echo esc_attr($base_class . '__bg '); ?>" aria-hidden="true">
		<svg preserveAspectRatio="none" viewBox="0 0 1920 900" fill="none">
			<path
				d="M1920 219.354C1920 161.521 1875.23 114.639 1820 114.639H1145.49C1116.68 114.639 1100 91.9489 1080.57 67.8404C1066.81 48.0699 1043.46 25.9155 1016.5 12.9928C997.286 3.78388 974.251 6.51138e-05 957 2.68221e-05C915.542 0.000118842 869.5 27.9845 839.429 67.8404C819.274 94.5528 803.323 114.639 774.512 114.639H100C44.7715 114.639 2.819e-06 161.521 0 219.354V900H1920V219.354Z"
				fill="#00171F"/>
		</svg>
	</div>
	<div class="<?php echo esc_attr($base_class . '__content pm-container'); ?>">

		<?php if (!empty($heading)) : ?>
			<h2 class="<?php echo esc_attr($base_class . '__heading pm-section-heading'); ?>">
				<?php echo wp_kses_post($heading); ?>
			</h2>
		<?php endif; ?>

		<?php if (!empty($subheading)) : ?>
			<h3 class="<?php echo esc_attr($base_class . '__subheading'); ?>">
				<?php echo wp_kses_post($subheading); ?>
			</h3>
		<?php endif; ?>

		<?php if (!empty($experiences)) : ?>
			<div class="<?php echo esc_attr($base_class . '__timeline'); ?>">
				<?php
				$count = 0;
				foreach ($experiences as $index => $experience) :
					?>
					<?php if (!empty($experience['timeline']) && !empty($experience['description'])) : ?>
					<div class="<?php echo esc_attr($base_class . '__experience-item'); ?>">

						<div class="<?php echo esc_attr($base_class . '__experience-content'); ?>">
							<?php if (!empty($experience['logo']['id'])) : ?>
								<figure class="<?php echo esc_attr($base_class . '__experience-logo'); ?>">
									<?php echo wp_get_attachment_image($experience['logo']['id'], 'full', false, []); ?>
								</figure>
							<?php endif; ?>

							<div class="<?php echo esc_attr($base_class . '__experience-description'); ?>">
								<?php echo wp_kses_post($experience['description']); ?>
							</div>
						</div>

						<div class="<?php echo esc_attr($base_class . '__experience-timeline'); ?>">
							<?php echo wp_kses_post($experience['timeline']); ?>
						</div>
					</div>
				<?php endif; ?>
					<?php
					$count++;
				endforeach;
				?>
			</div>
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
				<span><?php echo esc_html($button['text']); ?></span>
				<span class="pm-button__arrow"><?php get_template_part('/vector-images/button-arrow'); ?></span>
				<meta itemprop="contactType" content="customer support">
			</a>
		<?php endif; ?>
	</div>
</section>
