<?php
$heading = $attributes['heading'] ?? '';
$subtitle = $attributes['subtitle'] ?? '';
$profileImage = $attributes['profileImage'] ?? ['id' => null, 'url' => ''];
$socialLinks = $attributes['socialLinks'] ?? [];
$primaryButton = $attributes['primaryButton'] ?? ['text' => '', 'url' => '', 'target' => ''];
$secondaryButton = $attributes['secondaryButton'] ?? ['text' => '', 'url' => '', 'target' => ''];
$block_id = $attributes['blockId'] ?? '';

$wrapper_attributes = get_block_wrapper_attributes([
	'class' => 'pm-wrap',
	'id' => !empty($block_id) ? esc_attr($block_id) : null,
]);

$base_class = 'wp-block-pavel-contact-section';
?>
<section
	<?php echo $wrapper_attributes; ?>
>

	<div
		class="<?php echo esc_attr($base_class . '__decor-top-left'); ?>"
		data-parallax
		data-parallax-speed="0.15"
	>
		<?php get_template_part( '/vector-images/contact-section-decor' ); ?>
	</div>

	<div class="<?php echo esc_attr($base_class . '__content pm-container'); ?>">
		<?php if (!empty($profileImage['id'])) : ?>
			<figure class="<?php echo esc_attr($base_class . '__photo'); ?>">
				<?php echo wp_get_attachment_image($profileImage['id'], 'full', false, []); ?>

				<div class="<?php echo esc_attr($base_class . '__photo-shadow'); ?>">
					<?php get_template_part( '/vector-images/contact-section-photo-shadow' ); ?>
				</div>
				<div class="<?php echo esc_attr($base_class . '__photo-bg'); ?>">
					<?php get_template_part( '/vector-images/contact-section-photo-bg' ); ?>
				</div>
			</figure>
		<?php endif; ?>

		<div class="<?php echo esc_attr($base_class . '__content-inner'); ?>">
			<?php if (!empty($heading)) : ?>
				<h2 class="<?php echo esc_attr($base_class . '__heading pm-section-heading'); ?>">
					<?php echo wp_kses_post($heading); ?>
				</h2>
			<?php endif; ?>

			<?php if (!empty($subtitle)) : ?>
				<div class="<?php echo esc_attr($base_class . '__subtitle'); ?>">
					<?php echo wp_kses_post($subtitle); ?>
				</div>
			<?php endif; ?>

			<?php if (!empty($socialLinks)) : ?>
				<div class="<?php echo esc_attr($base_class . '__socials'); ?>">
					<?php foreach ($socialLinks as $socialLink) : ?>
						<a
							href="<?php echo esc_url($socialLink['url']); ?>"
							class="<?php echo esc_attr($base_class . '__social-item'); ?>"
							<?php echo !empty($socialLink['target']) ? 'target="' . esc_attr($socialLink['target']) . '"' : ''; ?>
							rel="noopener noreferrer"
						>
							<?php
							if (!empty($socialLink['icon']['id'])) {
								echo wp_get_attachment_image($socialLink['icon']['id'], 'full', false, []);
							}
							?>
						</a>
					<?php endforeach; ?>
				</div>
			<?php endif; ?>

			<div class="<?php echo esc_attr($base_class . '__buttons'); ?>">
				<?php if (!empty($primaryButton['text'])) : ?>
					<a
						href="<?php echo esc_url($primaryButton['url']); ?>"
						class="<?php echo esc_attr($base_class . '__button pm-button contact-button-primary'); ?>"
						<?php echo !empty($primaryButton['target']) ? 'target="' . esc_attr($primaryButton['target']) . '"' : ''; ?>
						aria-label="<?php echo esc_attr(sprintf('Go to %s form', $primaryButton['text'])); ?>"
						itemprop="contactPoint"
						itemscope
						itemtype="https://schema.org/ContactPoint"
					>
						<span><?php echo esc_html($primaryButton['text']); ?></span>
						<span class="pm-button__arrow"><?php get_template_part( '/vector-images/button-arrow' ); ?></span>
						<meta itemprop="contactType" content="customer support">
					</a>
				<?php endif; ?>

				<?php if (!empty($secondaryButton['text'])) : ?>
					<a
						href="<?php echo esc_url($secondaryButton['url']); ?>"
						class="<?php echo esc_attr($base_class . '__button contact-button-secondary'); ?>"
						<?php echo !empty($secondaryButton['target']) ? 'target="' . esc_attr($secondaryButton['target']) . '"' : ''; ?>
						aria-label="<?php echo esc_attr(sprintf('Go to %s form', $secondaryButton['text'])); ?>"
						itemprop="contactPoint"
						itemscope
						itemtype="https://schema.org/ContactPoint"
					>
						<?php echo esc_html($secondaryButton['text']); ?>
						<meta itemprop="contactType" content="customer support">
					</a>
				<?php endif; ?>
			</div>
		</div>
	</div>
</section>
