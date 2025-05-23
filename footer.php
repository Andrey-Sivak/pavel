<?php
/**
 * The footer template for the Pavel theme
 *
 * This file contains the closing body and HTML tags, along with footer content
 * such as widgets, copyright info, and scripts. It is included via get_footer().
 *
 * @package Pavel
 */

declare(strict_types=1);
?>
<footer id="pm-footer" class="pm-footer pm-wrap relative z-30 pb-7.5 pt-17.5">
	<div class="pm-container">
		<div class="flex md:flex-row flex-col md:text-left text-center w-full items-center justify-between pb-6 border-b border-white/20 pm-footer__inner">
			<?php get_template_part( '/template-parts/logo' ); ?>

			<?php
			if ( has_nav_menu( 'menu-1' ) ) {
				wp_nav_menu(
					array(
						'theme_location' => 'menu-1',
						'menu_id'        => 'primary-menu-footer',
						'container'      => false,
						'menu_class'     => 'pm-nav-menu flex items-center',
						'fallback_cb'    => false,
					)
				);
			}
			?>

			<div class="flex items-center gap-7.5">
				<a href="#" class="">
					<?php get_template_part( '/vector-images/icon-email' ); ?>
				</a>
				<a href="#" class="">
					<?php get_template_part( '/vector-images/icon-linked' ); ?>
				</a>
			</div>
		</div>

		<p class="text-center mt-6 text-[10px] leading-[12px]">
			&copy;<?php echo esc_html( date( 'Y' ) ); ?> <?php echo esc_html__( 'Pavel – Digital Product Leader', 'pm' ); ?>
		</p>
	</div>
</footer>

<?php
get_template_part(
	'/template-parts/modal',
	null,
	array(
		'modal_id'  => 'contact',
		'shortcode' => '[contact-form-7 id="0e8a695" title="Contact me"]',
	)
);

get_template_part(
	'/template-parts/modal',
	null,
	array(
		'modal_id'  => 'consultation',
		'shortcode' => '[contact-form-7 id="d6fffca" title="Schedule a free consultation"]',
	)
);

wp_footer();
?>

</body>
</html>
