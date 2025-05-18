<?php
$heading = $attributes['heading'] ?? '';
$subheading = $attributes['subheading'] ?? '';
$description = $attributes['description'] ?? '';
$servicesLabel = $attributes['servicesLabel'] ?? '';
$services = $attributes['services'] ?? [];

$wrapper_attributes = get_block_wrapper_attributes([
    'class' => 'pm-wrap'
]);
$base_class = 'wp-block-pavel-home-services-showcase';
?>

<section <?php echo $wrapper_attributes; ?>>
    <div class="<?php echo esc_attr($base_class . '__content pm-container'); ?>">
        <?php if (!empty($heading) || !empty($subheading) || !empty($description)) : ?>
            <div class="<?php echo esc_attr($base_class . '__header'); ?>">
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

                <?php if (!empty($description)) : ?>
                    <div class="<?php echo esc_attr($base_class . '__description'); ?>">
                        <?php echo wp_kses_post($description); ?>
                    </div>
                <?php endif; ?>
            </div>
        <?php endif; ?>

        <?php if (!empty($services)) : ?>
            <div class="<?php echo esc_attr($base_class . '__services'); ?>">
                <?php if (!empty($servicesLabel)) : ?>
                    <h3 class="<?php echo esc_attr($base_class . '__services-label'); ?>">
                        <?php echo wp_kses_post($servicesLabel); ?>
                    </h3>
                <?php endif; ?>

                <div class="<?php echo esc_attr($base_class . '__services-grid'); ?>">
                    <?php foreach ($services as $service) : ?>
                        <?php if (!empty($service['title']) || !empty($service['description'])) : ?>
                            <div class="<?php echo esc_attr($base_class . '__service-item'); ?>">
                                <?php if (!empty($service['title'])) : ?>
                                    <h4 class="<?php echo esc_attr($base_class . '__service-title'); ?>">
                                        <?php echo wp_kses_post($service['title']); ?>
                                    </h4>
                                <?php endif; ?>

                                <?php if (!empty($service['description'])) : ?>
                                    <div class="<?php echo esc_attr($base_class . '__service-description'); ?>">
                                        <?php echo wp_kses_post($service['description']); ?>
                                    </div>
                                <?php endif; ?>
                            </div>
                        <?php endif; ?>
                    <?php endforeach; ?>
                </div>
            </div>
        <?php endif; ?>
    </div>
</section>
